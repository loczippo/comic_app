import * as React from 'react';
import {View, Text} from 'react-native';

import screenString from '../../constants/screens';
import {GlobalContainer} from './../../components/Container/Container';
import GlobalHeader from '../../components/Header/Header';
import styles from './styles';
import { useTranslation } from 'react-i18next';

export default function SearchScreen({navigation}) {
  const {t} = useTranslation();
  return (
    // <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    //     <Text style={{ fontSize: 26, fontWeight: 'bold', color: 'black'}}>{screenString.SEARCH} screen</Text>
    // </View>
    <GlobalContainer>
      <GlobalHeader
        navigation={navigation}
        children={<Text style={styles.title_header}>{t("search")}</Text>}
      />
    </GlobalContainer>
  );
}
