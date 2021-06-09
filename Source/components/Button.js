import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

export default ({text, textColor, backgroundColor, onPress, ...rest}) => {
  console.log(rest);
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[styles.container, {backgroundColor, ...rest.style}]}>
      <Text style={[styles.text, {color: textColor}]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 4,
    paddingVertical: 12,
    alignSelf: 'center',
  },
  text: {
    fontSize: 20,
    fontFamily: 'SourceSansPro-Bold',
  },
});
