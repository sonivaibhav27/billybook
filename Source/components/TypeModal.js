import React from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import {Easing} from 'react-native-reanimated';

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
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
const TypeModal = ({setType, closeModal, data = null, style: propStyle}) => {
  const _mount = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.timing(_mount, {
      toValue: 1,
      duration: 250,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, []);

  const onPress = () => {
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
      <TouchableNativeFeedback
        delayPressIn={0}
        onPress={() => {
          // onPress();
          closeModal();
          setType(item);
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 20,
            marginTop: 10,
            alignItems: 'center',
            padding: 10,
          }}>
          <Text
            allowFontScaling={false}
            style={{
              // letterSpacing: 1.3,
              fontFamily: 'OpenSans-SemiBold',
            }}>
            {item}
          </Text>
        </View>
      </TouchableNativeFeedback>
    );
  };

  return (
    <AnimatedTouchable
      activeOpacity={1}
      onPress={onPress}
      style={[
        styles.backdropContainer,
        {
          opacity: _mount.interpolate({
            inputRange: [0, 1],
            outputRange: [0.4, 1],
            extrapolate: 'clamp',
          }),
        },
      ]}>
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
    </AnimatedTouchable>
  );
};

const styles = StyleSheet.create({
  backdropContainer: {
    zIndex: 10,
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  container: {
    position: 'absolute',
    backgroundColor: 'white',
    elevation: 2,
    borderRadius: 10,
    left: 20,
    right: 20,
    // flex: 1,
  },
});
export default TypeModal;
