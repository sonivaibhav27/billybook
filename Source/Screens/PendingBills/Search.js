import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import moment from 'moment';
import {AntDesign} from '../../components/Icons';
import {Colors} from '../../components/Color';
import NewCard from '../../components/NewCard';
import {
  getAllDataFromRealm,
  returnPaginatedData,
  sortByDate,
} from '../../databases/realm.helper';
import BillSchema from '../../DB/NewSch';
import PressableButton from '../../components/PressableButton';
import OptimizedFlatlist from '../../components/OptimizedFlatlist';
import LoadingIndicator from '../../components/LoadingIndicator';

const Search = ({data, allData}) => {
  React.useEffect(() => {}, []);
  const todayDate = Number(moment().format('YYYYMMDD'));
  const renderBills = ({item}) => {
    return <NewCard item={item} overdue={item.due < todayDate} />;
  };
  return (
    <View style={{flex: 1, zIndex: -10, alignItems: 'center'}}>
      <OptimizedFlatlist
        style={{flex: 1}}
        allData={allData}
        data={data}
        renderItem={renderBills}
      />
    </View>
  );
};

const SearchBillScreen = ({navigation}) => {
  const [data, setData] = React.useState([]);
  const [allData, setAllData] = React.useState([]);
  const [searchText, setSearchText] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    getData();
  }, []);
  const goBack = () => {
    navigation.goBack();
  };

  const getData = async () => {
    const data = await sortByDate(BillSchema, false);
    const paginatedData = returnPaginatedData(0, 10, data);
    console.log('Data', data);
    setAllData(data);
    setData(paginatedData);
    setLoading(false);
  };

  const changeText = async e => {
    setSearchText(e);
    const trimmedUserData = e.trim();
    setLoading(true);
    const data = getAllDataFromRealm(BillSchema).filtered(
      'billName CONTAINS[c] $0',
      trimmedUserData,
    );
    setAllData(data);
    const paginatedData = returnPaginatedData(0, 10, data);
    setData(paginatedData);
    setLoading(false);
  };
  if (loading) {
    return <LoadingIndicator title="Loading Bills..." />;
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <PressableButton onPress={goBack}>
          <AntDesign name="arrowleft" size={25} />
        </PressableButton>
        <TextInput
          autoFocus
          style={styles.textInput}
          placeholder="Search Bills..."
          value={searchText}
          placeholderTextColor="#555"
          onChangeText={changeText}
        />
      </View>
      {allData.length != 0 ? (
        <Search
          emptyList={allData.length == 0}
          allData={allData}
          data={data}
          searchText={searchText}
        />
      ) : (
        <View style={styles.centerContent}>
          <Text style={styles.emptyBillText}>
            No Bills Found for -{' '}
            <Text style={{fontWeight: '700', fontSize: 18}}>{searchText}</Text>
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 5,
    marginTop: 8,
    // elevation: 1,
    borderBottomWidth: 1,
    borderColor: '#EEE',
    paddingHorizontal: 10,
  },
  textInput: {
    // backgroundColor: 'white',
    // elevation: 0.2,
    fontSize: 16,
    flex: 1,
    paddingHorizontal: 10,
    color: '#222',
    // zIndex: 1000,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  emptyBillText: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'OpenSans-SemiBold',
    textAlign: 'center',
  },
});
export default SearchBillScreen;
