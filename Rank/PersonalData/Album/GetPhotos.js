import * as ImagePicker from 'expo-image-picker';
import SavePhotoToLocalStorage from './SavePhotos';

const TakePhotoFromAlbum = async ({ ID }, setImageURI) => {
  let AvatarImage = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [0.5, 0.5],
    quality: 0.5,
  });

  if (!AvatarImage.canceled) {
    SavePhotoToLocalStorage({ ID }, AvatarImage.assets[0].uri);
    setImageURI(AvatarImage.assets[0].uri);
  }
};

export default TakePhotoFromAlbum;