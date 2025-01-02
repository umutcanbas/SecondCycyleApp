import {SafeAreaView, ScrollView, StyleSheet, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';

import TopMenu from '../../../components/TopMenu';
import Button from '../../../components/Button';

import DefaultImage from '../../../assets/png/ProductDefault.png';

import routes from '../../../navigation/routes';

import {changeFavoriteList} from '../../../redux/slice';
import {useDispatch, useSelector} from 'react-redux';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const ProductDetail = ({route, navigation}) => {
  const product = route.params.product;

  const dispatch = useDispatch();

  const favoriteList = useSelector(state => state.slice.favoriteList);

  const isfavorite = favoriteList.find(item => item.id === product.id);

  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth().currentUser;

      if (currentUser) {
        const userId = currentUser.uid;

        try {
          const snapshot = await database()
            .ref(`/users/${userId}`)
            .once('value');

          if (snapshot.exists()) {
            const data = snapshot.val();
            setCurrentUserId(data.userId);
          } else {
            console.log('No user data found.');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, []);

  const sendMessage = async () => {
    const receiverId = product.userInfo?.userId;

    if (!receiverId) {
      console.error('Receiver ID not found.');
      return;
    }

    const chatId = [currentUserId, receiverId].sort().join('_');

    try {
      await database()
        .ref(`/chats/${chatId}`)
        .set({
          users: {
            [currentUserId]: true,
            [receiverId]: true,
          },
          lastMessage: null,
          timestamp: database.ServerValue.TIMESTAMP,
        });

      navigation.navigate(routes.OTHER_NAVIGATOR, {
        screen: routes.MESSAGE,
        params: {chatId, product},
      });
    } catch (error) {
      console.error('Error creating chat path:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopMenu
        title="Product Detail"
        onPressLeft={() => navigation.goBack()}
        leftIcon="back"
        rightIcon={isfavorite ? 'heartRed' : 'heart'}
        onPressRight={() => dispatch(changeFavoriteList(product))}
      />

      <ScrollView
        bounces={false}
        contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.productName}>
          {product.productInfo?.productName.toUpperCase()}
        </Text>

        <Image source={DefaultImage} style={styles.image} />

        <Text style={styles.productDescription}>
          {product?.productInfo?.description}
        </Text>

        <Text style={styles.productPrice}>${product.productInfo?.price}</Text>

        <Text style={styles.userInfo}>
          Seller: {product.userInfo?.userName}
        </Text>

        {currentUserId === product.userInfo?.userId ? null : (
          <Button
            title="Start Chat"
            onPress={() => sendMessage()}
            containerStyles={{backgroundColor: 'red'}}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    padding: 16,
    margin: 5,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  productDescription: {
    fontSize: 16,
    color: '#555',
    marginBottom: 16,
    lineHeight: 24,
    textAlign: 'justify',
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 16,
    textAlign: 'center',
  },
  userInfo: {
    fontSize: 14,
    fontWeight: '600',
    color: '#777',
    textAlign: 'center',
    marginTop: 8,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderColor: '#eee',
    borderBottomWidth: 1,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 16,
  },
});
