import React from 'react';
import { View } from 'react-native';

import styles from './styles';


export const GlobalContainer = (props) => {
    const { style, ...otherProps } = props;
    return (
        <View style={[styles.container, style || {}]} { ...otherProps }>
            { props.children }
        </View>
    );
};


export default GlobalContainer;