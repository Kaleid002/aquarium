import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { round_button_styles } from '../ScreenBackgroundStyles';
import InformationInterFace from './PersonalData/InterFace';
import { LV_styles } from '../ScreenBackgroundStyles';
import axios from 'axios';

const ExperienceBar = ({ ID }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const [currentExperience, setCurrentExperience] = useState(0);
  const [level, setlevel] = useState(1);
  const [totalExperience, setTotalExperience] = useState(100);
  const Rank_styles = LV_styles();
  const experiencePercentage = (currentExperience / totalExperience) * 100;

  const animatedProgress = new Animated.Value(0);

  useEffect(() => {
    axios.get('http://172.20.10.4:3000/experiencebar', {
      params: {
        ID: ID
      }
    })
      .then((response) => {
        const { currentExperience, totalExperience, level } = response.data[0];
        setCurrentExperience(currentExperience);
        setlevel(level);
        setTotalExperience(totalExperience);
      })
      .catch(error => {
        console.error('Update Error:', error);
      });
  }, []);

  useEffect(() => {
    if (experiencePercentage >= 100) {
      setCurrentExperience(currentExperience - totalExperience);
      updateLevelAndExperience();
    }

    Animated.timing(animatedProgress, {
      toValue: (currentExperience / totalExperience) * 100,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [currentExperience, totalExperience, experiencePercentage, updateLevelAndExperience]);

  const handleExperienceUpdate = () => {
    setCurrentExperience(currentExperience + 100);

    axios.post('http://172.20.10.4:3000/experiencebar', {
      ID: ID,
      currentExperience: currentExperience,
      totalExperience: totalExperience,
      level: level
    })
      .catch(error => {
        console.error('Update Params Error: ', error);
      });
  };

  const updateLevelAndExperience = () => {
    if (experiencePercentage >= 100) {
      setlevel(level + 1);
      setTotalExperience(totalExperience * 1.5);
    }
  };
  return (
    <View>
      <View style={experienceBar_styles.experienceBarframe}>
        <LinearGradient
          colors={['rgba(0, 97, 200, 0.74)', 'rgba(0, 147, 255, 0.74)', 'rgba(21, 142, 232, 0.74)', 'rgba(90, 181, 248, 0.74)', 'rgba(191, 219, 239, 0.74)', 'rgba(191, 191, 191, 0.74)']}
          start={{ x: 0.4, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={experienceBar_styles.framecontainer}
        >
          <LinearGradient
            colors={['rgba(0, 74, 173, 1)', 'rgba(0, 81, 203, 0.8)', 'rgba(21, 142, 232, 0.74)', 'rgba(90, 181, 248, 0.74)', 'rgba(191, 219, 239, 0.74)', 'rgba(191, 191, 191, 0.74)']}
            start={{ x: 0.1, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={experienceBar_styles.frameborder}
          >
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              {Rank_styles && (
                <View style={Rank_styles.LV_container}>
                  <Text style={Rank_styles.font}>RANK: {level}</Text>
                </View>
              )}

              <View style={experienceBar_styles.experienceBarcontainer}>
                <View style={experienceBar_styles.experienceBar}>

                  <Animated.View style={{ width: animatedProgress.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] }) }}>
                    <LinearGradient
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      colors={['rgba(12, 192, 223, 1)', 'rgba(255, 222, 89, 1)']}
                      style={{ height: '100%' }}
                    />
                  </Animated.View>
                </View>
                <Text style={experienceBar_styles.experienceText}>{`${currentExperience.toFixed(1)} / ${totalExperience.toFixed(1)}`}</Text>
              </View>
            </TouchableOpacity>
          </LinearGradient>
        </LinearGradient>
      </View>

      <InformationInterFace visible={modalVisible} onClose={() => setModalVisible(false)} ID={ID} />

      <TouchableOpacity style={[round_button_styles.buttonContainer, { top: 300 }]} onPress={() => handleExperienceUpdate()}>
        <LinearGradient
          colors={['rgba(255, 253, 253, 1)', 'rgba(82, 82, 82, 1)', 'rgba(0, 0, 0, 1)', 'rgba(64, 64, 64, 1)', 'rgba(255, 255, 255, 1)']}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={round_button_styles.buttontextframe}
        >
          <Text style={round_button_styles.buttonText}>EX</Text>
        </LinearGradient>
        <View
          style={round_button_styles.buttonframe}
        >
        </View>
      </TouchableOpacity>
    </View>
  );
};

const experienceBar_styles = StyleSheet.create({
  experienceBarframe: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  framecontainer: {
    height: 80,
    width: 200,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  frameborder: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'rgba(0, 74, 173, 1)',
    opacity: 0.6
  },
  experienceBarcontainer: {
    width: '100%',
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  experienceBar: {
    width: '100%',
    height: '10%',
  },
  experienceText: {
    height: '50%',
    fontSize: 15,
    textAlignVertical: 'center',
  },
});

export default ExperienceBar;
