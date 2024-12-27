import {SafeAreaView, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';

import routes from '../../navigation/routes';

import {useSelector} from 'react-redux';

import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

const SplashScreen = ({navigation}) => {
  const isLogged = useSelector(state => state.slice.isLogged);

  useEffect(() => {
    const currentUser = auth().currentUser;

    if (isLogged) {
      if (currentUser) {
        const userId = currentUser.uid;

        database()
          .ref(`/users/${userId}`)
          .once('value')
          .then(snapshot => {
            if (snapshot.exists()) {
              const data = snapshot.val();
              !data.userName || data.userName == 'Guest'
                ? navigation.replace(routes.AUTH_NAVIGATOR, {
                    screen: routes.ONBOARDING,
                  })
                : navigation.replace(routes.APP_NAVIGATOR);
            } else {
              console.log('No user data found.');
              navigation.replace(routes.AUTH_NAVIGATOR, {
                screen: routes.ONBOARDING,
              });
            }
          })
          .catch(error => {
            console.error('Error fetching user data:', error);
          });
      }
    } else {
      navigation.replace(routes.AUTH_NAVIGATOR, {screen: routes.LOGIN});
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Second Cycle</Text>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001A6E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
});
