import React, { useEffect, useContext } from 'react';
import { Animated, Modal, SafeAreaView, Text, TouchableOpacity, View, ScrollView, TextInput } from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import themeContext from '../../config/themeContext';

import styles from './styles';
import FastImage from 'react-native-fast-image';
import { CustomModal } from '../Modal/CustomModal';

const GlobalHeader = ({ navigation, showLeftButton, showRightButton, comicId, showSearchButton, locKey, children, showComment }) => {

  const theme = useContext(themeContext);

  const [modalVisible, setModalVisible] = React.useState(false); // State để xác định trạng thái hiển thị của modal

  const hitSlop = { top: 50, right: 50, left: 50, bottom: 50 };
  return (
    <SafeAreaView>
      <View style={[styles.container, {backgroundColor: theme.headerColor}]}>
        {/* Left button - Back */}
        <View style={styles.leftButtonContainer}>
          {showLeftButton ? (
            <TouchableOpacity onPress={() => {
              navigation.goBack();
            }} hitSlop={hitSlop}>
              <Icon name="arrow-back" style={styles.leftButton_Icon} />
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
            <TouchableOpacity activeOpacity={0.65} onPress={() => setModalVisible(true)} hitSlop={hitSlop}>
              <FontAwesome name="comments-o" style={styles.rightButton_Icon} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      {
        showRightButton ? (<CustomModal comicId={comicId} modalVisible={modalVisible} setModalVisible={setModalVisible} />) : null
      }
    </SafeAreaView>
  );
};

export default GlobalHeader;