import * as React from 'react';
import { View, Text } from 'react-native';

import screenString from '../../constants/screens';
import GlobalContainer from '../../components/Container/Container';
import GlobalHeader from '../../components/Header/Header';

import styles from './styles';

export default function ComicNewUpdate({ navigation }) {
    return (

        <GlobalContainer>
            <GlobalHeader
                navigation={navigation}
                showLeftButton={true}
                showRightButton={false}
                children={<Text style={styles.title_header}>{"Truyện mới cập nhật"}</Text>}
            />
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 26, fontWeight: 'bold', color: 'black' }}>{screenString.COMIC_NEW_UPDATE} screen</Text>
            </View>

        </GlobalContainer>
    )
}