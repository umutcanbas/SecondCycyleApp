import {SafeAreaView, Text, StyleSheet} from 'react-native';
import React from 'react';
import TopMenu from '../../components/TopMenu';

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TopMenu title='Second Cycyle' />
      <Text>Home</Text>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
});