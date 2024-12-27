import {SafeAreaView, Text, StyleSheet} from 'react-native';
import React from 'react';

import TopMenu from '../../../components/TopMenu';
import Button from '../../../components/Button';

import routes from '../../../navigation/routes';

const Home = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <TopMenu title="Second Cycle" />

      <Button
        title="Add Product"
        onPress={() => navigation.navigate(routes.ADD_PRODUCT)}
        containerStyles={{backgroundColor: 'red'}}
      />
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
