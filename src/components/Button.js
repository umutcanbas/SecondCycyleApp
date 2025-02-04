import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React from 'react';

import AppleIcon from '../assets/icons/apple.svg';
import GoogleIcon from '../assets/icons/google.svg';
import FacebookIcon from '../assets/icons/facebook.svg';
import Plus from '../assets/icons/add.svg';

const Button = ({
  title,
  onPress,
  containerStyles,
  titleStyles,
  disabled,
  icon,
  loading,
}) => {
  const renderIcon = {
    apple: <AppleIcon width={24} height={24} />,
    google: <GoogleIcon width={24} height={24} />,
    facebook: <FacebookIcon width={24} height={24} />,
    plus: <Plus width={24} height={24} />,
  };

  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        ...containerStyles,
      }}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}>
      {icon && renderIcon[icon]}

      <Text
        style={{
          ...styles.title,
          ...titleStyles,
        }}>
        {title}
      </Text>

      {loading && <ActivityIndicator color="black" style={{marginLeft: 5}} />}
      {icon && <View />}
    </TouchableOpacity>
  );
};

export default Button;

export const styles = StyleSheet.create({
  container: {
    height: 56,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    borderWidth: 1,
    borderColor: 'black',
    marginHorizontal: 10,
  },
  title: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
  },
});
