import { useState, useEffect } from "react";
import { View, StyleSheet, Text, Image, Animated } from "react-native";
import axios from "axios";

const Coin_Function = () =>{
  const [coins, setCoins] = useState(0);

  useEffect(() =>{
    axios.get('http://172.20.10.4:3000/coin')
        .then(response => {
          const { Coins } = response.data[0];
          setCoins(Coins);
        })
        .catch(error => {
          console.error('获取参数时出错(coin):', error);
        });
  },[]);

  const coinAnimation = (rewardCoins) => {
    const startValue = coins;
    const endValue = startValue + rewardCoins;
    const animation = new Animated.Value(0);
    animation.addListener(({ value }) => {
      const newValue = Math.floor(value * (endValue - startValue)) + startValue;
      setCoins(newValue);
    });
    Animated.timing(animation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };
  
  return(
    <View style={ Coin_Styles.coincontainer }>
      <Text style={{ margin: 5, textAlign: 'right', fontSize:16, fontWeight: 'bold', color:"white", textShadowRadius: 1, textShadowColor: 'black'}}>{coins}</Text>
      <Image 
        source={require('../assets/img/Gold_Icon.png')}
        style={{ width: 65, height: 65, right:25,top:-47, }}
      />
    </View>
  );
};

const Coin_Styles = StyleSheet.create({
  coincontainer: {
    borderRadius: 20,
    width: 120,
    height: 30,
    position: 'absolute',
    right: 10,
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
});

export default Coin_Function;