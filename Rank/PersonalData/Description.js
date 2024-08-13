import { useState, useEffect } from "react";
import { View, StyleSheet, TextInput, KeyboardAvoidingView } from "react-native";
import axios from "axios";

const Description = ({ ID }) => {
  const [text, setText] = useState('');

  useEffect(() => {
    axios.get('http://172.20.10.4:3000/personaldata/Introduction', {
      params: {
        ID: ID
      }
    })
      .then(response => {
        const { Introduction } = response.data[0];
        setText(Introduction);
      })
      .catch(error => {
        console.error('Update Error:', error);
      });
  }, []);

  const saveTextToDatabase = async (text) => {
    axios.post('http://172.20.10.4:3000/personaldata/Introduction', {
      ID:ID,
      Introduction: text
    })
      .then(response => {
        console.log('Backend response: ', response.data);
      })
      .catch(error => {
        console.error('Update Params Error(POST Introduction): ', error);
      });
  };
  return (
    <View style={Description_styles.Frame}>
      <KeyboardAvoidingView behavior="position">
        <TextInput
          style={Description_styles.TextInput}
          placeholder={' 請輸入你想說的話'}
          value={text}
          onChangeText={setText}
          maxLength={40}
          multiline={true}
          onEndEditing={() => saveTextToDatabase(text)}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

const Description_styles = StyleSheet.create({
  Frame: {
    width: '90%',
    height: '35%',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'rgba(140, 82, 255, 0.4)',
  },
  TextInput: {
    fontSize: 16,
    alignItems: 'flex-start'
  },
});

export default Description;
