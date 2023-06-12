import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, RefreshControl, ToastAndroid, ActivityIndicator } from 'react-native';

import GlobalContainer from '../../components/Container/Container';
import GlobalHeader from '../../components/Header/Header';
import NetInfo from '@react-native-community/netinfo';
import styles from './styles';
import { ComicItem } from '../HomeScreen/ComicItem';
import MangaService from '../../services/MangaService';

import colorString from '../../constants/colors';
import { useTranslation } from 'react-i18next';

export default function ComicNewUpdate({ navigation }) {

  const {t} = useTranslation();
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const [currentPage, setCurrentPage] = React.useState(0)

  const [isConnected, setIsConnected] = React.useState(false);

  useEffect(() => {
    NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
  }, [isConnected]);

  const onRefresh = React.useCallback(() => {
    setTimeout(() => {
      ToastAndroid.show(t("comicRefresh"), ToastAndroid.SHORT);
      MangaService.latestUpdateComic(currentPage + 1, 15).then(result => {
          setCurrentPage(0)
          setData(result);
      });
    }, 2000)
  }, []);

  let [data, setData] = useState([]);

  // useEffect(() => {
  //   if (!refreshing && isConnected) {
  //     MangaService.latestUpdateComic().then(data => {
  //       setData(data);
  //       setIsLoading(false);
  //       if (refreshing) {
  //         setRefreshing(false);
  //       }
  //     });
  //   }
  // }, [refreshing, isConnected]);

  const renderComicItem = ({ item }) => {
    return (
      <ComicItem
        item={item}
        isLoading={isLoading}
        direction={'vertical'}
        navigation={navigation}
      />
    );
  };
  const comicKeyExtractor = item => {
    return item._id;
  };

  const [showActivityIndicator, setShowActivityIndicator] = React.useState(true);


  const loadMoreComic = () => {
    setTimeout(() => {
      MangaService.latestUpdateComic(currentPage + 1, 15).then(result => {
        if (Array.isArray(result)) {
          setCurrentPage(currentPage + 1)
          setData([...data, ...result]);
        } else {
          ToastAndroid.show('Không tìm thấy truyện mới...', ToastAndroid.SHORT);
          setShowActivityIndicator(false);
          setCurrentPage(currentPage - 1)
        }
      });
    }, 2000)
  }
  

  const renderLoader = () => {
    if (!showActivityIndicator) { // Kiểm tra nếu không hiển thị ActivityIndicator
      return null;
    }
    return (
      <View style={{ marginVertical: 12, alignItems: 'center' }}>
        <ActivityIndicator size={'large'} color={colorString.BLUE_LIGHT} />
      </View>
    )
  }

  return (
    <GlobalContainer>
      <GlobalHeader
        navigation={navigation}
        showLeftButton={true}
        showRightButton={false}
        children={
          <Text style={styles.title_header}>{t("comicNewUpdates")}</Text>
        }
      />
      <View style={{ flex: 1 }}>
        <FlatList
          initialNumToRender={5}
          horizontal={false}
          data={data}
          renderItem={renderComicItem}
          keyExtractor={comicKeyExtractor}
          onEndReached={loadMoreComic}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderLoader}
          refreshControl={
            <RefreshControl
              colors={[colorString.BLUE_LIGHT]}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        />
      </View>
    </GlobalContainer>
  );
}
