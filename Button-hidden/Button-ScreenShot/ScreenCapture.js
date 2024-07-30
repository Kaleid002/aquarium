import { useState } from 'react';
import { View, TouchableOpacity, Image, Alert, Modal } from 'react-native';
import { captureScreen } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import { round_button_styles } from '../../ScreenBackgroundStyles';
const HandleCapture = () => {
  const [ImageURI, setImageURI] = useState(null);
  const [visible, setvisible] = useState(false);

  const captureImageuri = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    { console.log(status) }
    if (status !== 'granted') {
      Alert.alert('權限被拒', '請至設定允許取用照片權限來將照片儲存到相冊');
      return;
    };
    captureScreen({
      format: 'png',
      quality: 0.8,
    }).then(uri => {
      setImageURI(uri);
      console.log('ScreenShot Successed:', uri);
      setvisible(!visible);
    }).catch(error => {
      console.error('ScreenShot failed:', error)
    });
  };

  const saveImage = async () => {

  };
  return (
    <View>
      <TouchableOpacity style={round_button_styles.buttonContainer} onPress={captureImageuri} >
        <View
          style={[round_button_styles.buttonframe, { opacity: 0.8 }]}
        >
          <Image
            source={require('../../assets/img/PictureShot_Icon.png')}
            style={round_button_styles.Picture_FeedFood_Icon}
          />
        </View>
      </TouchableOpacity>
      <Modal animationType='none' transparent={true} visible={visible} supportedOrientations={['landscape']} onRequestClose={() => { setvisible(!visible) }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: 200, height: 200, borderWidth: 1 }}>
            <Image source={{ uri: ImageURI }} style={{ width: '100%', height: '100%' }} />
          </View>
        </View>

      </Modal>

    </View>
  );
};

export default HandleCapture;
