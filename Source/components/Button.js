import React from 'react';
import {Text, TouchableNativeFeedback, StyleSheet, View} from 'react-native';

const areEqual = (prevProps, nextProps) => {
  if (prevProps.text !== nextProps.text) {
    return true;
  }
  return false;
};
export default React.memo(
  ({text, textColor, backgroundColor, onPress, containerStyle, ...rest}) => {
    return (
      <View
        //eslint-disable-next-line react-native/no-inline-styles
        style={{
          overflow: 'hidden',
          borderRadius: 40,
          marginRight: 5,
          ...containerStyle,
        }}>
        <TouchableNativeFeedback onPress={onPress}>
          <View style={[styles.container, {backgroundColor, ...rest.style}]}>
            <Text style={[styles.text, {color: textColor}]}>{text}</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  },
  areEqual,
);

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
    fontFamily: 'OpenSans-SemiBold',
    letterSpacing: 1.1,
  },
});
