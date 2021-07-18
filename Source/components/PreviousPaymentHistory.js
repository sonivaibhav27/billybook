import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableNativeFeedback,
  TouchableOpacity,
  FlatList,
  InteractionManager,
} from 'react-native';
import moment from 'moment';
import BillSchema from '../DB/NewSch';
import {Easing} from 'react-native-reanimated';
import {AntDesign} from '../components/Icons';
import {DeleteLastPayment} from '../databases/realm.helper';
const {height} = Dimensions.get('window');

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const MODAL_HEIGHT = height * 0.8;
const PreviousPaymentHistory = ({closeModal, data, item}) => {
  const [renderToHardwareTextureAndroid, setRenderToHardwareTextureAndroid] =
    React.useState(true);
  const _mount = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(_mount, {
      toValue: 1,
      easing: Easing.linear,
      duration: 250,
      useNativeDriver: true,
    }).start();
    const interaction = InteractionManager.runAfterInteractions(() => {
      console.log('Interaction Done');
      setRenderToHardwareTextureAndroid(false);
    });
  }, []);
  const _onCloseModal = () => {
    Animated.timing(_mount, {
      toValue: 0,
      easing: Easing.linear,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      closeModal();
    });
  };

  const deleteLastPayment = () => {
    DeleteLastPayment(BillSchema, item);
    setReload(true);
  };

  const renderPreviousPayment = ({item: bill, index}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          marginBottom: 8,
        }}>
        <View>
          <Text style={[styles.actualTextStyle, {color: '#000'}]}>
            {moment(bill.date, 'YYYYMMDD').format('DD/MM/YYYY')}
          </Text>
        </View>
        <View style={styles.horizontal}>
          <Text
            style={[styles.actualTextStyle, {color: 'rgba(0, 171, 102, 1)'}]}>
            ${bill.amount}
          </Text>
          {index === data.length - 1 ? (
            <TouchableOpacity
              activeOpacity={1}
              onPress={deleteLastPayment}
              style={styles.delete}>
              <AntDesign name="delete" color="#000" size={20} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  };

  return (
    <View style={StyleSheet.absoluteFill}>
      <AnimatedTouchable
        style={{
          flex: 1,
          opacity: _mount.interpolate({
            inputRange: [0, 1],
            outputRange: [0.4, 1],
            extrapolate: 'clamp',
          }),
          backgroundColor: 'rgba(0,0,0,0.3)',
          zIndex: 1000,
        }}
        activeOpacity={1}
        onPress={_onCloseModal}>
        <AnimatedTouchable
          activeOpacity={1}
          style={{
            marginTop: 0,
            backgroundColor: '#fff',
            paddingHorizontal: 13,
            position: 'absolute',
            right: 0,
            bottom: 0,
            left: 0,
            borderTopStartRadius: 20,
            borderTopEndRadius: 20,
            maxHeight: MODAL_HEIGHT,
            transform: [
              {
                translateY: _mount.interpolate({
                  inputRange: [0, 1],
                  outputRange: [MODAL_HEIGHT, 0],
                  extrapolate: 'clamp',
                }),
              },
            ],
          }}>
          <View
            style={{
              marginBottom: 10,
              marginTop: 10,
              padding: 10,
              borderBottomWidth: 1,
              borderColor: '#eee',
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 18,
                fontFamily: 'OpenSans-Bold',
              }}>
              Previous payment
            </Text>
          </View>

          <FlatList
            data={data}
            renderItem={renderPreviousPayment}
            keyExtractor={(_, index) => index.toString()}
          />

          <View
            style={{
              backgroundColor: '#eee',
              padding: 10,
              borderRadius: 50,
              marginBottom: 5,
            }}>
            <TouchableNativeFeedback onPress={_onCloseModal}>
              <Text
                style={{
                  color: '#222',
                  fontWeight: '600',
                  textAlign: 'center',
                  fontSize: 18,
                }}>
                close
              </Text>
            </TouchableNativeFeedback>
          </View>
        </AnimatedTouchable>
      </AnimatedTouchable>
    </View>
  );
};
export default React.memo(PreviousPaymentHistory);

const styles = StyleSheet.create({
  actualTextStyle: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 20,
  },
  horizontal: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  delete: {
    marginLeft: 5,
  },
});
