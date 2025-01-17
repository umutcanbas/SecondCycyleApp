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
  const data = route.params;

  const buyer = data?.currentUserId || data?.users?.buyer?.userId;
  const seller = data?.userInfo || data?.users?.seller;

  /*  console.log(
    JSON.stringify(
      {
        messages: {
          '-OGpMt26BIBhVe6vOZ1a': {
            text: 'k',
            timestamp: 1737135985019,
            userId: 'IJPI2TMUrMX5i7eCwJ0uZNMJS3A2',
            userName: 'İbo',
          },
        },
        seller: {
          userAddress: 'hamidye',
          userId: '7tRUFvBGbzU2UuZk8AyM7nYKsMK2',
          userName: 'UMUT',
        },
      },
      null,
      2,
    ),
  ); */

  /*   console.log(
    'aaa',
    JSON.stringify(
      {
        id: '-OGf2zute8jq01LC195b',
        productInfo: {
          description: 'Araba',
          price: '3131',
          productName: 'Deneme Umut',
        },
        userId: '7tRUFvBGbzU2UuZk8AyM7nYKsMK2',
        userInfo: {
          userAddress: 'hamidye',
          userId: '7tRUFvBGbzU2UuZk8AyM7nYKsMK2',
          userName: 'UMUT',
        },
      },
      null,
      2,
    ),
  );
 */
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentUserName, setCurrentUserName] = useState('');

  const currentUserId = auth().currentUser?.uid;

  const chatId = `${buyer}_${seller.userId}`;

  //current user
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

    const users = {
      buyer: {
        userId: currentUserId,
        userName: currentUserName,
      },
      seller,
    };

    const message = {
      text: newMessage,
      timestamp: database.ServerValue.TIMESTAMP,
      userName: currentUserName,
      userId: currentUserId,
    };

    try {
      const chatRef = database().ref(`/chats/${chatId}/messages`);
      const sellerRef = database().ref(`/chats/${chatId}/users`);
      chatRef.push(message);
      sellerRef.set(users);
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
          title={seller.userName}
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
