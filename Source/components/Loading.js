import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
// import Animated, {
//   Easing,
//   Extrapolate,
//   interpolate,
//   interpolateNode,
//   runOnJS,
//   useAnimatedStyle,
//   useDerivedValue,
//   useSharedValue,
//   withDelay,
//   withTiming,
// } from 'react-native-reanimated';
import {Entypo} from '../components/Icons';
import {Colors} from './Color';

const Loading = ({closed}) => {
  // const value = useSharedValue(0);
  const ref = React.useRef();
  React.useEffect(() => {
    // value.value = withTiming(
    //   1,
    //   {
    //     duration: 800,
    //   },
    //   isF => {
    //     if (isF) {
    //       runOnJS(c)();
    //     }
    //   },
    // );
    // return () => clearTimeout(ref?.current);
  }, []);
  // const c = () => {
  //   ref.current = setTimeout(() => {
  //     closed();
  //   }, 500);
  // };
  // const derived = useDerivedValue(() => {
  //   const v = interpolate(value.value, [0, 1], [0.5, 1], Extrapolate.CLAMP);
  //   return v;
  // });
  // const scaled = useDerivedValue(() => {
  //   const v = interpolate(value.value, [0, 1], [0.5, 1], Extrapolate.CLAMP);
  //   return v;
  // });
  // const style = useAnimatedStyle(() => {
  //   return {
  //     opacity: derived.value,
  //     transform: [{scale: scaled.value}],
  //   };
  // });
  return (
    <View style={[styles.container]}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Entypo name="check" size={40} color="white" />
        <Text style={styles.text}>Done</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.primary,
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    // opacity: 0,
  },
  text: {
    fontSize: 40,
    color: '#fff',
    fontFamily: 'Raleway-Bold',
    marginLeft: 10,
  },
});
export default Loading;
