import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input, Button, Divider } from 'react-native-elements';

import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export const ProfileBasicInfo = ({ name, email, onPress }) => {
  const [profileName, setProfileName] = useState(name);
  const [profileEmail, setProfileEmail] = useState(email);

  return (
    <View>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Select name..."
          value={profileName}
          onChangeText={setProfileName}
          autoCorrect={false}
          label="Name"
          leftIcon={<AntDesign name="user" size={24} color="black" />}
        />
      </View>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Select email..."
          value={profileEmail}
          onChangeText={setProfileEmail}
          autoCorrect={false}
          label="Email"
          leftIcon={<MaterialIcons name="email" size={24} color="black" />}
        />
      </View>
      <Button
        title="Save Setings"
        buttonStyle={styles.button}
        onPress={() => onPress(profileName, profileEmail)}
      />
      <Divider orientation="horizontal" width={5} style={styles.divider}/>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    alignSelf: 'center',
    width: '80%',
  },
  button: {
    width: '80%',
    alignSelf: 'center',
  },
  divider: {
      paddingVertical: 20,
  }
});

export default ProfileBasicInfo;
