import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import routes from '../../../navigation/routes';

import TopMenu from '../../../components/TopMenu';
import ProductList from '../../../components/Products';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Favorities from './Favorities';

const Tab = createMaterialTopTabNavigator();

const Profile = ({navigation}) => {
  const [userData, setUserData] = useState('');
  const [userProduct, setUserProduct] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      const user = await auth().currentUser;
      try {
        //Username
        const userNameSnapshot = await database()
          .ref(`/users/${user.uid}`)
          .once('value');
        const userData = userNameSnapshot.val();

        setUserData(userData);

        //Products
        const userProductSnapshot = await database()
          .ref(`/products/${user.uid}`)
          .once('value');
        const obj = userProductSnapshot.val();
        if (obj === null) return setUserProduct({});

        const products = Object.keys(obj).map(key => {
          return {
            ...obj[key],
            id: key,
          };
        });
        setUserProduct(products);
      } catch (error) {
        console.log('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  const goSettings = () => {
    navigation.navigate(routes.OTHER_NAVIGATOR, {screen: routes.SETTINGS});
  };
  return (
    <SafeAreaView style={styles.container}>
      <TopMenu
        title={userData?.userName}
        rightIcon="settings"
        onPressRight={goSettings}
      />

      <Tab.Navigator
        initialRouteName="Products"
        screenOptions={{
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: '#687684',
          tabBarLabelStyle: {fontSize: 22},
          tabBarStyle: {backgroundColor: 'white'},
        }}>
        <Tab.Screen
          name="Products"
          children={() => <ProductList userProducts={userProduct} />}
        />

        <Tab.Screen name="Favorities" component={Favorities} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
