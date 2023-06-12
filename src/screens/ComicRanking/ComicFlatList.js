import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ToastAndroid,
  View,
} from 'react-native';

import NetInfo from '@react-native-community/netinfo';
import {useFocusEffect} from '@react-navigation/native';
import GlobalContainer from '../../components/Container/Container';
import MangaService from '../../services/MangaService';
import {ComicItem} from './ComicItem';

import colorString from '../../constants/colors';

export default function ComicFlatList({navigation}) {
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const [currentPage, setCurrentPage] = React.useState(0);

  const [isConnected, setIsConnected] = React.useState(false);

  useEffect(() => {
    NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
  }, [isConnected]);

  const onRefresh = React.useCallback(() => {
    setTimeout(() => {
      ToastAndroid.show('Đang làm mới bảng xếp hạng', ToastAndroid.SHORT);
      MangaService.latestUpdateComic(currentPage, 10).then(result => {
        setData(result);
      });
    }, 2000);
  }, []);

  let [data, setData] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const getComic = async () => {
        const data = await MangaService.latestUpdateComic(currentPage, 10);
        if (data) {
          setData(data);
        }
      };

      data.length == 0 ? getComic() : null;

      return () => {
        // Code cleanup (nếu cần) khi màn hình không còn được focus
      };
    }, []),
  );

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

  const renderComicItem = ({item, index}) => {
    return (
      <ComicItem
        item={item}
        index={index + 1}
        isLoading={isLoading}
        direction={'vertical'}
        navigation={navigation}
      />
    );
  };
  const comicKeyExtractor = item => {
    return item._id;
  };

  const [showActivityIndicator, setShowActivityIndicator] =
    React.useState(true);

  const renderLoader = () => {
    if (!showActivityIndicator) {
      // Kiểm tra nếu không hiển thị ActivityIndicator
      return null;
    }
    return (
      <View style={{marginVertical: 12, alignItems: 'center'}}>
        <ActivityIndicator size={'large'} color={colorString.BLUE_LIGHT} />
      </View>
    );
  };

  return (
    <GlobalContainer>
      <View style={{flex: 1}}>
        <FlatList
          initialNumToRender={5}
          horizontal={false}
          data={data}
          renderItem={renderComicItem}
          keyExtractor={comicKeyExtractor}
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
