import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';

import TopMenu from '../../../components/TopMenu';

const AddProduct = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TopMenu title="Add Product" onPressRight={() => {}} rightIcon="plus" />
      <View></View>
    </SafeAreaView>
  );
};

export default AddProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
