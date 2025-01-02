import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TopMenu from '../../components/TopMenu';

const Message = ({route, navigation}) => {
  const productInfo = route.params.product.productInfo;
  const sellerInfo = route.params.product.userInfo;

  console.log(sellerInfo)
  return (
    <SafeAreaView>
      <TopMenu
        title={productInfo.productName}
        onPressLeft={() => navigation.goBack()}
        leftIcon="back"
      />
      <Text>Message</Text>
    </SafeAreaView>
  );
};

export default Message;

const styles = StyleSheet.create({});
