import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  FlatList,
  Alert,
  Dimensions,
  ActivityIndicator,
  Animated as RNAnimated,
} from 'react-native';
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  interpolateColor,
  interpolateNode,
  Transition,
  Transitioning,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  Value,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {AntDesign, Entypo, FontAwesome, Ionicons} from '../../components/Icons';
import Card from '../../components/Card';
import {Colors} from '../../components/Color';
import {
  ADD_NEW_BILL,
  NEW_PAID_SCREEN,
  SEARCH_SCREEN,
} from '../../components/navigationTypes';
import {normalize} from '../../components/TextSize';
import {heightToDp} from '../../components/Responsive';
import {Data} from '../../components/Data';
import Schema from '../../DB/NewSch';
import withObservables from '@nozbe/with-observables';
import {observers, overdueObserves} from '../../databases/helper';
import {databases} from '../../..';
import BillSchema from '../../DB/NewSch';

const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList);
const PendingBillScreen = ({navigation, pendingBills, overdueBills}) => {
  const [anyBillOpen, setAnyBillOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [lHeight, setLHeight] = React.useState(0);
  const [btnLayout, setButtonLayout] = React.useState(0);
  const [selectIndex, setSelectIndex] = React.useState(0);
  const {width: Device_Width} = Dimensions.get('window');
  React.useEffect(() => {
    // Realm.open().then(realm => {
    //   console.log(realm.objects('BillyBook'));
    // });
    // setData(
    //   Schema.objects('Billl')
    //     .filtered('due >= $0', new Date(Date.now()))
    //     .sorted('due'),
    // );
    // setOverDue(
    //   Schema.objects('Billl')
    //     .filtered('due < $0', new Date(Date.now()))
    //     .sorted('due'),
    // );
    // console.log(Schema.objects('Bill'));/
    if (selectIndex == 2) {
      navigation.navigate(NEW_PAID_SCREEN);
      setSelectIndex(0);
    }
  }, [selectIndex]);
  // NotifyManager.getAllChannel(channel => {
  //   if (channel.length == 0) {
  //     NotifyManager.createChannel(isChannelCreated => {
  //       console.log('Channel Created Successfully.');
  //     });
  //   }
  // });
  const navigateToCreateBillScreen = () => {
    // NotifyManager.createLocalNotification('Jai Shree Ram', 1);
    navigation.navigate(ADD_NEW_BILL);
    // Schema.objects('Bill').map(item => {
    //   console.log(item);
    // });
  };

  const setBillOpen = toggle => {
    setAnyBillOpen(toggle);
  };

  const sortBy = (type, a) => {
    // const datas = Schema.objects('Billl').sorted('billAmount', a);
    // ref.current.animateNextTransition();
    // setShowModal(false);
    // setData(datas);
  };

  // const animatedValue = useSharedValue(0);
  // const style = useAnimatedStyle(() => {
  //   const t = interpolate(
  //     animatedValue.value,
  //     [0, 1],
  //     [-lHeight, 0],
  //     Extrapolate.CLAMP,
  //   );
  //   return {
  //     transform: [{translateY: t}],
  //   };
  // });

  const isSrollAnimated = useSharedValue(false);
  const animatedScrollHandler = useAnimatedScrollHandler({
    onScroll: () => {
      isSrollAnimated.value = withTiming(true);
    },
    onMomentumEnd: () => {
      isSrollAnimated.value = withTiming(false);
    },
  });

  const btnStyle = useAnimatedStyle(() => {
    const t = interpolate(
      isSrollAnimated.value,
      [true, false],
      [btnLayout, 0],
      Extrapolate.CLAMP,
    );
    return {
      transform: [{translateY: t}],
    };
  });
  const trans = (
    <Transition.Sequence>
      <Transition.In type="fade" delayMs={100} />
      <Transition.Change interpolation="linear" />
      <Transition.Out type="fade" />
    </Transition.Sequence>
  );

  const ref = React.useRef();

  const buttonLayout = e => {
    setButtonLayout(e.nativeEvent.layout.height);
  };

  const _mount = useSharedValue(0);
  React.useEffect(() => {
    _mount.value = withDelay(
      0,
      withTiming(1, {
        duration: 350,
        easing: Easing.linear,
      }),
    );
  }, []);

  const _mountStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(_mount.value, [0, 1], [0, 1]),
    };
  });
  if (loading) {
    return <ActivityIndicator size="large" color="#000" />;
  }
  return (
    <Animated.View style={[_mountStyle, {flex: 1}]}>
      <View style={styles.container}>
        <StatusBar
          backgroundColor={Colors.backgroundColor}
          barStyle="dark-content"
        />

        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>BillyBook</Text>
          <View
            style={{
              marginHorizontal: 20,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                // ref?.current?.animateToNextTransition();
                // setShowModal(true);
                const v = animatedValue.value === 0 ? 1 : 0;
                animatedValue.value = withTiming(v);
              }}
              style={{
                flexDirection: 'row',
                // alignSelf: 'flex-start',
                padding: 10,
                borderRadius: 8,
              }}>
              <FontAwesome name="sort" size={20} color={'#000'} />
            </TouchableOpacity>
            {/* 
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                // alignSelf: 'flex-start',
                padding: 10,
                borderRadius: 8,
              }}>
              <AntDesign name="filter" size={20} color={'#000'} />
            </TouchableOpacity> */}
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                navigation.navigate(SEARCH_SCREEN);
              }}
              style={{
                flexDirection: 'row',
                // alignSelf: 'flex-start',
                padding: 10,
                borderRadius: 8,
              }}>
              <AntDesign name="search1" color="#000" size={20} />
            </TouchableOpacity>
          </View>
        </View>
        <Transitioning.View ref={ref} transition={trans}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal
            style={{paddingTop: 5}}>
            {[
              'Pending Bills',
              `Overdue Bills (${
                // overdueBills.length > 0 ? overdueBills.length : 0
                0
              })`,
              'Paid Bills',
              'Reports',
            ].map((item, index) => {
              return (
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    // ref.current.animateNextTransition();
                    setSelectIndex(index);
                  }}
                  style={{
                    borderWidth: index === selectIndex ? 0 : 1,
                    borderColor: index === selectIndex ? 'transparent' : '#ccc',
                    marginHorizontal: 10,

                    backgroundColor:
                      index == selectIndex && selectIndex == 1
                        ? Colors.tomato
                        : index === selectIndex
                        ? Colors.primary
                        : 'transparent',
                    elevation: index == selectIndex ? 3 : 0,
                    // ...o,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 100,
                  }}
                  key={item}>
                  <Text
                    style={{
                      color: index == selectIndex ? 'white' : '#555',
                      fontWeight: index == selectIndex ? 'bold' : 'normal',
                      letterSpacing: 0.6,
                      // fontFamily: 'Raleway-Regular',
                    }}>
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </Transitioning.View>
        <AnimatedFlatlist
          onScroll={animatedScrollHandler}
          // contentContainerStyle={{
          //   borderLeftWidth: 2,
          //   marginLeft: 15,
          //   borderColor: selectIndex == 1 ? Colors.tomato : Colors.primary,
          //   marginTop: 10,
          //   paddingBottom: 10,
          // }}
          data={pendingBills}
          keyExtractor={(_, inddex) => inddex.toString()}
          style={{flex: 1, marginTop: 8}}
          renderItem={({item, index}) => {
            return (
              <Card
                key={index.toString()}
                item={item}
                deleteBill={item => {
                  Alert.alert(
                    'Delete',
                    `Want to delete Bill ${item.billName}`,
                    [
                      {
                        text: 'Cancel',
                        onPress: () => {},
                      },
                      {
                        text: 'Delete',
                        onPress: () => {
                          databases.action(async () => {
                            await item.destroyPermanently();
                          });
                        },
                      },
                    ],
                  );
                }}
                over={selectIndex == 1}
                setBillOpen={setBillOpen}
                anyBillOpen={anyBillOpen}
              />
            );
          }}
        />

        <Animated.View
          onLayout={buttonLayout}
          style={[styles.createButtonWrapper, btnStyle]}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={navigateToCreateBillScreen}
            style={styles.addNewBillContainer}>
            <Ionicons name="receipt" color="#FFF" size={30} />
            <Text style={styles.addNewBillText}>Add new bill</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  createButtonWrapper: {
    paddingTop: 10,
    paddingBottom: 10,
    // elevation: 8,
    // backgroundColor: '#FFF',
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  addNewBillContainer: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 10,
    borderRadius: 100,
    justifyContent: 'center',
    minWidth: 100,
    paddingVertical: 10,
    alignSelf: 'center',

    flexDirection: 'row',
    elevation: 2,
    alignItems: 'center',
  },
  addNewBillText: {
    color: '#FFF',
    fontSize: normalize(14),
    // fontWeight: 'bold',
    marginLeft: 10,
    fontFamily: 'OpenSans-Bold',
    textTransform: 'uppercase',
  },
  headerContainer: {
    paddingVertical: 16,
    paddingLeft: 14,
    backgroundColor: Colors.backgroundColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: heightToDp('3.8%'),
    textTransform: 'uppercase',
    // fontWeight: 'bold',
    fontFamily: 'Raleway-Bold',
    letterSpacing: 1.05,
    color: '#000',
  },
});

const enhance = withObservables([], () => {
  return {
    pendingBills: observers(),
    overdueBills: overdueObserves(),
  };
});
export default enhance(PendingBillScreen);
