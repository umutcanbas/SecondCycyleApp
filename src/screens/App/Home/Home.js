import {SafeAreaView, Text, StyleSheet, View} from 'react-native';
import React from 'react';

import TopMenu from '../../../components/TopMenu';


import routes from '../../../navigation/routes';

import Products from '../../../components/Products';

const Home = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <TopMenu
        title="Second Cycle"
        onPressRight={() => navigation.navigate(routes.ADD_PRODUCT)}
        rightIcon="plus"
      />

      <Products />
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
