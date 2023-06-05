import React from 'react';
import {View, Text} from 'react-native';

import styles from './styles';

const GlobalTag = ({data, direction}) => {

  return (
    <View style={[styles.container, direction ? {marginLeft: 40} : {}]}>
      {data.map((tag, index) => {
        if (index < 3)
          return (
            <View key={index} style={styles.tagContainer}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          );
        else return null;
      })}
    </View>
  );
};

export default GlobalTag;
