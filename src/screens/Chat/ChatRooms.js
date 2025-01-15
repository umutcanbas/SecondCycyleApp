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

const Chat = ({navigation}) => {
  const [messages, setMessages] = useState([]);

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
  }, []);

  const RenderChats = ({item}) => {
    const productName =
      item.product?.productInfo?.description || 'Unnamed Product';

    const messageKeys = Object.keys(item.messages || {});

    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={()=>navigation.navigate(routes.OTHER_NAVIGATOR, {
          screen: routes.MESSAGE,
        })}
        style={styles.chatItem}>
        <Text style={styles.productName}>{productName}</Text>

        {messageKeys.map(key => (
          <View key={key} style={styles.chatItemInnerContainer}>
            <Text style={styles.messageText}>
              {item.messages[key]?.text || 'No message content'}
            </Text>
            <Text style={styles.messageText}>
              {item.messages[key]?.userName || 'No user name'}
            </Text>
          </View>
        ))}
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
  },
  productName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  chatItemInnerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  messageText: {
    fontSize: 14,
    color: 'black',
    fontWeight: '700',
  },
});
