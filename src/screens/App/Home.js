import {SafeAreaView, Text, StyleSheet} from 'react-native';
import React, { useEffect } from 'react';

import TopMenu from '../../components/TopMenu';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import {useDispatch} from 'react-redux';
import {setUserId} from '../../redux/slice';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const currentUser = auth().currentUser;

    dispatch(setUserId(currentUser.uid));
    if (currentUser) {
      const userInfo = {
        userId: currentUser.uid,
        username: 'Guest',
        userAddress: 'Not Provided',
      };

      database()
        .ref(`/users/${currentUser.uid}`)
        .set(userInfo)
        .then(() => {
          console.log('User data saved successfully to Firebase.');
        })
        .catch(error => {
          console.error('Error saving user data:', error);
        });
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TopMenu title="Second Cycyle" />
      <Text>Home</Text>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
