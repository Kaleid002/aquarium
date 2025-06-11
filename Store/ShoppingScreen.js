import { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Image, Button, Dimensions, ScrollView } from 'react-native';
import axios from 'axios';
import { AppContext } from '../Context';
import Coin_Function from '../Gold/cashFunction';

const ShoppingScreen = ({ route }) => {
  const { userid } = route.params;
  const { coins, setgetcoin } = useContext(AppContext);
  const [commodity, setcommodity] = useState([]);
  const [modalVisible, setmodalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemnum, setitemnum] = useState(1);
  const [disable, setdisable] = useState(false);

  useEffect(() => {
    axios.get('http://172.20.10.4:3000/store', {
      params: {
        ID: userid
      }
    })
      .then((response) => {
        console.log(response.data);
        setcommodity(response.data);
      })
      .catch(error => {
        console.error('Update Store Error:', error);
      });
  }, [])

  const openModal = (item) => {
    setSelectedItem(item);
    setmodalVisible(true);
  };

  const colseModal = () => {
    setitemnum(1);
    setdisable(false);
    setmodalVisible(false);
  };

  const reduce_function = () => {
    if (selectedItem.price * (itemnum - 1) <= coins) {
      setdisable(false);
    }
    setitemnum(itemnum - 1);
  };

  const add_function = () => {
    if (selectedItem.price * (itemnum + 1) >= coins) {
      setdisable(true);

    }
    setitemnum(itemnum + 1);
  };

  const buy_function = () => {
    if (coins - selectedItem.price * itemnum >= 0 && selectedItem.stock > 0) {
      axios.post('http://172.20.10.4:3000/store', {
        ID: userid,
        name: selectedItem.name,
        stock: selectedItem.stock - itemnum
      })
        .then(() => {
          const updatedCommodity = commodity.map((item) => {
            if (item.name === selectedItem.name) {
              return { ...selectedItem, stock: selectedItem.stock - itemnum };
            }
            return item;
          })
          setcommodity(updatedCommodity);
          setgetcoin(-selectedItem.price * itemnum);
          setitemnum(1);
          setmodalVisible(false);
        })
        .catch(error => {
          console.error('Update store Error: ', error);
        });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Image source={require('../assets/img/Bottom_Sea.png')} style={{ position: 'absolute', width: '100%', height: '100%' }} />
      <Coin_Function ID={userid} />

      <ScrollView showsVerticalScrollIndicator={true} contentContainerStyle={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', padding: '8%' }} style={{ width: '100%', height: '100%' }}>
        {commodity.map((item, index) => (
          <TouchableOpacity key={index} style={{ width: '30%', height: '50%', margin: '1%', borderWidth: 1, borderRadius: 5, justifyContent: 'space-between', alignItems: 'center', backgroundColor: item.stock == 0 ? 'rgba(100,100,100,0.8)' : 'rgba(255,255,255,0.8)' }} onPress={() => openModal(item)} disabled={item.stock == 0}>
            <Text style={{ fontSize: 20, textAlign: 'center', height: '20%', width: '100%' }}>{item.name}</Text>
            <Text style={{ fontSize: 15, textAlign: 'center', color: item.stock > 0 ? 'rgba(0,0,0,1)' : 'rgba(255,0,0,1)' }}>(庫存:{item.stock})</Text>
            <View style={{ width: '40%', height: '20%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Image source={require('../assets/img/Gold_Icon.png')} style={{ width: '50%', height: '100%' }} />
              <Text style={{ width: '50%', fontSize: 20, textAlign: 'justify' }}>{item.price}</Text>
            </View>
          </TouchableOpacity>
        ))}

      </ScrollView>
      <Modal animationType="slide" transparent={true} visible={modalVisible} supportedOrientations={['landscape']} onRequestClose={() => { setmodalVisible(false) }}>
        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
          <View style={{ width: '50%', height: '50%', justifyContent: 'flex-end', alignItems: 'center' }}>
            <TouchableOpacity style={{
              position: 'absolute',
              width: 25,
              height: 25,
              top: 0,
              right: 0,
              backgroundColor: 'rgba(0,0,0,0.2)',
              borderRadius: 30,
              zIndex: 1
            }} onPress={() => colseModal()}>
              <Image source={require('../assets/img/Close_Icon.png')} style={{ width: '100%', height: '100%' }} />
            </TouchableOpacity>
            <View style={{ width: '100%', height: '100%', flexDirection: 'row', marginBottom: '2%', backgroundColor: 'rgba(255,255,255,1)', borderRadius: 5 }}>
              {selectedItem && (
                <>
                  {/* <View style={{ width: '20%', height: '50%', borderWidth: 1 }} /> */}

                  <View style={{ width: '100%', height: '100%', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'rgba(0,0,0,1)' }}>{selectedItem.name}</Text>
                    <Text style={{ fontSize: 20, textAlign: 'left', color: selectedItem.stock > 0 ? 'rgba(0,0,0,1)' : 'rgba(255,0,0,1)' }}>庫存:{selectedItem.stock}</Text>
                    <View style={{ width: '20%', height: '20%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                      <Image source={require('../assets/img/Gold_Icon.png')} style={{ width: '50%', height: '45%' }} />
                      <Text style={{ fontSize: 25, textAlign: 'center' }}>{selectedItem.price}</Text>
                    </View>
                    <View style={{ width: '100%', height: '30%', flexDirection: 'row' }}>
                      <TouchableOpacity style={{ width: '8%', height: '50%', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderRadius: 25 }} onPress={() => { itemnum == 1 ? 1 : reduce_function() }}>
                        <Text style={{ fontSize: 45, width: '100%', height: '100%', lineHeight: 40, textAlign: 'center' }}>-</Text>
                      </TouchableOpacity>
                      <View style={{ width: '20%', height: '50%', borderWidth: 1, borderRadius: 5, marginHorizontal: '1%', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 25, textAlign: 'center' }}>{itemnum}</Text>
                      </View>
                      <TouchableOpacity style={{ width: '8%', height: '50%', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderRadius: 25 }} onPress={() => { itemnum >= selectedItem.stock ? selectedItem.stock : add_function() }}>
                        <Text style={{ fontSize: 45, width: '100%', height: '100%', lineHeight: 40, textAlign: 'center' }}>+</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={{ width: '20%', height: '50%', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderRadius: 5, marginLeft: '5%' }} onPress={() => { disable ? undefined : buy_function() }}>
                        <Text style={{ fontSize: 25, textAlign: 'center' }}>購買</Text>
                      </TouchableOpacity>
                      {disable &&
                        <Text style={{ fontSize: 15, textAlign: 'center', color: 'rgba(255,0,0,1)' }}>餘額不足</Text>
                      }
                    </View>
                  </View>
                </>
              )}
            </View>
          </View>
        </View>
      </Modal >
    </View >

  )
}

export default ShoppingScreen;