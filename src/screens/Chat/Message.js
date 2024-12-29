import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TopMenu from '../../components/TopMenu';

const Message = ({route, navigation}) => {
  console.log(route.params);
  return (
    <SafeAreaView>
      <TopMenu
        title="Message"
        onPressLeft={() => navigation.goBack()}
        leftIcon="back"
      />
      <Text>Message</Text>
    </SafeAreaView>
  );
};

export default Message;

const styles = StyleSheet.create({});
