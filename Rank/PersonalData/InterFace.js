import { useEffect, useState } from 'react';
import { Text, View, Modal, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import EditName from './EditName';
import Description from './Description';
import axios from 'axios';

const InformationInterFace = ({ visible, onClose }) => {
  const [level, setlevel] = useState('1');

  //GET level
  useEffect(() => {
    if (visible) {
      axios.get('http://172.20.10.4:3000/experiencebar')
        .then(response => {
          const { level } = response.data[0];
          setlevel(level);
        })
        .catch(error => {
          console.error('获取参数时出错:', error);
        });
    }
  }, [visible]);
  return (
    <Modal animationType="fade" transparent={true} visible={visible} supportedOrientations={['landscape']} onRequestClose={() => visible}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={Pofile_styles.modalContainer}>
          <LinearGradient
            colors={['rgba(0, 74, 173, 0.6)', 'rgba(203, 108, 230, 0.9)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={Pofile_styles.modalbackground}
          >
            <View style={Pofile_styles.modalContent}>
              <View style={Pofile_styles.LeftFrame}>
                <View style={Pofile_styles.AvatarBorder}>
                  <Text style={{ fontSize: 16 }}>頭像框</Text>
                </View>

                <EditName />

                <Description />
              </View>
              <View style={Pofile_styles.RightFrame}>
                <Text style={{ fontSize: 20 }}>等級: {level}</Text>
                <View style={{flexDirection:'row',borderWidth:1}}>
                  <Text style={{ fontSize: 20, marginVertical: 5 }}>成就:</Text>
                  <Text style={{ fontSize: 20, marginVertical: 5, }}>累計登入:</Text>
                </View>
                <Text style={{ fontSize: 25, marginVertical: 5 }}>魚缸生物</Text>
              </View>
            </View>
          </LinearGradient>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const Pofile_styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  modalbackground: {
    height: 350,
    width: 500,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    padding: 5,
  },
  modalContent: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    padding: 5,
    margin: 5,
    backgroundColor: 'rgba(203, 200, 255, 0.4)',
    borderColor: 'rgba(0, 140, 150, 0.2)',
    borderWidth: 3,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
    elevation: 5,
  },
  LeftFrame: {
    width: '40%',
    height: '100%',
    padding: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  RightFrame: {
    width: '60%',
    height: '100%',
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 5,
  },
  AvatarBorder: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: '50%',
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderRadius: '100%',
    borderColor: 'rgba(0, 0, 0, 0.3)',
  },
});

export default InformationInterFace;
