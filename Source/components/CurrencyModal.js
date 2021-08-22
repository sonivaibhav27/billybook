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
import CurrencyData from './Currency';

const {height} = Dimensions.get('window');
const CurrencyModal = ({closeModal, setCurrency}) => {
  // const _sharedValue = useSharedValue(0);
  // React.useEffect(() => {
  //   _sharedValue.value = withTiming(1, {
  //     duration: 200,
  //     easing: Easing.linear,
  //   });
  // }, []);
  const _mountAnimation = React.useRef(new Animated.Value(0)).current;
  const animatedNode = value => {
    Animated.timing(_mountAnimation, {
      toValue: value,
      duration: 150,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };
  React.useEffect(() => {
    animatedNode(1);
  }, []);
  const renderCurrency = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          setCurrency(item.code, item.symbol);
          animatedNode(0);
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
        <Text allowFontScaling={false}>{item.name}</Text>
        <Text
          style={{
            fontSize: 18,
          }}>
          {item.symbol}
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
        {
          transform: [
            {
              translateY: _mountAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [height, 0],
                extrapolate: 'clamp',
              }),
            },
          ],
        },
      ]}>
      <FlatList
        ListHeaderComponent={() => {
          return (
            <View style={{marginHorizontal: 10}}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 10,
                }}>
                <Text
                  style={{
                    color: '#111',
                    fontSize: 20,
                    fontFamily: 'Raleway-Bold',
                  }}>
                  Select your Currency
                </Text>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={closeModal}
                  style={{
                    position: 'absolute',
                    right: 5,
                  }}>
                  <Text style={{fontFamily: 'Raleway-Bold'}}>close</Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  borderWidth: 1,
                  borderColor: '#eee',
                }}
              />
            </View>
          );
        }}
        data={CurrencyData}
        renderItem={renderCurrency}
        keyExtractor={(item, index) => index.toString()}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    // top: 20,
    // right: 20,
    // bottom: 20,
    // left: 20,
    backgroundColor: 'white',
    elevation: 2,
    zIndex: 5000,
    borderRadius: 10,
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
});
export default CurrencyModal;
