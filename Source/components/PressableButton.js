import React from 'react';
import {Pressable} from 'react-native';

const PressableButton = ({
  children,
  onPress,
  style,
  rippleColor = '#eee',
  borderless = true,
  onLongPress = null,
}) => (
  <Pressable
    onLongPress={onLongPress}
    style={style}
    onPress={onPress}
    android_ripple={{
      color: rippleColor,
      borderless,
    }}>
    {children}
  </Pressable>
);

export default PressableButton;
