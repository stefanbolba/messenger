import React, { useContext, useEffect } from 'react';
import { Context as AuthContext } from '../context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';

import { AuthStackScreen, HomeStackScreen } from './MessengerNavigator';

export default () => {
  const { state, tryLocalLogin } = useContext(AuthContext);

  useEffect(() => {
    tryLocalLogin();
  }, []);

  return (
    <NavigationContainer>
      {!state.token ? <AuthStackScreen /> : <HomeStackScreen />}
    </NavigationContainer>
  );
};
