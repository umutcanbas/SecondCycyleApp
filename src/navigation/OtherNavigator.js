import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import routes from './routes';

import Settings from '../screens/App/Profile/Settings';
import UserInfo from '../screens/App/Profile/UserInfo';

const Stack = createNativeStackNavigator();

const OtherNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={routes.SETTINGS} component={Settings} />
      <Stack.Screen name={routes.USER_INFO} component={UserInfo} />

    </Stack.Navigator>
  );
};

export default OtherNavigation;
