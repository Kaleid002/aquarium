import { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated, Image, Alert, Modal, Easing } from 'react-native';
import { captureScreen } from 'react-native-view-shot';
import { Audio } from 'expo-av';
import * as MediaLibrary from 'expo-media-library';
import { round_button_styles } from '../../ScreenBackgroundStyles';
import { opacityAnimation } from '../OpacityAnime';
import saveImage from './Peripheral-buttons/SaveImg';
import Quit from './Peripheral-buttons/Quit';

const HandleCapture = () => {
  const { opacityValue, buttonOpacityAnime } = opacityAnimation();

  const [ImageURI, setImageURI] = useState(null);
  const [modalvisible, setmodalvisible] = useState(false);
  const [disable, setdisable] = useState(false);
  const captureFrameOpacityValue = new Animated.Value(1);
  const buttonMoveValue = new Animated.Value(200);

  const OpenCaptureFrame = () => {
    buttonOpacityAnime();
    setmodalvisible(true);
  };

  const captureImageuri = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('權限被拒', '請至設定允許取用照片權限來將照片儲存到相冊');
      return;
    };

    PlaySound();

    Animated.timing(captureFrameOpacityValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start(() => {
      captureScreen({
        format: 'png',
        quality: 0.8,
      }).then(uri => {
        setImageURI(uri);
        setdisable(true);
      }).catch(error => {
        console.error('ScreenShot failed:', error)
      });
    });
  };

  useEffect(() => {
    if (disable == true) {
      Animated.timing(buttonMoveValue, {
        toValue: 0,
        duration: 1500,
        easing: Easing.elastic(0.7),
        useNativeDriver: false,
      }).start();
    };
  }, [disable]);

  const PlaySound = async () => {
    const sound = new Audio.Sound();
    try {
      await sound.loadAsync(require('../../assets/AudioLibrary/camera-13695.mp3'));
      await sound.playAsync();
    } catch (error) {
      console.error('PlaySound Error:', error);
    };
  };

  const scopeValue = captureFrameOpacityValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View>
      <Animated.View style={{ opacity: modalvisible ? opacityValue : 1 }}>
        <TouchableOpacity style={round_button_styles.buttonContainer} onPress={OpenCaptureFrame} >
          <View
            style={[round_button_styles.buttonframe, { opacity: 0.8 }]}
          >
            <Image
              source={require('../../assets/img/PictureShot_Icon.png')}
              style={round_button_styles.Picture_FeedFood_Icon}
            />
          </View>
        </TouchableOpacity>
      </Animated.View>

      <Modal animationType='none' transparent={true} visible={modalvisible} supportedOrientations={['landscape']} onRequestClose={() => { setmodalvisible(!modalvisible) }}>
        <View style={Capture_styles.modalcontainer}>
          {!disable ? (
            <Animated.View style={[Capture_styles.modalcontent, { opacity: captureFrameOpacityValue }]}>
              <View style={Capture_styles.frame}>
                <Image source={require('../../assets/img/CameraFrame.png')} style={Capture_styles.cameraFrameIcon} />
              </View>

              <View style={Capture_styles.shutterStyles}>
                <TouchableOpacity style={Capture_styles.CloseButton} onPress={() => setmodalvisible(!modalvisible)}>
                  <Image source={require('../../assets/img/Close_Icon.png')} style={Capture_styles.CloseIcon} />
                </TouchableOpacity>

                <TouchableOpacity style={Capture_styles.shutterButtonOutFrame} onPress={captureImageuri}>
                  <View style={Capture_styles.shutterButtonInnerFrame} />
                </TouchableOpacity>
              </View>
            </Animated.View>
          ) : (
            <View style={Capture_styles.pictureContainer}>
              <Animated.View style={[Capture_styles.pictureContent, { transform: [{ scale: scopeValue }] }]}>
                <Image source={{ uri: ImageURI }} style={Capture_styles.ImgStyles} />
              </Animated.View>

              <Animated.View style={[Capture_styles.pictureButton, { transform: [{ translateX: buttonMoveValue }] }]}>
                <TouchableOpacity style={Capture_styles.pictureButtonContainer} onPress={() => saveImage(ImageURI, setdisable)} >
                  <Image source={require('../../assets/img/Save_Icon.png')} style={Capture_styles.saveIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={Capture_styles.pictureButtonContainer} onPress={() => setdisable(false)}>
                  <Image source={require('../../assets/img/remake_Icon.png')} style={Capture_styles.remakeIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={Capture_styles.pictureButtonContainer} onPress={() => Quit(disable, setdisable, setmodalvisible)}>
                  <Image source={require('../../assets/img/quit_Icon.png')} style={Capture_styles.quitIcon} />
                </TouchableOpacity>
              </Animated.View>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

const Capture_styles = StyleSheet.create({
  modalcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalcontent: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderWidth: 5
  },
  frame: {
    width: '80%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cameraFrameIcon: {
    width: '100%',
    height: '100%'
  },
  shutterStyles: {
    width: '10%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  shutterButtonOutFrame: {
    borderWidth: 4,
    borderRadius: 30,
    width: 60,
    height: 60,
    borderColor: 'rgba(255,255,255,1)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  shutterButtonInnerFrame: {
    width: '95%',
    height: '95%',
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,1)'
  },
  pictureContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row'
  },
  pictureContent: {
    width: '70%',
    height: '70%',
    borderWidth: 5,
    borderColor: 'rgba(255,255,255,1)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  ImgStyles: {
    width: '100%',
    height: '100%'
  },
  pictureButton: {
    width: '15%',
    height: '70%',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  pictureButtonContainer: {
    width: '40%',
    height: '15%',
    margin: 5,
    backgroundColor: 'rgba(255,255,240,1)',
    borderWidth: 1,
    borderRadius: 30,
    borderColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  saveIcon: {
    width: '180%',
    height: '180%',
  },
  remakeIcon: {
    width: '170%',
    height: '170%',
  },
  quitIcon: {
    width: '170%',
    height: '170%',
  },
  CloseButton: {
    position: 'absolute',
    width: 30,
    height: 30,
    top: 0,
    right: 0,
  },
  CloseIcon: {
    width: '100%',
    height: '100%'
  },
});

export default HandleCapture;
