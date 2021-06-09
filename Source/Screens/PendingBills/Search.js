import React from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import moment from 'moment';
// import Animated, {Easing} from 'react-native-reanimated';
import {AntDesign} from '../../components/Icons';
import {Colors} from '../../components/Color';
import NewCard from '../../components/NewCard';
import {getAllBillForSearch} from '../../databases/realm.helper';
import BillSchema from '../../DB/NewSch';
import PressableButton from '../../components/PressableButton';
import OptimizedFlatlist from '../../components/OptimizedFlatlist';
import LoadingIndicator from '../../components/LoadingIndicator';

const {width} = Dimensions.get('window');
const Search = ({data}) => {
  React.useEffect(() => {}, []);
  const todayDate = Number(moment().format('YYYYMMDD'));
  const renderBills = ({item, index}) => {
    return (
      <NewCard
        item={item}
        key={index.toString()}
        overdue={item.due < todayDate}
      />
    );
  };
  const EmptyData = () => {
    return (
      <View>
        <Text>No Data</Text>
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <OptimizedFlatlist uniqueId={1} data={data} renderItem={renderBills} />
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
    const data = await getAllBillForSearch(BillSchema);
    console.log('Data', data);
    setAllData(data);
    setData(data);
    setLoading(false);
  };
  const changeText = async e => {
    setSearchText(e);
    const d = allData.filter(bill => {
      return bill.billName.includes(e);
    });
    setData(d);
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
      {data.length != 0 && <Search data={data} searchText={searchText} />}
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
    backgroundColor: 'white',
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
  },
});
export default SearchBillScreen;
