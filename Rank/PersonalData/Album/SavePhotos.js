import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';

const SavePhotoToLocalStorage = async ({ ID }, PhotoUri) => {
  try {
    const localPhotoUri = FileSystem.documentDirectory + 'savedPhoto.jpg';

    await FileSystem.copyAsync({
      from: PhotoUri,
      to: localPhotoUri,
    });

    axios.post('http://172.20.10.4:3000/AvatarURI', {
      ID: ID,
      localPhotoUri: localPhotoUri
    }).catch(error => {
      console.error('Update Photo to DataBase Error: ', error);
    })
  } catch (error) {
    console.error("Error saving file to User's local storage:", error);
  }
};

export default SavePhotoToLocalStorage;
