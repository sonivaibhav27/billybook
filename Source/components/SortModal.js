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
import {AntDesign, Entypo} from './Icons';
import PressableButton from './PressableButton';

const {height} = Dimensions.get('window');

const ICON_SIZE = 20;
function Item({label, up = true, onPress, closeModal, ...rest}) {
  const itemPress = () => {
    onPress(
      label === 'Date' ? 'due' : 'billAmount',
      up === true ? true : false,
    );
    closeModal();
  };
  return (
    <PressableButton
      onPress={itemPress}
      rippleColor="#999"
      {...rest}
      borderless={false}>
      <Text
        style={{
          fontFamily: 'Raleway-Medium',
          fontSize: 18,
          padding: 10,
          textAlign: 'center',
        }}>
        {label}{' '}
        {up ? (
          <AntDesign name="arrowup" size={ICON_SIZE} />
        ) : (
          <AntDesign name="arrowdown" size={ICON_SIZE} />
        )}
      </Text>
    </PressableButton>
  );
}

export default function SortModal({closeSortModal, itemOnPress}) {
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
      duration: 250,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      closeSortModal();
    });
  };
  return (
    <Animated.View
      style={[
        styles.container,
        {
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
      <View style={styles.headerContainer}>
        <Text style={styles.sortText}>Sort By</Text>
        <TouchableOpacity
          //   onPress={() => {
          //     animatedValue.value = withTiming(0);
          //   }}
          onPress={onPress}
          activeOpacity={0.9}
          hitSlop={styles.hitSlop}
          style={{position: 'absolute', top: 5, right: 10}}>
          <Entypo name="cross" size={30} />
        </TouchableOpacity>
      </View>

      <Item
        closeModal={closeSortModal}
        onPress={itemOnPress}
        label="Date"
        style={{marginTop: 10}}
      />
      <Item
        closeModal={closeSortModal}
        onPress={itemOnPress}
        label="Date"
        up={false}
      />

      <Item closeModal={closeSortModal} onPress={itemOnPress} label="Amount" />
      <Item
        closeModal={closeSortModal}
        onPress={itemOnPress}
        label="Amount"
        up={false}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    padding: 10,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    zIndex: 100,
    position: 'absolute',
    right: 0,
    left: 0,
    // height: height * 0.3,
    bottom: 0,
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  sortText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#000',
    fontWeight: 'bold',
  },
  hitSlop: {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10,
  },
});
