import { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, Modal, PanResponder } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { throttle } from 'lodash';
import { round_button_styles } from '../ScreenBackgroundStyles';
import handleButtonClick from './FishfeedClickFunction';
import axios from 'axios';

const FishFeed = ({ onPress, ID }) => {
  const [Feedcount, setFeedcount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    axios.get('http://172.20.10.4:3000/feed', {
      params: {
        ID: ID
      }
    })
      .then(response => {
        const { Feedcount } = response.data[0];
        setFeedcount(Feedcount);
      })
      .catch(error => {
        console.error('Update Params Success(feed):', error);
      });
  }, []);

  const handlePress = () => {
    handleButtonClick(ID, Feedcount, setFeedcount);
    if (onPress) {
      onPress();
    }
    setModalVisible(true);
  };

  const setServoAngle = (angle) => {
    axios.get("http://172.20.10.10:80/setServo", {
      params: {
        angle: angle,
      },
    })
      .then(response => {
        console.log('Response from server:', response.data);
      })
      .catch(error => {
        console.error('Error sending data to server:', error);
      })
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: throttle((gesturestate) => {
        setServoAngle(gesturestate.dx);
      }, 100),
      onPanResponderRelease: () => {
        setServoAngle(0);
      },
    }),
  ).current;


  return (
    <View>
      <TouchableOpacity style={[round_button_styles.buttonContainer, { top: 100, alignItems: 'center' }]} onPress={handlePress}>
        <LinearGradient
          colors={['rgba(255, 253, 253, 1)', 'rgba(82, 82, 82, 1)', 'rgba(0, 0, 0, 1)', 'rgba(64, 64, 64, 1)', 'rgba(255, 255, 255, 1)']}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={round_button_styles.buttontextframe}
        >
          <Text style={round_button_styles.buttonText}>飼料</Text>
        </LinearGradient>
        <View
          style={round_button_styles.buttonframe}
        >
          <Image
            source={require('../assets/img/FishFood_Icon.png')}
            style={round_button_styles.Picture_FeedFood_Icon}
          />
        </View>
      </TouchableOpacity>

      <Modal animationType='fade' transparent={true} visible={modalVisible} supportedOrientations={['landscape']} onRequestClose={() => { setModalVisible(!modalVisible) }}>
        <View {...panResponder.panHandlers} style={{ flex: 1, borderWidth: 5, backgroundColor: 'red', opacity: 0 }} />
      </Modal>
    </View>

  );
};

export default FishFeed;

const feed_modal_styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    opacity: 0.3,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
  },
});
