import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {FollowScreen, SearchScreen, SettingScreen} from '../screens';

import screenString from '../constants/screens';

import colorString from '../constants/colors';

import HomeStack from './HomeStack';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import config from '../config';
import {countAsyncStorage} from '../utils/storage';

import { useSelector, useDispatch } from 'react-redux';
import { setStorageCount } from '../redux/storageSlice';

const Tab = createBottomTabNavigator();

export default function TabContainer() {

  const storageCount = useSelector(state => state.storage.count);
  const [length, setLength] = React.useState(0);

  React.useEffect(() => {
    countAsyncStorage(config.KEY_STORAGE).then(result => {
      setLength(result);
    });
  }, [storageCount, length]);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     countAsyncStorage(config.KEY_STORAGE).then(result => {
  //       setLength(result);
  //     });
  
  //     return () => {
  //       // Code cleanup (nếu cần) khi màn hình không còn được focus
  //     };
  //   }, [storageCount])
  // );


  const renderBadge = (focused, label, length) => {
    if (label === screenString.FOLLOW && length != 0) {
      if (!focused) {
        return (
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>{length > 9 ? '9+' : length}</Text>
          </View>
        );
      } else {
        return (
          <View style={styles.badgeContainer1}>
            <Text style={styles.badgeText}>{length > 9 ? '9+' : length}</Text>
          </View>
        );
      }
    }
    return null;
  };

  return (
    <Tab.Navigator
      initialRouteName={screenString.HOME}
      screenOptions={({route}) => ({
        tabBarStyle: styles.tabBarStyle,
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: colorString.GRAY,
        tabBarIcon: ({focused, color, size}) => {
          let icon;
          let label = route.name;
          if (label === screenString.HOME) {
            icon = (
              <Ionicons
                name={focused ? 'home' : 'home-outline'}
                style={{fontSize: size, color}}
              />
            );
          } else if (label === screenString.FOLLOW) {
            icon = (
              <Ionicons
                name={focused ? 'bookmarks' : 'bookmarks-outline'}
                style={{fontSize: size, color}}
              />
            );
          } else if (label === screenString.SEARCH) {
            icon = (
              <Ionicons
                name={focused ? 'search' : 'search-outline'}
                style={{fontSize: size, color}}
              />
            );
          } else if (label === screenString.SETTINGS) {
            icon = (
              <Ionicons
                name={focused ? 'settings' : 'settings-outline'}
                style={{fontSize: size, color}}
              />
            );
          }

          return (
            <View style={styles.tabContainer}>
              {icon}
              { renderBadge(focused, label, storageCount)}
              {focused && <Text style={styles.tabLabelText}>{label}</Text>}
            </View>
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: colorString.GRAY,
        style: styles.tabBarStyle,
        showLabel: false, // Ẩn văn bản mặc định
      }}>
      <Tab.Screen
        name={screenString.HOME}
        options={{
          headerShown: false,
        }}
        component={HomeStack}
      />
      <Tab.Screen
        name={screenString.FOLLOW}
        options={{
          headerShown: false,
        }}
        component={FollowScreen}
      />
      <Tab.Screen
        name={screenString.SEARCH}
        options={{
          headerShown: false,
        }}
        component={SearchScreen}
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
    fontWeight: '500',
    marginBottom: 5,
  },
  badgeContainer: {
    position: 'absolute',
    top: '20%',
    left: '12%',
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeContainer1: {
    position: 'absolute',
    top: '1%',
    left: '25%',
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 10,
    color: 'white',
    fontWeight: '500',
  },
});
