import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';
import OtherNavigatior from './OtherNavigator';
import HomeNavigator from './HomeNavigator';

import routes from './routes';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={routes.AUTH_NAVIGATOR} component={AuthNavigator} />
        <Stack.Screen name={routes.APP_NAVIGATOR} component={AppNavigator} />
        <Stack.Screen name={routes.HOME_NAVIGATOR} component={HomeNavigator} />

        <Stack.Screen
          name={routes.OTHER_NAVIGATOR}
          component={OtherNavigatior}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
