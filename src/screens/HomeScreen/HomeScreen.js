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

export default function HomeScreen({ navigation }) {
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const [isConnected, setIsConnected] = React.useState(false);

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
      MangaService.latestUpdateComic()
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
    [{url: 'https://nakaomo216.files.wordpress.com/2014/10/bet-3_zpsa45bf545.jpg'},
  {url: "https://cmavn.org/wp-content/uploads/2019/04/Banners2-1.jpg"}, {
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
        <View style={styles.menuContainer}>
          {/* Bang xep hang */}
          <TouchableOpacity
            onPress={{}}>
            <View style={[styles.menuButtonContainer, styles.menuRanking]}>
              <View style={styles.menuImageContainer}>
                <Image
                  style={styles.menuImage}
                  source={Images.menu.ic_ranking}
                />
              </View>
              <Text
                style={{
                  padding: 10,
                  color: 'white',
                  fontWeight: 600,
                  fontSize: 16,
                }}>
                Xếp hạng
              </Text>
            </View>
          </TouchableOpacity>

          {/* Phan loai */}
          <TouchableOpacity onPress={() => { }}>
            <View style={[styles.menuButtonContainer, styles.menuPhanLoai]}>
              <View style={styles.menuImageContainer}>
                <Image style={styles.menuImage} source={Images.menu.ic_tag} />
              </View>
              <Text
                style={{
                  padding: 10,
                  color: 'white',
                  fontWeight: 600,
                  fontSize: 16,
                }}>
                Thể loại
              </Text>
            </View>
          </TouchableOpacity>

          {/* Cap nhat moi */}
          <TouchableOpacity onPress={() => { }}>
            <View style={[styles.menuButtonContainer, styles.menuCapNhatMoi]}>
              <View style={styles.menuImageContainer}>
                <Image style={styles.menuImage} source={Images.menu.ic_new} />
              </View>
              <Text
                style={{
                  padding: 10,
                  color: 'white',
                  fontWeight: 600,
                  fontSize: 16,
                }}>
                Mới cập nhật
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={[styles.listManagaContainer, { backgroundColor: 'white' }]}>
          <View style={styles.listTruyenConGaiThichContainer}>
            {/* title */}
            <Text style={styles.title_truyenConGaiThich}>TRUYỆN MỚI CẬP NHẬT</Text>

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
        <View style={[styles.listManagaContainer, { backgroundColor: 'white' }]}>
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
        <View style={[styles.listManagaContainer, { backgroundColor: 'white' }]}>
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
