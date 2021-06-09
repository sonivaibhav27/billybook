import React from 'react';
import {
  Animated,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {Easing} from 'react-native-reanimated';
import {Entypo} from './Icons';

const {height} = Dimensions.get('window');
export default function SortModal({closeSortModal}) {
  const [lHeight, setLHeight] = React.useState(null);
  const _mount = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(_mount, {
      toValue: 1,
      duration: 250,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, []);
  const layout = e => {
    setLHeight(e.nativeEvent.layout.height);
    // setLoading(false);
  };
  const onPress = () => {
    Animated.timing(_mount, {
      toValue: 0,
      duration: 250,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      closeSortModal();
    });
  };
  return (
    <Animated.View
      onLayout={layout}
      style={[
        {
          backgroundColor: '#eee',
          borderRadius: 8,
          padding: 10,
          borderTopStartRadius: 20,
          borderTopEndRadius: 20,
          zIndex: 100,
          position: 'absolute',
          right: 0,
          left: 0,
          height: height * 0.4,
          bottom: 0,

          transform: [
            {
              translateY: _mount.interpolate({
                inputRange: [0, 1],
                outputRange: [height / 2, 0],
                extrapolate: 'clamp',
              }),
            },
          ],
          opacity: _mount.interpolate({
            inputRange: [0, 1],
            outputRange: [0.4, 1],
            extrapolate: 'clamp',
          }),
        },
      ]}>
      {lHeight != null && (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
          }}>
          <View>
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'Raleway-SemiBold',
                textAlign: 'center',
                color: '#000',
              }}>
              Sort By
            </Text>
          </View>
          <TouchableOpacity
            //   onPress={() => {
            //     animatedValue.value = withTiming(0);
            //   }}
            onPress={onPress}
            activeOpacity={0.9}
            hitSlop={{
              top: 10,
              bottom: 10,
              left: 10,
              right: 10,
            }}
            style={{position: 'absolute', top: 0, right: 10}}>
            <Entypo name="cross" size={30} />
          </TouchableOpacity>
          <View
            style={{
              justifyContent: 'center',
              flex: 0.8,
              //   flexDirection: 'row',
            }}>
            <View
              style={{
                padding: 8,
              }}>
              <Text
                style={{
                  fontFamily: 'Raleway-Medium',
                  fontSize: 18,
                  padding: 10,
                  borderBottomWidth: 2,
                  borderColor: '#eee',
                }}>
                Date (Ascending)
              </Text>
              <Text
                style={{
                  fontFamily: 'Raleway-Medium',
                  fontSize: 18,
                  padding: 10,
                  borderBottomWidth: 2,
                  borderColor: '#eee',
                }}>
                Date (Descending)
              </Text>
            </View>
            <View style={{padding: 8}}>
              <TouchableOpacity
                //   onPress={() => sortBy('amount', false)}
                hitSlop={{
                  left: 5,
                  right: 5,
                  bottom: 5,
                  top: 5,
                }}>
                <Text
                  style={{
                    fontFamily: 'Raleway-Medium',
                    fontSize: 18,
                    padding: 10,
                    borderBottomWidth: 2,
                    borderColor: '#eee',
                  }}>
                  Amount (Ascending)
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                //   onPress={() => sortBy('amount', true)}
                hitSlop={{
                  left: 5,
                  right: 5,
                  bottom: 5,
                  top: 5,
                }}>
                <Text
                  style={{
                    fontFamily: 'Raleway-Medium',
                    fontSize: 18,
                    padding: 10,
                    borderBottomWidth: 2,
                    borderColor: '#eee',
                  }}>
                  Amount (Descending)
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </Animated.View>
  );
}
