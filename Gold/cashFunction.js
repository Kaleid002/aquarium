import { useState, useEffect, useRef, useContext } from "react";
import { View, StyleSheet, Text, Image, Animated } from "react-native";
import axios from "axios";
import { AppContext } from "../Context";

const Coin_Function = ({ ID }) => {
  const { coins, setCoins, getcoin, setgetcoin } = useContext(AppContext);

  useEffect(() => {
    axios.get('http://172.20.10.4:3000/coin', {
      params: {
        ID: ID
      }
    }).then(response => {
      const { Coins } = response.data[0];
      setCoins(Coins);
    })
      .catch(error => {
        console.error('获取参数时出错(coin):', error);
      });
  }, []);

  useEffect(() => {
    console.log('coinfunction is enable!');
    if (getcoin !== 0) {
      coinAnimation(getcoin);
    }
  }, [getcoin]);

  const coinAnimation = (rewardCoins) => {
    const startValue = coins;
    const endValue = startValue + rewardCoins;
    const animation = new Animated.Value(startValue);

    animation.addListener(({ value }) => {
      console.log(value);
      setCoins(Math.floor(value));
    });

    Animated.timing(animation, {
      toValue: endValue,
      duration: 1000,
      useNativeDriver: false,
    }).start(() => {
      axios.post('http://172.20.10.4:3000/coin', {
        ID: ID,
        coin: endValue
      })
        .then(() => {
          setgetcoin(0);
        })
        .catch(error => {
          console.error('Update coins Error: ', error);
        });
    });
  };

  return (
    <View style={Coin_Styles.coincontainer}>
      <Text style={Coin_Styles.numbercontainer}>{coins}</Text>
      <Image
        source={require('../assets/img/Gold_Icon.png')}
        style={{ width: 65, height: 65, right: 25, top: -47, }}
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
  numbercontainer: {
    margin: 5,
    textAlign: 'right',
    fontSize: 16,
    fontWeight: 'bold',
    color: "white",
    textShadowRadius: 1,
    textShadowColor: 'black'
  }
});

export default Coin_Function;