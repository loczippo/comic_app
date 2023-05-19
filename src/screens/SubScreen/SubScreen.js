import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import screenString from '../../constants/screens';
import GlobalHeader from '../../components/Header/Header';

import styles1 from '../../components/Header/styles';

export default function SubScreen({route, navigation}) {

  const { name } = route.params;

  return (
    <View style={styles.container}>
      <GlobalHeader
        navigation={navigation}
        showLeftButton={true}
        showRightButton={true}
        children={<Text style={styles1.title_header}>{name}</Text>}
      />
      {/* <View
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
      </View> */}
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize: 26, fontWeight: 'bold', color: 'black'}}>
          Đây là TRANG INFO TRUYỆN
        </Text>
        <Text
            onPress={() => navigation.navigate(screenString.SUB+"2")}
            style={{fontSize: 26, fontWeight: 'bold', color: 'green'}}>
            Vào trang ĐỌC TRUYỆN
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
