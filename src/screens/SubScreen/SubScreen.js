import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import screenString from '../../constants/screens';

export default function SubScreen({navigation}) {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: 42,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text
            style={{
              color: 'red',
            }}>
            Trở về
          </Text>
        </TouchableOpacity>
        <Text style={{
              color: 'red',
            }}>SubScreen nè</Text>
        <Text />
      </View>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize: 26, fontWeight: 'bold', color: 'black'}}>
          Đây là SUB SCREEN
        </Text>
        <Text
            onPress={() => navigation.navigate(screenString.SUB+"2")}
            style={{fontSize: 26, fontWeight: 'bold', color: 'green'}}>
            Vào trang SUB SCREEN 2
          </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
