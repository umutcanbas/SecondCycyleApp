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

const SingUp = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRepassword] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const goLogin = () => {
    navigation.goBack(routes.LOGIN);
  };

  const onPressRegister = async () => {
    if (password !== rePassword) {
      Alert.alert('Hata', 'Passwords do not match');
      return;
    }
    try {
      setLoading(true);

      await auth().createUserWithEmailAndPassword(email, password);

      await dispatch(login());

      console.log('üyelik olusturuldu');

      navigation.replace(routes.AUTH_NAVIGATOR, {screen: routes.ONBOARDING});
    } catch (error) {
      console.log('HATAAA', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.header}>
          <Text style={styles.headerText}>SingUp</Text>
        </View>
        <Input value={email} onChangeText={setEmail} placeholder="E-mail" />
        <Input
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          isSecure
        />
        <Input
          value={rePassword}
          onChangeText={setRepassword}
          placeholder="RePassword"
          isSecure
        />

        <Button
          title="SingUp"
          onPress={onPressRegister}
          loading={loading}
          isDisabled={
            email.trim() === '' ||
            password.trim() === '' ||
            rePassword.trim() === ''
          }
        />

        <Button title="Go Back" onPress={goLogin} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SingUp;

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
});
