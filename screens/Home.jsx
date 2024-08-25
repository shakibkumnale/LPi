import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Home = () => {
  return (
    <View style={styles.homecontainer}>
      <Text  style={styles.textstyl}>Welcome L𝝿</Text>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    homecontainer: {
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