import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const {width} = Dimensions.get('window');

function AlertButton({text, onPress}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={styles.alertButton}>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
}

const DeleteModel = ({deleteAll, deleteThis, close}) => {
  console.log('Delete Modal Called.');
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.alertTitle}>Delete bill?</Text>
        <Text style={styles.alertBody}>
          Are you sure to delete the bill, this action is not reversible?
        </Text>
        <View style={styles.alertButtonContainer}>
          <AlertButton text="Cancel" onPress={close} />
          <AlertButton text="This One" onPress={deleteThis} />
          <AlertButton text="All Bill" onPress={deleteAll} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    backgroundColor: 'white',
    width: width - 20,
    maxWidth: 300,
    borderRadius: 8,
    padding: 8,
    paddingVertical: 14,
  },
  alertTitle: {
    fontSize: 20,
    fontFamily: 'OpenSans-Bold',
    marginTop: 5,
    textAlign: 'center',
  },
  alertBody: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 10,
    color: '#444',
    textAlign: 'center',
  },
  alertButtonContainer: {
    marginTop: 15,
  },
  alertButton: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 3,
  },
});

export default DeleteModel;
