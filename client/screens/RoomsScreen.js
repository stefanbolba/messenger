import React, { useContext, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { AndroidBackHandler } from 'react-navigation-backhandler';

import MessengerInput from '../components/MessengerInput';
import Message from '../components/Message';
import { MessengerContext } from '../context/MessengerContext';

const Rooms = ({ route, navigation }) => {
  const state = useContext(MessengerContext);
  const {
    focusedRoomId,
    focusedRoomMessages,
    getAndCreateRoom,
    sendMessage,
    clearRoomNameAndMessages,
    updateMessagesDatabase,
  } = state;

  useEffect(() => {
    const roomName = [state.profile.id, route.params.id].sort().join('-');
    getAndCreateRoom(roomName);
  }, []);

  //Update all messages that on room focus
  // useEffect(() => {
  //   updateMessagesDatabase(route.params.id, focusedRoomId);
  // }, []);
  

  //Use this to focus on the last item in the messages array
  //There should be a better method
  const flatList = React.useRef(null);

  return (
    <AndroidBackHandler
      onBackPress={() => {
        clearRoomNameAndMessages();
        navigation.navigate('Friends');
        return true;
      }}
    >
      <View style={styles.container}>
        <FlatList
          ref={flatList}
          style={styles.messageList}
          data={focusedRoomMessages}
          keyExtractor={(item) => item._id}
          onContentSizeChange={() => {
            flatList.current.scrollToEnd({ animated: true });
          }}
          onLayout={() => flatList.current.scrollToEnd({ animated: true })}
          // initialScrollIndex={focusedRoomMessages.length - 1}
          // scrollToIndex={{ index: focusedRoomMessages.length - 1 }}
          renderItem={({ item }) => {
            return (
              <Message
                message={item.message}
                createdBy={item.createdBy}
                createdAt={item.createdAt}
                viewd={item.viewd}
                clientId={state.profile.id}
              />
            );
          }}
        />
        <MessengerInput
          roomName={[state.profile.id, route.params.id].sort().join('-')}
          onSubmit={sendMessage}
          roomId={state.focusedRoomId}
          userId={state.profile.id}
        />
      </View>
    </AndroidBackHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  messageList: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
});

export default Rooms;
