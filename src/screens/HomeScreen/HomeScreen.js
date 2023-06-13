import React, { useState, useEffect } from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import screenString from '../../constants/screens';

import colorString from '../../constants/colors';

import MangaService from '../../services/MangaService'

import Images from '../../assets/images';

import MangaFlatList from './ComicFlatList';
import styles from './styles';
import NetInfo from "@react-native-community/netinfo";
import Banner from '../../components/Banner/Banner';
import { useTranslation } from 'react-i18next';
import themeContext from '../../config/themeContext';

export default function HomeScreen({ navigation }) {
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const {t, i18n} = useTranslation();
  const [isConnected, setIsConnected] = React.useState(false);
  const theme = React.useContext(themeContext);

  useEffect(() => {
    NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected)
    });
  }, [isConnected]);


  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000)
  }, []);

  let [data, setData] = useState([])
  let [data1, setData1] = useState([])
  let [data2, setData2] = useState([])

  useEffect(() => {
    if (!refreshing && isConnected) {
      MangaService.latestUpdateComic(1, 5)
        .then((data) => {
          setData(data);
          setIsLoading(false);
          if (refreshing) {
            setRefreshing(false);
          }
        });
      MangaService.randomManga1()
        .then((data) => {
          setData1(data);
          if (refreshing) {
            setRefreshing(false);
          }
        });

      MangaService.randomManga1()
        .then((data) => {
          setData2(data);
          if (refreshing) {
            setRefreshing(false);
          }
        });
    }
  }, [refreshing, isConnected]);

  const BannerData =
    [{ url: 'https://nakaomo216.files.wordpress.com/2014/10/bet-3_zpsa45bf545.jpg' },
    { url: "https://truyenbanquyen.com/wp-content/uploads/2018/04/BANNER-WEB.jpg" }, {
      url: "https://truyenbanquyen.com/wp-content/uploads/2018/04/BANNER-WEB.jpg"
    }, {
      url: "https://truyenbanquyen.com/wp-content/uploads/2018/01/BANNER-WEB-180102.jpg"
    }]

  return (
    <>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl colors={[colorString.BLUE_LIGHT]} refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{ backgroundColor: 'rgba(203, 195, 227, 0.6)' }}>
        {/* <Image
          source={{
            uri: 'https://cdn.popsww.com/blog/sites/2/2021/03/danh-sach-truyen-tranh-han-quoc-9.png',
          }}
          style={styles.imageTitle}
        /> */}
        <View style={styles.viewBanner}>
          <Banner data={BannerData} />
        </View>
        <View style={[styles.menuContainer, {backgroundColor: theme.containerBannerColor}]}>
          {/* Bang xep hang */}
          <TouchableOpacity
            onPress={() => { navigation.navigate(screenString.COMIC_RANKING) }}>
            <View style={[styles.menuButtonContainer, styles.menuRanking, {backgroundColor: theme.homeBtnBgColor1}]}>
              <View style={[styles.menuImageContainer, {backgroundColor: theme.textColor}]}>
                <Image
                  style={styles.menuImage}
                  source={Images.menu.ic_ranking}
                />
              </View>
              <Text
                style={[{
                  padding: 10,
                  color: 'white',
                  fontWeight: 600,
                  fontSize: 16,
                }, {color: theme.blackColor}]}>
                {t('ranking')}
              </Text>
            </View>
          </TouchableOpacity>

          {/* Phan loai */}
          <TouchableOpacity onPress={() => { }}>
            <View style={[styles.menuButtonContainer, styles.menuPhanLoai, {backgroundColor: theme.homeBtnBgColor2}]}>
              <View style={[styles.menuImageContainer, {backgroundColor: theme.textColor}]}>
                <Image style={styles.menuImage} source={Images.menu.ic_tag} />
              </View>
              <Text
                style={[{
                  padding: 10,
                  color: 'white',
                  fontWeight: 600,
                  fontSize: 16,
                }, {color: theme.blackColor}]}>
                {t('category')}
              </Text>
            </View>
          </TouchableOpacity>

          {/* Cap nhat moi */}
          <TouchableOpacity onPress={() => { navigation.navigate(screenString.COMIC_NEW_UPDATE) }}>
            <View style={[styles.menuButtonContainer, styles.menuCapNhatMoi, {backgroundColor: theme.homeBtnBgColor3}]}>
              <View style={[styles.menuImageContainer, {backgroundColor: theme.textColor}]}>
                <Image style={styles.menuImage} source={Images.menu.ic_new} />
              </View>
              <Text
                style={[{
                  padding: 10,
                  color: 'white',
                  fontWeight: 600,
                  fontSize: 16,
                }, {color: theme.blackColor}]}>
                {t('newUpdates')}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={[styles.listManagaContainer, { backgroundColor: theme.backgroundColor }]}>
          <View style={styles.listTruyenConGaiThichContainer}>
            {/* title */}
            <Text style={styles.title_truyenConGaiThich}>{t("comicNewUpdates")}</Text>

            {/* list */}
            <View
              style={[
                styles.list,
                {
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                },
              ]}>
              <MangaFlatList navigation={navigation} data={data} isLoading={isLoading} isConnected={isConnected} />
            </View>
          </View>
        </View>
        <View style={[styles.listManagaContainer, { backgroundColor: theme.backgroundColor }]}>
          <View style={styles.listTruyenConGaiThichContainer}>
            {/* title */}
            <Text style={styles.title_truyenConGaiThich}>HENTAI [R21/R18/R16]</Text>

            {/* list */}
            <View
              style={[
                styles.list,
                {
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                },
              ]}>
              <MangaFlatList navigation={navigation} data={data1} isLoading={isLoading} isConnected={isConnected} />
            </View>
          </View>
        </View>
        <View style={[styles.listManagaContainer, { backgroundColor: theme.backgroundColor }]}>
          <View style={styles.listTruyenConGaiThichContainer}>
            {/* title */}
            <Text style={styles.title_truyenConGaiThich}>TỔNG HỢP DOUJINSHI</Text>

            {/* list */}
            <View
              style={[
                styles.list,
                {
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                },
              ]}>
              <MangaFlatList navigation={navigation} data={data2} isLoading={isLoading} isConnected={isConnected} />
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
