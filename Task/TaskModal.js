import { useState, useEffect, useContext } from 'react';
import { Modal, View, Text, Image, StyleSheet, TouchableOpacity, Animated, Easing, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { round_button_styles } from '../ScreenBackgroundStyles';
import { AppContext } from '../Context';
import axios from 'axios';

const TaskModal = ({ ID }) => {
  const { setgetexperience, setgetcoin } = useContext(AppContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [target, settarget] = useState();
  const [task, settask] = useState([
    { "Target": "5人達成目標", "number": 5, "status": 0 },
    { "Target": "10人達成目標", "number": 10, "status": 0 },
    { "Target": "15人達成目標", "number": 15, "status": 0 },
    { "Target": "20人達成目標", "number": 20, "status": 0 },
    { "Target": "25人以上達成目標", "number": 25, "status": 0 }
  ]);

  const [Percentage, setPercentage] = useState();

  const [reward, setreward] = useState([
    { "experience": 25, "coin": 50 },
    { "experience": 50, "coin": 50 },
    { "experience": 75, "coin": 100 },
    { "experience": 100, "coin": 100 },
    { "experience": 125, "coin": 125 },
  ]);

  useEffect(() => {
    axios.get('http://172.20.10.4:3000/usertarget', {
      params: {
        ID: ID
      }
    })
      .then((response) => {
        if (response.data.length > 0) {
          if (modalVisible == true) {
            settask(response.data);
            updatedTaskStatus(response.data[0].Number_of_reached);
          } else {
            settarget(response.data);
            setPercentage(response.data[0].Number_of_reached * 100 / (task[task.length - 1].number));
          }
        }
      })
      .catch(error => {
        console.error('Update Error:', error);
      });

  }, [modalVisible]);

  const updatedTaskStatus = (reachnumber) => {
    const updatedTasks = task.map((item, index) => {
      if (reachnumber >= item.number && target[0][`Reward${index + 1}`] == "FALSE") {
        return { ...item, status: 1 };
      } else if (reachnumber >= item.number && target[0][`Reward${index + 1}`] == "TRUE") {
        return { ...item, status: 2 };
      }
      return item;
    });
    settask(updatedTasks);
    console.log(updatedTasks);
  };

  const claimReward = (index) => {
    console.log(`Claimed reward: ${reward[index].experience} experience, ${reward[index].coin} coins`);

    axios.post('http://172.20.10.4:3000/usertarget/rewardstatus', {
      ID: ID,
      Serialnumber: `Reward${index + 1}`,
    })
      .then(() => {
        setgetexperience(reward[index].experience);
        setgetcoin(reward[index].coin);
      }).then(() => {
        const updatedTasks = [...task];
        updatedTasks[index].status = 2;
        settask(updatedTasks);
      })
      .catch((error) => {
        console.error('Upadate Params Error(POST user_target): ', error);
      });

  };


  return (
    <View>
      <TouchableOpacity style={[round_button_styles.buttonContainer]} onPress={() => setModalVisible(true)}>
        <LinearGradient
          colors={['rgba(255, 253, 253, 1)', 'rgba(82, 82, 82, 1)', 'rgba(0, 0, 0, 1)', 'rgba(64, 64, 64, 1)', 'rgba(255, 255, 255, 1)']}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={round_button_styles.buttontextframe}
        >
          <Text style={round_button_styles.buttonText}>任務</Text>
        </LinearGradient>
        <View
          style={round_button_styles.buttonframe}
        >
          <Image
            source={require('../assets/img/Task_Icon.png')}
            style={Modal_styles.buttonimage}
          />
        </View>
      </TouchableOpacity>

      <Modal animationType="fade" transparent={true} visible={modalVisible} supportedOrientations={['landscape']} onRequestClose={() => { setModalVisible(!modalVisible) }}>
        <View style={Modal_styles.modalContainer}>
          <LinearGradient
            colors={['rgba(140, 82, 255, 0.8)', 'rgba(92, 225, 230, 0.6)']}
            start={{ x: 0.3, y: 0.6 }}
            end={{ x: 0.8, y: 0.1 }}
            style={Modal_styles.modalbackground}
          >
            <LinearGradient
              colors={['rgba(93, 224, 190, 0.6)', 'rgba(93, 224, 190, 0.4)', 'rgba(100, 74, 173, 0.5)']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.1 }}
              style={Modal_styles.modalContent}
            >
              <View style={Modal_styles.TopModalFrame}>
                <View style={Modal_styles.rewardframe}>
                  {task.map((item, index) => (
                    <TouchableOpacity key={index} style={{ width: '20%', height: '80%', justifyContent: 'center', alignItems: 'center', opacity: item.status == 2 ? 0 : item.status == 1 ? 1 : 0.2 }} onPress={() => claimReward(index)} disabled={item.status !== 1}>
                      <Image source={require('../assets/img/reward_Icon.png')} style={Modal_styles.rewardIcon} />
                    </TouchableOpacity>
                  ))}
                </View>
                <View style={Modal_styles.rewardBar}>
                  <LinearGradient
                    colors={['rgba(140, 82, 255, 0.4)', 'rgba(18, 98, 123, 0.2)']}
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      borderRadius: 15,
                      width: `${Percentage}%`,
                    }}
                  />
                  {task.map((_, index) => (
                    index < task.length - 1 && (
                      <View key={index} style={[{ height: '100%', borderWidth: 1 }, { marginRight: `${100 / task.length}%` }]} />
                    )
                  ))}
                </View>
              </View>
              <View style={Modal_styles.separator} />
              <View style={Modal_styles.innerFrame}>
                <View style={{ width: '25%', height: '100%', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)', borderRadius: 3, shadowColor: '#000', shadowOffset: { width: 3, height: 0 }, shadowOpacity: 0.7, shadowRadius: 3 }}>
                  <LinearGradient
                    colors={['rgba(125, 255, 212, 1)', 'rgba(5, 255, 240, 1)', 'rgba(101, 213, 255, 1)', 'rgba(176, 136, 250, 1)', 'rgba(255, 112, 223, 1)', 'rgba(241, 240, 241, 1)']}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 0 }}
                    style={{
                      width: '100%',
                      height: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 2,
                      borderWidth: 3,
                      borderColor: 'rgba(0,0,0,0.2)',
                      opacity: 0.8,
                    }}
                  >
                    {target &&
                      <View style={{ width: '100%', height: '100%', justifyContent: 'space-around', alignItems: 'center', opacity: 0.7 }}>
                        <Text style={{ textAlign: 'center', fontSize: 18 }}>{target[0].SELECTED_Target}</Text>
                        <Text style={{ textAlign: 'center', fontSize: 14, opacity: 0.8 }}>完成人數:{target[0].Number_of_reached}</Text>
                      </View>
                    }
                  </LinearGradient>
                </View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={true} contentContainerStyle={Modal_styles.scorollviewContainer} style={{ width: '75%', height: '100%', borderRadius: 2 }}>
                  {target && task.map((item, index) => (
                    <View key={index} style={Modal_styles.taskborderContainer}>
                      <Text style={{ fontSize: 16, textAlign: 'center' }}>{item.Target}</Text>
                      {target[0].Number_of_reached < item.number ? (
                        <Text style={{ fontSize: 16, textAlign: 'center' }}>{target[0].Number_of_reached} / {item.number}</Text>
                      ) : (
                        <Text style={{ fontSize: 16, textAlign: 'center' }}>已達成</Text>
                      )}
                    </View>
                  ))}
                </ScrollView>
              </View>
              <TouchableOpacity style={Modal_styles.colsebutton} onPress={() => setModalVisible(!modalVisible)}>
                <Image source={require('../assets/img/Close_Icon.png')} style={Modal_styles.closeIcon} />
              </TouchableOpacity>
            </LinearGradient>
          </LinearGradient>
        </View>
      </Modal >
    </View >
  );
};

const Modal_styles = StyleSheet.create({
  buttonimage: {
    width: '100%',
    height: '100%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  modalbackground: {
    height: 375,
    width: 575,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 13,
    padding: 5,
  },
  modalContent: {
    width: '100%',
    height: '100%',
    paddingVertical: 20,
    paddingHorizontal: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    elevation: 5,
  },
  TopModalFrame: {
    height: '40%',
    width: '100%',
    padding: 5,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  rewardframe: {
    width: '100%',
    height: '75%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flexDirection: 'row'
  },
  rewardIcon: {
    width: '100%',
    height: '100%'
  },
  rewardBar: {
    height: '25%',
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    borderRadius: 15,
    justifyContent: 'flex-end'
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.3)',
    width: '100%',
    height: '1%',
    marginVertical: 5,
  },
  innerFrame: {
    height: '60%',
    width: '100%',
    flexDirection: 'row',
    marginBottom: 5,
    borderWidth: 2,
    borderColor: 'rgba(0, 74, 173, 0.25)',
    borderRadius: 3,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  scorollviewContainer: {
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  taskborderContainer: {
    height: '90%',
    width: '25%',
    margin: '2%',
    borderRadius: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 1
  },
  task: {
    fontSize: 16,
    color: 'black',
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
  }
});

export default TaskModal;
