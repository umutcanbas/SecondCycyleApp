import {
  Alert,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';

import Input from '../../components/Input';
import Button from '../../components/Button';

import routes from '../../navigation/routes';

import {useDispatch} from 'react-redux';
import {login} from '../../redux/slice';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleLogin = async () => {
    setLoading(true);
    try {
      await auth().signInWithEmailAndPassword(email, password);

      const currentUser = auth().currentUser;

      if (currentUser) {
        const userId = currentUser.uid;

        const snapshot = await database().ref(`/users/${userId}`).once('value');

        if (snapshot.exists()) {
          const userInfo = snapshot.val();

          if (!userInfo.userName || userInfo.userName === 'Guest') {
            dispatch(login());
            navigation.replace(routes.ONBOARDING);
          } else {
            dispatch(login());
            navigation.replace(routes.APP_NAVIGATOR);
          }
        } else {
          navigation.replace(routes.ONBOARDING);
        }
      }
    } catch (error) {
      console.error('Login Error:', error);
      Alert.alert('Login Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  const goSignUp = () => {
    navigation.navigate(routes.AUTH_NAVIGATOR, {screen: routes.SINGUP});
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.header}>
          <Text style={styles.headerText}>Login</Text>
        </View>
        <Input value={email} onChangeText={setEmail} placeholder="E-mail" />
        <Input
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          isSecure
        />

        <View style={styles.buttonContainer}>
          <Button
            title="Login"
            onPress={handleLogin}
            loading={loading}
            isDisabled={email.trim() === '' || password.trim() === ''}
            containerStyles={{width: '50%'}}
          />
          <Button
            title="Register"
            onPress={goSignUp}
            containerStyles={{width: '50%'}}
          />
        </View>

        <View style={{marginTop: 90}}>
          <Button icon="apple" title="Sign in with Apple" />
          <Button icon="google" title="Sign in with Google" />
          <Button icon="facebook" title="Sign in with Facebook" />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 270,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 35,
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 400,
  },
});
