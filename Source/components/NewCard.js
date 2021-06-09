import * as React from 'react';
import {Animated, Dimensions, StyleSheet, Text, View} from 'react-native';
import moment from 'moment';
import {AntDesign} from './Icons';
import {useNavigation} from '@react-navigation/core';
import {BILL_IN_DETAIL} from './navigationTypes';
import {AppProvider} from './Provider';
import PressableButton from './PressableButton';
import {Colors} from './Color';
import {Easing} from 'react-native-reanimated';
// import Animated, {
//   Easing,
//   interpolate,
//   useAnimatedStyle,
//   useSharedValue,
//   withTiming,
// } from 'react-native-reanimated';
const {width, height} = Dimensions.get('window');

const RowItem = React.memo(({label, itemText, style, ...rest}) => {
  return (
    <View style={[styles.rowContainer, style]}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text
        lineBreakMode="tail"
        numberOfLines={1}
        {...rest}
        style={styles.rowText}>
        {itemText}
      </Text>
    </View>
  );
});

class NewCard extends React.Component {
  // const navigation = useNavigation();
  constructor(props) {
    super(props);
    this.state = {
      amountRefined: props.item.billAmount,
    };
  }

  // const userPreferences = React.useContext(AppProvider);
  // const _mountAnimation = useSharedValue(0);

  // _mountAnimation.value = withTiming(1, {
  //   duration: 300,
  //   easing: Easing.inOut(Easing.ease),
  // });
  // React.useEffect(() => {
  //   // nativeModule.getCurrency(item.billAmount, 'EUR', amount => {
  //   //   setAmountRefined(amount);
  //   // });
  //   // setAmountRefined(
  //   //   `${userPreferences.asyncItem.currency} ${item.billAmount
  //   //     .toFixed(2)
  //   //     .replace(/\d(?=(\d{3})+\.)/g, '$&,')}`,
  //   // );
  // }, [userPreferences]);

  goToBillInDetail = () => {
    navigation.navigate(BILL_IN_DETAIL, {
      item,
      over: overdue,
    });
  };

  // const style = useAnimatedStyle(() => {
  //   return {
  //     transform: [
  //       {scale: interpolate(_mountAnimation.value, [0, 1], [0.8, 1])},
  //     ],
  //   };
  // });

  shouldComponentUpdate = nextProps => {
    return nextProps.item !== this.props.item;
  };
  render() {
    // console.log('Called New Card ...');
    const {item, overdue, isPaid} = this.props;
    return (
      <View style={[styles.container]}>
        <View style={{flexDirection: 'row'}}>
          <RowItem
            label="Bill Name"
            itemText={item.billName}
            style={{width: width * 0.5, paddingRight: 5}}
          />
          <RowItem
            label={isPaid ? 'Paid On' : 'Due Date'}
            itemText={
              isPaid
                ? moment(item.paidOn, 'YYYYMMDD').format('MMM D, YYYY')
                : moment(item.due, 'YYYYMMDD').format('MMM D, YYYY')
            }
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginTop: 15,
          }}>
          <RowItem
            label="Bill Category"
            itemText={item.type}
            style={{width: width * 0.5}}
          />
          <RowItem
            label="Amount"
            itemText={this.state.amountRefined}
            numberOfLines={2}
          />

          <View style={styles.buttonContainer}>
            <PressableButton
              rippleColor={
                isPaid
                  ? 'rgba(0, 171, 102, 0.8)'
                  : overdue
                  ? '#EA5A72'
                  : '#2771C5'
              }
              onPress={this.goToBillInDetail}
              style={[
                styles.button,
                {
                  backgroundColor: isPaid
                    ? 'rgba(0, 171, 102, 0.8)'
                    : overdue
                    ? '#EA5A72'
                    : '#2771C5',
                },
              ]}>
              <AntDesign color="#fff" size={20} name="arrowright" />
            </PressableButton>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    backgroundColor: '#fff',
    elevation: 1,
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
  },
  rowContainer: {
    height: height * 0.05,
  },
  rowLabel: {
    fontSize: 12,
    fontWeight: '100',
    color: '#707070',
  },
  rowText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#121212',
  },
  buttonContainer: {
    position: 'absolute',
    right: 0,
    bottom: 20,
  },
  button: {
    backgroundColor: '#2771C5',
    height: 40,
    width: 40,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default React.memo(NewCard);
