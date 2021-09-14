import React, { useContext, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';

import { Context } from '../context/AuthContext';

const Signin = ({ navigation }) => {
  const { state, login, clearErrorMessage, guestLogIn } = useContext(Context);

  useEffect(() => {
    const removeError = navigation.addListener('focus', () =>
      clearErrorMessage()
    );

    return removeError;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <AuthForm
        header="Sign In"
        errorMessage={state.errorMessage}
        submitButtonText="Sign in"
        onSubmit={login}
      />
      <NavLink
        text="Don't have an account? Signup instead."
        routeName="Signup"
        guestLogIn={guestLogIn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {    
    marginTop: 100,    
    alignItems: 'center'
  }
})
export default Signin;
