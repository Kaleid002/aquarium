import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Image, Button, Dimensions } from 'react-native';
import axios from 'axios';

const ShoppingScreen = ({ navigation, route }) => {
  const { userid } = route.params;
  console.log(userid);
  useEffect(() => {
    axios.get('http://172.20.10.4:3000/store', {
      params: {
        ID: userid
      }
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Update Store Error:', error);
      });
  }, [])

  return (
    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start' }}>

      <TouchableOpacity style={{ width: '30%', height: '30%', borderWidth: 1 }}>

      </TouchableOpacity>

    </View>
  )
}

export default ShoppingScreen;