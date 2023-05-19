import React from 'react';
import { View, TouchableOpacity, SafeAreaView, Text } from 'react-native';


import styles from './styles';

const GlobalHeader = ({navigation, showLeftButton, showRightButton, showSearchButton, locKey, children}) => {


  const hitSlop = { top: 50, right: 50, left: 50, bottom: 50 };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {/* Left button - Back */}
        <View style={styles.leftButtonContainer}>
          {showLeftButton ? (
            <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={hitSlop}>
              <Text style={styles.leftButton_Icon}>⬅️</Text>
            </TouchableOpacity>
          ) : null}
        </View>

        {/* Seperator  */}
        <View style={styles.separator}>
          {children}
          {/* locKey ? (
            <GlobalLoc locKey={locKey} style={styles.titleTextStyle} />
          ) : (
            null
          ) */}
        </View>

        {/* Right button - Setting */}
        <View style={styles.rightButtonContainer}>
          {showRightButton ? (
            <TouchableOpacity activeOpacity={0.65} onPress={() => navigate('SettingScreen')} hitSlop={hitSlop}>
              <Text style={styles.rightButton_Icon}>⚙️</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default GlobalHeader;