// import { useState } from 'react';
import { Button, Image, View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import React, {useEffect, useState} from 'react';
import { Alert, Modal, Text, Pressable } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
export default function ImagePickerExample() {
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage]=useState()
  const getPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
        alert('Permission denied!');
        return false;
    }
    return true;
};
useEffect(()=>{
  setModalVisible(true)

},[])
useEffect(() => {


  return () => {
 setModalVisible(true)
  }
},[])


const pickImage = async () => {
  const hasPermission = await getPermission();
  if (!hasPermission) return;

  let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
  });

  console.log(result);

  if (!result.canceled) {
      setImage(result.assets[0].uri);
  }
};

const takePhoto = async () => {
  const hasPermission = await getPermission();
  if (!hasPermission) return;

  let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
  });

  console.log(result);

  if (!result.canceled) {
      setImage(result.assets[0].uri);
  }
};
  // const [image, setImage] = useState(null);

  // const pickImage = async () => {
  //   // No permissions request is necessary for launching the image library
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   console.log(result);

  //   if (!result.canceled) {
  //     setImage(result.assets[0].uri);
  //   }
  // };

  return (
    <View style={styles.container}>
      {/* <Button title="Pick an image from camera roll" onPress={pickImage} />
   
       <Button title="Pick an image from gallery" onPress={pickImage} />
       <Button title="Take a photo" onPress={takePhoto} />
      {image && <Image source={{ uri: image }} style={styles.image} />}    */}
      <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
       >
        {/*      onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }} */}
        <View style={styles.centeredView2}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>choose Image</Text>
            <Pressable
              style={[styles.button2, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              {/* <Text style={styles.textStyle}>Hide Modal</Text> */}
              <Ionicons name="close" size={25}></Ionicons>
            </Pressable>
            <View style={{ flex:1 ,flexDirection:'row',  justifyContent:'space-around'}}>
            <Pressable
              style={{flex:1,flexDirection:'row', justifyContent:'space-around'}}
              onPress={takePhoto}>
              {/* <Text style={styles.textStyle}>Hide Modal</Text> */}
              <Ionicons name="camera" color='#040' size={80}></Ionicons>
            </Pressable>
            <Pressable
              style={{flex:1,     flexDirection:'row',  justifyContent:'space-around'}}
              onPress={pickImage}>
              {/* <Text style={styles.textStyle}>Hide Modal</Text> */}
              <Ionicons name="images" color='#004' size={80}></Ionicons>
            </Pressable>
            </View>
          </View>
        </View>
      </Modal>
   
    {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
    </View>
    

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    // marginTop: 22,
    width:'100%',

  },
  centeredView2: {
    flex: 1,
    justifyContent:'flex-end',
    // alignItems: 'center',
    // marginTop: 22,
    width:'100%',
    height:150,
  },
  modalView: {
    // margin: 20,
    position:'relative',
    height:200,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 26,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  button2: {
    color:'#f87a0f',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    position:'absolute',
    top:10,
    right:10,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#fff',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 10,
    fontSize:25,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

