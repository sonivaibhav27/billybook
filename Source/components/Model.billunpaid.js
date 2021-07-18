import * as React from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import {Easing} from 'react-native-reanimated';
import Button from './Button';
import {Colors} from './Color';

const ModalUnPaidBill = () => {
  const aValue = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.timing(aValue, {
      toValue: 1,
      useNativeDriver: true,
      duration: 250,
      easing: Easing.linear,
    }).start();
  }, []);
  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: aValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0.3, 1],
            extrapolate: 'clamp',
          }),
        },
      ]}>
      <View style={styles.modalContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Unpay bill?</Text>
        </View>

        <Button
          text="last paid bill"
          backgroundColor={Colors.lightTomato}
          textColor={Colors.tomato}
          containerStyle={styles.marginTop}
        />
        <Button
          text="all paid bill"
          backgroundColor={Colors.lightTomato}
          textColor={Colors.tomato}
          containerStyle={styles.marginTop}
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    maxWidth: 500,
    padding: 8,
    borderRadius: 8,
    paddingBottom: 20,
  },
  headerContainer: {},
  headerTitle: {
    fontFamily: 'OpenSans-Bold',
    textAlign: 'center',
  },
  marginTop: {
    marginTop: 20,
    alignSelf: 'center',
    paddingHorizontal: 20,
  },
});

export default ModalUnPaidBill;
