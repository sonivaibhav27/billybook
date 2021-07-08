import React from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Easing} from 'react-native-reanimated';
// import Animated, {
//   Easing,
//   interpolate,
//   useSharedValue,
//   withTiming,
// } from 'react-native-reanimated';

const {height} = Dimensions.get('window');

const typeData = [
  'Others',
  'Accomodation',
  'Car',
  'Credit Card',
  'Education',
  'Electricity',
  'Food',
  'Gift',
  'Investment',
  'Insurance',
  'Medicare',
  'Pet',
  'Sports',
  'Shopping',
  'Tax',
  'Television',
  'Two Wheeler',
  'Vacation',
];
const TypeModal = ({setType, closeModal, data = null, style: propStyle}) => {
  const _mount = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.timing(_mount, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, []);

  const onPress = item => {
    setType(item);
    Animated.timing(_mount, {
      toValue: 0,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      closeModal();
    });
  };
  const renderType = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => onPress(item)}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 20,
          marginTop: 10,
          alignItems: 'center',
          borderBottomWidth: 1,
          padding: 10,
          borderColor: '#eee',
        }}>
        <Text
          allowFontScaling={false}
          style={{
            // letterSpacing: 1.3,
            fontFamily: 'OpenSans-SemiBold',
          }}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };
  // const style = Animated.useAnimatedStyle(() => {
  //   return {
  //     opacity: interpolate(_sharedValue.value, [0, 1], [0.4, 1]),
  //     transform: [
  //       {translateY: interpolate(_sharedValue.value, [0, 1], [height, 0])},
  //     ],
  //   };
  // });
  return (
    <Animated.View
      style={[
        styles.container,
        propStyle,
        {
          transform: [
            {
              translateY: _mount.interpolate({
                inputRange: [0, 1],
                outputRange: [height, 0],
                extrapolate: 'clamp',
              }),
            },
          ],
        },
      ]}>
      <FlatList
        data={data === null ? typeData : data}
        renderItem={renderType}
        keyExtractor={(_, index) => index.toString()}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'white',
    elevation: 2,
    zIndex: 5000,
    borderRadius: 10,
    left: 20,
    right: 20,
    // flex: 1,
  },
});
export default TypeModal;
