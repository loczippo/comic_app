import React from 'react';
import { View, TouchableOpacity, SafeAreaView, Text, Modal, Animated } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import styles from './styles';
import colorString from '../../constants/colors';

const GlobalHeader = ({ navigation, showLeftButton, showRightButton, showSearchButton, locKey, children, showComment }) => {

  const [modalVisible, setModalVisible] = React.useState(false); // State để xác định trạng thái hiển thị của modal

  const hitSlop = { top: 50, right: 50, left: 50, bottom: 50 };

  const CustomModal = () => {
    const modalOpacity = React.useRef(new Animated.Value(0)).current;
    const showAnimation = () => {
      Animated.timing(modalOpacity, {
        toValue: 1,
        duration: 100, // Điều chỉnh thời gian hiệu ứng slide và mờ dần
        useNativeDriver: true,
      }).start();
    };
    const hideAnimation = () => {
      Animated.timing(modalOpacity, {
        toValue: 0,
        duration: 220,
        useNativeDriver: true,
      }).start(() => {
        setModalVisible(false);
      });
    };
    React.useEffect(() => {
      if (modalVisible) {
        showAnimation();
      }
    }, [modalVisible]);
    return (
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true} // Đặt transparent thành true để modal không che phủ toàn bộ màn hình
        onRequestClose={hideAnimation}
      >
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
        }}>
          <TouchableOpacity
            style={{
              flex: 1,
              // backgroundColor: 'rgba(0, 0, 0, 0.2)', // Đặt độ mờ của nền modal
              justifyContent: 'flex-end',
            }}
            activeOpacity={1}
            onPress={hideAnimation}
          >
          </TouchableOpacity>
          <Animated.View style={{
            height: '69%',
            backgroundColor: 'white',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            opacity: modalOpacity,
            transform: [
              {
                translateY: modalOpacity.interpolate({
                  inputRange: [0, 1],
                  outputRange: [100, 0],
                }),
              },
            ],
          }}>
            <Text style={{ textAlign: 'center', fontSize: 24, marginTop: 10, color: 'black', fontWeight: 500 }}>Bình luận</Text>
          </Animated.View>
        </View>
      </Modal>
    );
  };



  return (
    <SafeAreaView>
      <View style={styles.container}>
        {/* Left button - Back */}
        <View style={styles.leftButtonContainer}>
          {showLeftButton ? (
            <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={hitSlop}>
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
      <CustomModal />
    </SafeAreaView>
  );
};

export default GlobalHeader;