import React from 'react';
import {View, Text} from 'react-native';

import styles from './styles';

const GlobalTag = ({data}) => {

  return (
    <View style={styles.container}>
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
