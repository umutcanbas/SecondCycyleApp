import {Alert, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

import CustomInput from '../../components/Input';
import CustomButton from '../../components/Button';

import routes from '../../navigation/routes';

import {useDispatch} from 'react-redux';

import {login} from '../../redux/slice';

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
      Alert.alert('Hata', 'Şifreler uyuşmuyor');
      return;
    }
    try {
      setLoading(true);

      await dispatch(login());

      console.log('üyelik olusturuldu');

      navigation.navigate(routes.APP_NAVIGATOR);
    } catch (error) {
      console.log('HATAAA', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>SingUp</Text>
      </View>
      <CustomInput value={email} onChangeText={setEmail} placeholder="E-mail" />
      <CustomInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        isSecure
      />
      <CustomInput
        value={rePassword}
        onChangeText={setRepassword}
        placeholder="RePassword"
        isSecure
      />

        <CustomButton title="Go Back" onPress={goLogin} />
        <CustomButton
          title="SingUp"
          onPress={onPressRegister}
          loading={loading}
          isDisabled={email.trim() === '' || password.trim() === '' || rePassword.trim() === ''}
        />

    </SafeAreaView>
  );
};

export default SingUp;

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
 
});