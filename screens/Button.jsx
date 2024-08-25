import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const CameraButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={styles.cameraButton}
    onPress={onPress}
  >
    <View>
      {children}
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
    cameraButton: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: 'black',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      bottom: 20,
      left: '50%',
      marginLeft: -30, // Half of button width to center it
      elevation: 5,
   
   
    },
  
  })

export default CameraButton;
