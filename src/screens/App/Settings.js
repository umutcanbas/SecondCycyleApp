import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TopMenu from '../../components/TopMenu';

const Settings = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <TopMenu
        title="Settings"
        onPressLeft={() => navigation.goBack()}
        leftIcon="back"
      />
      <Text>Settings</Text>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BCCCDC',
  },
});
