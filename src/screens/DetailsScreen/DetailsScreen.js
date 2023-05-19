import * as React from 'react';
import {View, Text} from 'react-native';
import screenString from '../../constants/screens';

export default function DetailsScreen({navigation}) {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text onPress={() => navigation.navigate(screenString.HOME)} style={{ fontSize: 26, fontWeight: 'bold', color: 'black'}}>Go to {screenString.HOME} screen</Text>
        </View>
    )
}