import React, { useState } from 'react';
import { View, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const TestAPI = () => {
  const [image, setImage] = useState(null);
  const [ImageURI, setImageURI] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });
    if (!result.canceled) {
      setImage(result.assets[0]);
      setImageURI(result.assets[0].uri);
      console.log('image:', image);

      const formdata = new FormData();
      formdata.append('image', {
        uri: image.uri,
        type: image.mimeType,
        name: image.fileName
      });

      try {
        const res = await axios.post('http://172.20.10.4:3000/UploadImage', formdata,{
          headers: {
            'Content-Type': 'multipart/form-data;',
          },
        });
        console.log('response data:', res.data);
      } catch (error) {
        console.error('Error uploading image URL:', error.message);
      }
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: ImageURI }} style={{ width: 200, height: 200 }} />}
    </View>
  );
}

export default TestAPI;
