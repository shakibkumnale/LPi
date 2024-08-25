import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity,Image, View, Modal, Pressable,Alert } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import axios from 'axios'
import * as ImagePicker from 'expo-image-picker';


const Chats = () => {




  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage]=useState()
  const [firsttime,setFirstime]=useState(true)
  const getPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
        alert('Permission denied!');
        return false;
    }
    return true;
};
useEffect(()=>{
  if(image){


    setModalVisible(false)
  }
  setFirstime(true)

},[image])
// useEffect(() => {


//   return () => {
//  setModalVisible(true)
//   }
// },[])


const pickImage = async () => {
  const hasPermission = await getPermission();
  if (!hasPermission) return;

  let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
   
      quality: 1,
  });

  console.log(result);

  if (!result.canceled) {
      setImage(result.assets[0].uri);
  }
};
const removeImage=()=>{
  setImage()
}

const takePhoto = async () => {
  const hasPermission = await getPermission();
  if (!hasPermission) return;

  let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      
      quality: 1,
  });

  console.log(result);

  if (!result.canceled) {
      setImage(result.assets[0].uri);
  }
};
  const scrollViewRef= useRef(null)

  const [messages, setMessages] = useState([]);
  useEffect(() => {
    // Scroll to the end when the component mounts
    scrollViewRef.current.scrollToEnd({ animated: true });
  }, [messages]);
  const [inputText, setInputText] = useState("");
  const FetchQuery=async()=>{
    try {
     
  if(firsttime)
  {
    if (!image || !inputText) {
      Alert.alert('Error', 'Please select an image and enter text');
      return;
    }
      const formData = new FormData();
      formData.append('image', {
        uri: image,
        name: 'photo.jpg',
        type: 'image/jpeg',
      });
      formData.append('text', inputText);
  
setImage()
setInputText()
        const res = await axios.post("http://192.168.1.207:3001/AskQuery", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
  setFirstime(false)
  return res.data
      }else{
        console.warn("ima here");
        
        const text=inputText
        setInputText()
    const res = await axios.post("http://192.168.1.207:3001/AskQuery",{text})
    return res.data
  }
        // console.warn(res.data);
     

    } catch (error) {
      console.warn(error);
      
    }
     


  }

  const openModal=()=>{

    
  }
  const send = async() => {
    if (inputText.trim() === "") return;
    // if (!image || !text) {
    //   Alert.alert('Error', 'Please select an image and enter text');
    //   return;
    // }



    setMessages((prevMessages) => [
      ...prevMessages,
      <View style={{ width: '100%', padding: 10 }}>
      
        <View
          style={{
            flex:1,
            minWidth: 0,
            flexDirection:'column',
         padding:10,
            fontSize: 20,
            paddingVertical: 8,
            backgroundColor: !true ? '#fff' : '#333', // Replace true with actual condition
            borderRadius: 19,
            borderTopLeftRadius: !true ? 0 : 19, // Replace true with actual condition
            borderTopRightRadius: !true ? 19 : 0, // Replace true with actual condition
            borderStartEndRadius: 25,
            color: true ? '#fff' : '#333', // Replace true with actual condition
            alignSelf: !true ? 'flex-start' : 'flex-end', // Replace true with actual condition
            maxWidth: '80%',
          }}
        >
         {image && <Image source={{ uri: image}} style={{ minHeight:180, minWidth:180, Width:'100%',  Height:'auto' , borderRadius:25} } ></Image>}
          <Text style={{ fontSize: 20, color:'#fff', paddingTop:10}}> {inputText}</Text>
        </View>
      </View>,
    ]);


 // Clear input after sending
    const answer= await FetchQuery()
    setMessages((prevMessages) => [
      ...prevMessages,
      <View key={prevMessages.length} style={{ width: '100%', padding: 10 }}>
        <Text
          style={{
            minWidth: 0,
            paddingLeft: 25,
            paddingRight: 25,
            fontSize: 20,
            paddingVertical: 8,
            backgroundColor: true ? '#fff' : '#333', // Replace true with actual condition
            borderRadius: 19,
            borderTopLeftRadius: true ? 0 : 19, // Replace true with actual condition
            borderTopRightRadius: true ? 19 : 0, // Replace true with actual condition
            borderStartEndRadius: 25,
            color: !true ? '#fff' : '#333', // Replace true with actual condition
            alignSelf: true ? 'flex-start' : 'flex-end', // Replace true with actual condition
            maxWidth: '89%',
          }}
        >
          {answer}
        </Text>
      </View>,
    ]);
  };

  return (
    <View style={styles.chatContainer}>
     
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
   
      <ScrollView ref={scrollViewRef} contentContainerStyle={styles.scrollViewContent}>
     
        {messages}
        
      </ScrollView>
      <View style={styles.inputDiv}>
    { image &&   <View style={{ position:'absolute',top:-75, height:75, zIndex:9999999999, width:'100%'}}><View style={{position:'relative', width:65, margin:5, }} ><Image source={{ uri: image}} style={styles.image} ></Image></View>
        <Ionicons name='close' onPress={removeImage} color="black" size={24} style={{position:'absolute',left:57, top:-5, backgroundColor:'white',borderRadius:12}}></Ionicons></View>}
        <View style={styles.inputContainer}>
          <TextInput
          
            multiline={true}
            value={inputText}
            onChangeText={(text) => setInputText(text)}
            style={styles.textInput}
            placeholder="Type a message"
          />
          <Ionicons
            name="images"
            onPress={() => setModalVisible(true)}
            style={styles.sendIcon}
            size={30}
            color="black"
          />
          <Ionicons
            name="send"
            onPress={send}
            style={styles.sendIcon}
            size={30}
            color="black"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    borderRadius:10,
    width: 65,
    height: 65,

  },

  chatContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end', // Ensure input field is at the bottom
  },
  scrollViewContent: {
    padding: 10,
    justifyContent: 'flex-end', // Ensure messages are at the bottom
  },
  inputDiv: {
      paddingTop:8,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    width: '100%',
    height: 80,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 30,
    marginHorizontal: 5,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Required for Android
  },
  textInput: {
    fontSize: 22,
    flex: 1, // Takes up the remaining space
    padding: 10,
    paddingHorizontal: 20,
  },
  sendIcon: {
    paddingHorizontal: 10,
    borderRadius: 20,
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
 
  button2: {
    color:'#f87a0f',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    position:'absolute',
    top:10,
    right:10,
  },

  buttonClose: {
    backgroundColor: '#fff',
  },

  modalText: {
    marginBottom: 10,
    fontSize:25,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default Chats;
