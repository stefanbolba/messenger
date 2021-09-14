import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { variables } from '../assets/constants';

const ProfilePhoto = ({ photo, updatePhoto }) => {
  return (
    <TouchableOpacity onPress={updatePhoto}>
      <Image
        source={{ uri: `${variables.ngrok}${photo}` }}
        style={styles.profileImage}
        key={Date.now()}
      />     
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  profileImage: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    borderRadius: 50,
  },
});

export default ProfilePhoto;
