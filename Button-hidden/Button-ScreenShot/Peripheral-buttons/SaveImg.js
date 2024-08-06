import * as MediaLibrary from 'expo-media-library';

const saveImage = async (ImageURI,setdisable) => {
  await MediaLibrary.saveToLibraryAsync(ImageURI);
  setdisable(false);
};

export default saveImage;