import { useEffect, useState } from 'react';
import { Text, View, Image, Modal, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import EditName from './EditName';
import Description from './Description';
import TakePhotoFromAlbum from './Album/GetPhotos';
import axios from 'axios';

const InformationInterFace = ({ visible, onClose, ID }) => {
  const [level, setlevel] = useState('1');
  const [ImageURI, setImageURI] = useState(null);
  const [days, setdays] = useState(0);
  const [name, setname] = useState([]);

  useEffect(() => {
    axios.get('http://172.20.10.4:3000/personaldata/days', {
      params: {
        ID: ID
      }
    })
      .then(response => {
        setdays(response.data[0].Days);
      })

    if (visible) {
      axios.get('http://172.20.10.4:3000/experiencebar', {
        params: {
          ID: ID
        }
      })
        .then(response => {
          const { level } = response.data[0];
          setlevel(level);
        })
        .catch(error => {
          console.error('Update Params Error:', error);
        });

      axios.get('http://172.20.10.4:3000/AvatarURI', {
        params: {
          ID: ID
        }
      })
        .then(response => {
          const { AvatarURI } = response.data[0];
          setImageURI(AvatarURI);
        })
        .catch(error => {
          console.error('Upload AvatarURI Error:', error);
        });

      axios.get('http://172.20.10.4:3000/AchievementRecord', {
        params: {
          ID: ID
        }
      }).then(response => {
        setname(response.data);
      });
    }
  }, [visible]);
  return (
    <Modal animationType="fade" transparent={true} visible={visible} supportedOrientations={['landscape']} onRequestClose={() => visible}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={Pofile_styles.modalContainer}>
          <LinearGradient
            colors={['rgba(0, 74, 173, 0.6)', 'rgba(203, 108, 230, 0.9)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={Pofile_styles.modalbackground}
          >
            <TouchableOpacity style={Pofile_styles.colsebutton} onPress={onClose}>
              <Image source={require('../../assets/img/Close_Icon.png')} style={Pofile_styles.closeIcon} />
            </TouchableOpacity>

            <View style={Pofile_styles.modalContent}>
              <View style={Pofile_styles.LeftFrame}>
                <View style={Pofile_styles.AvatarBorder}>
                  <TouchableOpacity style={Pofile_styles.OpenAlbumButton} onPress={() => TakePhotoFromAlbum({ ID }, setImageURI)}>
                    <Image source={require('../../assets/img/OpenAlbum_Icon.png')} style={Pofile_styles.OpenAlbumIcon} />
                  </TouchableOpacity>
                  <Image source={require('../../assets/img/AvatarFrame_Icon.png')} style={Pofile_styles.AvatarFrameIcon} />
                  {ImageURI && <Image source={{ uri: ImageURI }} style={Pofile_styles.AvatarImage} />}
                </View>

                <EditName ID={ID} />

                <Description ID={ID} />
              </View>
              <View style={Pofile_styles.RightFrame}>
                <Text style={{ fontSize: 30,color:'rgba(140, 82, 255,1)' }}>LV: {level}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: '10%' }}>
                  <Text style={{ fontSize: 20,color:'rgba(140, 82, 255,1)' }}>完成成就: {name.length} 個</Text>
                  <Text style={{ fontSize: 20,color:'rgba(140, 82, 255,1)' }}>累計登入: {days} 日</Text>
                </View>
                <Text style={{ fontSize: 20, marginVertical: '5%',color:'rgba(140, 82, 255,1)' }}>稱號:</Text>
                <View style={{ width: '100%', height: '45%', borderRadius: 5, backgroundColor: 'rgba(255,255,255,0.2)', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                  {name.map((item, index) => (
                    <Text key={index} style={{ height: '20%', width: 'auto', fontSize: 20, textAlign: 'center', color: 'rgba(250,250,250,1)', textShadowColor: 'rgba(255,255,255,1)', textAlignVertical: 'center', borderWidth: 1, borderRadius: 3, borderColor: 'rgba(255,255,255,0.3)', margin: '2%', shadowColor: 'rgba(0,200,255,0.3)', shadowOpacity: 1, backgroundColor: 'rgba(255,255,255,0.3)' }}>{item.Name}</Text>
                  ))}

                </View>
              </View>
            </View>
          </LinearGradient>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const Pofile_styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalbackground: {
    height: 350,
    width: 500,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    padding: 5,
    borderWidth: 1
  },
  modalContent: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    padding: 5,
    margin: 5,
    backgroundColor: 'rgba(203, 200, 255, 0.4)',
    borderColor: 'rgba(0, 140, 150, 0.2)',
    borderWidth: 3,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
    elevation: 5,
  },
  LeftFrame: {
    width: '40%',
    height: '100%',
    padding: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  RightFrame: {
    width: '60%',
    height: '100%',
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 5,
  },
  AvatarBorder: {
    height: '50%',
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  colsebutton: {
    position: 'absolute',
    width: 25,
    height: 25,
    top: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 30,
    zIndex: 1
  },
  closeIcon: {
    width: '100%',
    height: '100%'
  },
  OpenAlbumButton: {
    position: 'absolute',
    width: '20%',
    height: '20%',
    borderRadius: 75,
    top: -5,
    right: -5,
    opacity: 0.7,
    zIndex: 3
  },
  OpenAlbumIcon: {
    width: '100%',
    height: '80%'
  },
  AvatarFrameIcon: {
    position: 'absolute',
    width: '120%',
    height: '120%',
    zIndex: 2
  },
  AvatarImage: {
    width: '93%',
    height: '95%',
    borderRadius: 100,
    zIndex: 1
  },
});

export default InformationInterFace;
