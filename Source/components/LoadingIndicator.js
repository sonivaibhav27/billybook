import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

const LoadingIndicator = ({title = 'Loading...'}) => (
  <View style={styles.container}>
    <View style={styles.wrapContainer}>
      <ActivityIndicator size="small" color="#000" />
      <Text style={styles.textStyle}>{title}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    zIndex: 70,
  },
  wrapContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    marginHorizontal: 40,
    padding: 20,
    maxWidth: 200,
    alignSelf: 'center',
    elevation: 1,
  },
  textStyle: {marginLeft: 15},
});
export default React.memo(LoadingIndicator);
