import {Alert, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

import Input from '../../components/Input';
import Button from '../../components/Button';

import routes from '../../navigation/routes';

import {useDispatch} from 'react-redux';

import {login} from '../../redux/slice';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      /* await dispatch(login()); */
      console.log('Giriş yapıldı');

      setLoading(false);
      navigation.replace(routes.APP_NAVIGATOR);
    } catch (error) {
      setLoading(false);
      console.log('HATAA', error);
    }
  };

  const goSingUp = () => {
    navigation.navigate(routes.SINGUP);
  };

  return (
    <SafeAreaView style={styles.container}>
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

      <Button
        title="Login"
        onPress={handleLogin}
        loading={loading}
        isDisabled={email.trim() === '' || password.trim() === ''}
      />
      <Button
        title="Register"
        onPress={goSingUp}
        containerStyles={styles.containerStyles}
      />

<View style={{marginTop:40}} >

      <Button title="Google" icon="google" />
      <Button title="Apple" icon="apple" />
      <Button title="Facebook" icon="facebook" />
</View>
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
});
