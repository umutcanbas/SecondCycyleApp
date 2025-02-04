import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';

import TopMenu from '../../../components/TopMenu';
import Button from '../../../components/Button';

import {useDispatch} from 'react-redux';
import {logout} from '../../../redux/slice';

import routes from '../../../navigation/routes';

import auth from '@react-native-firebase/auth';

const Settings = ({navigation}) => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await auth().signOut();
      dispatch(logout());

      console.log('User logged out');
      navigation.navigate(routes.AUTH_NAVIGATOR, {screen: routes.LOGIN});
    } catch (error) {
      console.error('Error removing isLogged:', error);
    }
  };
  const goInfo = () => {
    navigation.navigate(routes.OTHER_NAVIGATOR, {screen: routes.USER_INFO});
  };
  return (
    <SafeAreaView style={styles.container}>
      <TopMenu
        title="Settings"
        onPressLeft={() => navigation.goBack()}
        leftIcon="back"
      />

      <Button
        title="User info"
        containerStyles={{backgroundColor: 'black'}}
        titleStyles={{color: 'white'}}
        onPress={goInfo}
      />

      <View style={{marginTop: 620}}>
        <Button
          title="Log out"
          containerStyles={{backgroundColor: 'red'}}
          titleStyles={{color: 'black'}}
          onPress={() => handleLogout()}
        />
      </View>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
