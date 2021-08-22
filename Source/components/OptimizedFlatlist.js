import React from 'react';
import {
  FlatList,
  Dimensions,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';
import lodash from 'lodash';
import {returnPaginatedData} from '../databases/realm.helper';
import {Colors} from './Color';
import NewCard from './NewCard';

const {width, height} = Dimensions.get('window');

function ListFooterComponent({loadMoreBills, currentCursorForPagination}) {
  return (
    <TouchableOpacity
      onPress={loadMoreBills}
      activeOpacity={0}
      style={{
        alignSelf: 'center',
        backgroundColor: '#eee',
        padding: 10,
        borderRadius: 60,
        paddingHorizontal: 20,
      }}>
      <Text
        style={{
          color: '#333',
          fontWeight: '600',
        }}>
        Load more Bills{' '}
      </Text>
    </TouchableOpacity>
  );
}

function ListEmptyComponent() {
  return (
    <View style={styles.emptyBillContainer}>
      <Text style={styles.emptyBillText}>
        No Bills to show. {'\n'} Create Some.{' '}
      </Text>
    </View>
  );
}

class OptimizedFlatist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: props.data,
      currentCursorForPagination: props.data.length,
    };
  }
  loadMoreBills = () => {
    if (this.state.listData.length === this.props.allData.length) {
      return;
    }
    console.log('[OptimizedFlatlist] Called');

    let returnData = returnPaginatedData(
      this.state.currentCursorForPagination,
      this.state.currentCursorForPagination + 9,
      this.props.allData,
    );
    this.setState({
      currentCursorForPagination: this.state.currentCursorForPagination + 10,
      listData: [...this.state.listData, ...returnData],
    });
  };
  getItemLayout = (data, index) => {
    return {
      length: height * 0.13,
      offset: height * 0.13 * index,
      index,
    };
  };

  shouldComponentUpdate = (nextProps, nextState) => {
    this.isSame =
      nextProps.allData.length != this.props.allData.length ||
      nextState.listData.length != this.state.listData.length ||
      nextProps.data.length != this.props.data;
    if (this.isSame) {
      if (!this.checkIfBothArraySame(this.props.data, nextProps.data)) {
        this.setState({
          listData: nextProps.data,
          currentCursorForPagination: nextProps.data.length + 1,
        });
      }
      return true;
    }
    if (!this.checkIfBothArraySame(this.props.data, nextProps.data)) {
      this.setState({
        listData: nextProps.data,
        currentCursorForPagination: nextProps.data.length + 1,
      });
      return true;
    }
    return false;
  };

  checkIfBothArraySame = (prevArray: Array, newArray) => {
    if (prevArray.length !== newArray.length) return false;
    return lodash.isEqual(prevArray, newArray);
  };
  renderItem = ({item}) => {
    return <NewCard overdue={this.props.overdue} item={item} />;
  };
  keyExtractor = (_, index) => {
    return `${index}`;
  };
  removeItem = item => {};
  renderFooter = () => {
    if (this.state.listData.length == this.props.allData.length) return null;
    else return <ActivityIndicator size="large" color="#000" />;
  };
  render() {
    const {listData} = this.state;
    return (
      <FlatList
        getItemLayout={this.getItemLayout}
        ListFooterComponent={this.renderFooter}
        onEndReached={this.loadMoreBills}
        onEndReachedThreshold={0}
        data={listData}
        ListEmptyComponent={ListEmptyComponent}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        style={styles.container}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: width - 20,
    backgroundColor: Colors.backgroundColor,
    marginTop: 10,
    flex: 1,
  },
  emptyBillContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.5,
    width,
  },
  emptyBillText: {
    fontFamily: 'OpenSans-Bold',
    textAlign: 'center',
  },
});

export default OptimizedFlatist;
