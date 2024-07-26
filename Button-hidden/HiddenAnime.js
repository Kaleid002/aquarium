import { useState } from "react";
import { Animated } from "react-native";

export const useHiddenAnimation = () => {
  const [isVisible, setVisibility] = useState(true);
  const [picturebutonvisible, setpicturebutonvisible] = useState(false);
  const [slideAnimation] = useState(new Animated.Value(0));


  const toggleVisibility = () => {
    setpicturebutonvisible(!picturebutonvisible);
    Animated.timing(slideAnimation, {
      toValue: isVisible ? 1 : 0,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      setVisibility(!isVisible);
    });
  };

  const slideLeft = slideAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -200],
  });

  const slideRight = slideAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  });

  return { toggleVisibility, slideLeft, slideRight, slideAnimation, picturebutonvisible };
};