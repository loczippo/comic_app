import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';


import screenString from '../constants/screens';


import { createStackNavigator } from "@react-navigation/stack";
import TabContainer from './TabContainer';


const Stack = createStackNavigator();

export default function MainContainer() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen component={TabContainer} name={screenString.HOME} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}
