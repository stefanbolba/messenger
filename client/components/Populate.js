import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Populate = ({onPress}) => {
  return (
    <TouchableOpacity
      style={styles.populate}
      onPress={() => onPress()}
    >
      <Text style={{color: 'white'}}>Populate Friends</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  populate: {
    backgroundColor: 'green',
    alignItems: 'center',
    alignSelf:'center',
    justifyContent:'center',
    width: '50%',
    height: 25,
    marginTop: 5,
    borderRadius: 50,   

  },
});

export default Populate;
