import { captureScreen } from 'react-native-view-shot';

const HandleCapture = async () => {
  try {
    const uri = await captureScreen({
      format: 'png',
      quality: 0.8,
    });
    console.log('ScreenShot Successed:', uri);
  } catch (error) {
    console.error('ScreenShot failed:', error);
  }
};

export default HandleCapture;
