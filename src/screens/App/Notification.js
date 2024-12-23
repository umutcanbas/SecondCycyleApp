import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TopMenu from '../../components/TopMenu'

const Notification = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TopMenu title='Notification' />
      <Text>Chat</Text>
    </SafeAreaView>
  )
}

export default Notification

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#BCCCDC'
  },
})