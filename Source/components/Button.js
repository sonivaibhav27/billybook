import React from 'react';
import {
  Text,
  TouchableNativeFeedback,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';

export default ({text, textColor, backgroundColor, onPress, ...rest}) => {
  console.log(rest);
  return (
    <View
      style={{flex: 1, overflow: 'hidden', borderRadius: 40, marginRight: 5}}>
      <TouchableNativeFeedback onPress={onPress}>
        <View style={[styles.container, {backgroundColor, ...rest.style}]}>
          <Text style={[styles.text, {color: textColor}]}>{text}</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 4,
    // alignSelf: 'center',
  },
  text: {
    fontSize: 20,
    fontFamily: 'OpenSans-Bold',
  },
});
