import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  StyleSheet,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const MessengerInput = ({ onSubmit, roomName, roomId, userId }) => {
  const [message, setMessage] = useState('');
  const [keyboardStatus, setKeyboardStatus] = useState(false);

  //Use this for TextInput size manipulation
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const returnLargeInput = () => {
    return (
      <TextInput
        style={styles.largeInput}
        placeholder="Type a message..."
        value={message}
        onChangeText={setMessage}
        multiline={true}
      />
    );
  };
  const returnSmallInput = () => {
    return (
      <TextInput
        style={styles.smallInput}
        placeholder="Aa"
        multiline={true}
        value={message}
        onChangeText={setMessage}
      />
    );
  };
  return (
    <View style={styles.inputContainer}>
      {keyboardStatus ? returnLargeInput() : returnSmallInput()}
      <TouchableOpacity
        style={styles.inputButton}
        onPress={() => {          
          onSubmit({ roomName, roomId, userId, message });
          setMessage('');
          setKeyboardStatus(false);
          Keyboard.dismiss()
        }}
      >
        <FontAwesome name="send" size={24} color="#266df7" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
    width: 330,
  },
  inputButton: {
    width: 20,    
    marginLeft: 10
    
  },
  smallInput: {
    borderColor: 'transparent',
    backgroundColor: '#c7c4c4',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 20,
    width: 200,
    // marginLeft: 80,
    fontSize: 20,
    
  },
  largeInput: {
    borderColor: 'transparent',
    backgroundColor: '#c7c4c4',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 20,
    width: 300,
    fontSize: 20,
    maxHeight: 150,
  },
});

export default MessengerInput;
