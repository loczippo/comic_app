/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar
} from 'react-native';

import colorString from './src/constants/colors';

import MainContainer from './src/navigation/MainContainer';
import { NetworkProvider } from 'react-native-offline';

function App(): JSX.Element {
  return (
    <>
    <SafeAreaView style={{flex: 1}}>
      <MainContainer />
      <StatusBar animated={true} backgroundColor={colorString.BLUE_LIGHT} />
    </SafeAreaView>
    </>
  );
}

export default App;
