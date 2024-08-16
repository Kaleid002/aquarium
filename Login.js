import { useState, useRef } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Modal, Image, TextInput, Button } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axios from 'axios';

const Login = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [account, setaccount] = useState('');
  const [password, setpassword] = useState('');
  const [Username, setUsername] = useState('');
  const userid = useRef(null);

  const getCurrentGIF = () => {
    const hours = new Date().getHours();
    if (hours >= 6 && hours < 18) {
      return require('./assets/gif/Seabed(Morning).gif');
    } else {
      return require('./assets/gif/Seabed(Night).gif');
    }
  };

  const UserLogin = async (account, password) => {
    try {
      const response = await axios.post('http://172.20.10.4:3000/login', {
        account: account,
        password: password,
      });

      if (response.data[0].id) {
        userid.current = response.data[0].id;
        setUsername(response.data[0].username);
        setModalVisible(!modalVisible);
      } else {
        console.log('Login failed:', response.data.message);
      }
    } catch (error) {
      console.error('Error login:', error);
    }
  };

  return (
    <View>
      <Image source={getCurrentGIF()} style={{ position: 'absolute', width: '100%', height: '100%' }} />
      <View style={{ width: '100%', height: '100%', justifyContent: 'flex-end', alignItems: 'center', paddingBottom: '2%' }}>
        <View style={{ width: '30%', height: '30%', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ width: '100%', height: '23%' }}>
            <LinearGradient
              colors={['rgba(5, 5, 10, 0.1)', 'rgba(200, 200, 255, 0.15)', 'rgba(220, 220, 255, 0.2)', 'rgba(200, 200, 255, 0.15)', 'rgba(5, 5, 10, 0.1)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ width: '100%', height: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
            >
              <Text style={{ fontSize: 18, color: 'rgba(255,255,255,1)', textAlign: 'center' }}>{Username}</Text>
              <TouchableOpacity style={{ position: 'absolute', height: '100%', right: 0, justifyContent: 'center' }} onPress={() => setModalVisible(!modalVisible)}>
                <Text style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)' }}>切換</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>

          <TouchableOpacity style={{ width: '70%', height: '25%', marginBottom: '20%', justifyContent: 'center', alignItems: 'center', borderTopWidth: 1, borderBottomWidth: 1, borderRadius: 3, borderTopColor: 'rgba(250,250,250,0.15)', borderBottomColor: 'rgba(250,250,250,0.15)' }} onPress={() => navigation.replace('Home', { userid: userid.current })}>
            <LinearGradient
              colors={['rgba(5, 5, 10, 0.1)', 'rgba(220, 220, 255, 0.2)', 'rgba(5, 5, 10, 0.1)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ width: '100%', height: '90%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}

            >
              <Text style={{ fontSize: 15, color: 'rgba(200,200,200,0.7)', textAlign: 'center' }}>點擊登入</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <Modal animationType="slide" transparent={true} visible={modalVisible} supportedOrientations={['landscape']} onRequestClose={() => { setModalVisible(!modalVisible) }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ width: '40%', height: '80%', borderWidth: 3, justifyContent: 'space-around', alignItems: 'center', backgroundColor: 'rgba(250,250,250,1)', borderColor: 'rgba(240,240,240,1)', borderRadius: 5 }}>
              <View style={{ flexDirection: 'row', width: '90%', height: '12%', borderRadius: 20, backgroundColor: 'rgba(255,255,247,0.4)', borderWidth: 1, borderColor: 'rgba(220,220,220,1)' }}>
                <View style={{ width: '15%', height: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
                  <Image source={require('./assets/img/Account_Icon.png')} style={{ width: '45%', height: '60%' }} />
                </View>
                <TextInput
                  style={{ width: '83%', height: '100%', textAlign: 'left', fontSize: 15, borderRadius: 20, marginLeft: 5 }}
                  placeholder="請輸入信箱"
                  placeholderTextColor={'rgba(200,200,200,1)'}
                  value={account}
                  onChangeText={setaccount}
                  maxLength={30}
                  clearButtonMode='while-editing' />
              </View>

              <View style={{ flexDirection: 'row', width: '90%', height: '12%', borderRadius: 20, backgroundColor: 'rgba(255,255,247,0.4)', borderWidth: 1, borderColor: 'rgba(220,220,220,1)' }}>
                <View style={{ width: '15%', height: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
                  <Image source={require('./assets/img/Password_Icon.png')} style={{ width: '45%', height: '60%' }} />
                </View>
                <TextInput
                  style={{ width: '83%', height: '100%', textAlign: 'left', fontSize: 15, borderRadius: 20, marginLeft: 5 }}
                  placeholder="請輸入密碼"
                  placeholderTextColor={'rgba(200,200,200,1)'}
                  value={password}
                  onChangeText={setpassword}
                  maxLength={30}
                  clearButtonMode='while-editing'
                  secureTextEntry />
              </View>
              <TouchableOpacity style={{ width: '30%', height: '15%', borderRadius: 5, justifyContent: 'center', borderWidth: 1 }} onPress={() => UserLogin(account, password)}>
                <Text style={{ textAlign: 'center', fontSize: 20 }}>確認</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};
export default Login;