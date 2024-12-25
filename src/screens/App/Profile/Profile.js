import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TopMenu from '../../../components/TopMenu';
import routes from '../../../navigation/routes';

const Profile = ({navigation}) => {
  const goSettings = () => {
    navigation.navigate(routes.OTHER_NAVIGATOR, {screen: routes.SETTINGS});
  };
  return (
    <SafeAreaView style={styles.container}>
      <TopMenu title="Profile" rightIcon="settings" onPressRight={goSettings} />
      <Text>Profile</Text>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#white',
  },
});
