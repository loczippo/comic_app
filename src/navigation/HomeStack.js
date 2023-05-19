import { createStackNavigator } from "@react-navigation/stack";
import * as React from 'react';
import screenString from '../constants/screens';
import { HomeScreen, SubScreen, SubScreen2 } from '../screens';

const Stack = createStackNavigator();

export default function HomeStack() {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}} >
        <Stack.Screen name={screenString.HOME} component={HomeScreen} />
        <Stack.Screen name={screenString.SUB} component={SubScreen} />
        <Stack.Screen name={screenString.SUB+'2'} options={{
          
        }} component={SubScreen2} />
      </Stack.Navigator>
    );
  }