import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';

const PasswordChange = ({ id, onPress }) => {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  //Add a prompt to show that the password has been changed
  //Clean the fields

  return (
    <View style={styles.inputContainer}>
      <Input
        label="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
        placeholder="********"
        leftIcon={<MaterialIcons name="lock-outline" size={24} color="black" />}
      />
      <Input
        label="New Password"
        secureTextEntry={true}
        value={newPassword}
        onChangeText={setNewPassword}
        placeholder="********"
        leftIcon={<MaterialIcons name="lock-outline" size={24} color="black" />}
      />
      <Input
        label="Password Confirm"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="********"
        leftIcon={<MaterialIcons name="lock-outline" size={24} color="black" />}
      />
      <Button
        title="Confirm password"
        onPress={() => {
          onPress({ password, newPassword, confirmPassword });
          setPassword('');
          setNewPassword('');
          setConfirmPassword('');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    alignSelf: 'center',
    width: '80%',
    marginBottom: 20,
  },
});

export default PasswordChange;
