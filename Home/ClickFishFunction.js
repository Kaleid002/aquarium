import { View, Text, StyleSheet, Modal, TouchableOpacity, Image } from "react-native";
import Animated from "react-native-reanimated";

const SpeciesIntroductionFrame = ({ visible, setvisible, fishData }) => {
  return (
    <View>
      <Modal animationType="fade" transparent={true} visible={visible} supportedOrientations={['landscape']}>
        <View style={SpeciesIntroduction_styles.OutFrame}>
          <View style={SpeciesIntroduction_styles.content}>
            <Animated.View style={SpeciesIntroduction_styles.BackDecoration} >
              <Animated.View style={SpeciesIntroduction_styles.FrontDecoration}>
                <Image source={{ uri: fishData.image }} style={SpeciesIntroduction_styles.ScreenCaptureIMG} />
              </Animated.View>
            </Animated.View>
            {fishData &&
              <View style={SpeciesIntroduction_styles.IntroductionContent}>
                <View style={SpeciesIntroduction_styles.IntroductionContainer}>
                  <Text style={SpeciesIntroduction_styles.IntroductionTextstyle}>{fishData.data[0].Chinese_name}</Text>
                  <Text style={SpeciesIntroduction_styles.IntroductionTextstyle}>學名: {fishData.data[0].Scientific_name}</Text>
                  <Text style={SpeciesIntroduction_styles.IntroductionTextstyle}>原產地: {fishData.data[0].Origin}</Text>
                  <Text style={SpeciesIntroduction_styles.IntroductionTextstyle}>成魚體長: {fishData.data[0].Length}</Text>
                  <Text style={SpeciesIntroduction_styles.IntroductionTextstyle}>性格: {fishData.data[0].Temperament}</Text>
                  <Text style={SpeciesIntroduction_styles.IntroductionTextstyle}>適宜溫度: {fishData.data[0].Temperature}</Text>
                </View>
              </View>}

            <TouchableOpacity style={SpeciesIntroduction_styles.CloseButtonContainer} onPress={() => setvisible(!visible)}>
              <Image source={require('./../assets/img/Close_Icon.png')} style={SpeciesIntroduction_styles.CloseIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal >
    </View >
  )
};

const SpeciesIntroduction_styles = StyleSheet.create({
  OutFrame: {
    flexDirection: 'row',
    width: '85%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  content: {
    width: '60%',
    height: '50%',
    backgroundColor: 'rgba(255,255,255,1)',
    borderColor: 'rgba(255,255,255,1)',
    borderWidth: 1,
    borderRadius: 10,
  },
  BackDecoration: {
    position: 'absolute',
    width: '50%',
    height: '100%',
    left: -90,
    bottom: 0,
    backgroundColor: 'rgba(240,240,240,1)',
    borderColor: 'rgba(255,255,255,1)',
    borderWidth: 7,
    transform: [{ rotate: '15deg' }]
  },
  FrontDecoration: {
    position: 'absolute',
    width: '110%',
    height: '110%',
    left: -60,
    bottom: -30,
    backgroundColor: 'rgba(245,245,245,1)',
    borderColor: 'rgba(255,255,255,1)',
    borderWidth: 7,
    transform: [{ rotate: '-30deg' }]
  },
  ScreenCaptureIMG: {
    width: '100%',
    height: '100%'
  },
  IntroductionContent: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    alignItems: 'flex-end'
  },
  IntroductionContainer: {
    width: '68%',
    height: '100%',
    justifyContent: 'space-around',
    alignItems: 'flex-start'
  },
  IntroductionTextstyle: {
    fontSize: 28
  },
  CloseButtonContainer: {
    position: 'absolute',
    width: 25,
    height: 25,
    top: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 30
  },
  CloseIcon: {
    width: '100%',
    height: '100%'
  }
});

export default SpeciesIntroductionFrame;