import * as React from 'react';
import {View, Text} from 'react-native';

import screenString from '../../constants/screens';

export default function SettingScreen({navigation}) {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text onPress={() => navigation.navigate(screenString.DETAILS)} style={{ fontSize: 26, fontWeight: 'bold', color: 'black'}}>Go to {screenString.DETAILS} screen</Text>
        </View>
    )
}