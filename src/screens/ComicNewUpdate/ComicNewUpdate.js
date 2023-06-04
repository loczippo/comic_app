import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, RefreshControl, ScrollView } from 'react-native';

import GlobalContainer from '../../components/Container/Container';
import GlobalHeader from '../../components/Header/Header';
import NetInfo from "@react-native-community/netinfo";
import styles from './styles';
import { ComicItem } from '../HomeScreen/ComicItem';
import MangaService from '../../services/MangaService';

import colorString from '../../constants/colors';

export default function ComicNewUpdate({ navigation }) {

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
        }
    }, [refreshing, isConnected]);

    const renderItemManga = ({ item }) => {
        return (
            <ComicItem item={item} direction={'vertical'} navigation={navigation} />
        );
    }
    const mangaKeyExtractor = (item) => {
        return item._id;
    }


    return (

        <GlobalContainer>
            <GlobalHeader
                navigation={navigation}
                showLeftButton={true}
                showRightButton={false}
                children={<Text style={styles.title_header}>{"Truyện mới cập nhật"}</Text>}
            />
            {/* <ScrollView horizontal={true} refreshControl={
                <RefreshControl colors={[colorString.BLUE_LIGHT]} refreshing={refreshing} onRefresh={onRefresh} />
            }> */}

                <View style={{ flex: 1 }}>
                    <FlatList
                        data={data}
                        renderItem={renderItemManga}
                        keyExtractor={mangaKeyExtractor}
                    />
                </View>
            {/* </ScrollView> */}

        </GlobalContainer>
    )
}