import * as ImagePicker from 'expo-image-picker';
const TakePhotoFromAlbum = async (ImageURI, setImageURI) => {
  let AvatarImage = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [0.5, 0.5],
    quality: 0.5,
  });
  if (!AvatarImage.canceled) {
    setImageURI(AvatarImage.assets[0].uri);
    console.log('AvatarImageURI:', ImageURI);
  }

};

export default TakePhotoFromAlbum;