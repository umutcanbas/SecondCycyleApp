import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  View,
  Text,
  KeyboardAvoidingView,
} from 'react-native';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import TopMenu from '../../components/TopMenu';
import Input from '../../components/Input';
import Button from '../../components/Button';

const Message = ({route, navigation}) => {
  const productInfo = route.params?.product.productInfo;
  const sellerInfo = route.params?.product.userInfo;
  const chatId = route.params?.chatId;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentUserName, setCurrentUserName] = useState('');

  const currentUserId = auth().currentUser?.uid;

  useEffect(() => {
    const fetchUserData = async () => {
      const user = await auth().currentUser;
      try {
        const userNameSnapshot = await database()
          .ref(`/users/${user.uid}`)
          .once('value');
        const userData = userNameSnapshot.val();

        setCurrentUserName(userData.userName);
      } catch (error) {
        console.log('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    if (!chatId) return;

    const chatRef = database().ref(`/chats/${chatId}/messages`);

    const onValueChange = chatRef.on('value', snapshot => {

      const data = snapshot.val();

      if (data) {
        const chatMessages = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value,
        }));
        setMessages(chatMessages);
      } else {
        setMessages([]);
      }
    });

    return () => chatRef.off('value', onValueChange);
  }, [chatId]);

  const sendMessage = async () => {
    if (newMessage.trim() === '') return;

    const message = {
      text: newMessage,
      timestamp: database.ServerValue.TIMESTAMP,
      userName: currentUserName,
      userId: currentUserId,
    };

    try {
      const chatRef = database().ref(`/chats/${chatId}/messages`);
       chatRef.push(message);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const renderMessage = ({item}) => {
    const isCurrentUser = item.userId === currentUserId;

    return (
      <View
        style={[
          styles.messageBubble,
          isCurrentUser ? styles.buyer : styles.seller,
        ]}>
        <Text style={styles.messageText}>{item.text}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <TopMenu
          title={productInfo.productName}
          onPressLeft={() => navigation.goBack()}
          leftIcon="back"
        />

        <FlatList
          data={messages}
          keyExtractor={item => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.messageList}
          bounces={false}
        />

        <View style={styles.inputContainer}>
          <Input
            placeholder="Write a message..."
            value={newMessage}
            onChangeText={setNewMessage}
            isMultiline={true}
            containerStyles={{width: 350, height: 60}}
          />
          <Button
            title="Send"
            onPress={sendMessage}
            containerStyles={{backgroundColor: 'red', width: 60, height: 60}}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Message;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  messageList: {
    flexGrow: 1,
    padding: 16,
  },
  messageBubble: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    maxWidth: '70%',
  },
  buyer: {
    backgroundColor: '#d1e7dd',
    alignSelf: 'flex-end',
  },
  seller: {
    backgroundColor: '#f8d7da',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
});
