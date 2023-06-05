import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, RefreshControl, ScrollView} from 'react-native';

import GlobalContainer from '../../components/Container/Container';
import GlobalHeader from '../../components/Header/Header';
import NetInfo from '@react-native-community/netinfo';
import styles from './styles';
import {ComicItem} from '../HomeScreen/ComicItem';
import MangaService from '../../services/MangaService';

import colorString from '../../constants/colors';

export default function ComicNewUpdate({navigation}) {
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const [currentPage, setCurrentPage] = React.useState(1)

  const [isConnected, setIsConnected] = React.useState(false);

  useEffect(() => {
    NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
  }, [isConnected]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  let [data, setData] = useState([]);

  useEffect(() => {
    if (!refreshing && isConnected) {
      MangaService.latestUpdateComic(currentPage).then(data => {
        setData(data);
        setIsLoading(false);
        if (refreshing) {
          setRefreshing(false);
        }
      });
    }
  }, [refreshing, isConnected]);

  const renderComicItem = ({item}) => {
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

  const loadMoreComic = () => {
    setCurrentPage(currentPage + 1)
    MangaService.latestUpdateComic(currentPage).then(result => {
        setData([...data, result]);
      });
  }

  return (
    <GlobalContainer>
      <GlobalHeader
        navigation={navigation}
        showLeftButton={true}
        showRightButton={false}
        children={
          <Text style={styles.title_header}>{'Truyện mới cập nhật'}</Text>
        }
      />

      <View style={{flex: 1}}>
      
        <FlatList
          horizontal={false}
          data={data}
          renderItem={renderComicItem}
          keyExtractor={comicKeyExtractor}
          onEndReached={loadMoreComic}
          onEndReachedThreshold={0}
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
