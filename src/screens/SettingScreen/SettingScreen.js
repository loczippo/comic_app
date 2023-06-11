import * as React from 'react';
import { Dimensions, Image, Switch, Text, View, TouchableOpacity } from 'react-native';

import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import GlobalContainer from '../../components/Container/Container';
import GlobalHeader from '../../components/Header/Header';
import colorString from '../../constants/colors';
import screenString from '../../constants/screens';
import images from '../../assets/images';

import { Linking } from 'react-native'

import styles from './styles';

import MaskedView from '@react-native-masked-view/masked-view';

const { width, height } = Dimensions.get('window');

const languagesWithFlags = [
  { title: 'Tiếng Việt', image: images.vietnamflag },
  { title: 'Tiếng Anh', image: images.usflag },
];



const MyComponent = () => {
  const [modalVisible, setModalVisible] = useState(false);

  // Các hàm xử lý sự kiện
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openModal}>
        <Text>Open Modal</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={closeModal}
        >
          <View style={styles.modalContainer}>
            {/* Nội dung của modal */}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};



export default function SettingScreen({ navigation }) {

  const [isEnabledDarkMode, setIsEnabledDarkMode] = React.useState(false);
  const [isEnabledAds, setIsEnabledAds] = React.useState(true);

  const toggleDarkModeSwitch = () => {
    setIsEnabledDarkMode(previousState => !previousState)
    console.log({ isEnabledDarkMode: !isEnabledDarkMode })
  }

  const toggleAdsSwitch = () => {
    setIsEnabledAds(previousState => !previousState)
    console.log({ isEnabledAds })
  }
  return (
    <GlobalContainer>
      {/* header */}
      <GlobalHeader
        navigation={navigation}
        showLeftButton={false}
        showRightButton={false}
        children={
          <Text style={styles.title_header}>{screenString.SETTINGS}</Text>
        }
      />
      <View style={{ backgroundColor: colorString.GRAY, height: '100%' }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 15,
            marginTop: 15,
          }}>
          <Ionicons name="language" style={{ color: 'black', fontSize: 24 }} />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginLeft: 10,
              width: '82%',
            }}>
            <Text style={{ color: 'black', fontSize: 18, fontWeight: 500 }}>
              Ngôn ngữ:
            </Text>
            <SelectDropdown
              defaultValueByIndex={0}
              data={languagesWithFlags}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
              }}
              buttonStyle={styles.dropdown3BtnStyle}
              renderCustomizedButtonChild={(selectedItem, index) => {
                return (
                  <View style={styles.dropdown3BtnChildStyle}>
                    {selectedItem ? (
                      <Image
                        source={selectedItem.image}
                        style={styles.dropdown3BtnImage}
                      />
                    ) : (
                      <Ionicons name="md-earth-sharp" color={'#444'} size={32} />
                    )}
                    <Text style={styles.dropdown3BtnTxt}>
                      {selectedItem ? selectedItem.title : 'Select country'}
                    </Text>
                    <FontAwesome name="chevron-down" color={'#444'} size={14} />
                  </View>
                );
              }}
              dropdownStyle={styles.dropdown3DropdownStyle}
              rowStyle={styles.dropdown3RowStyle}
              selectedRowStyle={styles.dropdown1SelectedRowStyle}
              renderCustomizedRowChild={(item, index) => {
                return (
                  <View style={styles.dropdown3RowChildStyle}>
                    <Image source={item.image} style={styles.dropdownRowImage} />
                    <Text style={styles.dropdown3RowTxt}>{item.title}</Text>
                  </View>
                );
              }}
            />
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 15,
            marginTop: 15,
          }}>
          <MaterialCommunityIcons name="google-ads" style={{ color: 'black', fontSize: 24 }} />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginLeft: 10,
              width: '45%',
            }}>
            <Text style={{ color: 'black', fontSize: 18, fontWeight: 500 }}>
              Quảng cáo:
            </Text>
            <Switch
              style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
              trackColor={{ false: 'gray', true: '#87CEFA' }}
              thumbColor={"white"}
              onValueChange={toggleAdsSwitch}
              value={isEnabledAds}
              disabled={isEnabledAds}
            >
            </Switch>
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 15,
            marginTop: 15,
          }}>
          <MaterialCommunityIcons name="theme-light-dark" style={{ color: 'black', fontSize: 24 }} />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginLeft: 10,
              width: '45%',
            }}>
            <Text style={{ color: 'black', fontSize: 18, fontWeight: 500 }}>
              Giao diện tối:
            </Text>
            <Switch
              style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
              trackColor={{ false: 'gray', true: 'black' }}
              thumbColor={"white"}
              onValueChange={toggleDarkModeSwitch}
              value={isEnabledDarkMode}
            >
            </Switch>
          </View>
        </View>
        <View style={{ flex: 1, marginTop: '35%', alignItems: 'center' }}>
          <TouchableOpacity style={{ width: 350 }} onPress={() => Linking.openURL("https://truyenxxhot.com")}>
            <MaskedView
              style={styles.maskedView}
              maskElement={
                <View style={styles.maskWrapper}>
                  <Text style={{ fontSize: 40, fontWeight: 600 }}>TruyenXXHOT.COM</Text>
                </View>
              }>
              <Image
                source={images.bgbranch}
                style={styles.image}
              />
            </MaskedView>
          </TouchableOpacity>
          <Text style={{ color: 'black', fontSize: 20, fontWeight: 500 }}>Phiên bản: 1.0.0</Text>
          {/* <Text style={{ color: 'black', fontSize: 20, fontWeight: 500 }}>Email: admin@truyenxxhot.com</Text> */}
          <Text style={{ color: 'black', fontSize: 20, fontWeight: 500 }}>Copyright © 2023 TruyenXXHot</Text>
        </View>
      </View>

    </GlobalContainer>
  );
}