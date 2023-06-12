/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';

import colorString from './src/constants/colors';

import { Provider } from 'react-redux';
import MainContainer from './src/navigation/MainContainer';

import store from './src/redux/store';
import config from './src/config';
import { addModeAsyncStorage, getLanguageAsyncStorage, getModeAsyncStorage } from './src/utils/storage';
import { useTranslation } from 'react-i18next';

function App() {
  const { t, i18n } = useTranslation();
  const theme = useColorScheme();
  React.useEffect(() => {
    getLanguageAsyncStorage(config.LANGUAGE_STORAGE).then(language => {
      i18n.changeLanguage(language);
    });
    getModeAsyncStorage(config.MODE_STORAGE, theme);
    return () => { };
  }, []);

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
