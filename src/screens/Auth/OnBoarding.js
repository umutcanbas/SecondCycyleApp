import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';
import React, {useState} from 'react';

import TopMenu from '../../components/TopMenu';
import Input from '../../components/Input';
import Button from '../../components/Button';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import routes from '../../navigation/routes';

const OnBoarding = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [userAddress, setUserAddress] = useState('');

  const saveInfo = () => {
    if (!userName.trim() || !userAddress.trim()) {
      Alert.alert(
        'Invalid Input',
        'Please fill out both the username and address fields.',
        [{text: 'OK'}],
      );
      return;
    }

    const currentUser = auth().currentUser;
    if (!currentUser) {
      console.error('No authenticated user found.');
      return;
    }

    const userId = currentUser.uid;

    const userInfo = {
      userId,
      userName,
      userAddress,
    };

    database()
      .ref(`/users/${userId}`)
      .set(userInfo)
      .then(() => {
        console.log('User data saved successfully to Firebase.');
        navigation.replace(routes.APP_NAVIGATOR);
      })
      .catch(error => {
        console.error('Error saving user data:', error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <TopMenu title="OnBoarding" />

        <Input
          value={userName}
          onChangeText={setUserName}
          placeholder="Enter your username"
        />
        <Input
          value={userAddress}
          onChangeText={setUserAddress}
          placeholder="Enter your address"
        />

        <Button
          title="Save"
          onPress={saveInfo}
          containerStyles={{backgroundColor: 'red'}}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
