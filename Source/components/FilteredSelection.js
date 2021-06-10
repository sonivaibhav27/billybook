import React from 'react';
import {Animated, Text, View} from 'react-native';
import PressableButton from './PressableButton';

const FilteredSelection = ({thisMonthOrAllCallback}) => {
  const _mount = React.useRef(new Animated.Value(0)).current;

  const callAnimation = value => {
    Animated.spring(_mount, {
      toValue: value,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };
  React.useEffect(() => {
    callAnimation(1);
  }, []);
  return (
    <Animated.View
      style={{
        // backgroundColor: '#f1f1f1',
        padding: 8,
        borderBottomStartRadius: 8,
        borderBottomEndRadius: 8,
        zIndex: -100,
        elevation: 1,
        backgroundColor: '#eee',
        width: 150,
        opacity: _mount.interpolate({
          inputRange: [0, 1],
          outputRange: [0.5, 1],
          extrapolate: 'clamp',
        }),
      }}>
      <PressableButton
        borderless={false}
        onPress={() => {
          // callAnimation(0);
          Animated.timing(_mount, {
            toValue: 0,
            duration: 30,
            useNativeDriver: true,
          }).start(() => {
            thisMonthOrAllCallback('This Month');
          });
        }}
        style={{
          // borderWidth: 0.5,
          backgroundColor: '#fff',
          padding: 8,
          borderRadius: 80,
        }}>
        <Text
          style={{
            color: '#333',
            fontSize: 18,
          }}>
          This Month
        </Text>
      </PressableButton>
      <PressableButton
        borderless={false}
        onPress={() => {
          Animated.timing(_mount, {
            toValue: 0,
            duration: 30,
            useNativeDriver: true,
          }).start(() => {
            thisMonthOrAllCallback('All Bill');
          });
        }}
        style={{
          padding: 8,
          backgroundColor: '#fff',
          borderRadius: 80,
          marginTop: 5,
        }}>
        <Text
          style={{
            color: '#333',
            fontSize: 18,
          }}>
          All Bill
        </Text>
      </PressableButton>
    </Animated.View>
  );
};

export default FilteredSelection;
