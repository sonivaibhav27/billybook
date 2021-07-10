import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  ScrollView,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';

import moment from 'moment';
import {Easing} from 'react-native-reanimated';
const {height} = Dimensions.get('window');

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const MODAL_HEIGHT = height * 0.8;
const PreviousPaymentHistory = ({closeModal, data}) => {
  const _mount = React.useRef(new Animated.Value(0)).current;
  React.useState(() => {
    Animated.timing(_mount, {
      toValue: 1,
      easing: Easing.linear,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, []);
  const _onCloseModal = () => {
    Animated.timing(_mount, {
      toValue: 0,
      easing: Easing.linear,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      closeModal();
    });
  };
  return (
    <AnimatedTouchable
      style={{
        ...StyleSheet.absoluteFill,
        opacity: _mount.interpolate({
          inputRange: [0, 1],
          outputRange: [0.4, 1],
          extrapolate: 'clamp',
        }),
        backgroundColor: 'rgba(0,0,0,0.3)',
        zIndex: 1000,
      }}
      activeOpacity={1}
      onPress={_onCloseModal}>
      <AnimatedTouchable
        activeOpacity={1}
        style={{
          marginTop: 0,
          backgroundColor: '#fff',
          paddingHorizontal: 13,
          position: 'absolute',
          right: 0,
          bottom: 0,
          left: 0,
          borderTopStartRadius: 20,
          borderTopEndRadius: 20,
          maxHeight: MODAL_HEIGHT,
          transform: [
            {
              translateY: _mount.interpolate({
                inputRange: [0, 1],
                outputRange: [MODAL_HEIGHT, 0],
                extrapolate: 'clamp',
              }),
            },
          ],
        }}>
        <View
          style={{
            marginBottom: 10,
            marginTop: 10,
            padding: 10,
            borderBottomWidth: 1,
            borderColor: '#eee',
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 18,
              fontFamily: 'OpenSans-Bold',
            }}>
            Previous payment
          </Text>
        </View>
        <ScrollView style={{flex: 1}}>
          <View onStartShouldSetResponder={() => true}>
            {data.map((bill, index) => {
              return (
                <View
                  onStartShouldSetResponder={() => true}
                  key={index.toString()}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: 10,
                    marginBottom: 8,
                  }}>
                  <View>
                    <Text style={[styles.actualTextStyle, {color: '#000'}]}>
                      {moment(bill.date, 'YYYYMMDD').format('DD/MM/YYYY')}
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={[
                        styles.actualTextStyle,
                        {color: 'rgba(0, 171, 102, 1)'},
                      ]}>
                      ${bill.amount}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>

        <View
          style={{
            backgroundColor: '#eee',
            padding: 10,
            borderRadius: 50,
            marginBottom: 5,
          }}>
          <TouchableNativeFeedback onPress={_onCloseModal}>
            <Text
              style={{
                color: '#222',
                fontWeight: '600',
                textAlign: 'center',
                fontSize: 18,
              }}>
              close
            </Text>
          </TouchableNativeFeedback>
        </View>
      </AnimatedTouchable>
    </AnimatedTouchable>
  );
};
export default React.memo(PreviousPaymentHistory);

const styles = StyleSheet.create({
  actualTextStyle: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 20,
  },
});
