import * as React from 'react';
import { Button, Text, StyleSheet } from 'react-native';
import { useNavigation, Link } from '@react-navigation/native';
import { Ionicons } from 'react-native-vector-icons';
function BackButton() {
  const navigation = useNavigation();

  return (
    <Link to={{ screen: 'HOME' }}>
  
    <Text style={styles.textstyl}
    
   
    > <Ionicons name='home' size={30} ></Ionicons></Text> 
  </Link>
  );
}
const styles = StyleSheet.create({
    textstyl:{
        fontWeight:'bold',
        fontSize:20,
        textAlign:'center'
      }
})
export default BackButton