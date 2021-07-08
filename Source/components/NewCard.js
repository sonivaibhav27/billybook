import * as React from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import moment from 'moment';
import {AntDesign} from './Icons';
import {useNavigation} from '@react-navigation/core';
import {BILL_IN_DETAIL} from './navigationTypes';
import {AppProvider} from './Provider';
import PressableButton from './PressableButton';
import {Colors} from './Color';
import {Easing} from 'react-native-reanimated';
import {deleteBill} from '../databases/realm.helper';
import BillSchema from '../DB/NewSch';
// import Animated, {
//   Easing,
//   interpolate,
//   useAnimatedStyle,
//   useSharedValue,
//   withTiming,
// } from 'react-native-reanimated';
const {width, height} = Dimensions.get('window');

const RowItem = React.memo(
  ({label, itemText, style, multiline = 1, ...rest}) => {
    return (
      <View style={[styles.rowContainer, style]}>
        <Text style={styles.rowLabel}>{label}</Text>
        <Text
          lineBreakMode="tail"
          numberOfLines={multiline}
          {...rest}
          style={styles.rowText}>
          {itemText}
        </Text>
      </View>
    );
  },
);

class _NewCard extends React.Component {
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

  componentDidUpdate(prevProps) {
    if (prevProps.item.billAmount !== this.props.item.billAmount) {
      this.setState({
        amountRefined: this.props.item.billAmount,
      });
    }
  }

  goToBillInDetail = () => {
    this.props.navigation.navigate(BILL_IN_DETAIL, {
      item: this.props.item,
      over: this.props.overdue,
    });
  };

  // const style = useAnimatedStyle(() => {
  //   return {
  //     transform: [
  //       {scale: interpolate(_mountAnimation.value, [0, 1], [0.8, 1])},
  //     ],
  //   };
  // });

  // shouldComponentUpdate = nextProps => {
  //   return nextProps.item !== this.props.item;
  // };

  delete = () => {
    Alert.alert('Delete', `want to delete bill ${this.props.item.billName}`, [
      {
        text: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => deleteBill(this.props.item, BillSchema),
      },
    ]);
  };
  render() {
    // console.log('Called New Card ...');
    const {item, overdue, isPaid} = this.props;
    return (
      <PressableButton
        onLongPress={this.delete}
        borderless={false}
        onPress={this.goToBillInDetail}
        style={[styles.container]}>
        <View style={{width: width * 0.5 - 20}}>
          <RowItem
            label="Bill Name"
            itemText={
              item.billName +
              ' asdasdshdjshdjhsjdhdjhjshdjhhfdhfjdhfjhdjfhfhdjhj'
            }
            style={{paddingRight: 5}}
          />
          <RowItem
            label={isPaid ? 'Paid On' : 'Due Date'}
            style={{marginTop: 10}}
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
            width: width * 0.5 - 20,
            flex: 1,
            justifyContent: 'space-between',
          }}>
          <View style={{flex: 1}}>
            <RowItem
              label="Bill Category"
              itemText={'Education eshdjhsjddsjjsdjksdksjdksjdksjdkj'}
            />
            <RowItem
              label="Amount"
              itemText={this.state.amountRefined}
              // numberOfLines={2}
              style={{marginTop: 10}}
            />
          </View>
          <View style={styles.buttonContainer}>
            <PressableButton
              // rippleColor={
              //   isPaid
              //     ? 'rgba(0, 171, 102, 0.8)'
              //     : overdue
              //     ? '#EA5A72'
              //     : '#2771C5'
              // }
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
      </PressableButton>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 2,
    paddingHorizontal: 10,
    marginVertical: 5,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    paddingVertical: 4,
    borderWidth: 0.2,
    borderColor: '#999',
    zIndex: -1,
    flex: 1,
  },
  rowContainer: {
    // height: height * 0.05,
  },
  rowLabel: {
    fontSize: 12,
    // fontWeight: '100',
    color: '#888',
    fontFamily: 'OpenSans-Light',
  },
  rowText: {
    fontSize: 16,
    color: '#121212',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red',
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

const NewCard = props => {
  const navigation = useNavigation();
  return <_NewCard navigation={navigation} {...props} />;
};

export default React.memo(NewCard);
