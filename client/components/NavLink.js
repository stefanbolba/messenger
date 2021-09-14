import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Spacer from '../components/Spacer';

const NavLink = ({ text, routeName, guestLogIn }) => {
  const navigation = useNavigation();

  return (
    <>
      <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
        <Spacer>
          <Text>{text}</Text>
        </Spacer>
      </TouchableOpacity>
      <TouchableOpacity>
        <Spacer>
          <TouchableOpacity onPress={() => guestLogIn()}>
            <Text>You can Log in as Guest to view the app.</Text>
          </TouchableOpacity>
        </Spacer>
      </TouchableOpacity>
    </>
  );
};

export default NavLink;
