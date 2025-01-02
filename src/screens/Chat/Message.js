import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  View,
  Text,
  KeyboardAvoidingView,
} from 'react-native';

import TopMenu from '../../components/TopMenu';
import Input from '../../components/Input';
import Button from '../../components/Button';

const Message = ({route, navigation}) => {
  const productInfo = route.params?.product.productInfo;
  const sellerInfo = route.params?.product.userInfo;
  const chatId = route.params?.chatId;

  const [messages, setMessages] = useState();
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim() === '') return;

    setMessages(prevMessages => [
      ...prevMessages,
      {id: Date.now().toString(), text: newMessage, sender: 'buyer'},
    ]);

    setNewMessage('');
  };

  const renderMessage = ({item}) => {
    return (
      <View
        style={[
          styles.messageBubble,
          // sellerInfo.userName ===message.userName ? styles.seller : styles.buyer,
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
