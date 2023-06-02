import * as React from 'react';
import {View, Text} from 'react-native';

import screenString from '../../constants/screens';

export default function RankingScreen({navigation}) {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{ fontSize: 26, fontWeight: 'bold', color: 'black'}}>{screenString.RANKING} screen</Text>
        </View>
    )
}