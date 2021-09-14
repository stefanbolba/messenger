import * as SecureStore from 'expo-secure-store';
import createDataContext from './createDataContext';
import messengerAPI from '../api/messengerAPI';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'login':
      return { ...state, errorMessage: '', token: action.payload };
    case 'logout':
      return { errorMessage: '', token: null };
    case 'update':
      return {
        ...state,
        token: action.payload.token,
        modal: action.payload.modal,
      };
    case 'add_error':
      return { ...state, errorMessage: action.payload };
    case 'clear_error_message':
      return { ...state, errorMessage: '' };
    case 'add_error_and_modal':
      return {
        ...state,
        errorMessage: action.payload.error,
        modal: action.payload.modal,
      };
    case 'clear_modal_info':
      return {
        ...state,
        modal: { type: '', message: '', modalVisible: false },
      };
    default:
      return state;
  }
};

const tryLocalLogin = (dispatch) => async () => {
  try {
    const token = await SecureStore.getItemAsync('token');
    if (token) {
      dispatch({
        type: 'login',
        payload: token,
      });
    }
  } catch (err) {
    console.log(err);
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with the Log in! Please try again!',
    });
  }
};

const login =
  (dispatch) =>
  async ({ email, password }) => {
    try {
      const response = await messengerAPI.post('/api/v1/users/login', {
        email,
        password,
      });

      await SecureStore.setItemAsync('token', response.data.token);
      dispatch({
        type: 'login',
        payload: response.data.token,
      });
      // dispatch({type: 'add_data', payload: response.data})
    } catch (err) {
      dispatch({
        type: 'add_error',
        payload: 'Something went wrong with the Log in! Please try again!',
      });
    }
  };

const logout = (dispatch) => async () => {
  await SecureStore.deleteItemAsync('token');
  dispatch({ type: 'logout' });
};

const signup =
  (dispatch) =>
  async ({ email, name, password, passwordConfirm }) => {
    try {
      const response = await messengerAPI.post('/api/v1/users/signup', {
        email,
        name,
        password,
        passwordConfirm,
      });

      await SecureStore.setItemAsync('token', response.data.token);
      dispatch({
        type: 'login',
        payload: response.data.token,
      });
    } catch (err) {
      dispatch({
        type: 'add_error',
        payload: 'Something went wrong. Please provide valid information!',
      });
    }
  };

const updatePassword =
  (dispatch) =>
  async ({ id, password, newPassword, confirmPassword }) => {
    try {
      const response = await messengerAPI.patch(
        '/api/v1/users/updatePassword',
        {
          id,
          password,
          newPassword,
          confirmPassword,
        }
      );
      await SecureStore.setItemAsync('token', response.data.token);
      dispatch({
        type: 'update',
        payload: {
          token: response.data.token,
          modal: {
            type: 'SUCCES',
            message: 'The password has been sucesfully updated!',
            modalVisible: true,
          },
        },
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: 'add_error_and_modal',
        payload: {
          error:
            'Something went wrong. Please cheack the password you provided!',
          modal: {
            type: 'Error',
            message: 'Please make sure you provided valid info!',
            modalVisible: true,
          },
        },
      });
    }
  };

const guestLogIn = (dispatch) => async () => {
  try {    
    const response = await messengerAPI.post('/api/v1/users/guestLogIn');   

    await SecureStore.setItemAsync('token', response.data.token);
    dispatch({
      type: 'login',
      payload: response.data.token,
    });
  } catch (err) {
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with the Log in! Please try again!',
    });
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: 'clear_error_message' });
};
const clearModalInfo = (dispatch) => () => {
  dispatch({ type: 'clear_modal_info' });
};

export const { Provider, Context } = createDataContext(
  authReducer,
  {
    login,
    logout,
    signup,
    tryLocalLogin,
    clearErrorMessage,
    updatePassword,
    clearModalInfo,
    guestLogIn,
  },
  {
    token: null,
    errorMessage: '',
    modal: { type: '', message: '', modalVisible: false },
  }
);
