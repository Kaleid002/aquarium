import { StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';

export const LV_styles = () => {
  const [fontsLoaded] = useFonts({
    'EnglishFont': require('./assets/fonts/English_font.ttf'),
  });

  if (!fontsLoaded) {
    return StyleSheet.create({});
  };

  return StyleSheet.create({
    LV_container: {
      height: '40%',
      alignItems: 'flex-start',
    },
    font: {
      fontFamily: 'EnglishFont',
      fontSize: 20,
    },
  });
};

export const round_button_styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    width: 50,
    height: 50,
    marginHorizontal: 15,
    marginBottom:10,
    justifyContent:'center',
  },
  buttonframe: {
    height: '100%',
    width: '100%',
    borderColor: 'rgba(200,200,200,1)',
    borderWidth: 1,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonimage: {
    width: '90%',
    height: '90%',
  },
  StoreIcon: {
    width: '230%',
    height: '230%',
  },
  Picture_FeedFood_Icon:{
    width:'200%',
    height:'200%',
  },
  HiddenIcon:{
    width: '250%',
    height: '250%',
    shadowColor:'000',
    shadowOpacity:0.2
  },
  AchievementIcon:{
    width:'250%',
    height:'250%',
  },
  buttontextframe: {
    zIndex: 1,
    width: '40%',
    height: '100%',
    marginRight: -10,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    zIndex: 2,
  },
});