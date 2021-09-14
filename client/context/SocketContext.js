import React, { useContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { variables } from '../assets/constants';

export const SocketContext = React.createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState();

  useEffect(() => {
    const newSocket = io(variables.ngrok);

    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
