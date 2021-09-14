import React, { useContext, useEffect } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import Friend from '../components/Friend';
import Populate from '../components/Populate';
import ModalInfo from '../components/ModalInfo';

import { MessengerContext } from '../context/MessengerContext';

const FriendsList = ({ navigation }) => {
  const state = useContext(MessengerContext);
  const {
    friends,
    sendActiveStatus,
    getAllRooms,
    populateWithFriends,
    modalInfo,
    clearModal,
  } = state;

  useEffect(() => {
    const active = navigation.addListener('focus', () => {
      sendActiveStatus();
    });

    return active;
  }, [navigation]);

  useEffect(() => {
    getAllRooms();
  }, []);

  return (
    <View>
      <Populate onPress={populateWithFriends} />
      <ModalInfo modalInformation={modalInfo} onPress={clearModal} />
      <FlatList
        data={friends}
        keyExtractor={(el) => el.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Options', {
                  screen: 'Rooms',
                  params: { id: item._id, name: item.name, photo: item.photo },
                })
              }
            >
              <Friend
                id={item._id}
                name={item.name}
                photo={item.photo}
                active={item.active}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default FriendsList;
