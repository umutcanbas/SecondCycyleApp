import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import database from '@react-native-firebase/database';

import routes from '../navigation/routes';
import {useNavigation} from '@react-navigation/native';

import DefaultImage from '../assets/png/ProductDefault.png';

const ProductList = ({userProducts, children}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const screenWidth = Dimensions.get('window').width;

  const navigation = useNavigation();

  const goDetail = product => {
    navigation.navigate(routes.OTHER_NAVIGATOR, {
      screen: routes.PRODUCT_DETAIL,
      params: {product},
    });
  };

  useEffect(() => {
    setLoading(true);
    const productsRef = database().ref('/products');

    const onValueChange = productsRef.on('value', snapshot => {
      const productsData = snapshot.val();

      if (productsData) {
        const formattedProducts = Object.keys(productsData).flatMap(userId =>
          Object.keys(productsData[userId]).map(productId => ({
            id: productId,
            userId,
            ...productsData[userId][productId],
          })),
        );
        setProducts(formattedProducts);
      } else {
        setProducts([]);
      }
      setLoading(false);
    });

    return () => {
      productsRef.off('value', onValueChange);
      setLoading(false);
    };
  }, []);

  const data = userProducts ? userProducts : products;

  const RenderItem = ({item}) => {
    const {productInfo, userInfo} = item;

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => goDetail(item)}
        style={[styles.card, {width: screenWidth / 2 - 20}]}>
        <Text style={styles.productName} numberOfLines={1} ellipsizeMode="tail">
          {productInfo?.productName.toUpperCase()}
        </Text>

        <Image source={DefaultImage} style={styles.image} />

        <Text style={styles.description} numberOfLines={4} ellipsizeMode="tail">
          {productInfo?.description}
        </Text>

        <Text style={styles.userInfo} numberOfLines={1} ellipsizeMode="tail">
          Seller: {userInfo?.userName}
        </Text>

        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.price}>
          ${productInfo?.price}
        </Text>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => <RenderItem item={item} />}
        bounces={false}
        numColumns={2}
        ListEmptyComponent={
          <Text style={styles.listEmpty}>No products available.</Text>
        }
        ListFooterComponent={children}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginVertical: 16,
    marginHorizontal: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    height: 250,
    alignItems: 'center',
    height: 280,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginRight: 8,
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    color: 'green',
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 20,
    resizeMode: 'cover',
  },
  description: {
    fontSize: 12,
    color: '#2f4f4f',
    textAlign: 'center',
    marginTop: 5,
  },
  listEmpty: {
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'black',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductList;
