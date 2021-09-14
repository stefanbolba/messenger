import React, { useContext } from 'react';
import { Image, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/elements';

import Signin from '../screens/SigninScreen';
import Signup from '../screens/SignupScreen';
import FriendsList from '../screens/FriendsListScreen';
import Placeholder from '../screens/Placeholder';
import Profile from '../screens/ProfileScreen';
import Rooms from '../screens/RoomsScreen';

import { Entypo } from '@expo/vector-icons';
import { variables } from '../assets/constants';
import { MessengerContext } from '../context/MessengerContext';

const AuthStack = createStackNavigator();
export const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen
        name="Signin"
        component={Signin}
        options={{ title: 'Sign In' }}
      />
      <AuthStack.Screen
        name="Signup"
        component={Signup}
        options={{ title: 'Sign Up' }}
      />
    </AuthStack.Navigator>
  );
};

const FriendsStack = createMaterialTopTabNavigator();
export const FriendsStackScreen = () => {
  return (
    <FriendsStack.Navigator initialRouteName="Home">
      <FriendsStack.Screen name="Home" component={FriendsList} />
      <FriendsStack.Screen name="Placeholder" component={Placeholder} />
    </FriendsStack.Navigator>
  );
};

const OptionsStack = createStackNavigator();
export const OptionsStackScreen = ({ navigation }) => {
  const state = useContext(MessengerContext);

  return (
    <OptionsStack.Navigator>
      <OptionsStack.Screen name="Profile" component={Profile} />
      {/* Add the rooms property from navigation */}
      <OptionsStack.Screen
        name="Rooms"
        component={Rooms}
        options={({ route }) => ({
          headerTitle: (props) => (
            <TouchableOpacity style={styles.roomHeaderBar}>
              <Image
                source={{ uri: `${variables.ngrok}${route.params.photo}` }}
                style={styles.roomHeaderBarImage}
              />
              <Text style={styles.roomHeaderBarTitle}>{route.params.name}</Text>
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <HeaderBackButton
              onPress={() => {
                //Clear the state and go back
                state.clearRoomNameAndMessages();
                navigation.goBack();
              }}
            ></HeaderBackButton>
          ),
        })}
      />
    </OptionsStack.Navigator>
  );
};

const HomeStack = createStackNavigator();
export const HomeStackScreen = () => {
  const navigation = useNavigation();
  const state = useContext(MessengerContext);

  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Friends"
        component={FriendsStackScreen}
        options={{
          title: 'Messenger',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Options', { screen: 'Profile' })
              }
            >
              <Image
                source={{ uri: `${variables.ngrok}${state.profile.photo}` }}
                style={styles.navBarProfile}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <Entypo name="camera" style={styles.navBarCamera} />
          ),
        }}
      />
      <HomeStack.Screen
        name="Options"
        component={OptionsStackScreen}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
};

const styles = StyleSheet.create({
  navBarProfile: {
    width: 40,
    height: 40,
    borderWidth: 1,
    marginLeft: 20,
    borderRadius: 50,
  },
  navBarCamera: {
    marginRight: 20,
    borderRadius: 100,
    fontSize: 28,
    color: 'black',
  },
  roomHeaderBar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roomHeaderBarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  roomHeaderBarImage: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
});
