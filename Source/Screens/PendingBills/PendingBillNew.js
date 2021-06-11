import * as React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
  StatusBar,
  Alert,
  ScrollView,
  Animated,
  Easing,
} from 'react-native';
import {Colors} from '../../components/Color';
import {FontAwesome, AntDesign, Ionicons, Entypo} from '../../components/Icons';
import {heightToDp} from '../../components/Responsive';
import {ADD_NEW_BILL, SEARCH_SCREEN} from '../../components/navigationTypes';
import {databases} from '../../..';
import MenuModal from '../../components/MenuModal';
import {forwardRef} from 'react';
import BillSchema from '../../DB/NewSch';
import {
  closeDatabase,
  getAllDataFromRealm,
  getOverdueBills,
  returnPaginatedData,
  sortByDate,
  sortThisMonthBillByDate,
} from '../../databases/realm.helper';
import PressableButton from '../../components/PressableButton';
import FilteredSelection from '../../components/FilteredSelection';
import OptimizedFlatlist from '../../components/OptimizedFlatlist';
import LoadingIndicator from '../../components/LoadingIndicator';
import SortModal from '../../components/SortModal';
import {useNavigation} from '@react-navigation/core';
import moment from 'moment';
const {width, height} = Dimensions.get('window');
const topNavs = [
  {name: 'Pending Bills', bgColors: Colors.primary, ref: React.createRef()},
  {name: 'Overdue Bills', bgColors: Colors.tomato, ref: React.createRef()},
];

const IndicatorLine = ({scrollX, measures}) => {
  console.log(measures);
  // const line = useAnimatedStyle(() => {
  //   return {
  //     backgroundColor: interpolateColor(
  //       scrollX.value,
  //       [measures[0].x, measures[1].x],
  //       [Colors.primary, Colors.tomato],
  //     ),
  //     // width: measures[0].z,
  //   };
  // });
  // const style = useAnimatedStyle(() => {
  //   return {
  //     transform: [
  //       {
  //         translateX: withTiming(
  //           interpolate(
  //             scrollX.value,
  //             [0, width],
  //             [measures[0].x, measures[1].x + 10],
  //           ),
  //           {
  //             duration: 50,
  //             easing: Easing.linear,
  //           },
  //         ),
  //       },
  //     ],
  //     // width: interpolate(scrollX.value, []),
  //   };
  // });
  return (
    <Animated.View
      style={[
        styles.indicatorContainer,
        {
          transform: [
            {
              translateX: scrollX.interpolate({
                inputRange: [0, width],
                outputRange: [measures[0].x, measures[1].x + 10],
                extrapolate: 'clamp',
              }),
            },
          ],
        },
      ]}>
      <View style={[styles.indicator]} />
    </Animated.View>
  );
};

const Tab = React.forwardRef(
  ({name, onItemPress, index, overdueBadge, scrollX}, ref) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          onItemPress(index);
        }}
        ref={ref}
        key={name}>
        <Animated.Text style={[styles.topTabText]}>{name}</Animated.Text>
        {overdueBadge > 0 && name === 'Overdue Bills' && (
          <View style={styles.bagdeCountContainer}>
            <Text style={styles.badgeCount}>{overdueBadge}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  },
);

const Tabbb = ({scrollX, onItemPress, c, overdueBadge}) => {
  const containerRef = React.useRef();
  const [measures, setMeasure] = React.useState([]);

  const onLayout = () => {
    let m = [];
    if (containerRef.current) {
      topNavs.map(i => {
        i.ref?.current?.measureLayout(containerRef.current, (x, y, z, a) => {
          m.push({x, z});
          if (m.length == topNavs.length) {
            setMeasure(m);
          }
        });
      });
    }
  };
  return (
    <View onLayout={onLayout} style={styles.topNavContainer} ref={containerRef}>
      {topNavs.map((item, index) => {
        return (
          <Tab
            overdueBadge={overdueBadge}
            c={c}
            index={index}
            {...{onItemPress}}
            key={item.name}
            ref={item.ref}
            name={item.name}
            scrollX={scrollX}
          />
        );
      })}
      {measures.length > 0 && (
        <IndicatorLine measures={measures} scrollX={scrollX} />
      )}
    </View>
  );
};

const ListOfBills = React.memo(
  forwardRef(({sortingType, SCROLLAnimated}, scrollRef) => {
    const navigation = useNavigation();
    const [_lastStateScreenIndex, _setLastStateScreenIndex] = React.useState(0);
    const [data, setData] = React.useState([]);
    const [overdueBills, setOverDueBills] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [allData, setAllData] = React.useState([]);
    React.useEffect(() => {
      const d = getOverdueBills(BillSchema);
      let paginated = returnPaginatedData(0, 10, d);
      const allBillPendingData = sortByDate(
        BillSchema,
        sortingType.type,
        sortingType.technique,
      );

      let pgPendData = returnPaginatedData(0, 10, allBillPendingData);
      setData(pgPendData);
      setAllData(allBillPendingData);
      setOverDueBills(paginated);
      setLoading(false);
      // setAllOverdueData(d);
    }, [sortingType.technique, sortingType.type]);

    // React.useEffect(() => {
    //   if (showVisibility === 'This Month') {
    //     const d = sortThisMonthBillByDate(BillSchema, false);
    //     const paginated = returnPaginatedData(0, 10, d);
    //     console.log('Paginated Data =>,', paginated);
    //     setData(paginated);
    //     setLoading(false);
    //     setAllData(d);
    //   } else {
    //     console.log('Sort by date...');
    //     const d = sortByDate(BillSchema, false);
    //     const paginated = returnPaginatedData(0, 10, d);
    //     setAllData(d);
    //     setData(paginated);
    //     setLoading(false);
    //   }
    // }, [showVisibility]);

    React.useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        getAllDataFromRealm(BillSchema).addListener(billChangeListener);
      });

      return () => {
        const tasks = BillSchema.objects('Billl');
        tasks.removeAllListeners();
        // closeDatabase(BillSchema);
        unsubscribe();
      };
    }, [navigation]);

    const billChangeListener = (bill, changes) => {
      if (changes.insertions.length != 0) {
        const a = sortByDate(
          BillSchema,
          sortingType.type,
          sortingType.technique,
        );
        const paginated = returnPaginatedData(0, 10, a);
        setAllData(a);
        setData(paginated);
      }
    };
    const SIDE_MARGIN = 20;

    const deleteBill = React.useCallback(item => {
      Alert.alert('Delete', `Want to delete Bill ${item.billName}`, [
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
      ]);
    }, []);

    // const _listener = e => {
    //   const checkForScreenChange =
    //     e.nativeEvent.contentOffset.x / (width - SIDE_MARGIN);
    //   if (
    //     _lastStateScreenIndex !== checkForScreenChange &&
    //     isInt(checkForScreenChange)
    //   ) {
    //     _setLastStateScreenIndex(checkForScreenChange);
    //   }
    // };

    if (loading) {
      return <LoadingIndicator title="Loading Bills ..." />;
    }
    return (
      <View
        style={{
          marginHorizontal: 10,
          flex: 1,
        }}>
        <Animated.ScrollView
          ref={scrollRef}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: SCROLLAnimated,
                  },
                },
              },
            ],
            {useNativeDriver: true},
          )}
          // onScroll={_gestureAnimated}
          // onMomentumScrollEnd={_listener}
          decelerationRate={0.4}
          //   decelerationRate={0.8}
          //   onScrollEndDrag={_listener}
          horizontal
          snapToInterval={width - SIDE_MARGIN}
          snapToAlignment={'center'}
          disableIntervalMomentum
          showsHorizontalScrollIndicator={false}>
          {topNavs.map((_, index) => {
            if (index === 0) {
              return (
                <OptimizedFlatlist
                  key={index}
                  data={data}
                  allData={allData}
                  overdue={false}
                />
              );
            } else {
              return (
                <OptimizedFlatlist
                  key={index}
                  data={overdueBills}
                  overdue={true}
                  allData={[1]}
                  // allData={null}
                  // allOverdueData={allOverdueData}
                />
              );
            }
          })}
        </Animated.ScrollView>
      </View>
    );
  }),
);
const PendingBillNew = ({navigation}) => {
  // const scrollX = useSharedValue(0);
  const SCROLLAnimated = React.useRef(new Animated.Value(0)).current;
  const scrollRef = React.useRef();
  const [openMenuModal, setOpenMenuModal] = React.useState(false);
  const [showSortModal, setShowSortModal] = React.useState(false);
  const [sortingType, setSortingtype] = React.useState({
    technique: 'billAmount',
    type: true,
  });
  const navigateToCreateBillScreen = () => {
    navigation.navigate(ADD_NEW_BILL);
  };

  const onItemPress = React.useCallback(i => {
    scrollRef?.current.scrollTo({
      x: i * width - 20,
      animated: true,
    });
  });

  // const isSrollAnimated = useSharedValue(false);
  const closeMenuModal = React.useCallback(() => {
    setOpenMenuModal(false);
  }, []);

  // const btnStyle = useAnimatedStyle(() => {
  //   const t = withTiming(
  //     interpolate(
  //       isSrollAnimated.value,
  //       [true, false],
  //       [btnLayout, 0],
  //       Extrapolate.CLAMP,
  //     ),
  //     {
  //       duration: 50,
  //       easing: Easing.linear,
  //     },
  //   );
  //   return {
  //     transform: [{translateY: t}],
  //   };
  // });
  //check which is active screen.

  // const _btnSharedValue = uspeSharedValue(0);

  // const _gestureAnimated = useAnimatedScrollHandler({
  //   onScroll: e => {
  //     scrollX.value = e.contentOffset.x;
  //   },
  // });

  // const thisMonthOrAllCallback = React.useCallback(
  //   type => {
  //     if (type !== showVisibility) {
  //       setShowVisibility(type);
  //     }
  //     thisOrAllModalOnPress();
  //   },
  //   [showVisibility],
  // );

  const closeSortModal = React.useCallback(() => {
    setShowSortModal(false);
  }, []);

  // React.useEffect(() => {
  //   console.log('Visible Modal', visibleModal);
  //   Animated.timing(RNAnimated, {
  //     toValue: visibleModal === true ? 1 : 0,
  //     duration: 250,
  //     useNativeDriver: true,
  //     easing: Easing.inOut(Easing.linear),
  //   }).start();
  // }, [visibleModal]);

  const getSortPreferCallback = (technique, type) => {
    setSortingtype({
      technique,
      type,
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={Colors.backgroundColor}
        barStyle="dark-content"
      />

      {showSortModal && (
        <SortModal
          itemOnPress={getSortPreferCallback}
          closeSortModal={closeSortModal}
        />
      )}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>BillyBook</Text>
        <View
          style={{
            marginHorizontal: 20,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <PressableButton
            onPress={() => {
              setShowSortModal(a => !a);
            }}
            style={{
              flexDirection: 'row',
              padding: 10,
              borderRadius: 8,
            }}>
            <FontAwesome name="sort" size={20} color={'#000'} />
          </PressableButton>
          <PressableButton
            onPress={() => {
              navigation.navigate(SEARCH_SCREEN);
            }}
            style={{
              flexDirection: 'row',
              padding: 10,
              borderRadius: 8,
            }}>
            <AntDesign name="search1" color="#000" size={20} />
          </PressableButton>
          <PressableButton
            onPress={() => {
              setOpenMenuModal(true);
            }}
            style={{
              // flexDirection: 'row',
              padding: 10,
              borderRadius: 8,
            }}>
            <Entypo name="dots-three-vertical" color="#000" size={20} />
          </PressableButton>
        </View>
      </View>

      <Tabbb overdueBadge={0} scrollX={SCROLLAnimated} {...{onItemPress}} />

      {openMenuModal && <MenuModal {...{closeMenuModal}} />}
      <ListOfBills
        {...{sortingType}}
        ref={scrollRef}
        SCROLLAnimated={SCROLLAnimated}
      />
      <View style={[styles.createButtonWrapper]}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={navigateToCreateBillScreen}
          style={styles.addNewBillContainer}>
          <Entypo name="circle-with-plus" color="#FFF" size={30} />
          <Text style={styles.addNewBillText}>Add new bill</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
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
  topNavContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  topTabText: {
    fontFamily: 'OpenSans-Regular',
    marginHorizontal: 10,
    fontSize: 13,
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: -10,
    marginLeft: 10,
  },
  indicator: {
    height: 5,
    width: 40,
    backgroundColor: 'black',
    borderRadius: 50,
  },
  bagdeCountContainer: {
    backgroundColor: 'red',
    height: 20,
    width: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    top: -10,
  },
  badgeCount: {
    fontSize: 10,
    color: 'white',
  },
  createButtonWrapper: {
    paddingTop: 10,
    paddingBottom: 10,
    zIndex: 10,
    backgroundColor: '#f1f1f1',
  },
  addNewBillContainer: {
    backgroundColor: Colors.primary,
    borderRadius: 4,
    justifyContent: 'center',
    elevation: 2,
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  addNewBillText: {
    color: '#FFF',
    fontSize: 16,
    // fontWeight: 'bold',
    marginLeft: 10,
    fontFamily: 'OpenSans-Bold',
    // textTransform: 'uppercase',
  },
  paidContainer: {
    right: 10,
    position: 'absolute',
    backgroundColor: '#eee',
    paddingHorizontal: 10,
    paddingVertical: 5,
    top: -3,
    borderRadius: 30,
  },
  paidText: {
    fontSize: 15,
    color: '#222',
  },
});

// const EnhanceComponent = withObservables([], () => {
//   return {
//     pendingBillsObservers: observers(),
//     overdueBillObservers: overdueObserves(),
//     overdueCountObserver: overdueBillCountObservers(),
//     pendingThisMonthObserver: withObserveableThisMonthBill(),
//   };
// });
export default PendingBillNew;
