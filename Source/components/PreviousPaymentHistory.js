import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  ScrollView,
  TouchableNativeFeedback,
} from 'react-native';

import moment from 'moment';
import {Easing} from 'react-native-reanimated';
const {height} = Dimensions.get('window');
const PreviousPaymentHistory = ({closeModal}) => {
  const _mount = React.useRef(new Animated.Value(0)).current;
  React.useState(() => {
    Animated.timing(_mount, {
      toValue: 1,
      easing: Easing.linear,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, []);
  return (
    <Animated.View
      style={{
        marginTop: 0,
        backgroundColor: '#fff',
        paddingHorizontal: 13,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
        height: height * 0.5,
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        borderWidth: 1,
        borderColor: '#eee',
        transform: [
          {
            translateY: _mount.interpolate({
              inputRange: [0, 1],
              outputRange: [height / 2, 0],
              extrapolate: 'clamp',
            }),
          },
        ],
      }}>
      <View style={{marginBottom: 10, marginTop: 10}}>
        <Text style={{textAlign: 'center', fontSize: 18}}>
          Previous payment
        </Text>
      </View>
      <ScrollView style={{flex: 1}}>
        {[1, 2, 4, 3, 4, 5, 6, 3, 2].map((item, index) => {
          return (
            <View
              key={index.toString()}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                marginBottom: 8,
              }}>
              <View>
                <Text style={[styles.labelText, {color: '#000', fontSize: 10}]}>
                  Paid on
                </Text>
                <Text style={[styles.actualTextStyle, {color: '#000'}]}>
                  {moment(item.paidOn).format('DD/MM/YYYY')}
                </Text>
              </View>
              <View>
                <Text style={[styles.labelText, {color: '#000', fontSize: 10}]}>
                  Amount
                </Text>
                <Text style={[styles.actualTextStyle, {color: '#000'}]}>
                  ₹ 500
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>

      <View
        style={{
          backgroundColor: '#eee',
          padding: 10,
          borderRadius: 50,
          marginBottom: 5,
        }}>
        <TouchableNativeFeedback
          onPress={() => {
            Animated.timing(_mount, {
              toValue: 0,
              easing: Easing.linear,
              duration: 200,
              useNativeDriver: true,
            }).start(() => {
              closeModal();
            });
          }}>
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
    </Animated.View>
  );
};
export default React.memo(PreviousPaymentHistory);

const styles = {};
