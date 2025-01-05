import {SafeAreaView, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';

import {useDispatch} from 'react-redux';
import {login} from '../../redux/slice';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import routes from '../../navigation/routes';

const SplashScreen = ({navigation}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuthStatus = async () => {
      const currentUser = auth().currentUser;

      if (currentUser) {
        const userId = currentUser.uid;

        try {
          const snapshot = await database()
            .ref(`/users/${userId}`)
            .once('value');

          if (snapshot.exists()) {
            const userInfo = snapshot.val();

            if (!userInfo.userName || userInfo.userName === 'Guest') {
              dispatch(login());
              navigation.replace(routes.ONBOARDING);
            } else {
              dispatch(login());
              navigation.replace(routes.APP_NAVIGATOR);
            }
          } else {
            dispatch(login());
            navigation.replace(routes.ONBOARDING);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          navigation.replace(routes.LOGIN);
        }
      } else {
        navigation.replace(routes.LOGIN);
      }
    };

    checkAuthStatus();
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
