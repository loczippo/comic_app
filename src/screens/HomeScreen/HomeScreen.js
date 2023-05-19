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

import MangaFlatList from './MangaFlatList';
import styles from './styles';

export default function HomeScreen({navigation}) {
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000)
  }, []);


  let [data, setData] = useState([])
  let [data1, setData1] = useState([])

  useEffect(() => {
    if(!refreshing) {
      
      MangaService.randomManga()
      .then((data) => {
        setData(data);
        setIsLoading(false);
        if (refreshing) {
          setRefreshing(false);
        }
      });
      MangaService.randomManga()
      .then((data) => {
        setData1(data);
        if (refreshing) {
          setRefreshing(false);
        }
      });
    }
  }, [refreshing]);


  return (
    <>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl colors={[colorString.BLUE_LIGHT]}  refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{backgroundColor: 'rgba(203, 195, 227, 0.6)'}}>
        <Image
          source={{
            uri: 'https://cdn.popsww.com/blog/sites/2/2021/03/danh-sach-truyen-tranh-han-quoc-9.png',
          }}
          style={styles.imageTitle}
        />
        <View style={styles.menuContainer}>
          {/* Bang xep hang */}
          <TouchableOpacity
            onPress={() => navigation.navigate(screenString.SUB)}>
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
                Ranking
              </Text>
            </View>
          </TouchableOpacity>

          {/* Phan loai */}
          <TouchableOpacity onPress={() => {}}>
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
                Classify
              </Text>
            </View>
          </TouchableOpacity>

          {/* Cap nhat moi */}
          <TouchableOpacity onPress={() => {}}>
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
                New update
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={[styles.listManagaContainer, {backgroundColor: 'white'}]}>
          <View style={styles.listTruyenConGaiThichContainer}>
            {/* title */}
            <Text style={styles.title_truyenConGaiThich}>GIRL MANGA</Text>

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
              <MangaFlatList data={data} isLoading={isLoading} />
            </View>
          </View>
        </View>
        <View style={[styles.listManagaContainer, {backgroundColor: 'white'}]}>
          <View style={styles.listTruyenConGaiThichContainer}>
            {/* title */}
            <Text style={styles.title_truyenConGaiThich}>BOY MANGA</Text>

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
              <MangaFlatList data={data1} isLoading={isLoading} />
            </View>
          </View>
        </View>
        {/* <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text
            onPress={() => alert('this is a HomeScreen')}
            style={{fontSize: 26, fontWeight: 'bold', color: 'black'}}>
            Màn hình chính đây nè
          </Text>
          <Text
            onPress={() => navigation.navigate(screenString.SUB)}
            style={{fontSize: 26, fontWeight: 'bold', color: 'green'}}>
            Vào trang SUB SCREEN
          </Text>
          <Text
            onPress={() => navigation.navigate(screenString.SUB)}
            style={{fontSize: 26, fontWeight: 'bold', color: 'green'}}>
            Vào trang SUB SCREEN
          </Text>
          <Text
            onPress={() => navigation.navigate(screenString.SUB)}
            style={{fontSize: 26, fontWeight: 'bold', color: 'green'}}>
            Vào trang SUB SCREEN
          </Text>
          <Text
            onPress={() => navigation.navigate(screenString.SUB)}
            style={{fontSize: 26, fontWeight: 'bold', color: 'green'}}>
            Vào trang SUB SCREEN
          </Text>
          <Text
            onPress={() => navigation.navigate(screenString.SUB)}
            style={{fontSize: 26, fontWeight: 'bold', color: 'green'}}>
            Vào trang SUB SCREEN
          </Text>
          <Text
            onPress={() => navigation.navigate(screenString.SUB)}
            style={{fontSize: 26, fontWeight: 'bold', color: 'green'}}>
            Vào trang SUB SCREEN
          </Text>
          <Text
            onPress={() => navigation.navigate(screenString.SUB)}
            style={{fontSize: 26, fontWeight: 'bold', color: 'green'}}>
            Vào trang SUB SCREEN
          </Text>
          <Text
            onPress={() => navigation.navigate(screenString.SUB)}
            style={{fontSize: 26, fontWeight: 'bold', color: 'green'}}>
            Vào trang SUB SCREEN
          </Text>
          <Text
            onPress={() => navigation.navigate(screenString.SUB)}
            style={{fontSize: 26, fontWeight: 'bold', color: 'green'}}>
            Vào trang SUB SCREEN
          </Text>
          <Text
            onPress={() => navigation.navigate(screenString.SUB)}
            style={{fontSize: 26, fontWeight: 'bold', color: 'green'}}>
            Vào trang SUB SCREEN
          </Text>
          <Text
            onPress={() => navigation.navigate(screenString.SUB)}
            style={{fontSize: 26, fontWeight: 'bold', color: 'green'}}>
            Vào trang SUB SCREEN
          </Text>
          <Text
            onPress={() => navigation.navigate(screenString.SUB)}
            style={{fontSize: 26, fontWeight: 'bold', color: 'green'}}>
            Vào trang SUB SCREEN
          </Text>
          <Text
            onPress={() => navigation.navigate(screenString.SUB)}
            style={{fontSize: 26, fontWeight: 'bold', color: 'green'}}>
            Vào trang SUB SCREEN
          </Text>
          <Text
            onPress={() => navigation.navigate(screenString.SUB)}
            style={{fontSize: 26, fontWeight: 'bold', color: 'green'}}>
            Vào trang SUB SCREEN
          </Text>
          <Text
            onPress={() => navigation.navigate(screenString.SUB)}
            style={{fontSize: 26, fontWeight: 'bold', color: 'green'}}>
            Vào trang SUB SCREEN
          </Text>
          <Text
            onPress={() => navigation.navigate(screenString.SUB)}
            style={{fontSize: 26, fontWeight: 'bold', color: 'green'}}>
            Vào trang SUB SCREEN
          </Text>
          <Text
            onPress={() => navigation.navigate(screenString.SUB)}
            style={{fontSize: 26, fontWeight: 'bold', color: 'green'}}>
            Vào trang SUB SCREEN
          </Text>
          <Text
            onPress={() => navigation.navigate(screenString.SUB)}
            style={{fontSize: 26, fontWeight: 'bold', color: 'green'}}>
            Vào trang SUB SCREEN
          </Text>
          <Text
            onPress={() => navigation.navigate(screenString.SUB)}
            style={{fontSize: 26, fontWeight: 'bold', color: 'green'}}>
            Vào trang SUB SCREEN
          </Text>
        </View> */}
      </ScrollView>
    </>
  );
}
