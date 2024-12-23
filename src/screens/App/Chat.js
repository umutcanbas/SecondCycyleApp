import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TopMenu from '../../components/TopMenu'

const Chat = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TopMenu title='Chat' />
      <Text>Chat</Text>
    </SafeAreaView>
  )
}

export default Chat

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#BCCCDC'
  },
})