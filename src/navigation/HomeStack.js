import { createStackNavigator } from "@react-navigation/stack";
import * as React from 'react';
import screenString from '../constants/screens';
import { HomeScreen } from '../screens';

const Stack = createStackNavigator();

export default function HomeStack() {

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} >
      <Stack.Screen name={screenString.HOME} component={HomeScreen} />
      {/* <Stack.Screen name={screenString.COMIC_DETAILS} component={SubScreen} /> */}
      {/* <Stack.Screen name={screenString.COMIC_READER} component={SubScreen2} /> */}
    </Stack.Navigator>
  );
}