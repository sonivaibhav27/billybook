import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Colors} from './Color';

const SelectionDate = ({label, onPress, isSelected, isFullSelected}) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        onPress(label);
      }}
      style={{
        backgroundColor:
          isSelected || isFullSelected ? 'white' : Colors.backgroundColor,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginHorizontal: 5,
        borderRadius: 50,
        borderWidth: isSelected || isFullSelected ? 2 : 0,
        borderColor: Colors.primary,
        elevation: isSelected ? 2 : 0,
      }}>
      <Text
        style={{
          fontWeight: isSelected || isFullSelected ? 'bold' : 'normal',
          color: 'black',
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default SelectionDate;
