import { useRef, useState } from 'react';
import { Text, View, TouchableOpacity, Animated, Image, PanResponder } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Video } from 'expo-av';
import axios from 'axios';

import ExperienceBar from '../Rank/ExperienceBar';
import { round_button_styles } from '../ScreenBackgroundStyles';
import { useHiddenAnimation } from '../Button-hidden/HiddenAnime';
import { opacityAnimation } from '../Button-hidden/OpacityAnime';
import HandleCapture from '../Button-hidden/Button-ScreenShot/ScreenCapture';
import Coin_Function from '../Gold/cashFunction';
import TaskModal from '../Task/TaskModal';
import FishFeed from '../Feed/FishFeed';
import SpeciesIntroductionFrame from './ClickFishFunction';
import TargetSelect from '../Task/TargetSelect';


const Home = ({ navigation, route }) => {
  const { userid } = route.params;

  const { picturebuttonvisible, slideLeft, slideRight, slideAnimation,
    toggleVisibility } = useHiddenAnimation();

  const { opacityValue, buttonOpacityAnime } = opacityAnimation();

  const videoRef = useRef(null);
  const [fishdata, setfishdata] = useState('');
  const [modalVisible, setmodalVisible] = useState(false);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderRelease: async (event, gesturestate) => {
        const { moveX, moveY } = gesturestate;
        if (videoRef.current) {
          const timestamp = await videoRef.current.getStatusAsync();
          console.log(`Touch Position: (${moveX}, ${moveY})`);
          axios.post('http://172.20.10.4:3000/VideoParameter', {
            timestamp: timestamp.positionMillis,
            x: moveX,
            y: moveY
          }).then((response) => {
            setfishdata(response.data);
            console.log(response.data.data);
            setmodalVisible(true);
          })
        };
      },
    }),
  ).current;



  return (
    <View {...panResponder.panHandlers} style={{ flex: 1 }}>

      <View style={{ width: '100%', height: '100%', position: 'absolute' }}>
        <Video
          ref={videoRef}
          source={{ uri: 'http://172.20.10.4:8080/hls/stream.m3u8' }}
          style={{ width: '100%', height: '100%' }}
          useNativeControls={false}
          shouldPlay={true}
          resizeMode="stretch"
        />

      </View>

      <View style={{ width: '100%', height: '100%', position: 'absolute' }}>
        <SpeciesIntroductionFrame visible={modalVisible} setvisible={setmodalVisible} fishData={fishdata} />
      </View>

      <View style={{ width: '100%', height: '100%', position: 'absolute' }}>
        <TargetSelect ID={userid} />
      </View>

      <Animated.View style={{ opacity: opacityValue }}>
        <View style={{ flexDirection: 'row' }}>
          <Animated.View style={{ transform: [{ translateX: slideLeft }], width: '50%', height: '70%' }}>
            <ExperienceBar ID={userid} />

            <TouchableOpacity style={[round_button_styles.buttonContainer, { marginTop: 100 }]} onPress={() => navigation.navigate('warehouse')}>
              <LinearGradient
                colors={['rgba(255, 253, 253, 1)', 'rgba(82, 82, 82, 1)', 'rgba(0, 0, 0, 1)', 'rgba(64, 64, 64, 1)', 'rgba(255, 255, 255, 1)']}
                start={{ x: 0, y: 1 }}
                end={{ x: 0, y: 0 }}
                style={round_button_styles.buttontextframe}
              >
                <Text style={round_button_styles.buttonText}>倉庫</Text>
              </LinearGradient>
              <View
                style={round_button_styles.buttonframe}
              >
                <Image
                  source={require('../assets/img/WareHouse_Icon.png')}
                  style={round_button_styles.buttonimage}
                />
              </View>

            </TouchableOpacity>

            <TaskModal ID={userid} />

            <TouchableOpacity style={[round_button_styles.buttonContainer]} onPress={() => navigation.navigate('store', { userid: userid })} >
              <LinearGradient
                colors={['rgba(255, 253, 253, 1)', 'rgba(82, 82, 82, 1)', 'rgba(0, 0, 0, 1)', 'rgba(64, 64, 64, 1)', 'rgba(255, 255, 255, 1)']}
                start={{ x: 0, y: 1 }}
                end={{ x: 0, y: 0 }}
                style={round_button_styles.buttontextframe}
              >
                <Text style={round_button_styles.buttonText}>商城</Text>
              </LinearGradient>
              <View
                style={round_button_styles.buttonframe}
              >
                <Image
                  source={require('../assets/img/Store_Icon.png')}
                  style={round_button_styles.StoreIcon}
                />
              </View>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View style={{ transform: [{ translateX: slideRight }], width: '50%', height: '70%', alignItems: 'flex-end' }}>
            <Coin_Function ID={userid} />

            <FishFeed onPress={buttonOpacityAnime} ID={userid} />

            <TouchableOpacity style={[round_button_styles.buttonContainer, { top: 100 }]}>
              <LinearGradient
                colors={['rgba(255, 253, 253, 1)', 'rgba(82, 82, 82, 1)', 'rgba(0, 0, 0, 1)', 'rgba(64, 64, 64, 1)', 'rgba(255, 255, 255, 1)']}
                start={{ x: 0, y: 1 }}
                end={{ x: 0, y: 0 }}
                style={round_button_styles.buttontextframe}
              >
                <Text style={round_button_styles.buttonText}>成就</Text>
              </LinearGradient>
              <View
                style={round_button_styles.buttonframe}
              >
                <Image
                  source={require('../assets/img/Achievement_Icon.png')}
                  style={round_button_styles.AchievementIcon}
                />
              </View>
            </TouchableOpacity>
          </Animated.View>
        </View>


        <View style={{ flexDirection: 'row', marginTop: 70, justifyContent: 'flex-start', alignContent: 'baseline' }}>
          <TouchableOpacity style={[round_button_styles.buttonContainer, { shadowColor: 'rgba(255, 255, 255, 1)', shadowOpacity: 1, shadowRadius: 10 }]} onPress={toggleVisibility}>
            <View
              style={round_button_styles.buttonframe}
            >
              <Image
                source={require('../assets/img/Hidden_Icon.png')}
                style={round_button_styles.HiddenIcon}
              />
            </View>
          </TouchableOpacity>


          <Animated.View style={{ opacity: slideAnimation }}>
            {picturebuttonvisible &&
              <HandleCapture videoRef={videoRef} />
            }
          </Animated.View>

        </View>
      </Animated.View>
    </View>
  );
};

export default Home;
