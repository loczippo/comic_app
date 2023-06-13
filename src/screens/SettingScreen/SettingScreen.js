import * as React from 'react';
import {
  Dimensions,
  Image,
  Switch,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import GlobalContainer from '../../components/Container/Container';
import GlobalHeader from '../../components/Header/Header';
import colorString from '../../constants/colors';
import screenString from '../../constants/screens';
import images from '../../assets/images';
import {useTranslation} from 'react-i18next';

import { EventRegister } from 'react-native-event-listeners'

import {Linking} from 'react-native';

import styles from './styles';

import MaskedView from '@react-native-masked-view/masked-view';
import {
  addLanguageAsyncStorage,
  addModeAsyncStorage,
  getLanguageAsyncStorage,
  getModeAsyncStorage,
} from '../../utils/storage';
import config from '../../config';

export default function SettingScreen({navigation}) {
  const selectRef = React.useRef(null);
  const {t, i18n} = useTranslation();

  const languagesWithFlags = [
    {title: t('vietnamese'), image: images.vietnamflag},
    {title: t('english'), image: images.usflag},
  ];

  const [languageName, setLanguageName] = React.useState('');

  React.useEffect(() => {
    if (i18n.language == config.DEFAULT_LANGUAGE) {
      setLanguageName(t('vietnamese'));
      handleSelectIndex(0);
    } else {
      setLanguageName(t('english'));
      handleSelectIndex(1);
    }
  }, []);

  const handleSelectIndex = index => {
    if (selectRef.current) {
      selectRef.current.selectIndex(index);
    }
  };

  const changeLanguage = language => {
    i18n.changeLanguage(language);
  };

  const handleLanguageSelect = (selectedItem, index) => {
    const languageCode = index === 0 ? 'vi' : 'en';
    changeLanguage(languageCode);
    if (languageCode == 'vi') {
      setLanguageName(t('vietnamese'));
    } else {
      setLanguageName(t('english'));
    }
    addLanguageAsyncStorage(config.LANGUAGE_STORAGE, languageCode);
  };

  const [isEnabledDarkMode, setIsEnabledDarkMode] = React.useState(false);

  React.useEffect(() => {
    getModeAsyncStorage(config.MODE_STORAGE).then(mode => {
      if (mode === 'dark') {
        setIsEnabledDarkMode(true);
        // dispatch(setMode('dark'));
      } else {
        setIsEnabledDarkMode(false);
        // dispatch(setMode('light'));
      }
    });
  }, []);

  const [isEnabledAds, setIsEnabledAds] = React.useState(true);
  const toggleDarkModeSwitch = () => {
    setIsEnabledDarkMode(previousState => !previousState);

    const mode = !isEnabledDarkMode ? 'dark' : 'light';
    addModeAsyncStorage(config.MODE_STORAGE, mode);
    EventRegister.emit(config.MODE_STORAGE, mode)
  };

  const toggleAdsSwitch = () => {
    setIsEnabledAds(previousState => !previousState);
    console.log({isEnabledAds});
  };
  return (
    <GlobalContainer>
      {/* header */}
      <GlobalHeader
        navigation={navigation}
        showLeftButton={false}
        showRightButton={false}
        children={<Text style={styles.title_header}>{t('settings')}</Text>}
      />
      <View
        style={{
          backgroundColor: isEnabledDarkMode ? '#191919' : colorString.GRAY,
          height: '100%',
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 15,
            marginTop: 15,
          }}>
          <Ionicons
            name="language"
            style={{
              color: isEnabledDarkMode ? colorString.Colors.lightGray : 'black',
              fontSize: 24,
            }}
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginLeft: 10,
              width: '82%',
            }}>
            <Text
              style={{
                color: isEnabledDarkMode
                  ? colorString.Colors.lightGray
                  : 'black',
                fontSize: 18,
                fontWeight: 500,
              }}>
              {t('language')}
            </Text>
            <SelectDropdown
              ref={selectRef}
              defaultValueByIndex={0}
              data={languagesWithFlags}
              onSelect={handleLanguageSelect}
              buttonStyle={styles.dropdown3BtnStyle}
              renderCustomizedButtonChild={(selectedItem, index) => {
                return (
                  <View style={styles.dropdown3BtnChildStyle}>
                    {selectedItem ? (
                      <Image
                        source={selectedItem.image}
                        style={styles.dropdown3BtnImage}
                      />
                    ) : (
                      <Ionicons
                        name="md-earth-sharp"
                        color={'#444'}
                        size={32}
                      />
                    )}
                    <Text style={styles.dropdown3BtnTxt}>
                      {selectedItem ? languageName : 'Select country'}
                    </Text>
                    <FontAwesome name="chevron-down" color={'#444'} size={14} />
                  </View>
                );
              }}
              dropdownStyle={styles.dropdown3DropdownStyle}
              rowStyle={styles.dropdown3RowStyle}
              selectedRowStyle={styles.dropdown1SelectedRowStyle}
              renderCustomizedRowChild={(item, index) => {
                return (
                  <View style={styles.dropdown3RowChildStyle}>
                    <Image
                      source={item.image}
                      style={styles.dropdownRowImage}
                    />
                    <Text style={styles.dropdown3RowTxt}>{item.title}</Text>
                  </View>
                );
              }}
            />
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 15,
            marginTop: 15,
          }}>
          <MaterialCommunityIcons
            name="google-ads"
            style={{
              color: isEnabledDarkMode ? colorString.Colors.lightGray : 'black',
              fontSize: 24,
            }}
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginLeft: 10,
              width: '45%',
            }}>
            <Text
              style={{
                color: isEnabledDarkMode
                  ? colorString.Colors.lightGray
                  : 'black',
                fontSize: 18,
                fontWeight: 500,
              }}>
              {t('ads')}
            </Text>
            <Switch
              style={{transform: [{scaleX: 1.5}, {scaleY: 1.5}]}}
              trackColor={{false: 'gray', true: '#87CEFA'}}
              thumbColor={'white'}
              onValueChange={toggleAdsSwitch}
              value={isEnabledAds}
              disabled={isEnabledAds}></Switch>
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 15,
            marginTop: 15,
          }}>
          <MaterialCommunityIcons
            name="theme-light-dark"
            style={{
              color: isEnabledDarkMode ? colorString.Colors.lightGray : 'black',
              fontSize: 24,
            }}
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginLeft: 10,
              width: '45%',
            }}>
            <Text
              style={{
                color: isEnabledDarkMode
                  ? colorString.Colors.lightGray
                  : 'black',
                fontSize: 18,
                fontWeight: 500,
              }}>
              {t('darkMode')}
            </Text>
            <Switch
              style={{transform: [{scaleX: 1.5}, {scaleY: 1.5}]}}
              trackColor={{
                false: 'gray',
                true: isEnabledDarkMode
                  ? colorString.Colors.lightGray
                  : 'black',
              }}
              thumbColor={'white'}
              onValueChange={toggleDarkModeSwitch}
              value={isEnabledDarkMode}></Switch>
          </View>
        </View>
        <View style={{flex: 1, marginTop: '35%', alignItems: 'center'}}>
          <TouchableOpacity
            style={{width: 350}}
            onPress={() => Linking.openURL('https://truyenxxhot.com')}>
            <MaskedView
              style={styles.maskedView}
              maskElement={
                <View style={styles.maskWrapper}>
                  <Text style={{fontSize: 40, fontWeight: 600}}>
                    TruyenXXHOT.COM
                  </Text>
                </View>
              }>
              <Image source={images.bgbranch} style={styles.image} />
            </MaskedView>
          </TouchableOpacity>
          <Text
            style={{
              color: isEnabledDarkMode ? colorString.Colors.lightGray : 'black',
              fontSize: 20,
              fontWeight: 500,
            }}>
            {t('version')} 1.0.0
          </Text>
          {/* <Text style={{ color: isEnabledDarkMode ? colorString.Colors.lightGray : 'black', fontSize: 20, fontWeight: 500 }}>Email: admin@truyenxxhot.com</Text> */}
          <Text
            style={{
              color: isEnabledDarkMode ? colorString.Colors.lightGray : 'black',
              fontSize: 20,
              fontWeight: 500,
            }}>
            Copyright © 2023 TruyenXXHot
          </Text>
        </View>
      </View>
    </GlobalContainer>
  );
}
