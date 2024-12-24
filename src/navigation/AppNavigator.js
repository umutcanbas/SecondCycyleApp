import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import routes from './routes';

import Home from '../screens/App/Home';
import Profile from '../screens/App/Profile/Profile';
import Notification from '../screens/App/Notification';
import Chat from '../screens/App/Chat';


import HomeLine from '../assets/icons/home.svg';
import HomeFill from '../assets/icons/home-fill.svg';
import ProfileLine from '../assets/icons/user-line.svg';
import ProfileFill from '../assets/icons/user-fill.svg';
import NotificationLine from '../assets/icons/notification-line.svg';
import NotificationFill from '../assets/icons/notification-fill.svg';
import ChatLine from '../assets/icons/chat-line.svg';
import ChatFill from '../assets/icons/chat-fill.svg';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const iconList = {
    home: HomeLine,
    homeFill: HomeFill,
    profile: ProfileLine,
    profileFill: ProfileFill,
    notifications: NotificationLine,
    notificationsFill: NotificationFill,
    chat: ChatLine,
    chatFill: ChatFill,
  };

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopWidth: 1,
          backgroundColor: 'white',
          borderColor:'grey'
        },
        tabBarIcon: ({focused}) => {
          let IconComponent;

          if (route.name === routes.HOME) {
            IconComponent = focused ? iconList?.homeFill : iconList?.home;
          } else if (route.name === routes.NOTIFICATION) {
            IconComponent = focused
              ? iconList?.notificationsFill
              : iconList?.notifications;
          } else if (route.name === routes.CHAT) {
            IconComponent = focused ? iconList?.chatFill : iconList?.chat;
          } else if (route.name === routes.PROFILE) {
            IconComponent = focused ? iconList?.profileFill : iconList?.profile;
          }


          return <IconComponent width={27} height={27} style={{marginTop:20}}/>;
        },
      })}>
      <Tab.Screen name={routes.HOME} component={Home} />
      <Tab.Screen name={routes.NOTIFICATION} component={Notification} />
      <Tab.Screen name={routes.CHAT} component={Chat} />
      <Tab.Screen name={routes.PROFILE} component={Profile} />
    </Tab.Navigator>
  );
};

export default AppNavigator;