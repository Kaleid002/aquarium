import { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Modal, Image, TextInput } from "react-native";
import axios from 'axios';

const Login = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [account, setaccount] = useState('');
  const [password, setpassword] = useState('');

  const handleLogin = async (account, password) => {
    try {
      const response = await axios.post('http://172.20.10.4:3000/login', {
        account: account,
        password: password,
      });

      if (response.data[0].id) {
        const userid = response.data[0].id;
        console.log('User ID:', userid);
        setModalVisible(!modalVisible);
        navigation.replace('Home', {userid} );
      } else {
        console.log('Login failed:', response.data.message);
      }
    } catch (error) {
      console.error('Error login:', error);
    }
  };

  return (
    <View>
      <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', borderWidth: 1 }}>
        <Modal animationType="slide" transparent={true} visible={modalVisible} supportedOrientations={['landscape']} onRequestClose={() => { setModalVisible(!modalVisible) }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ width: '40%', height: '80%', borderWidth: 3, justifyContent: 'space-around', alignItems: 'center', backgroundColor: 'rgba(250,250,250,1)', borderColor: 'rgba(240,240,240,1)',borderRadius:5 }}>
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
              <TouchableOpacity style={{ width: '30%', height: '15%', borderRadius: 5, justifyContent: 'center', borderWidth: 1 }} onPress={() => handleLogin(account, password)}>
                <Text style={{ textAlign: 'center', fontSize: 20 }}>登入</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};
export default Login;