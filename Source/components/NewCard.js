import * as React from 'react';
import {
  Alert,
  Dimensions,
  NativeModules,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import moment from 'moment';
import {AntDesign} from './Icons';
import {useNavigation} from '@react-navigation/core';
import {ADD_NEW_BILL, BILL_IN_DETAIL} from './navigationTypes';
import PressableButton from './PressableButton';
import {deleteBill} from '../databases/realm.helper';
import BillSchema from '../DB/NewSch';
import {Colors} from './Color';
import {useContext} from 'react';
import {AppProvider} from './Provider';

const {width} = Dimensions.get('window');

const nativeModule = NativeModules.MoneyFormat;
const RowItem = ({label, itemText, style, multiline = 1, ...rest}) => {
  return (
    <View style={[styles.rowContainer, style]}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text
        lineBreakMode="tail"
        numberOfLines={multiline}
        {...rest}
        style={[styles.rowText, label == 'Amount' && {fontWeight: 'bold'}]}>
        {itemText}
      </Text>
    </View>
  );
};

class _NewCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amountRefined: props.item.billAmount,
    };
  }

  setAmountWithCurrency = () => {
    nativeModule.getCurrency(
      this.props.item.billAmount,
      this.props.appContext.asyncItem.currency,
      amount => {
        this.setState({
          amountRefined: `${
            this.props.appContext.asyncItem.currencySymbol
          }${amount.slice(1)}`,
        });
      },
    );
  };
  componentDidMount() {
    this.setAmountWithCurrency();
  }

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

  editBill = () => {
    this.props.navigation.navigate(ADD_NEW_BILL, {
      title: 'Edit Bill',
      bill: this.props.item,
    });
  };

  shouldComponentUpdate = nextProps => {
    const {item} = this.props;

    if (
      item.billName === nextProps.item.billName &&
      item.paidDates.length === nextProps.item.paidDates.length &&
      item.billAmount === nextProps.item.billAmount &&
      typeof this.state.amountRefined === 'string' &&
      this.state.amountRefined
        .slice(0, nextProps.appContext.asyncItem.currencySymbol.length)
        .toLowerCase() ==
        nextProps.appContext.asyncItem.currencySymbol.toLowerCase()
    ) {
      return false;
    }
    this.setAmountWithCurrency();
    return true;
  };

  render() {
    const {item, overdue, isPaid} = this.props;
    return (
      <PressableButton
        disabled={isPaid}
        onLongPress={this.delete}
        borderless={false}
        onPress={this.editBill}
        style={[styles.container]}>
        <View style={{width: width * 0.5 - 20}}>
          <RowItem
            label="Bill Name"
            itemText={item.billName}
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
            <RowItem label="Bill Category" itemText={item.type} />
            <RowItem
              label="Amount"
              itemText={this.state.amountRefined}
              // numberOfLines={2}
              style={{marginTop: 10}}
            />
          </View>
          <View style={styles.buttonContainer}>
            <PressableButton
              onPress={this.goToBillInDetail}
              style={[
                styles.button,
                {
                  backgroundColor: isPaid
                    ? 'rgba(0, 171, 102, 0.8)'
                    : overdue
                    ? '#EA5A72'
                    : item.paidDates.length != 0
                    ? '#ffb101'
                    : // : '#2771C5',
                      Colors.primary,
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
    paddingVertical: 4,
    borderWidth: 0.2,
    borderColor: '#999',
    zIndex: -1,
    // height: height * 0.13,
    justifyContent: 'space-between',
  },
  rowLabel: {
    fontSize: 10,
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
  const appContext = useContext(AppProvider);
  return (
    <_NewCard appContext={appContext} navigation={navigation} {...props} />
  );
};

// export default React.memo(NewCard);
export default NewCard;
