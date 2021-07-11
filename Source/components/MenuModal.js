import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  GENERATE_REPORT_SCREEN,
  NEW_PAID_SCREEN,
  SETTINGS_SCREEN,
} from './navigationTypes';
import PressableButton from './PressableButton';

const AnimatedTouchableButton =
  Animated.createAnimatedComponent(TouchableOpacity);
const Item = ({item}) => {
  return (
    <View style={styles.textContainer}>
      <Text style={styles.text}>{item}</Text>
    </View>
  );
};
const MenuModal = ({closeMenuModal}) => {
  const _mount = React.useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const navigateToPaidBillScreen = () => {
    closeMenuModal();
    navigation.navigate(NEW_PAID_SCREEN);
  };

  const navigateToReportScreen = () => {
    closeMenuModal();
    navigation.navigate(GENERATE_REPORT_SCREEN);
  };
  React.useEffect(() => {
    Animated.timing(_mount, {
      toValue: 1,
      useNativeDriver: true,
      duration: 100,
      // easing: Easing.inOut(Easing.linear),
    }).start();
  }, []);
  const navigateToSettingsScreen = () => {
    closeMenuModal();
    navigation.navigate(SETTINGS_SCREEN);
  };

  const closeMenu = () => {
    Animated.timing(_mount, {
      toValue: 0,
      useNativeDriver: true,
      duration: 100,
      // easing: Easing.inOut(Easing.linear),
    }).start(() => {
      closeMenuModal();
    });
  };
  return (
    <AnimatedTouchableButton
      activeOpacity={1}
      onPress={closeMenu}
      style={styles.mainContainer}>
      <Animated.View
        style={[
          styles.container,
          {
            opacity: _mount.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
              extrapolate: 'clamp',
            }),
            transform: [
              {
                scale: _mount.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.8, 1],
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
        ]}>
        <PressableButton borderless={false} onPress={navigateToPaidBillScreen}>
          <Item item="Paid Bills" />
        </PressableButton>
        <PressableButton borderless={false} onPress={navigateToReportScreen}>
          <Item item="Reports" />
        </PressableButton>
        <PressableButton borderless={false} onPress={navigateToSettingsScreen}>
          <Item item="Setting" />
        </PressableButton>
        <PressableButton borderless={false} onPress={closeMenu}>
          <Item item="Close" />
        </PressableButton>
      </Animated.View>
    </AnimatedTouchableButton>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 10,
  },
  container: {
    position: 'absolute',
    right: 10,
    backgroundColor: '#fff',
    padding: 10,
    top: 10,
    borderWidth: 0.8,
    borderColor: '#eee',
    width: 200,
    // height: 300,
    justifyContent: 'space-evenly',
    elevation: 1,
    // elevation: 1,
    borderRadius: 1,
  },
  textContainer: {
    padding: 8,
    paddingHorizontal: 20,
    borderColor: '#eee',
    marginTop: 4,
  },
  text: {
    fontSize: 18,
  },
});

export default MenuModal;
