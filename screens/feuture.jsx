import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Future = () => {
  return (
    <View style={styles.Futurecontainer}>
      <Text  style={styles.textstyl}>Welcome L𝝿</Text>
    </View>
  )
}

export default Future

const styles = StyleSheet.create({
    Futurecontainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      textstyl:{
        fontWeight:'bold',
        fontSize:20,
      }
})