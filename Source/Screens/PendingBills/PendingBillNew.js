import * as React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
  Animated,
} from 'react-native';
import {Colors} from '../../components/Color';
import {FontAwesome, AntDesign, Entypo} from '../../components/Icons';
import {heightToDp} from '../../components/Responsive';
import {ADD_NEW_BILL, SEARCH_SCREEN} from '../../components/navigationTypes';
import MenuModal from '../../components/MenuModal';
import {forwardRef} from 'react';
import BillSchema from '../../DB/NewSch';
import {
  getAllDataFromRealm,
  getOverdueBills,
  OverdueBillCount,
  returnPaginatedData,
  sortByDate,
} from '../../databases/realm.helper';

import PressableButton from '../../components/PressableButton';
import OptimizedFlatlist from '../../components/OptimizedFlatlist';
import LoadingIndicator from '../../components/LoadingIndicator';
import SortModal from '../../components/SortModal';
import {useNavigation} from '@react-navigation/core';
import {AppProvider} from '../../components/Provider';
const {width} = Dimensions.get('window');
const topNavs = [
  {name: 'Pending Bills', bgColors: Colors.primary, ref: React.createRef()},
  {name: 'Overdue Bills', bgColors: Colors.tomato, ref: React.createRef()},
];

const IndicatorLine = React.memo(({scrollX, measures}) => {
  return (
    <Animated.View
      style={[
        styles.indicatorContainer,
        {
          transform: [
            {
              translateX: scrollX.interpolate({
                inputRange: [0, width],
                outputRange: [measures[0].left, measures[1].left + 10],
                extrapolate: 'clamp',
              }),
            },
          ],
        },
      ]}>
      <View style={[styles.indicator]} />
    </Animated.View>
  );
});

const Tab = React.forwardRef(
  ({name, onItemPress, index, overdueBadge}, ref) => {
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

const Tabbb = React.memo(({scrollX, onItemPress, c, overdueBadge}) => {
  const containerRef = React.useRef();
  const [measures, setMeasure] = React.useState([]);

  const onLayout = () => {
    let m = [];
    if (containerRef.current) {
      topNavs.map(i => {
        i.ref?.current?.measureLayout(containerRef.current, (left, top) => {
          m.push({left, top});
          if (m.length === topNavs.length) {
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
});

const ListOfBills = React.memo(
  forwardRef(
    ({sortingType, SCROLLAnimated, setUserMontlyExpenseProp}, scrollRef) => {
      const navigation = useNavigation();
      const timeout = React.useRef();
      const isMounted = React.useRef(true);
      const [data, setData] = React.useState([]);
      const [overdueBills, setOverDueBills] = React.useState([]);
      const [loading, setLoading] = React.useState(true);
      const [allData, setAllData] = React.useState([]);
      const [allOverdueData, setAllOverdueData] = React.useState([]);

      const _calculateMontlyExpense = (data: Array) => {
        const sumBillAmount = data.reduce((acc, current) => {
          return acc + current.billAmount;
        }, 0);
        setUserMontlyExpenseProp(sumBillAmount);
      };
      const getBills = async () => {
        setLoading(true);
        const d = await getOverdueBills(BillSchema);
        let paginated = returnPaginatedData(0, 10, d);
        const allBillPendingData = await sortByDate(
          BillSchema,
          sortingType.type,
          sortingType.technique,
        );

        let pgPendData = returnPaginatedData(0, 10, allBillPendingData);
        setData(pgPendData);
        setAllData(allBillPendingData);
        setAllOverdueData(d);
        setOverDueBills(paginated);
        timeout.current = setTimeout(() => {
          setLoading(false);
        });
        _calculateMontlyExpense(allBillPendingData);
      };
      React.useEffect(() => {
        (async function () {
          await getBills();
        })();
        const unsubscribeFromNavigationEvent = navigation.addListener(
          'focus',
          () => {
            getAllDataFromRealm(BillSchema).addListener(billChangeListener);
          },
        );
        return () => {
          clearTimeout(timeout?.current);
          unsubscribeFromNavigationEvent();
          BillSchema.removeListener('change', billChangeListener);
        };
      }, [sortingType.technique, sortingType.type, navigation]);

      const billChangeListener = (_, changes) => {
        if (
          changes.insertions.length != 0 ||
          changes.modifications.length != 0
        ) {
          getBills();
        } else if (changes.deletions.length != 0) {
          getBills();
        }
      };
      const SIDE_MARGIN = 20;
      if (loading) {
        return <LoadingIndicator title="Loading Bills ..." />;
      }
      return (
        <View
          style={{
            marginHorizontal: 10,
            flex: 1,
            marginBottom: 65,
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
            decelerationRate={0.4}
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
                    allData={allOverdueData}
                  />
                );
              }
            })}
          </Animated.ScrollView>
        </View>
      );
    },
  ),
);
const PendingBillNew = ({navigation}) => {
  const SCROLLAnimated = React.useRef(new Animated.Value(0)).current;
  const scrollRef = React.useRef();
  const [openMenuModal, setOpenMenuModal] = React.useState(false);
  const [showSortModal, setShowSortModal] = React.useState(false);
  const [userMontlyExpense, setUserMontlyExpense] = React.useState(null);
  const {asyncItem} = React.useContext(AppProvider);
  const [sortingType, setSortingtype] = React.useState({
    technique: 'due',
    type: false,
  });
  const navigateToCreateBillScreen = () => {
    navigation.navigate(ADD_NEW_BILL, {
      title: 'Create Bill',
      bill: null,
    });
  };

  const onItemPress = React.useCallback(i => {
    scrollRef?.current.scrollTo({
      x: i * width - 20,
      animated: true,
    });
  }, []);

  const closeMenuModal = React.useCallback(() => {
    setOpenMenuModal(false);
  }, []);

  const calculateUserMontlyExpenseCallback = amount => {
    setUserMontlyExpense(amount);
  };

  const closeSortModal = React.useCallback(() => {
    setShowSortModal(false);
  }, []);

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
        <View style={styles.headerTitleAndMoneyContainer}>
          <Text style={styles.headerText}>BillyBook</Text>
          {!!userMontlyExpense && (
            <Text style={styles.userExpenseText}>
              {asyncItem.currencySymbol}
              {userMontlyExpense}
            </Text>
          )}
        </View>
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
        setUserMontlyExpenseProp={calculateUserMontlyExpenseCallback}
        sortingType={sortingType}
        ref={scrollRef}
        SCROLLAnimated={SCROLLAnimated}
      />
      <View style={[styles.createButtonWrapper]}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={navigateToCreateBillScreen}
          style={styles.addNewBillContainer}>
          <Text style={styles.addNewBillText}>Add new bill</Text>
          <Entypo name="chevron-small-right" color="#FFF" size={30} />
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
  headerTitleAndMoneyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userExpenseText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#D2042D',
  },
  headerText: {
    fontSize: 20,
    textTransform: 'lowercase',
    fontFamily: 'OpenSans-Bold',
    color: '#000',
  },
  topNavContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  topTabText: {
    fontFamily: 'OpenSans-SemiBold',
    marginHorizontal: 10,
    fontSize: 13,
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: -10,
    marginLeft: 10,
  },
  indicator: {
    height: 4,
    width: 40,
    backgroundColor: Colors.primary,
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
    backgroundColor: Colors.backgroundColor,
    bottom: 0,
    right: 0,
    left: 0,
    position: 'absolute',
  },
  addNewBillContainer: {
    backgroundColor: Colors.primary,
    borderRadius: 40,
    justifyContent: 'center',
    elevation: 0,
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  addNewBillText: {
    color: '#FFF',
    fontSize: 16,
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

export default PendingBillNew;
