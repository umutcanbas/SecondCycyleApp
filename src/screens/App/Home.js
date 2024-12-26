import {SafeAreaView, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';

import TopMenu from '../../components/TopMenu';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const Home = () => {
  useEffect(() => {
    const currentUser = auth().currentUser;

    if (currentUser) {
      database()
        .ref(`/users/${currentUser.uid}`)
        .once('value')
        .then(snapshot => {
          if (!snapshot.exists()) {
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
          } else {
            console.log('User data already exists in Firebase.');
          }
        })
        .catch(error => {
          console.error('Error checking user data:', error);
        });
    } else {
      console.error('No authenticated user found.');
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TopMenu title="Second Cycle" />
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
