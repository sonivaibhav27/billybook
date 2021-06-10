import DatePicker from '@react-native-community/datetimepicker';
import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from 'react-native';
import BillSchema from '../DB/NewSch';
import moment from 'moment';
import {AntDesign, Entypo} from '../components/Icons';
import Card from '../components/Card';
import {Colors} from '../components/Color';
import Header from '../components/Header';
// import {betweenTwoDates, paidBills, paidCall} from '../databases/helper';
import {paidBills} from '../databases/realm.helper';
import TypeModal from '../components/TypeModal';
import NewCard from '../components/NewCard';
import LoadingIndicator from '../components/LoadingIndicator';

const data = ['Today', 'Yesterday', 'Last 15 Days', 'This Month', 'Custom'];
const Flat = ({data, loading}) => {
  const deleteBill = React.useCallback(item => {
    Alert.alert('Delete', `Want to delete Bill ${item.billName}`, [
      {
        text: 'Cancel',
        onPress: () => {},
      },
      {
        text: 'Delete',
        onPress: () => {
          // databases.action(async () => {
          //   await item.destroyPermanently();
          // });
        },
      },
    ]);
  }, []);
  return (
    <FlatList
      style={{marginTop: 10}}
      maxToRenderPerBatch={10}
      keyExtractor={(item, index) => index.toString()}
      data={data}
      ListEmptyComponent={() => {
        if (!loading) {
          return (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 60,
              }}>
              <Text style={{fontSize: 24}}>No Bills Here.</Text>
            </View>
          );
        }
        return null;
      }}
      renderItem={({item, index}) => {
        return (
          // <Card
          //   key={index}
          //   item={item}
          //   isCallFromPaidScreen
          //   deleteBill={deleteBill}
          // />
          <NewCard key={index.toString()} isPaid item={item} />
        );
      }}
    />
  );
};
export default class PaidScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
      filteredBillName: data[0],
      openModalState: false,
      showFromAndToDates: false,
      dateOpen: false,
      fromDate: {
        isSet: false,
        date: moment(),
      },
      isFromCalled: true,
      toDate: null,
    };
  }
  componentDidMount() {
    this._call();
  }
  _call = () => {
    const a = paidBills(0, BillSchema);
    console.log(a);
    this.setState({loading: false, data: a});
  };

  callback = async () => {
    this.setState({loading: true, data: []});
    const {filteredBillName} = this.state;
    if (filteredBillName === data[0]) {
      const a = await paidBills(0, BillSchema);
      this.setState({loading: false, data: a});
    }
    if (filteredBillName === data[1]) {
      const a = await paidBills(1, BillSchema);
      this.setState({loading: false, data: a});
    } else if (filteredBillName === data[2]) {
      const b = await paidBills(15, BillSchema);
      this.setState({loading: false, data: b});
    } else if (filteredBillName === data[3]) {
      const c = await paidBills(30, BillSchema);
      this.setState({loading: false, data: c});
    } else if (filteredBillName === data[4]) {
      // this.setState({
      //   showDateColumn: true,
      //   loading: false,
      // });

      this.setState({
        dateOpen: true,
      });
    }
  };
  openFilteredModal = () => {
    this.setState({openModalState: true});
  };

  closeOpenModalState = () => {
    this.setState({openModalState: false});
  };
  setType = item => {
    if (item !== this.state.filteredBillName) {
      this.setState({showFromAndToDates: false});
      if (item === data[4]) {
        this.setState({showFromAndToDates: true});
      }
      this.setState({filteredBillName: item}, () => this.callback());
    }
  };
  clearToDate = () => {
    this.setState({toDate: null});
  };

  getBetweenTwoDates = async () => {
    const {fromDate, toDate} = this.state;
    const d = await betweenTwoDates(fromDate.date, toDate);
    console.log(d);
    this.setState({
      data: d,
      loading: false,
    });
  };
  render() {
    const {
      filteredBillName,
      openModalState,
      showFromAndToDates,
      dateOpen,
      fromDate,
      isFromCalled,
      toDate,
    } = this.state;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.backgroundColor,
        }}>
        <Header headerText="Paid Bills" isBackable />
        {openModalState && (
          <View style={styles.modalContainer}>
            <TypeModal
              data={data}
              closeModal={this.closeOpenModalState}
              style={styles.modalStyle}
              setType={this.setType}
            />
          </View>
        )}
        <View>
          <TouchableOpacity
            activeOpacity={1}
            disabled={this.state.openModalState}
            onPress={this.openFilteredModal}
            style={styles.selectedFilterContainer}>
            <Text style={styles.selectedFilterText}>{filteredBillName}</Text>
            <Entypo
              name={openModalState ? 'chevron-up' : 'chevron-down'}
              size={20}
              color={'white'}
            />
          </TouchableOpacity>
          {showFromAndToDates && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                marginTop: 10,
                alignItems: 'center',
              }}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                  this.setState({dateOpen: true, isFromCalled: true});
                }}
                style={{
                  backgroundColor: fromDate.isSet ? '#444' : '#EEE',
                  padding: 10,
                  borderRadius: 50,
                  // borderBottomWidth: 1,
                  borderColor: Colors.primary,
                }}>
                <Text
                  style={{
                    color: fromDate.isSet ? '#fff' : '#111',
                    fontSize: 12,
                    marginRight: 5,
                  }}>
                  From:
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
              </TouchableOpacity>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  disabled={!fromDate.isSet}
                  onPress={() => {
                    this.setState({dateOpen: true, isFromCalled: false});
                  }}
                  style={{
                    backgroundColor: toDate !== null ? '#444' : '#EEE',
                    padding: 10,
                    borderRadius: 50,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: toDate !== null ? '#fff' : '#111',
                      fontSize: 12,
                    }}>
                    To{' '}
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
                </TouchableOpacity>
                {toDate !== null && (
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={this.clearToDate}
                    style={styles.toDateCrossContainer}>
                    <Entypo name="cross" color="white" size={20} />
                  </TouchableOpacity>
                )}
              </View>
              <View>
                <TouchableOpacity
                  onPress={this.getBetweenTwoDates}
                  disabled={!fromDate.isSet}
                  activeOpacity={1}
                  style={styles.goContainer}>
                  <Text style={styles.goText}>GO</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          <Flat loading={this.state.loading} data={this.state.data} />
        </View>
        {this.state.loading && <LoadingIndicator />}
        {dateOpen && (
          <DatePicker
            onChange={(s, e) => {
              if ((!fromDate.isSet || isFromCalled) && s.type !== 'dismissed') {
                this.setState({
                  fromDate: {
                    date: e,
                    isSet: true,
                  },
                  dateOpen: false,
                });
              } else if (
                fromDate.isSet &&
                s.type !== 'dismissed' &&
                !isFromCalled
              ) {
                this.setState({
                  toDate: e,
                  dateOpen: false,
                });
              }
            }}
            minimumDate={fromDate.isSet ? fromDate.date : new Date(1969, 0, 1)}
            value={new Date(Date.now())}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  selectedFilterContainer: {
    backgroundColor: '#222',
    alignSelf: 'center',
    paddingHorizontal: 20,
    borderRadius: 40,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  selectedFilterText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginRight: 5,
  },
  modalStyle: {
    padding: 10,
    alignSelf: 'center',
  },
  modalContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    // backgroundColor: 'black',
  },
  toDateCrossContainer: {
    marginLeft: 4,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 10,
    // position: 'absolute',
    // right: 0,
  },
  goContainer: {
    backgroundColor: '#000',
    padding: 8,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  goText: {
    color: '#fff',
  },
});