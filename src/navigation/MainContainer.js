import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';

import screenString from '../constants/screens';

import {createStackNavigator} from '@react-navigation/stack';
import TabContainer from './TabContainer';
import {ComicDetails, ComicReader} from '../screens';
import {useDispatch, useSelector} from 'react-redux';
import {setMode} from '../redux/modeSlice';
import {useColorScheme} from 'react-native'
import config from '../config';
import { getModeAsyncStorage } from '../utils/storage';

const Stack = createStackNavigator();

export default function MainContainer() {
  const theme = useColorScheme();

  const dispatch = useDispatch();

  React.useEffect(() => {
    getModeAsyncStorage(config.MODE_STORAGE, theme).then(result => {
      dispatch(setMode(result));
    });
    return () => {};
  }, []);
  
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={screenString.HOME} component={TabContainer} />
        <Stack.Screen
          name={screenString.COMIC_DETAILS}
          component={ComicDetails}
        />
        <Stack.Screen
          name={screenString.COMIC_READER}
          component={ComicReader}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
