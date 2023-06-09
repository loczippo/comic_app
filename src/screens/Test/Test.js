import * as React from 'react';
import {View, Text} from 'react-native';

import screenString from '../../constants/screens';

export default function TestScreen({navigation}) {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{ fontSize: 26, fontWeight: 'bold', color: 'black'}}>{screenString.TEST} screen</Text>
        </View>
    )
}