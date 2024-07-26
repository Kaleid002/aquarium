import { useRef } from "react";
import { Animated } from "react-native";

export const opacityAnimation = () => {
  const opacityValue = useRef(new Animated.Value(1)).current;

  const buttonOpacityAnime = () => {
    Animated.timing(opacityValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return { opacityValue, buttonOpacityAnime };
}