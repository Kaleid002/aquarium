import { Text, View, TouchableOpacity, Animated, Image, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import ExperienceBar from './Rank/ExperienceBar';
import { round_button_styles } from './ScreenBackgroundStyles';
import { useHiddenAnimation } from './Button-hidden/HiddenAnime';
import { opacityAnimation } from './Button-hidden/OpacityAnime';
import HandleCapture from './Button-hidden/Button-ScreenShot/ScreenCapture';
import Coin_Function from './Gold/cashFunction';
import TaskModal from './Task/TaskModal';
import FishFeed from './Feed/FishFeed';
//import StoreButton from './Store/StoreButton';
//import WareHouseButton from './WareHouse/WareHouseButton';

const Home = ({ navigation }) => {
  const { picturebutonvisible, slideLeft, slideRight, slideAnimation,
    toggleVisibility } = useHiddenAnimation();

  const { opacityValue, buttonOpacityAnime } = opacityAnimation();

  return (
    <View>
      <Animated.View style={{ opacity: opacityValue }}>
        <View style={{ flexDirection: 'row' }}>
          <Animated.View style={{ transform: [{ translateX: slideLeft }], width: '50%', height: '70%' }}>
            <ExperienceBar />

            <TouchableOpacity style={[round_button_styles.buttonContainer, { top: 40 }]} onPress={() => navigation.navigate('warehouse')}>
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
                  source={require('./assets/img/WareHouse_Icon.png')}
                  style={round_button_styles.buttonimage}
                />
              </View>

            </TouchableOpacity>

            <TaskModal />

            <TouchableOpacity style={[round_button_styles.buttonContainer, { top: 40 }]} onPress={() => navigation.navigate('store')}>
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
                  source={require('./assets/img/Store_Icon.png')}
                  style={round_button_styles.StoreIcon}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={[round_button_styles.buttonContainer, { top: 60, left: 65 }]} onPress={() => navigation.navigate('TestAPI')}>
              <LinearGradient
                colors={['rgba(255, 253, 253, 1)', 'rgba(82, 82, 82, 1)', 'rgba(0, 0, 0, 1)', 'rgba(64, 64, 64, 1)', 'rgba(255, 255, 255, 1)']}
                start={{ x: 0, y: 1 }}
                end={{ x: 0, y: 0 }}
                style={round_button_styles.buttontextframe}
              >
                <Text style={round_button_styles.buttonText}>TestAPI</Text>
              </LinearGradient>
              <View
                style={round_button_styles.buttonframe}
              >
              </View>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View style={{ transform: [{ translateX: slideRight }], width: '50%', height: '70%', alignItems: 'flex-end' }}>
            <Coin_Function />

            <FishFeed onPress={buttonOpacityAnime} />

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
                  source={require('./assets/img/Achievement_Icon.png')}
                  style={round_button_styles.AchievementIcon}
                />
              </View>
            </TouchableOpacity>
          </Animated.View>
        </View>


        <View style={{ flexDirection: 'row', top: 60 }}>
          <TouchableOpacity style={[round_button_styles.buttonContainer, { shadowColor: 'rgba(255, 255, 255, 1)', shadowOpacity: 1, shadowRadius: 10 }]} onPress={toggleVisibility}>
            <View
              style={round_button_styles.buttonframe}
            >
              <Image
                source={require('./assets/img/Hidden_Icon.png')}
                style={round_button_styles.HiddenIcon}
              />
            </View>
          </TouchableOpacity>


          <Animated.View style={{ opacity: slideAnimation }}>
            {picturebutonvisible &&
              <TouchableOpacity style={round_button_styles.buttonContainer} onPress={HandleCapture} >
                <View
                  style={[round_button_styles.buttonframe, { opacity: 0.8 }]}
                >
                  <Image
                    source={require('./assets/img/PictureShot_Icon.png')}
                    style={round_button_styles.Picture_FeedFood_Icon}
                  />
                </View>
              </TouchableOpacity>
            }
          </Animated.View>

        </View>
      </Animated.View>
    </View>
  );
};

export default Home;