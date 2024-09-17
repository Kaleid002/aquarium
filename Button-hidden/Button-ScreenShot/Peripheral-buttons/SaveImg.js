import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
const saveImage = async (ImageURI, setdisable) => {
  const ImageURL_Base64 = ImageURI.replace(/^data:image\/[a-z]+;base64,/, '');

  const ScreenshotIMG = FileSystem.documentDirectory + 'ScreenshotIMG.jpg';

  await FileSystem.writeAsStringAsync(ScreenshotIMG, ImageURL_Base64, {
    encoding: FileSystem.EncodingType.Base64,
  });

  await MediaLibrary.saveToLibraryAsync(ScreenshotIMG);

  setdisable(false);
};

export default saveImage;
