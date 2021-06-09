import React from 'react';
import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import {Colors} from '../components/Color';
export default () => {
  return (
    <View style={styles.container}>
      <View style={styles.addFundContainer}>
        <Text style={styles.financeText}>My Finances</Text>
        <View style={styles.availableBalanceContainer}>
          <Text style={styles.availableBalanceText}>
            Your Available Balance
          </Text>
          <View style={styles.moneyContainer}>
            <Text style={styles.availableBalance}>&#8377; 2000</Text>
            <Image
              style={{height: 80, width: 80}}
              source={require('../../android/assets/money.png')}
            />
          </View>
        </View>
        <Text style={styles.addFundText}>Add Fund</Text>
        <View style={styles.inputFundContainer}>
          <TextInput style={styles.inputFundStyle} placeholder="Enter amount" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addFundContainer: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
  addFundText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
    textTransform: 'uppercase',
  },
  inputFundContainer: {
    marginTop: 8,
    alignSelf: 'stretch',
    marginHorizontal: 30,
  },
  inputFundStyle: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 80,
    fontSize: 18,
    backgroundColor: 'white',
    padding: 10,
  },
  financeText: {
    color: '#FFF',
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold',
  },
  moneyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  availableBalanceContainer: {
    backgroundColor: '#FFF',
    marginBottom: 20,
    alignSelf: 'stretch',
    marginHorizontal: 30,
    borderRadius: 10,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  availableBalance: {
    color: '#000',
    fontSize: 40,
    marginTop: 8,
    fontWeight: 'bold',
  },
  availableBalanceText: {
    color: '#222',
    textTransform: 'uppercase',
    fontSize: 14,
  },
});
