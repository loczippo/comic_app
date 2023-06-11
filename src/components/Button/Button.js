import React, { useRef, useState } from 'react';
import { Animated, PanResponder, Text, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

import styles from './styles';

const GlobalButton = ({ type, children, locKey, onPress, style }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [is3dButton, setIs3dButton] = useState(false);

  const _panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
    onPanResponderGrant: (evt, gestureState) => {
      startAnimate('down');
    },
    onPanResponderRelease: (evt, gestureState) => {
      startAnimate('up');
      if (onPress) {
        setTimeout(onPress, 50);
      }
    },
  });

  const startAnimate = (direction = 'down') => {
    if (direction === 'down') {
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 50,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start();
    }
  };

  const transform = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, moderateScale(4)],
  });
  const transform3d = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [moderateScale(4), 0],
  });
  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.7],
  });

  let containerStyle = styles.container;
  let buttonContainerStyle = null;
  let buttonTextStyle = null;
  let buttonShadowStyle = null;

  switch (type) {
    case 'primary':
      buttonContainerStyle = [styles.buttonContainer];
      buttonTextStyle = [styles.buttonText];
      break;

    case 'outlinePrimary':
      buttonContainerStyle = [styles.buttonContainer, styles.buttonContainer__primaryOutline];
      buttonTextStyle = [styles.buttonText, styles.buttonText__primaryOutline];
      break;

    case 'lightenPrimary':
      buttonContainerStyle = [styles.buttonContainer, styles.buttonContainer__lightenPrimary];
      buttonTextStyle = [styles.buttonText, styles.buttonText__lightenPrimary];
      break;

    case 'outlineLightenPrimary':
      buttonContainerStyle = [styles.buttonContainer, styles.buttonContainer__lightenPrimaryOutline];
      buttonTextStyle = [styles.buttonText, styles.buttonText__lightenPrimaryOutline];
      break;

    case '3dLightenPrimary':
      containerStyle = [styles.container, styles.container__3dLightenPrimary];
      buttonContainerStyle = [styles.buttonContainer, styles.buttonContainer__lightenPrimary];
      buttonTextStyle = [styles.buttonText, styles.buttonText__lightenPrimary];
      buttonShadowStyle = [styles.buttonShadow, styles.buttonShadow__3dLightenPrimary];
      setIs3dButton(true);
      break;

    case 'warning':
      buttonContainerStyle = [styles.buttonContainer, styles.buttonContainer__warning];
      buttonTextStyle = [styles.buttonText, styles.buttonText__warning];
      break;

    default:
      buttonContainerStyle = [styles.buttonContainer];
      buttonTextStyle = [styles.buttonText];
  }

  return (
    <View style={[containerStyle, style || {}]} {..._panResponder.panHandlers}>
      {is3dButton && (
        <Animated.View
          style={[buttonShadowStyle, {
            transform: [{ scaleY: transform3d }],
          }]}
        />
      )}

      <Animated.View
        style={[buttonContainerStyle, {
          transform: [{ translateY: is3dButton ? transform : 0 }],
          opacity: opacity,
        }]}
      >
        <Text style={buttonTextStyle}>{children}</Text>
      </Animated.View>
    </View>
  );
};


export default GlobalButton;