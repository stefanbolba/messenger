import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ModalInfo = ({ modalInformation, onPress }) => {
  const { type, message, modalVisible } = modalInformation;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => onPress()}
    >
      <View
        style={[
          styles.container,
          { backgroundColor: type === 'SUCCES' ? 'green' : 'red' },
        ]}
      >
        <View style={styles.top}>
          <Text style={{ color: 'white' }}>{type}</Text>
          <TouchableOpacity style={styles.closeModal} onPress={() => onPress()}>
            <Text style={{ color: 'white' }}>X</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottom}>
          <Text style={{ color: 'white' }}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 100,
    alignSelf: 'center',
    marginTop: '80%',
    borderRadius: 10,
  },
  top: {
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  closeModal: {
    position: 'absolute',
    right: 5,
    top: 0,
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: 20,
    textAlign: 'center',
  },
});

export default ModalInfo;
