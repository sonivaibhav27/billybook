import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

const LoadingIndicator = ({title = 'Loading...'}) => (
  <View
    style={{
      ...StyleSheet.absoluteFill,
      justifyContent: 'center',
      // alignItems: 'center',
      // flexDirection: 'row',
      marginHorizontal: 20,
    }}>
    <View
      style={{
        backgroundColor: 'white',
        flexDirection: 'row',
        marginHorizontal: 40,
        padding: 20,
        maxWidth: 200,
        alignSelf: 'center',
        elevation: 1,
      }}>
      <ActivityIndicator size="small" color="#000" />
      <Text style={{marginLeft: 15}}>{title}</Text>
    </View>
  </View>
);

export default LoadingIndicator;
