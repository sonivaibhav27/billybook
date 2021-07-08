import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AntDesign, Entypo} from './Icons';
const Header = ({headerText, isBackable}) => {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={goBack}
        disabled={!isBackable}
        style={styles.container}>
        {isBackable && <Entypo name="chevron-left" size={20} color={'#222'} />}
        <Text style={styles.text}>{headerText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 16,
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 20,
    textTransform: 'uppercase',
    color: '#303030',
  },
});
export default Header;
