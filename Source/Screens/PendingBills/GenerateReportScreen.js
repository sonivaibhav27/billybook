import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  ScrollView,
} from 'react-native';
import DatePicker from '@react-native-community/datetimepicker';
import Header from '../../components/Header';
import {AntDesign, Entypo} from '../../components/Icons';
import {Colors} from '../../components/Color';
import moment from 'moment';
import Createcsvfile from '../../components/Createcsvfile';
import RadioButton from '../../components/RadioButton';
import PressableButton from '../../components/PressableButton';
const GenerateReportScreen = () => {
  const [fromDate, setFromDate] = React.useState({
    isSet: false,
    date: null,
  });
  const [toDate, setToDate] = React.useState(null);
  const [dateOpen, setDateOpen] = React.useState(false);
  const [isFromCalled, setIsFromCalled] = React.useState(false);
  const [predefinedReport, setPredefinedReport] = React.useState('Last Month');
  const [selectedRadio, setSelectedRadio] = React.useState('DA');
  const generatecsvfile = () => {
    // if (fromDate.date === null) {
    //   alert('From Date is necessary to generate report.');
    //   return;
    // }
    Createcsvfile();
  };

  const radioButtonCallback = React.useCallback(type => {
    setSelectedRadio(type);
  }, []);
  return (
    <View
      style={{
        backgroundColor: Colors.backgroundColor,
        flex: 1,
      }}>
      <Header headerText="Reports" isBackable />
      <ScrollView
        style={{flex: 1, marginBottom: 10}}
        style={styles.contentContainer}>
        <View>
          <Text style={styles.generateReportText}>Generate Report</Text>
          <Text
            style={{
              fontFamily: 'OpenSans-Regular',
              color: '#333',
              marginTop: 10,
              textAlign: 'center',
            }}>
            Report will contain only fully paid bills *
          </Text>
        </View>
        <View style={{marginTop: 20}}>
          <Text
            style={{
              fontFamily: 'OpenSans-SemiBold',
              fontSize: 18,
              marginBottom: 5,
            }}>
            Predefined
          </Text>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            <TouchableNativeFeedback>
              <View
                style={{
                  backgroundColor:
                    predefinedReport === 'Last Month' ? '#111' : '#EEE',
                  padding: 10,
                  marginRight: 10,
                  marginBottom: 10,
                }}>
                <Text
                  style={{
                    color: predefinedReport === 'Last Month' ? '#fff' : '#000',
                  }}>
                  Last Month
                </Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback>
              <View
                style={{
                  backgroundColor: '#EEE',
                  padding: 10,
                  marginRight: 10,
                  marginBottom: 10,
                }}>
                <Text>Last 3 Month</Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback>
              <View
                style={{
                  backgroundColor: '#EEE',
                  padding: 10,
                  marginRight: 10,
                  marginBottom: 10,
                }}>
                <Text>Last 6 Month</Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback>
              <View
                style={{
                  backgroundColor: '#EEE',
                  padding: 10,
                  //   marginTop: 8,
                  marginBottom: 10,
                }}>
                <Text>Last year</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
          <View
            style={{
              //   flexDirection: 'row',
              //   justifyContent: 'space-evenly',
              marginTop: 10,
              //   alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'OpenSans-SemiBold',
                fontSize: 18,
                marginBottom: 5,
              }}>
              Custom
            </Text>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                // this.setState({dateOpen: true, isFromCalled: true});
                setDateOpen(true);
                setPredefinedReport('');
                setIsFromCalled(true);
              }}
              style={{
                backgroundColor: fromDate.isSet ? '#222' : '#EEE',
                padding: 10,
                // borderRadius: 50,
                // borderBottomWidth: 1,
                borderColor: Colors.primary,
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: fromDate.isSet ? '#fff' : '#111',
                  fontSize: 20,
                  //   fontWeight: 'bold',
                  paddingLeft: 20,
                  fontFamily: 'OpenSans-SemiBold',
                }}>
                From
              </Text>
              <View style={{}}>
                <Text
                  style={{
                    color: fromDate.isSet ? '#fff' : '#111',
                    fontSize: 20,
                    fontFamily: 'OpenSans-SemiBold',
                  }}>
                  {' '}
                  {fromDate.isSet ? (
                    moment(fromDate.date).format('DD/MM/YYYY')
                  ) : (
                    <AntDesign
                      // style={{marginLeft: 10}}
                      color="#000"
                      size={20}
                      name="calendar"
                    />
                  )}
                </Text>
              </View>
            </TouchableOpacity>
            <View style={{marginTop: 5}}>
              <TouchableOpacity
                activeOpacity={0.9}
                disabled={!fromDate.isSet}
                onPress={() => {
                  //   this.setState({dateOpen: true, isFromCalled: false});
                  setDateOpen(true);
                  setIsFromCalled(false);
                }}
                style={{
                  backgroundColor: toDate !== null ? '#222' : '#EEE',
                  padding: 10,
                  //   borderRadius: 50,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    color: toDate !== null ? '#fff' : '#111',
                    fontSize: 20,
                    // fontWeight: 'bold',
                    paddingLeft: 20,
                    fontFamily: 'OpenSans-SemiBold',
                  }}>
                  To{' '}
                </Text>
                <View>
                  <Text
                    style={{
                      color: fromDate.isSet ? '#fff' : '#111',
                      fontSize: 20,
                    }}>
                    {toDate !== null ? (
                      moment(toDate).format('DD/MM/YYYY')
                    ) : (
                      <AntDesign
                        // style={{marginLeft: 10}}
                        color="#000"
                        size={20}
                        name="calendar"
                      />
                    )}
                  </Text>
                </View>
              </TouchableOpacity>
              {toDate !== null && (
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {}}
                  style={styles.toDateCrossContainer}>
                  <Entypo name="cross" color="white" size={20} />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
        <View style={{marginTop: 20, marginBottom: 30}}>
          <View style={{marginBottom: 10}}>
            <Text style={{fontFamily: 'OpenSans-SemiBold'}}>Get Report By</Text>
          </View>
          <RadioButton
            onPress={radioButtonCallback}
            isSelected={selectedRadio === 'DA'}
            label={'Date'}
            operation={'DA'}
          />
          <RadioButton
            onPress={radioButtonCallback}
            isSelected={selectedRadio === 'DD'}
            label={'Date'}
            asc={false}
            operation={'DD'}
          />
          <RadioButton
            onPress={radioButtonCallback}
            isSelected={selectedRadio === 'AA'}
            label={'Amount'}
            operation={'AA'}
          />
          <RadioButton
            onPress={radioButtonCallback}
            isSelected={selectedRadio === 'AD'}
            label={'Amount'}
            asc={false}
            operation={'AD'}
          />
        </View>
      </ScrollView>
      {dateOpen && (
        <DatePicker
          onChange={(s, e) => {
            if ((!fromDate.isSet || isFromCalled) && s.type !== 'dismissed') {
              setFromDate({
                date: e,
                isSet: true,
              });
              setDateOpen(false);
            } else if (
              fromDate.isSet &&
              s.type !== 'dismissed' &&
              !isFromCalled
            ) {
              setToDate(e);
              setDateOpen(false);
            } else {
              setDateOpen(false);
            }
          }}
          minimumDate={
            fromDate.isSet && !isFromCalled
              ? fromDate.date
              : new Date(1969, 0, 1)
          }
          value={new Date(Date.now())}
        />
      )}

      <View
        style={{
          paddingHorizontal: 20,
          paddingBottom: 20,
          backgroundColor: Colors.backgroundColor,
          //   marginTop: 30,
        }}>
        <View style={{borderRadius: 50, overflow: 'hidden'}}>
          <TouchableNativeFeedback onPress={() => {}}>
            <View
              style={{
                backgroundColor: '#008000',
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 50,
              }}>
              <Text
                style={{
                  fontSize: 20,
                  color: '#fff',
                }}>
                &#x25a6; Generate CSV file
              </Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 20,
  },
  generateReportText: {
    fontSize: 20,
    // fontWeight: 'bold',
    fontFamily: 'OpenSans-Bold',
  },
});
export default GenerateReportScreen;
