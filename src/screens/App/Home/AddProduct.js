import {Alert, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import TopMenu from '../../../components/TopMenu';
import Input from '../../../components/Input';

import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

const AddProduct = ({navigation}) => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [userId, setUserId] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      setUserId(currentUser.uid);

      const userRef = database().ref(`/users/${currentUser.uid}`);
      userRef
        .once('value')
        .then(snapshot => {
          if (snapshot.exists()) {
            setUserInfo(snapshot.val());
          } else {
            console.log('Kullanıcı bilgisi bulunamadı.');
          }
        })
        .catch(error => {
          console.error('Hata:', error);
        });
    }
  }, []);

  const addProduct = () => {
    if (!productName.trim() || !description.trim() || !price.trim()) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    const product = {
      productInfo: {
        productName,
        description,
        price,
      },
      userInfo,
    };

    database()
      .ref(`/products/${userId}`)
      .push(product)
      .then(() => {
        console.log('Product added successfully to Firebase.');
        Alert.alert('Success', 'Product added successfully!', [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]);
      })
      .catch(error => {
        console.error('Error adding product:', error);
        Alert.alert('Error', 'Failed to add product. Please try again.');
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopMenu
        title="Add Product"
        onPressRight={() => {
          addProduct();
        }}
        rightText="Done"
        onPressLeft={() => navigation.goBack()}
        leftIcon="close"
      />
      <Input
        placeholder="Product Name"
        value={productName}
        onChangeText={setProductName}
        containerStyles={styles.input}
      />
      <Input
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        containerStyles={styles.input}
      />
      <Input
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        containerStyles={{...styles.input , height:200} }
        isMultiline={true}
      />
    </SafeAreaView>
  );
};

export default AddProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  input: {
    backgroundColor: 'white', 
    padding: 12,
    height: 60,
    borderRadius: 8, 
    marginVertical: 10,
    shadowColor: '#000', 
    shadowOffset: {width: 0, height: 4}, 
    shadowOpacity: 0.1, 
    shadowRadius: 6, 
    elevation: 5, 
    borderWidth: 1,
  },
});
