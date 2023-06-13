/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';

import MainContainer from './src/navigation/MainContainer';

import config from './src/config';
import {
  getLanguageAsyncStorage,
  getModeAsyncStorage,
} from './src/utils/storage';

import themeContext from './src/config/themeContext';
import theme from './src/config/theme';

import { EventRegister } from 'react-native-event-listeners'
import { useTranslation } from 'react-i18next';

function App() {

  const themeSystem = useColorScheme();

  const [mode, setMode] = React.useState(themeSystem)
  const { t, i18n } = useTranslation();

  React.useEffect(() => {
    getLanguageAsyncStorage(config.LANGUAGE_STORAGE).then(language => {
      i18n.changeLanguage(language);
    });
    getModeAsyncStorage(config.MODE_STORAGE, themeSystem).then(mode => {
      setMode(mode)
    })
    return () => { };
  }, []);

  React.useEffect(() => {
    let eventListener = EventRegister.addEventListener(config.MODE_STORAGE, (mode) => {
      setMode(mode)
    })
    return () => {
      EventRegister.removeEventListener(eventListener)
    }
  })

  return (
    <themeContext.Provider value={mode == "dark" ? theme.dark : theme.light}>
      <SafeAreaView style={{ flex: 1 }}>
        <MainContainer />
        <StatusBar animated={true} backgroundColor={mode == "dark" ? theme.dark.headerColor : theme.light.headerColor} />
      </SafeAreaView>
    </themeContext.Provider>
  );
}

export default App;
