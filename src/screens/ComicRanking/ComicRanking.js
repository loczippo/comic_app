import * as React from 'react';
import { View, Text } from 'react-native';

import screenString from '../../constants/screens';
import GlobalContainer from '../../components/Container/Container';
import GlobalHeader from '../../components/Header/Header';

import styles from './styles';

export default function ComicRanking({ navigation }) {
    return (

        <GlobalContainer>
            <GlobalHeader
                navigation={navigation}
                showLeftButton={true}
                showRightButton={false}
                children={<Text style={styles.title_header}>{"Ranking"}</Text>}
            />
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 26, fontWeight: 'bold', color: 'black' }}>{screenString.COMIC_RANKING} screen</Text>
            </View>

        </GlobalContainer>
    )
}