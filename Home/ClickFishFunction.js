import { View, Text, StyleSheet, Modal, TouchableOpacity, Image } from "react-native";
import Animated from "react-native-reanimated";

const SpeciesIntroductionFrame = ({ visible, setvisible, fishData }) => {
  return (
    <View>
      <Modal animationType="fade" transparent={true} visible={visible} supportedOrientations={['landscape']}>
        <View style={{ justifyContent: 'flex-end', alignItems: 'center', width: '85%', height: '100%', flexDirection: 'row' }}>
          <View style={{ width: '60%', height: '50%', borderWidth: 1, borderColor: 'rgba(255,255,255,1)', borderRadius: 10,backgroundColor:'rgba(255,255,255,1)'}}>
            <Animated.View style={{ position: 'absolute', width: '50%', height: '100%', borderWidth: 7, borderColor: 'rgba(255,255,255,1)', backgroundColor: 'rgba(240,240,240,1)', transform: [{ rotate: '15deg' }], left: -90, bottom: 0, }} >
              <Animated.View style={{ position: 'absolute', width: '110%', height: '110%', borderWidth: 7, borderColor: 'rgba(255,255,255,1)', backgroundColor: 'rgba(245,245,245,1)', transform: [{ rotate: '-30deg' }], left: -60, bottom: -30 }}>
                <Image source={{ uri: fishData.image }} style={{ width: '100%', height: '100%' }} />
              </Animated.View>
            </Animated.View>
            {fishData &&
              <View style={{ height: '100%', width: '100%', borderRadius: 10, alignItems: 'flex-end'}}>
                <View style={{ height: '100%', width: '68%', justifyContent: 'space-around', alignItems: 'flex-start' }}>
                  <Text style={{ fontSize: 28 }}>{fishData.data[0].Chinese_name}</Text>
                  <Text style={{ fontSize: 18 }}>學名: {fishData.data[0].Scientific_name}</Text>
                  <Text style={{ fontSize: 18 }}>原產地: {fishData.data[0].Origin}</Text>
                  <Text style={{ fontSize: 18 }}>成魚體長: {fishData.data[0].Length}</Text>
                  <Text style={{ fontSize: 18 }}>性格: {fishData.data[0].Temperament}</Text>
                  <Text style={{ fontSize: 18 }}>適宜溫度: {fishData.data[0].Temperature}</Text>
                </View>
              </View>}

            <TouchableOpacity style={{ position: 'absolute', width: 25, height: 25, top: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 30 }} onPress={() => setvisible(!visible)}>
              <Image source={require('./../assets/img/Close_Icon.png')} style={{ width: '100%', height: '100%' }} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal >
    </View >
  )
};

export default SpeciesIntroductionFrame;