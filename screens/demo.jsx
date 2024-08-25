import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { View, Button, TextInput, Alert, Image } from 'react-native';

export default function App() {
  const [image, setImage] = useState();
  
  const [inputText, setInputText] = useState('');
  const getPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
        alert('Permission denied!');
        return false;
    }
    return true;
};
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

  const handleSubmit = async () => {
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

    try {
      const res = await axios.post("http://192.168.1.207:3001/AskQuery", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      Alert.alert('Success', res.data.message);
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="Pick an image" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <TextInput
        placeholder="Enter some text"
        value={inputText}
        onChangeText={setInputText}
        style={{ borderColor: 'gray', borderWidth: 1, marginVertical: 10, padding: 8 }}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}
