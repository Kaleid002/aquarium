import { useState, useEffect } from 'react';
import { Modal, View, Text, Image, StyleSheet, TouchableOpacity, Animated, Easing, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { round_button_styles } from '../ScreenBackgroundStyles';
import axios from 'axios';

const TaskModal = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const [tasks, setTasks] = useState([]);

  const [animations, setAnimations] = useState([]);

  useEffect(() => {
    if (modalVisible) {
      axios.get('http://172.20.10.4:3000/tasks')
        .then(response => {
          setTasks(response.data);
          setAnimations(response.data.map(() => new Animated.Value(1)));
        })
        .catch(error => {
          console.error('Error fetching tasks:', error);
        });
    }
  }, [modalVisible]);

  const setRewardFunction = (index) => {
    console.log(tasks[index].TaskID);
    axios.post('http://172.20.10.4:3000/taskID', {
      TaskID: tasks[index].TaskID
    })
      .then(() => {
        StartAnimation(index);
      })
      .catch(error => {
        console.error('update parameter(received) Error: ', error);
      });
  }
  const StartAnimation = (index) => {
    Animated.timing(animations[index], {
      toValue: 0,
      duration: 800,
      useNativeDriver: false,
      easing: Easing.linear
    }).start(() => {
      axios.get('http://172.20.10.4:3000/tasks')
        .then(response => {
          setTasks(response.data);
        })
    })
  };


  const incomplete = tasks.filter(task => task.Complete === 0);
  const complete = tasks.filter(task => task.Complete === 1);
  return (
    <View>
      <TouchableOpacity style={[round_button_styles.buttonContainer, { top: 40 }]} onPress={() => setModalVisible(true)}>
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
                  {Array.from({ length: 4 }).map((_, index) => (
                    <View key={index}>
                      {index < complete.length ? (
                        tasks[index].received ? (
                          <View>
                            <Image
                              source={require('../assets/img/reward_Icon.png')}
                              style={{ height: 65, width: 50, opacity: 0 }}
                            />
                          </View>
                        ) : (
                          <TouchableOpacity onPress={() => setRewardFunction(index)}>
                            <Animated.View style={{ opacity: animations[index] }}>
                              <Image
                                source={require('../assets/img/reward_Icon.png')}
                                style={{ height: 65, width: 50 }}
                              />
                            </Animated.View>
                          </TouchableOpacity>
                        )
                      ) : (
                        <View>
                          <Image
                            source={require('../assets/img/reward_Icon.png')}
                            style={{ height: 65, width: 50, opacity: 0.5 }}
                          />
                        </View>
                      )}
                    </View>
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
                      width: `${Math.min((complete.length / 4) * 104, 104)}%`,
                    }}
                  />
                  {Array.from({ length: 3 }).map((_, index) => (
                    <View
                      key={index}
                      style={[
                        Modal_styles.scalecontainer,
                        index !== 0 && { marginLeft: '26%' }
                      ]}
                    />
                  ))}
                </View>
              </View>
              <View style={Modal_styles.separator} />
              <View style={Modal_styles.innerFrame}>
                <ScrollView horizontal='true'
                  contentContainerStyle={Modal_styles.scorollviewContainer}>
                  {incomplete.map(task => (
                    <LinearGradient
                      key={task.TaskID}
                      colors={['rgba(140, 82, 255, 0.6)', 'rgba(18, 98, 123, 0.4)']}
                      start={{ x: 0, y: 0.2 }}
                      end={{ x: 1, y: 0.7 }}
                      style={Modal_styles.taskborderContainer}
                    >
                      <Animated.View style={Modal_styles.taskContainer}>
                        <Text style={Modal_styles.task}>{task.Task_name}</Text>
                        <Text>未完成</Text>
                      </Animated.View>
                    </LinearGradient>
                  ))}
                  {complete.map(task => (
                    <LinearGradient
                      key={task.TaskID}
                      colors={['rgba(140, 82, 255, 0.6)', 'rgba(18, 98, 123, 0.4)']}
                      start={{ x: 0, y: 0.2 }}
                      end={{ x: 1, y: 0.7 }}
                      style={Modal_styles.taskborderContainer}
                    >
                      <Animated.View style={Modal_styles.taskContainer}>
                        <Text style={Modal_styles.task}>{task.Task_name}</Text>
                        <Text>完成</Text>
                      </Animated.View>
                    </LinearGradient>
                  ))}
                </ScrollView>
              </View>
              <TouchableOpacity style={{ position: 'absolute', top: 1, right: 25 }} onPress={() => setModalVisible(false)}>
                <LinearGradient
                  colors={['rgba(255, 0, 0, 0)', 'rgba(255, 0, 0, 0.8)', 'rgba(255, 0, 0, 0.7)', 'rgba(255, 0, 0, 0.4)', 'rgba(255, 0, 0, 1)', 'rgba(255, 0, 0, 0.1)']}
                  start={{ x: 0, y: 0.1 }}
                  end={{ x: 1, y: 0.9 }}
                  style={Modal_styles.colseButton}
                >
                  <Text style={Modal_styles.closeButtonText}>X</Text>
                </LinearGradient>
              </TouchableOpacity>
            </LinearGradient>
          </LinearGradient>
        </View>
      </Modal >
    </View >
  );
};

const Modal_styles = StyleSheet.create({
  buttonimage:{
    width:'100%',
    height:'100%',
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
    paddingVertical: 20,
    paddingHorizontal: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  TopModalFrame: {
    height: '40%',
    width: '100%',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rewardframe: {
    width: '100%',
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  rewardBar: {
    height: '25%',
    width: '100%',
    paddingHorizontal: 10,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  scalecontainer: {
    height: '75%',
    borderColor: 'rgba(0,0,0,0.4)',
    borderWidth: 0.3
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.3)',
    width: '100%',
    marginVertical: 10,
  },
  innerFrame: {
    height: '60%',
    width: '100%',
    marginBottom: 5,
    borderWidth: 2,
    borderColor: 'rgba(0, 74, 173, 0.25)',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scorollviewContainer: {
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    margin: 5,
    padding: 10,
    alignItems: 'flex-end',
  },
  taskborderContainer: {
    height: '100%',
    width: '25%',
    margin: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskContainer: {
    backgroundColor: 'rgba(193, 255, 255, 0.5)',
    height: '98%',
    width: '97%',
    borderRadius: 3,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  task: {
    fontSize: 16,
    color: 'black',
  },
  colseButton: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: 25,
    height: 25,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    marginBottom: 10,
  },
  closeButtonText: {
    fontSize: 15,
    color: 'rgba(0, 0, 0, 0.6)',
    textAlign: 'center',
  },
});

export default TaskModal;
