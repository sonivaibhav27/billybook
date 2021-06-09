import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Keyboard,
  TouchableOpacity,
  Text,
  Platform,
  UIManager,
  LayoutAnimation,
  TextInput,
} from 'react-native';
import DatePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import NotifyManager from '../../NotificationConfig/NotifyService';
import {Entypo} from '../../components/Icons';
import {Colors} from '../../components/Color';
import Button from '../../components/Button';
import FormComponent from '../../components/Form';
import Header from '../../components/Header';
import {normalize} from '../../components/TextSize';
import {saveToDatabase} from '../../databases/helper';
import moment from 'moment';
if (Platform.OS == 'android') {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
class CreateBillScreen extends React.Component {
  state = {
    showActionButton: true,
    isCheckBoxChecked: false,
    selectedRepeat: 'days',
    billName: '',
    billAmount: '',
    remark: '',
    due: new Date(Date.now()),
    type: '',
    focus: false,
    showAnimation: false,
  };

  componentDidMount = () => {
    Keyboard.addListener('keyboardDidShow', this.keyboardShow);
    Keyboard.addListener('keyboardDidHide', this.keyboardHide);
  };

  componentWillUnmount() {
    Keyboard.removeAllListeners();
    // this.dbRef.close();
  }
  createScheduleNotification = () => {
    NotifyManager.createScheduleNotification();
  };

  keyboardShow = () => {};
  keyboardHide = () => {};

  createBill = () => {
    const {
      isCheckBoxChecked,
      selectedRepeat,
      showActionButton,
      billAmount,
      billName,
      due,
      remark,
      type,
    } = this.state;

    console.log(billAmount, billName, type, due);

    saveToDatabase(
      billName,
      Number(billAmount),
      Number(moment(due).format('YYYYMMDD')),
      remark,
      type,
    );
    this.setState({showAnimation: false});
  };

  onCheckBoxPress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({
      isCheckBoxChecked: !this.state.isCheckBoxChecked,
    });
  };

  dateFocus = () => {
    this.setState({focus: true});
  };
  render() {
    const {
      isCheckBoxChecked,
      selectedRepeat,
      showActionButton,
      billAmount,
      billName,
      due,
      remark,
      type,
    } = this.state;
    return (
      <View style={styles.container}>
        <Header headerText="Create Bill" isBackable />
        <ScrollView
          style={{
            marginTop: 30,
            marginBottom: 20,
            flex: 1,
          }}>
          <FormComponent
            value={billName}
            onChangeText={e => {
              this.setState({billName: e});
            }}
            // maxLength={15}
            label="Bill Name"
            isCompulsoryField
          />
          <FormComponent
            value={type}
            onChangeText={e => {
              this.setState({type: e});
            }}
            // maxLength
            label="Type"
            isCompulsoryField
          />
          <FormComponent
            value={billAmount}
            onChangeText={e => {
              this.setState({billAmount: e});
            }}
            // maxLength
            keyboardType="number-pad"
            label="Amount"
            isCompulsoryField
            maxLength={10}
          />
          <FormComponent
            value={moment(due).format('MMM D, YYYY')}
            // onChangeText={e => {
            //   this.setState({remark: e});
            // }}
            // maxLength
            label="Due on"
            date
            isDateFocus={this.dateFocus}
            isCompulsoryField
          />
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={this.onCheckBoxPress}
            style={styles.checkBoxContainer}>
            <View
              style={[
                styles.checboxInnerContainer,
                {
                  backgroundColor: isCheckBoxChecked
                    ? Colors.primary
                    : 'transparent',
                },
              ]}>
              {isCheckBoxChecked && (
                <Entypo name="check" size={12} color={'white'} />
              )}
            </View>
            <Text style={styles.repeatText}>Repeat</Text>
          </TouchableOpacity>
          {isCheckBoxChecked && (
            <View
              style={{
                marginHorizontal: 20,
                marginBottom: 20,
                flexDirection: 'row',
              }}>
              <View
                style={{
                  borderWidth: 0.5,
                  borderColor: Colors.primary,
                  marginLeft: 5,
                  borderRadius: 20,
                }}
              />
              <View
                style={{
                  paddingVertical: 5,
                  paddingHorizontal: 6,
                  backgroundColor: '#fff',
                  elevation: 2,
                  borderRadius: 8,
                  marginTop: 2,
                  borderBottomWidth: 2,
                  borderColor: Colors.primary,
                  flex: 1,
                  marginLeft: 10,
                }}>
                <Text
                  style={{
                    fontSize: normalize(12),
                    color: 'black',
                    fontFamily: 'Raleway-SemiBold',
                    letterSpacing: 0.8,
                    paddingVertical: 8,
                  }}>
                  Frequency
                </Text>
                <View
                  style={{
                    borderWidth: 0.8,
                    borderColor: '#eee',
                  }}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text>Every</Text>
                  <TextInput
                    keyboardType="number-pad"
                    style={{
                      borderColor: Colors.primary,
                      borderBottomWidth: 1,
                      fontSize: 14,
                      marginLeft: 5,
                    }}
                    maxLength={3}
                  />
                  <Picker
                    mode="dropdown"
                    style={{marginLeft: 20, width: 150, padding: 0}}
                    selectedValue={selectedRepeat}
                    onValueChange={(itemValue, itemIndex) =>
                      // setSelectedRepeat(itemValue)
                      this.setState({
                        selectRepeat: itemValue,
                      })
                    }>
                    <Picker.Item
                      fontFamily="Raleway-SemiBold"
                      value="day"
                      label="day(s)"
                    />
                    <Picker.Item
                      fontFamily="Raleway-SemiBold"
                      value="week"
                      label="week(s)"
                    />
                    <Picker.Item
                      fontFamily="Raleway-SemiBold"
                      value="month"
                      label="month(s)"
                    />
                    <Picker.Item
                      fontFamily="Raleway-SemiBold"
                      value="year"
                      label="year(s)"
                    />
                  </Picker>
                </View>
              </View>
            </View>
          )}
          <FormComponent
            value={remark}
            onChangeText={e => {
              this.setState({remark: e});
            }}
            maxLength={50}
            label="Remark"
          />
        </ScrollView>
        {this.state.focus && (
          <DatePicker
            value={due}
            onChange={(e, i) => {
              this.setState({
                due: i,
                focus: false,
              });
            }}
          />
        )}
        <View
          style={{
            backgroundColor: 'white',
            paddingVertical: 5,
            elevation: 10,
          }}>
          <Button
            onPress={this.createBill}
            backgroundColor={Colors.primary}
            textColor={'#fff'}
            text="Create Bill"
            style={{
              marginHorizontal: 10,
              width: 200,
              // alignSelf: 'center',
            }}
          />
          {/* <View>
            <TouchableOpacity onPress={this.createBill}>
              <Text>Create</Text>
            </TouchableOpacity>
          </View> */}
        </View>
        {this.state.showAnimation && (
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: 'rgba(255,255,255,1)',
              justifyContent: 'center',
              alignItems: 'center',
              // backgroundColor: 'black',
            }}>
            <Text
              style={{
                fontFamily: 'Raleway-Bold',
                fontSize: 23,
                color: '#555',
              }}>
              Bill Created Successfully
            </Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    // justifyContent: 'center',
  },
  checkBoxContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checboxInnerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 15,
    width: 15,
    borderWidth: 0.5,
  },
  repeatText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#333',
  },
});

export default CreateBillScreen;
