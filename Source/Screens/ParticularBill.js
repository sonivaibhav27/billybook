import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Colors} from '../components/Color';
import Button from '../components/Button';
import FormComponent from '../components/Form';
const CreateBillScreen = () => (
  <View style={styles.container}>
    <FormComponent label="Bill Name" />
    <FormComponent label="Type" />
    <FormComponent label="Amount" />
    <FormComponent label="Due on" />
    <Button
      backgroundColor={Colors.tomato}
      textColor={'#FFF'}
      text="Mark as Unpaid"
    />
    <Button
      backgroundColor={Colors.lightTomato}
      textColor={Colors.tomato}
      text="Delete"
      style={{
        marginTop: 10,
      }}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});

export default CreateBillScreen;
