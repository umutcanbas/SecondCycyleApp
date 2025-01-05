import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';

import TopMenu from '../../components/TopMenu';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const Chat = () => {
  useEffect(() => {
    const fetchUserChats = async () => {
      try {
        const user = auth().currentUser;
        if (!user) {
          console.error('No user is logged in.');
          return;
        }
  
        const userRef = database().ref(`/users/${user.uid}`);
        const snapshot = await userRef.once('value');
        const userData = snapshot.val();
  
        if (!userData) {
          console.error('User data not found.');
          return;
        }
  
        const userId = userData.userId;
  
        // Fetch chats
        const chatsRef = database().ref(`/chats`);
        const chatsSnapshot = await chatsRef.once('value');
        const chatsData = chatsSnapshot.val();
        console.log('All chats data:', chatsData);
  
        if (chatsData) {
          // Filter chats where the current user is a participant
          const userChats = Object.entries(chatsData).filter(([key, chat]) => {
            return chat.users && chat.users[userId];
          });
  
          console.log('User chats:', userChats);
        } else {
          console.log('No chats found.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchUserChats();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TopMenu title="Chat Rooms" />
      <Text>Chat</Text>
    </SafeAreaView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
