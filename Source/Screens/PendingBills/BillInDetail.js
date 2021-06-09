import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import moment from 'moment';
import {Colors} from '../../components/Color';
import Header from '../../components/Header';
import {Entypo} from '../../components/Icons';
import PaymentDate from '../../components/PaymentDate';
import {updateIsPaid} from '../../databases/helper';
import Loading from '../../components/Loading';
UIManager.setLayoutAnimationEnabledExperimental(true);
const BillInDetail = ({
  route: {
    params: {item, over, callFromPaid},
  },
  navigation,
}) => {
  const [selectedDetail, setSelectedDetail] = React.useState('Today');
  const [dateOpen, setDateOpen] = React.useState(false);
  const [paidInFull, setPaidInFull] = React.useState(false);
  // const [userPaid, setUserPaid] = React.useState(false);
  const [showDone, setShowDone] = React.useState(false);

  // console.log('Paidon=>', item.halfPaidDates);
  console.log('item=> ', item.bill_id);

  React.useEffect(() => {
    const get = async () => {
      const a = await item.getPaidDates;
      a.map(item => {
        console.log('A =>', item.intervalAmount);
      });
    };
    get();
  }, []);
  return (
    <View style={[styles.container]}>
      <Header headerText="payment detail " isBackable />
      <ScrollView
        style={{
          flex: 1,
          marginBottom: 75,
        }}
        contentContainerStyle={{}}>
        <View
          style={{
            marginTop: 20,
            borderRadius: 10,
            marginHorizontal: 20,
            padding: 15,
            // backgroundColor: userPaid ? '#c5fad5' : 'rgba(243, 83, 105, 0.2)',
            // elevation: 1,
            backgroundColor: '#fff',
            elevation: 2,
            borderLeftWidth: 4,
            borderColor: over ? Colors.tomato : Colors.primary,
            marginBottom: 10,
          }}>
          {/* <View
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              top: 0,
              backgroundColor: 'white',
              // zIndex: -4,
              // elevation: 5,
            }}
          /> */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text style={styles.labelText}>Bill Name</Text>
              <Text mul style={styles.actualTextStyle}>
                {item.billName}
              </Text>
            </View>
            <View style={{marginRight: 10}}>
              <Text style={[styles.labelText, {}]}>Type/Categories</Text>
              <Text style={styles.actualTextStyle}> {item.type}</Text>
            </View>
          </View>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{}}>
              <Text style={styles.labelText}>Due on</Text>
              <Text style={styles.actualTextStyle}>
                {' '}
                {moment(item.due).format('MMM D, YYYY')}
              </Text>
            </View>
            <View
              style={{
                backgroundColor:
                  item.paidOn !== null
                    ? 'lightgreen'
                    : 'rgba(243, 83, 105, 0.25)',
                paddingHorizontal: 15,
                marginTop: 10,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'flex-start',
                paddingVertical: 6,
                borderRadius: 3,
                // elevation: 0.3,
              }}>
              <Text style={[styles.labelText]}>Bill Amount</Text>
              <Text style={styles.actualTextStyle}>₹ {item.billAmount}</Text>
            </View>
          </View>
          {item.remark != null && (
            <View
              style={{
                borderWidth: 0.5,
                marginTop: 5,
                borderColor: '#eee',
              }}
            />
          )}
          {item.remark != null && (
            <View style={{marginTop: 10}}>
              <Text
                style={{
                  fontStyle: 'italic',
                  fontSize: 13,
                }}>
                Remark:<Text> {item.remark}</Text>
              </Text>
            </View>
          )}
        </View>
        {!callFromPaid && item.paidOn === null && (
          <PaymentDate totalAmount={item.billAmount} />
        )}
        {(item.paidOn !== null || callFromPaid) && (
          <View
            style={{
              marginTop: 20,
              marginHorizontal: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 10,
              backgroundColor: 'rgba(0, 171, 102, 0.8)',
              borderRadius: 8,
              paddingHorizontal: 13,
              paddingVertical: 15,
            }}>
            <View>
              <Text style={[styles.labelText, {color: 'white'}]}>Paid on</Text>
              <Text style={[styles.actualTextStyle, {color: 'white'}]}>
                {moment(item.paidOn).format('DD/MM/YYYY')}
              </Text>
            </View>
            <View>
              <Text style={[styles.labelText, {color: 'white'}]}>
                Paid Amount
              </Text>
              <Text style={[styles.actualTextStyle, {color: 'white'}]}>
                ₹ 500
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
      {!showDone && item.paidOn === null && !callFromPaid && (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: 10,
            backgroundColor: '#fff',
            elevation: 5,
            height: 70,
            zIndex: -3,
          }}>
          <TouchableOpacity
            onPress={() => {
              // updateIsPaid(item);
              setShowDone(true);
              updateIsPaid(item, () => {});
            }}
            style={{
              backgroundColor: Colors.primary,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              borderRadius: 50,
              paddingVertical: 10,
              paddingHorizontal: 15,
              width: 200,
              flexDirection: 'row',
            }}>
            <Entypo name="check" size={20} color="white" />
            <Text
              style={{
                fontSize: 20,
                color: '#fff',
                fontFamily: 'Raleway-SemiBold',
                top: -2.5,
                marginLeft: 10,
              }}>
              Mark as Paid
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {showDone && (
        <Loading
          closed={() => {
            setShowDone(false);
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.backgroundColor},
  labelText: {
    fontSize: 14,
    color: '#555',
    fontFamily: 'Raleway-Regular',
  },
  actualTextStyle: {
    fontSize: 18,
    maxWidth: 150,
    marginLeft: 2,
    fontFamily: 'Raleway-SemiBold',
    // fontWeight: '700',
    letterSpacing: 0.3,
    color: '#222',
    // textAlign: 'center',
  },
  extraDataContainer: {
    paddingTop: 13,
    flexDirection: 'row',
    alignItems: 'center',
  },
  paidOnContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
  },
  paidText: {
    borderRadius: 10,
    backgroundColor: '#eee',
    color: '#222',
    paddingHorizontal: 15,
    paddingVertical: 3,
    marginRight: 8,
    fontSize: 15,
  },
  paid: {
    fontWeight: '700',
    textTransform: 'uppercase',
    fontSize: 12,
  },
});
export default BillInDetail;
