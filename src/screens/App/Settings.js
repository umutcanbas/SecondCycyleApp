import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TopMenu from '../../components/TopMenu';
import Button from '../../components/Button';

const Settings = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <TopMenu
        title="Settings"
        onPressLeft={() => navigation.goBack()}
        leftIcon="back"
      />
      <Button title="User info" containerStyles={{backgroundColor: 'black'}} />
      <Button
        title="Location info"
        containerStyles={{backgroundColor: 'black'}}
      />

      <View style={{marginTop:550}} > 

      <Button title='Log out' containerStyles={{backgroundColor: 'red'}} titleStyles={{color:'black'}} />
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
