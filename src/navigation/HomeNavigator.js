import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import routes from './routes';

import Home from '../screens/App/Home/Home';
import AddProduct from '../screens/App/Home/AddProduct';

const Stack = createNativeStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={routes.HOME} component={Home} />
      <Stack.Screen
        name={routes.ADD_PRODUCT}
        component={AddProduct}
        options={{presentation: 'modal'}}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
