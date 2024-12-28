import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import database from '@react-native-firebase/database';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const productsRef = database().ref('/products');

    const onValueChange = productsRef.on('value', snapshot => {
      const productsData = snapshot.val();

      if (productsData) {
        // Firebase'den gelen veriyi bir diziye dönüştürün
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
    });

    return () => productsRef.off('value', onValueChange);
  }, []);

  const renderItem = ({item}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.productName}</Text>
      <Text>{item.description}</Text>
      <Text>${item.price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.listEmpty}>No products available.</Text>
        }
        bounces={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f8fa',
  },
  item: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  description: {
    fontSize: 14,
    color: '#555555',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007BFF',
  },
  listEmpty: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#999999',
  },
});

export default ProductList;
