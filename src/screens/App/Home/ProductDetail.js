import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TopMenu from '../../../components/TopMenu';

const ProductDetail = ({route, navigation}) => {
  const product = route.params.product;

  return (
    <SafeAreaView>
      <TopMenu
        title='Product Detail'
        onPressLeft={() => navigation.goBack()}
        leftIcon="back"
        rightIcon="heart"
        onPressRight={() => console.log('aaa')}
      />
      <ScrollView bounces={false}>
        <Text>{product?.productInfo.productName}</Text>
        <Text>{product?.productInfo.description}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({});
