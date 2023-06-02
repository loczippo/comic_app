import { createStackNavigator } from "@react-navigation/stack";
import * as React from 'react';
import screenString from '../constants/screens';
import { HomeScreen, ComicRanking, ComicNewUpdate } from '../screens';

const Stack = createStackNavigator();

export default function HomeStack() {

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} >
      <Stack.Screen name={screenString.HOME} component={HomeScreen} />
      <Stack.Screen name={screenString.COMIC_RANKING} component={ComicRanking} />
      <Stack.Screen name={screenString.COMIC_NEW_UPDATE} component={ComicNewUpdate} />
    </Stack.Navigator>
  );
}