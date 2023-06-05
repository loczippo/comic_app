import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { DetailsScreen, SettingScreen } from '../screens';

import screenString from '../constants/screens';

import colorString from '../constants/colors';

import HomeStack from './HomeStack';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function TabContainer() {

  return (
    <Tab.Navigator
      initialRouteName={screenString.HOME}
      screenOptions={({ route }) => ({
        tabBarStyle: styles.tabBarStyle,
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: colorString.GRAY,
        tabBarIcon: ({ focused, color, size }) => { 
          let icon;
          let label = '';

          if (route.name === screenString.HOME) {
            icon = <Ionicons name={focused ? "home" : "home-outline"} style={{ fontSize: size, color }} />;
            label = 'Home';
          } else if (route.name === screenString.DETAILS) {
            icon = <Ionicons name={focused ? "bookmarks" : "bookmarks-outline"} style={{ fontSize: size, color }} />;
            label = 'Details';
          } else if (route.name === screenString.SEARCH) {
            icon = <Ionicons name={focused ? "search" : "search-outline"} style={{ fontSize: size, color }} />;
            label = 'Search';
          } else if (route.name === screenString.SETTINGS) {
            icon = <Ionicons name={focused ? "settings" : "settings-outline"} style={{ fontSize: size, color }} />;
            label = 'Settings';
          }

          return (
            <View style={styles.tabContainer}>
              {icon}
              {focused && (
                <Text style={styles.tabLabelText}>{label}</Text>
              )}
            </View>
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: colorString.GRAY,
        style: styles.tabBarStyle,
        showLabel: false, // Ẩn văn bản mặc định
      }}
    >
      <Tab.Screen
        name={screenString.HOME}
        options={{
          headerShown: false,
        }}
        component={HomeStack}
      />
      <Tab.Screen
        name={screenString.DETAILS}
        options={{
          headerShown: false,
        }}
        component={DetailsScreen}
      />
      <Tab.Screen
        name={screenString.SEARCH}
        options={{
          headerShown: false,
        }}
        component={DetailsScreen}
      />
      <Tab.Screen
        name={screenString.SETTINGS}
        options={{
          headerShown: false,
        }}
        component={SettingScreen}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: colorString.HEADER,
    height: '7%',
  },
  tabContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  tabLabelText: {
    fontSize: 14,
    color: 'white',
    fontWeight: 500,
    marginBottom: 5,
  },
});
