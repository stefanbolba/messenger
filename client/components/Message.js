import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Message = ({ message, createdBy, createdAt, viewd, clientId }) => {
  const getHour = () => {
    return createdAt.split('T')[1].split(':').slice(0, 2).join(':');
  };
  const isMyMessage = () => {
    return clientId === createdBy.id || clientId === createdBy;
  };

  return (
    <TouchableOpacity>
      <View
        style={[
          styles.triangle,
          {
            borderTopColor: isMyMessage() ? '#7ca7fa' : '#c5cdcd',
            transform: isMyMessage()
              ? [{ rotate: '0deg' }]
              : [{ rotate: '90deg' }],
            alignSelf: isMyMessage() ? 'flex-end' : 'flex-start',
            marginRight: isMyMessage() ? 20 : null,
            marginLeft: isMyMessage() ? null : 5,
          },
        ]}
      ></View>
      <View
        style={[
          styles.container,
          {
            backgroundColor: isMyMessage() ? '#7ca7fa' : '#c5cdcd',
            alignSelf: isMyMessage() ? 'flex-end' : 'flex-start',
          },
        ]}
      >
        <Text style={styles.message}>{message}</Text>
        <View style={styles.secondContainer}>
          <Text style={styles.time}>{getHour()}</Text>
          {isMyMessage() && (
            <Ionicons
              name="checkmark-done"
              size={24}
              style={[{ color: viewd ? 'green' : 'gray' }]}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginHorizontal: '5%',
    paddingVertical: 5,
    paddingLeft: 10,
    borderRadius: 15,
    maxWidth: 300,
    flexDirection: 'row',
  },
  triangle: {
    position: 'absolute',
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 30,
    borderTopWidth: 30,
    borderRightColor: 'transparent',
    marginTop: 10,
  },
  secondContainer: {
    alignSelf: 'flex-end',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    minWidth: 80,
  },
  time: {
    color: '#e5e5e5',
  },
  message: {
    minWidth: 50,
    maxWidth: 200,
  },
});

export default Message;
