import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Message = ({ text, isLeft }) => (
  <View key={prevMessages.length} style={{ width: '100%', padding: 10 }}>
  <Text
    style={{
      minWidth: 0,
      paddingLeft: 25,
      paddingRight: 25,
      fontSize: 20,
      paddingVertical: 8,
      backgroundColor: !isLeft? '#fff' : '#333', // Replace isLeftwith actual condition
      borderRadius: 19,
      borderTopLeftRadius: !isLeft? 0 : 19, // Replace isLeftwith actual condition
      borderTopRightRadius: !isLeft? 19 : 0, // Replace isLeftwith actual condition
      borderStartEndRadius: 25,
      color: isLeft? '#fff' : '#333', // Replace isLeftwith actual condition
      alignSelf: !isLeft? 'flex-start' : 'flex-end', // Replace true with actual condition
      maxWidth: '80%',
    }}
  >
    {text}
  </Text>
</View>
);

// const styles = StyleSheet.create({
//   messageContainer: {
//     width: '100%',
//     padding: 10,
//   },
//   messageText: {
//     minWidth: 0,
//     paddingLeft: 25,
//     paddingRight: 25,
//     fontSize: 20,
//     paddingVertical: 8,
//     borderRadius: 19,
//     borderStartEndRadius: 25,
//     maxWidth: '80%',
//   },
// });

export default Message;