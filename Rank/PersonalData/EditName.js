import { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Keyboard, Image } from 'react-native';
import axios from 'axios';

const EditName = ({ID}) => {
  const [editable, setEditable] = useState(false);
  const [text, setText] = useState('');
  const textInputRef = useRef(null);

  useEffect(() => {
    axios.get('http://172.20.10.4:3000/personaldata/Name', {
      params: {
        ID: ID
      }
    })
      .then(response => {
        setText(response.data[0].Name);
      })
      .catch(error => {
        console.error('Update Name Error:', error);
      });
  }, []);

  const saveTextToDatabase = async (text) => {
    axios.post('http://172.20.10.4:3000/personaldata/Name', {
      Name: text
    })
      .catch(error => {
        console.error('Upadate Params Error(POST Name): ', error);
      });
  };

  useEffect(() => {
    if (editable && textInputRef.current) {
      textInputRef.current.focus();
    }
  }, [editable]);

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      if (editable) {
        setEditable(false);
      }
    });

    return () => {
      keyboardDidHideListener.remove();
    };
  }, [editable]);

  return (
    <View style={EditName_styles.Frame}>
      <TextInput
        ref={textInputRef}
        style={EditName_styles.TextInput}
        value={text}
        placeholder={'請輸入名稱'}
        onChangeText={setText}
        editable={editable}
        onSubmitEditing={() => setEditable(false)}
        onEndEditing={() => saveTextToDatabase(text)}
      />
      <TouchableOpacity style={EditName_styles.ImageContainer} onPress={() => setEditable(!editable)}>
        <Image
          source={require('../../assets/img/Edit_Icon.png')}
          style={EditName_styles.EditIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const EditName_styles = StyleSheet.create({
  Frame: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    height: '12%',
    marginVertical: 5,
  },
  TextInput: {
    width: '40%',
    fontSize: 20,
    textAlign: 'center',
    color: 'rgba(0, 74, 173, 0.7)',
    shadowOpacity: 0.3,
  },
  ImageContainer: {
    width: '30%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  EditIcon: {
    width: '100%',
    height: '100%',
  },
});

export default EditName;
