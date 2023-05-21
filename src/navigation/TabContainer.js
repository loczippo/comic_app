import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { StyleSheet, Text } from 'react-native';

import { DetailsScreen, SettingScreen } from '../screens';

import screenString from '../constants/screens';

import colorString from '../constants/colors';

import HomeStack from './HomeStack';

const Tab = createBottomTabNavigator();

export default function TabContainer() {
  return (
    <Tab.Navigator
      initialRouteName={screenString.HOME}
      screenOptions={({route}) => ({
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarStyle: styles.tabBarStyle,
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: colorString.GRAY,
      })}>
      <Tab.Screen
        name={screenString.HOME}
        options={{
          headerShown: false,
          tabBarIcon: () => <Text style={{fontSize: 25}}>🏠</Text>,
        }}
        component={HomeStack}
      />
      <Tab.Screen
        name={screenString.DETAILS}
        options={{
          headerShown: false,
          tabBarIcon: () => <Text style={{fontSize: 25}}>🎉</Text>,
        }}
        component={DetailsScreen}
      />
      <Tab.Screen
        name={screenString.SEARCH}
        options={{
          headerShown: false,
          tabBarIcon: () => <Text style={{fontSize: 25}}>🔎</Text>,
        }}
        component={DetailsScreen}
      />
      <Tab.Screen
        name={screenString.SETTINGS}
        options={{
          headerShown: false,
          tabBarIcon: () => <Text style={{fontSize: 25}}>⚙️</Text>,
        }}
        component={SettingScreen}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarLabelStyle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 5,
  },
  tabBarStyle: {
    backgroundColor: colorString.BLUE_LIGHT,
    // position: 'absolute',
    // borderRadius: 20,
    bottom: 0,
    // marginHorizontal: 5,
    height: '7%',
  },
});
