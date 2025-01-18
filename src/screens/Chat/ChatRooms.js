import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import TopMenu from '../../components/TopMenu';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import routes from '../../navigation/routes';

import {useIsFocused} from '@react-navigation/native';

const Chat = ({navigation}) => {
  const isFocused = useIsFocused();

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!isFocused) {
      setMessages([]);
      return;
    }

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

        const chatsRef = database().ref(`/chats`);
        const chatsSnapshot = await chatsRef.once('value');
        const chatsData = chatsSnapshot.val();

        if (chatsData) {
          let userMessages = [];

          Object.keys(chatsData).forEach(key => {
            if (key.includes(userData.userId)) {
              userMessages.push(chatsData[key]);
            }
          });

          setMessages(userMessages);
        } else {
          console.log('No chats found.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUserChats();
  }, [isFocused]);

  const RenderChats = ({item}) => {
    const message = Object.values(item.messages)[0];

    const receiver =
      auth().currentUser.uid === item?.users?.buyer?.userId
        ? item?.users?.seller
        : item?.users?.buyer;

    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() =>
          navigation.navigate(routes.OTHER_NAVIGATOR, {
            screen: routes.MESSAGE,
            params: item,
          })
        }
        style={styles.chatItem}>
        <Text style={styles.productName}>{receiver?.userName}</Text>

        <View style={styles.chatItemInnerContainer}>
          <Text style={styles.messageText}>
            {message?.userName || 'No user name'}:{' '}
          </Text>

          <Text style={[styles.messageText, {fontWeight: 600}]}>
            {message?.text || 'No message content'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopMenu title="Chat Rooms" />
      <FlatList
        data={messages}
        renderItem={({item}) => <RenderChats item={item} />}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>No chats found.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  chatItem: {
    height: 75,
    padding: 20,
    margin: 10,
    borderWidth: 1,
    borderRadius: 45,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  chatItemInnerContainer: {
    flexDirection: 'row',
  },
  messageText: {
    fontSize: 14,
    color: 'black',
    fontWeight: '700',
  },
});
