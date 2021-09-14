import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Button, Input } from 'react-native-elements';

const AuthForm = ({
  header,
  errorMessage,
  submitButtonText,
  onSubmit,
  type,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  return (
    <>
      <Text style={styles.header}>{header}</Text>
      <Input
        label="Email"
        placeholder="..."
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {type === 'signup' ? (
        <Input
          label="Name"
          placeholder="..."
          value={name}
          onChangeText={setName}
          autoCapitalize="none"
          autoCorrect={false}
        />
      ) : null}
      <Input
        label="Passwords"
        placeholder="..."
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {type === 'signup' ? (
        <Input
          label="Confirm Password"
          placeholder="..."
          value={passwordConfirm}
          onChangeText={setPasswordConfirm}
          autoCapitalize="none"
          autoCorrect={false}
        />
      ) : null}
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      <Button
        title={submitButtonText}
        onPress={() => onSubmit({ email, password, passwordConfirm, name })}
      />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: 'bold',
  }
})

export default AuthForm;
