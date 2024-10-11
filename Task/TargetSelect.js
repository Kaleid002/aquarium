import { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet, Modal, Animated, Easing, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";

const TargetSelect = ({ ID }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [target, settarget] = useState([]);
  const [clickedIndex, setClickedIndex] = useState(null);
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const positionAnim = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  useEffect(() => {
    axios.get('http://172.20.10.4:3000/usertarget', {
      params: {
        ID: ID
      }
    })
      .then((response) => {
        if (response.data.length > 0) {
          console.log(response.data);
        } else {
          setModalVisible(true);
          SelectTargetfunction();
        }
      })
      .catch(error => {
        console.error('Update Error:', error);
      });
  }, []);

  const SelectTargetfunction = () => {
    axios.get('http://172.20.10.4:3000/targets', {
      params: {
        ID: ID
      }
    })
      .then((response) => {
        settarget(response.data.map(item => item));
      })
      .catch(error => {
        console.error('Update Error:', error);
      });
  };

  const PostUserTarget = (index) => {
    axios.post('http://172.20.10.4:3000/usertarget', {
      ID: ID,
      Select_Target: target[index].Target
    }).then(() => {
      setModalVisible(false);
    })
      .catch((error) => {
        console.error('Upadate Params Error(POST user_target): ', error);
      });
  };

  const startFlashing = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacityAnim, {
          toValue: 0.6,
          duration: 30,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 30,
          useNativeDriver: true,
        }),
      ]),
      { iterations: 3 }
    ).start();
  };

  const transitionAnim = (index) => {
    setClickedIndex(index);

    Animated.timing(scaleAnim, {
      toValue: 0.2,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(positionAnim, {
        toValue: { x: -1500, y: 0 },
        duration: 500,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start(() => {
        PostUserTarget(index);
      });
    });
  };



  return (
    <View>
      <Modal animationType="fade" transparent={true} visible={modalVisible} supportedOrientations={['landscape']} onRequestClose={() => modalVisible} onShow={() => startFlashing()}>
        <View style={select_styles.modalcontent}>
          <Animated.View style={[select_styles.optionOutFrame, { opacity: opacityAnim }]}>
            {target.map((item, index) => (
              clickedIndex === null || clickedIndex === index ? (
                < TouchableOpacity style={[select_styles.buttonOutFrame, { transform: [{ scale: clickedIndex === index ? scaleAnim : 1 }, { translateX: clickedIndex === index ? positionAnim.x : 0 }, { translateY: clickedIndex === index ? positionAnim.y : 0 }] }]} key={index} onPress={() => transitionAnim(index)}>
                  <LinearGradient
                    colors={['rgba(125, 255, 212, 1)', 'rgba(5, 255, 240, 1)', 'rgba(101, 213, 255, 1)', 'rgba(176, 136, 250, 1)', 'rgba(255, 112, 223, 1)', 'rgba(241, 240, 241, 1)']}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 0 }}
                    style={select_styles.buttonInnerFrame}
                  >

                    <View style={select_styles.buttonBorder}>
                      <Text style={select_styles.buttonText}>{item.Target}</Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              ) : (null)
            ))}
          </Animated.View>
        </View>
      </Modal >
    </View >
  );
};

const select_styles = StyleSheet.create({
  modalcontent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)'
  },
  optionOutFrame: {
    flexDirection: 'row',
    width: '90%',
    height: '70%',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  buttonOutFrame: {
    width: '25%',
    height: '80%',
    borderColor: 'rgba(255,255,255,0.7)',
    borderWidth: 1
  },
  buttonInnerFrame: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonBorder: {
    width: '92%',
    height: '95%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderColor: 'rgba(255,255,255,1)',
    borderWidth: 1,
    borderRadius: 3,
    justifyContent: 'center',
    alignContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'rgba(255,255,255,1)',
    justifyContent: 'center',
    textAlign: 'center'
  }
});

export default TargetSelect;