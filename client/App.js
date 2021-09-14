import React from 'react';
import AppNavigator from './navigation/Navigation';
import { Provider as AuthProvider } from './context/AuthContext';

import { SocketProvider } from './context/SocketContext';
import { MessengerProvider } from './context/MessengerContext';

export default function App() {
  return (
    <SocketProvider>
      <MessengerProvider>
        <AuthProvider>
          <AppNavigator />
        </AuthProvider>
      </MessengerProvider>
    </SocketProvider>
  );
}
