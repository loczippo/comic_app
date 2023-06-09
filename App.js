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
import { Provider } from 'react-redux';

import store from './src/redux/store';
import { countAsyncStorage } from './src/utils/storage';
import config from './src/config';
import { useDispatch } from 'react-redux';
import { setStorageCount } from './src/redux/storageSlice';

function App() {

  countAsyncStorage(config.KEY_STORAGE).then(result => {
    console.log(result)
    useDispatch(setStorageCount(result));
  })

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
