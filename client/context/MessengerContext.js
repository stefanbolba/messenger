import React, { useContext, useState, useEffect } from 'react';
import messengerAPI from '../api/messengerAPI';
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';
import { variables } from '../assets/constants';

import { SocketContext } from './SocketContext';

export const MessengerContext = React.createContext();

export const MessengerProvider = ({ children }) => {
  const [profile, setProfile] = useState({});
  const [friends, setFriends] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [focusedRoomMessages, setFocusedRoomMessages] = useState([]);
  const [focusedRoomId, setFocusedRoomId] = useState('');
  const [focusedRoomName, setFocusedRoomName] = useState('');
  const [modalInfo, setModalInfo] = useState({
    type: '',
    message: '',
    modalVisible: false,
  });

  const socket = useContext(SocketContext);

  const getMyInfo = async () => {
    try {
      const response = await messengerAPI.get('/api/v1/users/getMe');
      const user = {
        id: response.data.data.user.id,
        name: response.data.data.user.name,
        email: response.data.data.user.email,
        photo: response.data.data.user.photo,
      };
      const friends = response.data.data.user.friends;

      setProfile(user);
      setFriends(friends);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getMyInfo();
  }, []);

  const updateMe = async (name, email) => {
    try {
      const response = await messengerAPI.patch('/api/v1/users/updateMe', {
        name,
        email,
      });
      const user = {
        id: response.data.data.user.id,
        name: response.data.data.user.name,
        email: response.data.data.user.email,
        photo: response.data.data.user.photo,
      };
      setProfile(user);
      setModalInfo({
        type: 'SUCCES',
        message: 'The name and email have been updated!',
        modalVisible: true,
      });
    } catch (err) {
      console.log(err.data);
      setModalInfo({
        type: 'Error',
        message: 'Please try again later!',
        modalVisible: true,
      });
    }
  };

  const updatePhoto = async () => {
    const token = await SecureStore.getItemAsync('token');
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (result.cancelled) return;

    profile.photo = null;
    setProfile({ ...profile });

    const formData = new FormData();
    formData.append('photo', {
      uri: result.uri,
      name: `photo.jpg`,
      type: `aplication/${result.type}`,
    });
    const options = {
      method: 'post',
      body: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };

    return fetch(`${variables.ngrok}/api/v1/users/updatePhoto`, options).then(
      () => {
        profile.photo = `/img/users/${profile.id}.jpeg?key=${new Date()}`;
        setProfile({ ...profile });
      }
    );
  };

  const populateWithFriends = async () => {
    try {
      const response = await messengerAPI.get('/api/v1/users/getAll');
      const friends = response.data.data.user.friends;

      setFriends(friends);
      setModalInfo({
        type: 'SUCCES',
        message: 'All the availble friends have been added!',
        modalVisible: true,
      });
    } catch (err) {
      console.log(err);
      setModalInfo({
        type: 'Error',
        message: 'Please try again later!',
        modalVisible: true,
      });
    }
  };

  const setActiveUsers = ({ id, name }) => {
    const friend = state.friends.find((el) => el.id === id);

    if (friend) {
      friend.active = true;
      let index = state.friends.findIndex((el) => el.id === friend.id);

      friends[index] = friend;
      let newFriends = [...friends];
      setFriends(newFriends);
    }
  };
  const setInactiveUsers = ({ id, name }) => {
    const friend = state.friends.find((el) => el.id === id);

    if (friend) {
      friend.active = false;
      let index = state.friends.findIndex((el) => el.id === friend.id);

      friends[index] = friend;
      let newFriends = [...friends];
      setFriends(newFriends);
    }
  };
  useEffect(() => {
    if (socket === undefined) return;
    socket.on('active_user', setActiveUsers);
    socket.on('logout', setInactiveUsers);

    return () => socket.off('active_user');
  }, [socket, setActiveUsers, setInactiveUsers]);

  const sendActiveStatus = () => {
    if (state.profile.id && state.profile.name) {
      socket.emit('login', { id: profile.id, name: profile.name });
    }
  };

  const getAllRooms = async () => {
    try {
      const response = await messengerAPI.get(`/api/v1/connection`);
      const rooms = response.data.data.connections.map((el) => {
        return {
          name: el.name,
          messages: el.messages ? el.messages : [],
          id: el.id,
        };
      });

      setRooms(rooms);
    } catch (err) {
      console.log(err);
    }
  };

  const getAndCreateRoom = async (roomName) => {
    try {
      let response = await messengerAPI.get(`/api/v1/connection`);
      let room = response.data.data.connections.find(
        (el) => el.name === roomName
      );

      if (room) {
        let existingRoom = rooms.find((el) => el.name === room.name);
        let index = rooms.indexOf(existingRoom);
        let roomInfo = {
          name: room.name,
          messages: room.messages ? room.messages : [],
          id: room.id,
        };
        setFocusedRoomId(roomInfo.id);
        setFocusedRoomName(roomInfo.name);
        if (index === -1) {
          setRooms([...rooms, roomInfo]);
          getRoomMessages(roomName);
        } else {
          rooms[index] = roomInfo;
          let newRooms = [...rooms];
          setRooms(newRooms);
          getRoomMessages(roomName);
        }
      } else {
        let newResponse = await messengerAPI.post('/api/v1/connection', {
          name: roomName,
        });
        let roomInfo = {
          name: newResponse.data.data.connection.name,
          messages: newResponse.data.data.connection.messages,
          id: newResponse.data.data.connection.id,
        };
        setRooms([...rooms, roomInfo]);
        setFocusedRoomId(roomInfo.id);
        setFocusedRoomName(roomInfo.name);
        getRoomMessages(roomName);
      }
    } catch (err) {
      console.log(err, 'This is the error');
    }
  };

  const getRoomMessages = (roomName) => {
    const room = rooms.find((el) => el.name === roomName);
    if (!room) return;
    setFocusedRoomMessages(room.messages);
  };

  const sendMessage = async ({ roomName, roomId, userId, message }) => {
    if (message === undefined) return;
    const createMessage = await messengerAPI.post('/api/v1/messages', {
      message,
      createdBy: userId,
      connection: roomId,
    });
    const emitedMessage = createMessage.data.data.message;
    socket.emit('send_message', { room: roomName, message: emitedMessage });

    saveMessageToState(roomName, emitedMessage);
  };

  const saveMessageToState = (roomName, message) => {
    const room = rooms.find((el) => el.name === roomName);
    if (room) {
      // let index = rooms.indexOf(room);
      room.messages.push(message);
      // rooms[index] = room;
      let newRooms = [...rooms];

      setRooms(newRooms);
      getRoomMessages(roomName);
    }
  };

  const saveMessagesFromSocket = ({ room, message }) => {
    const findRoom = rooms.find((el) => el.name === room);
    if (room) {
      let index = rooms.indexOf(findRoom);
      findRoom.messages.push(message);
      rooms[index] = findRoom;
      let newRooms = [...rooms];
      setRooms([...newRooms]);
      getRoomMessages(room);

      //Show that the message has been seen only if there is a roomName in state
      if (focusedRoomName === room) {
        socket.emit('message_seen', {
          room: findRoom.name,
          // messageId: message._id,
          // createdBy: message.createdBy,
          // connection: focusedRoomId,
        });
      }
    }
  };

  const updateMessageViewdStatus = ({ room }) => {
    const findRoom = rooms.find((el) => el.name === room);

    if (findRoom && findRoom.messages.length > 0) {
      let index = rooms.indexOf(findRoom);
      findRoom.messages.forEach((el) => (el.viewd = true));
      rooms[index] = findRoom;

      setRooms([...rooms]);
      updateMessagesDatabase(room);
    }
  };

  const updateMessagesDatabase = async (connectionName) => {
    try {
      await messengerAPI.patch('/api/v1/messages/updateAllMessages', {
        connectionName,
      });
    } catch (err) {
      console.log(err, 'Error from the updateDatabase');
    }
  };

  useEffect(() => {
    if (socket === undefined) return;
    socket.on('receive_message', saveMessagesFromSocket);

    return () => socket.off('receive_message');
  }, [socket, saveMessagesFromSocket]);

  useEffect(() => {
    if (socket === undefined) return;
    socket.on('add_message_seen', updateMessageViewdStatus);

    return () => socket.off('add_message_seen');
  }, [socket, updateMessageViewdStatus]);

  //Clear the state for roomName and Room messages
  const clearRoomNameAndMessages = () => {
    setFocusedRoomMessages([]);
    setFocusedRoomId('');
    setFocusedRoomName('');
  };

  const clearModal = () => {
    setModalInfo({
      type: '',
      message: '',
      modalVisible: false,
    });
  };

  const state = {
    profile: profile,
    friends: friends,
    rooms: rooms,
    focusedRoomMessages,
    focusedRoomId,
    focusedRoomName,
    modalInfo,
    updateMe,
    updatePhoto,
    populateWithFriends,
    sendActiveStatus,
    getAllRooms,
    getAndCreateRoom,
    getRoomMessages,
    sendMessage,
    clearRoomNameAndMessages,
    updateMessagesDatabase,
    clearModal,
  };

  return (
    <MessengerContext.Provider value={state}>
      {children}
    </MessengerContext.Provider>
  );
};
