import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';

import TopMenu from '../../../components/TopMenu';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

import {useSelector} from 'react-redux';

import database from '@react-native-firebase/database';

const UserInfo = ({navigation}) => {
  const [userName, setUserName] = React.useState('');
  const [userAddress, setUserAddress] = React.useState('');

  const userId = useSelector(state => state.slice.userId);

  const saveInfo = () => {
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
      })
      .catch(error => {
        console.error('Error saving user data:', error);
      });

    navigation.goBack();
  };

  return (
    <SafeAreaView>
      <TopMenu
        title="User Info"
        onPressLeft={() => navigation.goBack()}
        leftIcon="back"
      />

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
    </SafeAreaView>
  );
};

export default UserInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
