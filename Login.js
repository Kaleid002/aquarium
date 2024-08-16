import { useState, useRef } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Modal, Image, TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axios from 'axios';

const Login = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(true);
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
      <Image source={getCurrentGIF()} style={loginstyle.SeabedGIF} />
      <View style={loginstyle.container}>
        <View style={loginstyle.content}>
          <View style={loginstyle.outerFrame}>
            <LinearGradient
              colors={['rgba(5, 5, 10, 0.1)', 'rgba(200, 200, 255, 0.15)', 'rgba(220, 220, 255, 0.2)', 'rgba(200, 200, 255, 0.15)', 'rgba(5, 5, 10, 0.1)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={loginstyle.upperStyle}
            >
              <Text style={loginstyle.usernameStyle}>{Username}</Text>
              <TouchableOpacity style={loginstyle.switchButton} onPress={() => setModalVisible(!modalVisible)}>
                <Text style={loginstyle.switchStyle}>切換</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>

          <TouchableOpacity style={loginstyle.loginButton} onPress={() => navigation.replace('Home', { userid: userid.current })}>
            <LinearGradient
              colors={['rgba(5, 5, 10, 0.1)', 'rgba(220, 220, 255, 0.2)', 'rgba(5, 5, 10, 0.1)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={loginstyle.bottomFrame}

            >
              <Text style={loginstyle.loginstyle}>點擊登入</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <Modal animationType="slide" transparent={true} visible={modalVisible} supportedOrientations={['landscape']} onRequestClose={() => { setModalVisible(!modalVisible) }}>
          <View style={loginstyle.modalContainer}>
            <View style={loginstyle.modalContent}>
              <View style={loginstyle.accountFrame}>
                <View style={loginstyle.accountImgFrame}>
                  <Image source={require('./assets/img/Account_Icon.png')} style={loginstyle.accountIcon} />
                </View>
                <TextInput
                  style={loginstyle.emailInputFrame}
                  placeholder="請輸入信箱"
                  placeholderTextColor={'rgba(200,200,200,1)'}
                  value={account}
                  onChangeText={setaccount}
                  maxLength={30}
                  clearButtonMode='while-editing' />
              </View>

              <View style={loginstyle.passwordFrame}>
                <View style={loginstyle.passwordImgFrame}>
                  <Image source={require('./assets/img/Password_Icon.png')} style={loginstyle.passwordIcon} />
                </View>
                <TextInput
                  style={loginstyle.passwordInputFrame}
                  placeholder="請輸入密碼"
                  placeholderTextColor={'rgba(200,200,200,1)'}
                  value={password}
                  onChangeText={setpassword}
                  maxLength={30}
                  clearButtonMode='while-editing'
                  secureTextEntry />
              </View>
              <TouchableOpacity style={loginstyle.confirmButton} onPress={() => UserLogin(account, password)}>
                <Text style={loginstyle.confirmStyle}>確認</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const loginstyle = StyleSheet.create({
  SeabedGIF: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  container: {
    width: '100%',
    height: '100%',
    paddingBottom: '2%',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  content: {
    width: '30%',
    height: '30%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  outerFrame: {
    width: '100%',
    height: '23%'
  },
  upperStyle: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  usernameStyle: {
    fontSize: 18,
    color: 'rgba(255,255,255,1)',
    textAlign: 'center'
  },
  switchButton: {
    position: 'absolute',
    height: '100%',
    right: 0,
    justifyContent: 'center'
  },
  switchStyle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.7)'
  },
  loginButton: {
    width: '70%',
    height: '25%',
    marginBottom: '20%',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: 'rgba(250,250,250,0.15)',
    borderBottomColor: 'rgba(250,250,250,0.15)',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomFrame: {
    width: '100%',
    height: '90%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginstyle: {
    fontSize: 15,
    color: 'rgba(200,200,200,0.7)',
    textAlign: 'center'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    width: '40%',
    height: '80%',
    backgroundColor: 'rgba(250,250,250,1)',
    borderWidth: 3,
    borderColor: 'rgba(240,240,240,1)',
    borderRadius: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  accountFrame: {
    width: '90%',
    height: '12%',
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,247,0.4)',
    borderWidth: 1,
    borderColor: 'rgba(220,220,220,1)',
    borderRadius: 20,
  },
  accountImgFrame: {
    width: '15%',
    height: '100%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  accountIcon: {
    width: '45%',
    height: '60%'
  },
  emailInputFrame: {
    width: '83%',
    height: '100%',
    marginLeft: 5,
    borderRadius: 20,
    fontSize: 15,
    textAlign: 'left',
  },
  passwordFrame: {
    width: '90%',
    height: '12%',
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,247,0.4)',
    borderWidth: 1,
    borderColor: 'rgba(220,220,220,1)',
    borderRadius: 20
  },
  passwordImgFrame: {
    width: '15%',
    height: '100%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  passwordIcon: {
    width: '45%',
    height: '60%'
  },
  passwordInputFrame: {
    width: '83%',
    height: '100%',
    marginLeft: 5,
    borderRadius: 20,
    fontSize: 15,
    textAlign: 'left',
  },
  confirmButton: {
    width: '30%',
    height: '15%',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center'
  },
  confirmStyle: {
    fontSize: 20,
    textAlign: 'center'
  },
});

export default Login;