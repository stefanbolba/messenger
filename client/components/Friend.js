import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Badge } from 'react-native-elements';
import { variables } from '../assets/constants';

import { MessengerContext } from '../context/MessengerContext';

const Friend = ({ id, name, photo, active }) => {
  const state = useContext(MessengerContext);
  let lastMessageViewd = false;
  let lastMessage = '';
  let createdBy = '';

  const roomName = [state.profile.id, id].sort().join('-');
  const room = state.rooms.find((el) => el.name === roomName);
  if (room && room.messages.length > 0) {
    const length = room.messages.length - 1;
    lastMessage = room.messages[length].message;
    lastMessageViewd = room.messages[length].viewd;    
    createdBy = room.messages[length].createdBy;
  }

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={{ uri: `${variables.ngrok}${photo}?key=${new Date()}` }}
          style={styles.image}
        />
        {active ? (
          <Badge
            value="ON"
            status="success"
            containerStyle={{ position: 'absolute', bottom: 2, right: -4 }}
          />
        ) : null}
      </View>
      <View style={styles.text}>
        <Text>{name}</Text>

        {state.profile.id === createdBy ||
        state.profile.id === createdBy._id ? (
          <Text>{`You: ${lastMessage}`}</Text>
        ) : (
          <Text style={[{ fontWeight: lastMessageViewd ? 'normal' : 'bold' }]}>
            {lastMessage}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  text: {
    paddingLeft: 10,
    justifyContent: 'space-evenly',
  },
});

export default Friend;
