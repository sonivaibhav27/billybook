import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors} from './Color';
import {PARTICULAR_BILL} from './navigationTypes';
import {normalize} from './TextSize';
import TypeModal from './TypeModal';

const FormComponent = ({
  label,
  isCompulsoryField,
  keyboardType = 'default',
  maxLength,
  onChangeText,
  value,
  onPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.labelText}>
          {label}
          {isCompulsoryField && (
            <Text style={{color: Colors.tomato}}> &#42;</Text>
          )}
        </Text>
        <View
          style={{
            borderBottomWidth: 0.8,
            borderColor: '#eee',
          }}
        />
        {label === 'Due on' ? (
          <TouchableOpacity
            onPress={onPress}
            activeOpacity={1}
            style={styles.textContainer}>
            <Text
              style={{
                color: '#000',
                fontWeight: 'bold',
              }}>
              {value}
            </Text>
          </TouchableOpacity>
        ) : label !== 'Type' ? (
          <TextInput
            // editable={!date}
            value={value}
            onChangeText={onChangeText}
            maxLength={maxLength}
            keyboardType={keyboardType}
            placeholder={label}
            placeholderTextColor="#999"
            style={styles.textContainer}
          />
        ) : (
          <TouchableOpacity
            activeOpacity={1}
            onPress={onPress}
            style={styles.textContainer}>
            <Text style={{color: '#000', fontFamily: 'OpenSans-Bold'}}>
              {value}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 10,
  },
  wrapper: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    backgroundColor: '#fff',
    // elevation: 2,
    borderRadius: 8,
    marginTop: 2,
    // borderBottomWidth: 2,
    // borderColor: Colors.primary,
    // elevation: 3,
    borderWidth: 1,
    borderColor: '#eee',
  },
  textContainer: {
    padding: 5,
    // fontFamily: 'Raleway-Bold',
    color: '#000',
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 16,
  },

  labelText: {
    fontSize: 13,
    color: '#666',
    // fontFamily: 'Raleway-SemiBold',
    letterSpacing: 0.8,
    paddingVertical: 8,
  },
});
export default FormComponent;
