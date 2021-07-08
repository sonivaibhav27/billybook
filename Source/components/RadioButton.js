import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PressableButton from './PressableButton';

function RadioButton({label, isSelected, onPress, asc = true, operation}) {
  const _onPress = () => {
    onPress(operation);
  };
  return (
    <PressableButton
      borderless={false}
      style={{paddingVertical: 10}}
      onPress={_onPress}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={styles.container}>
          {isSelected ? <View style={styles.selected} /> : null}
        </View>
        <Text style={styles.labelStyle}>
          {label} {asc ? '(Ascending)' : '(Descending)'}
        </Text>
      </View>
    </PressableButton>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelStyle: {
    marginLeft: 5,
    // fontFamily: 'OpenSans-Regular',
  },
  selected: {
    backgroundColor: '#333',
    width: 10,
    height: 10,
    borderRadius: 8,
  },
});

export default RadioButton;
