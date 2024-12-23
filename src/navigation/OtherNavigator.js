import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import routes from './routes';

import Settings from '../screens/App/Settings';

const Stack = createNativeStackNavigator();

const OtherNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={routes.SETTINGS} component={Settings} />
    </Stack.Navigator>
  );
};

export default OtherNavigation;
