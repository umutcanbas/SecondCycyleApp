import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

import TopMenu from '../../components/TopMenu';

import NotificationIcon from '../../assets/icons/notification-line.svg';

const Notification = () => {
  const [isRead, setIsRead] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <TopMenu title="Notification" />

      <View style={styles.content}>
        <Text style={styles.contentText}>Profile Update Successful!</Text>
        <NotificationIcon width={30} height={30} />
        <Text style={isRead ? styles.noti : styles.notiRead}>•</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.contentText}>Product Approved!</Text>
        <NotificationIcon width={30} height={30} />
        <Text style={isRead ? styles.noti : styles.notiRead}>•</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.contentText}>Sale Notification!</Text>
        <NotificationIcon width={30} height={30} />
        <Text style={isRead ? styles.notiRead : styles.noti}>•</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.contentText}>Item Favorited!</Text>
        <NotificationIcon width={30} height={30} />
        <Text style={isRead ? styles.notiRead : styles.noti}>•</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.contentText}>Profile View Alert!</Text>
        <NotificationIcon width={30} height={30} />
        <Text style={isRead ? styles.notiRead : styles.noti}>•</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.contentText}>Shipping Reminder!</Text>
        <NotificationIcon width={30} height={30} />
        <Text style={isRead ? styles.noti : styles.notiRead}>•</Text>
      </View>
    </SafeAreaView>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BCCCDC',
  },

  content: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 'auto',
    height: 50,
    margin: 5,
    marginTop:10,
    padding: 10,
    borderRadius: 15,
    borderWidth: 0.2,
    borderColor: 'black',
  },
  contentText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'black',
    marginRight: 5,
    marginLeft: 15,
    width: 330,
  },
  noti: {
    position: 'absolute',
    right: 45,
    top: -7,
    color: 'red',
    fontWeight: 'bold',
    fontSize: 40,
  },
  notiRead: {
    position: 'absolute',
    right: 45,
    top: -7,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 40,
  },
});
