import React, { useContext } from 'react';
import { Text, View, StyleSheet, Button, ScrollView } from 'react-native';

import ProfileBasicInfo from '../components/ProfileBasicInfo';
import PasswordChange from '../components/PasswordChange';
import ProfilePhoto from '../components/ProfilePhoto';
import ModalInfo from '../components/ModalInfo';

import { Context as AuthContext } from '../context/AuthContext';
import { MessengerContext } from '../context/MessengerContext';

const Profile = () => {
  const {
    state: { modal },
    logout,
    updatePassword,
    clearModalInfo,
  } = useContext(AuthContext);
  const messengerState = useContext(MessengerContext);
  const { profile, modalInfo, updateMe, updatePhoto, clearModal } =
    messengerState;

  return (
    <View>
      <ModalInfo modalInformation={modalInfo} onPress={clearModal} />
      <ModalInfo modalInformation={modal} onPress={clearModalInfo} />
      <ProfilePhoto photo={profile.photo} updatePhoto={updatePhoto} />
      <Text style={styles.profileName}>{profile.name}</Text>
      <ScrollView style={styles.scroll}>
        <ProfileBasicInfo
          name={profile.name}
          email={profile.email}
          onPress={updateMe}
        />
        <PasswordChange onPress={updatePassword} />
      </ScrollView>
      <Button title="Logout" onPress={logout} />
    </View>
  );
};

const styles = StyleSheet.create({
  profileName: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  scroll: {
    width: '100%',
    height: '70%',
  },
  error: {
    color: 'red',
    fontSize: 20,
    alignSelf: 'center',
  },
});

export default Profile;
