import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Card from '../components/Card';

const PaidBillScreen = () => {
  return (
    <View style={styles.container}>
      {[1, 2, 3].map(item => {
        return <Card key={item} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
export default PaidBillScreen;
