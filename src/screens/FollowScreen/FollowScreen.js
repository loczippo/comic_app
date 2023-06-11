import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, RefreshControl, ToastAndroid, ActivityIndicator } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { useFocusEffect } from '@react-navigation/native';
import GlobalContainer from '../../components/Container/Container';
import GlobalHeader from '../../components/Header/Header';
import { ComicItem } from '../HomeScreen/ComicItem';
import MangaService from '../../services/MangaService';
import styles from './styles';
import config from '../../config';
import colorString from '../../constants/colors';
import screens from '../../constants/screens';
import { getAsyncStorage } from '../../utils/storage';

export default function FollowScreen({ navigation }) {
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [isConnected, setIsConnected] = React.useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getAsyncStorage(config.KEY_STORAGE).then(storageResult => {

        if(!storageResult) return;

        Promise.all(storageResult.map(storageItem => {
          return MangaService.comicInfo(storageItem._id).then(result => {
            delete result.listChapter;
            return result;
          });
        })).then(results => {
          setData(results);
        });
      });
      setIsLoading(false);
  
      return () => {
        // Code cleanup (nếu cần) khi màn hình không còn được focus
      };
    }, [])
  );

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

  return (
    <GlobalContainer>
      <GlobalHeader
        navigation={navigation}
        children={<Text style={styles.title_header}>{screens.FOLLOW}</Text>}
      />
      <View style={{ flex: 1 }}>
        {isLoading ? (
          <ActivityIndicator />
        ) : data.length == 0 ? <Text style={{margin: 10, textAlign: 'center', color: 'gray', fontSize: 16}}>Danh sách truyện theo dõi trống</Text> : (
          <FlatList
            initialNumToRender={5}
            horizontal={false}
            data={data}
            renderItem={renderComicItem}
            keyExtractor={comicKeyExtractor}
          />
        )}
      </View>
    </GlobalContainer>
  );
}
