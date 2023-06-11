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

import { Provider } from 'react-redux';
import MainContainer from './src/navigation/MainContainer';

import store from './src/redux/store';

function App() {

  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
          <MainContainer />
        <StatusBar animated={true} backgroundColor={colorString.HEADER} />
      </SafeAreaView>
    </Provider>
  );
}

export default App;
