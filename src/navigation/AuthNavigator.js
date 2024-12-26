import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import routes from './routes';

import Login from '../screens/Auth/Login';
import SingUp from '../screens/Auth/SingUp';
import SplashScreen from '../screens/Auth/SplashScreen';
import OnBoarding from '../screens/Auth/OnBoarding';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={routes.SPLASHSCREEN} component={SplashScreen} />
      <Stack.Screen name={routes.LOGIN} component={Login} />
      <Stack.Screen name={routes.SINGUP} component={SingUp} />
      <Stack.Screen name={routes.ONBOARDING} component={OnBoarding} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
