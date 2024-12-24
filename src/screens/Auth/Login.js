import {Alert, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

import Input from '../../components/Input';
import Button from '../../components/Button';

import routes from '../../navigation/routes';

import {useDispatch} from 'react-redux';
import {login} from '../../redux/slice';

import auth from '@react-native-firebase/auth';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleLogin = async () => {
    setLoading(true);
    try {
      await auth().signInWithEmailAndPassword(email, password);
      dispatch(login());
      console.log('Giriş Başarılı');
  
      navigation.navigate(routes.APP_NAVIGATOR);
    } catch (error) {
      console.log('HATAA', error);
    } finally {
      setLoading(false);
    }
  };

  const goSingUp = () => {
    navigation.navigate(routes.SINGUP);
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
          onPress={goSingUp}
          containerStyles={{width: '50%'}}
        />
      </View>
      <View style={{marginTop: 40}}>
        <Text style={styles.buttonText}>Login with</Text>
        <Button title="Google" icon="google" />
        <Button title="Apple" icon="apple" />
        <Button title="Facebook" icon="facebook" />
      </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001A6E',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 270,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 35,
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
  },

  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
  },
});
