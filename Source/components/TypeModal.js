import React from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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
  // const _sharedValue = useSharedValue(0);
  // React.useEffect(() => {
  //   _sharedValue.value = withTiming(1, {
  //     duration: 200,
  //     easing: Easing.linear,
  //   });
  // }, []);
  const renderType = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          setType(item);
          closeModal();
        }}
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
            letterSpacing: 1.3,
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
    <View style={[styles.container, propStyle]}>
      <FlatList
        data={data === null ? typeData : data}
        renderItem={renderType}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
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
    // alignSelf: 'center',
    // alignSelf: 'center',
    // bottom: 40,
    // top: 40,
    // height: 150,
  },
});
export default TypeModal;
