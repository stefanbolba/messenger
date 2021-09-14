import React, { useContext, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';

import { Context } from '../context/AuthContext';

const Signup = ({ navigation }) => {
  const { state, signup, clearErrorMessage, guestLogIn } = useContext(Context);

  useEffect(() => {
    const removeError = navigation.addListener('focus', () =>
      clearErrorMessage()
    );

    return removeError;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <AuthForm
        header="Sign Up"
        errorMessage={state.errorMessage}
        submitButtonText="Sign up"
        onSubmit={signup}
        type="signup"
      />
      <NavLink
        text="Already have an account? Sign in instead."
        routeName="Signin"
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
export default Signup;
