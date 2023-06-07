import React, { useEffect, useState, useCallback } from 'react';
import { ActivityIndicator, FlatList, Image as Images, Text, TouchableOpacity, View, Modal } from 'react-native';
import GlobalHeader from '../../components/Header/Header';

import GlobalContainer from '../../components/Container/Container';
import MangaService from '../../services/MangaService';
import styles from './styles';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';

import { debounce } from "lodash";

export default function ComicReader({ route, navigation }) {

  const { name, id, index, length } = route.params

  let [comicList, setComicList] = React.useState({});

  let [indexNavigate, setIndexNavigate] = React.useState(index);

  const [refreshing, setRefreshing] = React.useState(false);

  React.useEffect(() => {
    if (!refreshing) {
      MangaService.comicReader(id, index).then(data => {
        setComicList(data);
        if (refreshing) {
          setRefreshing(false);
        }
      });
    }
  }, [refreshing]);

  const disableButtonBackChapter = indexNavigate == 1 ? true : false;
  const disableButtonNextChapter = indexNavigate == length ? true : false;

  const chapterImages = [];

  if (comicList.data) {
    for (let i = 0; i < comicList.data.length; i++) {
      chapterImages.push({ url: comicList.data[i].url })
    }
  }

  const onChapterPressed = debounce((params) => {
    if (params == 'back') {
      MangaService.comicReader(id, indexNavigate - 1).then(data => {
        setIndexNavigate(indexNavigate - 1)
        setComicList(data);
      });
    } else if (params == 'next') {
      MangaService.comicReader(id, indexNavigate + 1).then(data => {
        setIndexNavigate(indexNavigate + 1)
        setComicList(data);
      });
    }
  }, 200)


  const ScaledImage = props => {

    const [width, setWidth] = useState()
    const [height, setHeight] = useState()
    const [imageLoading, setImageLoading] = useState(true)

    useEffect(() => {
      Images.getSize(props.uri, (width1, height1) => {
        if (props.width && !props.height) {
          setWidth(props.width)
          setHeight(height1 * (props.width / width1))
        } else if (!props.width && props.height) {
          setWidth(width1 * (props.height / height1))
          setHeight(props.height)
        } else {
          setWidth(width1)
          setHeight(height1)
        }
        setImageLoading(false)
      }, (error) => {
        console.log("ScaledImage,Image.getSize failed with error: ", error)
      })
    }, [])


    return (
      height ?
        <View style={{ height: height, width: width, borderRadius: 5, backgroundColor: "lightgray" }}>

          <FastImage
            style={{ width: width, height: height }}
            source={{
              uri: props.uri,
              priority: FastImage.priority.high,
              cache: FastImage.cacheControl.web
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
        : imageLoading ?
          <ActivityIndicator size="large" />
          : null
    );
  }

  const renderItem = (item) => {
    // console.log(item.item.url)
    return (
      <View style={styles.imageContainer}>
        <ScaledImage width={Dimensions.get('window').width * 1} uri={item.item.url} />
      </View>
    )
  }


  return (
    <GlobalContainer>
      <GlobalHeader
        navigation={navigation}
        showLeftButton={true}
        showRightButton={true}
        children={<Text style={styles.title_header}>{name}</Text>}
      />
      {/* button next chapter */}
      <View style={styles.nextChapterContainer}>
        {/* button back*/}
        <TouchableOpacity
          disabled={disableButtonBackChapter}
          onPress={(e) => {
            onChapterPressed('back')
          }}
        >
          <MaterialCommunityIcons name="chevron-left-box" style={[styles.iconBackNextChapter, disableButtonBackChapter ? styles.iconDisable : styles.iconEnable]} />
        </TouchableOpacity>

        {/* selector chapter */}
        <View style={styles.selectorChapterContainer}>
          <Text
            numberOfLines={1}
            ellipsizeMode='tail'
            style={styles.nameChapter}
          >
            {comicList.name}
          </Text>
        </View>

        {/* button next */}
        <TouchableOpacity
          disabled={disableButtonNextChapter}
          onPress={() => onChapterPressed('next')}
        >
          <MaterialCommunityIcons name="chevron-right-box" style={[styles.iconBackNextChapter, disableButtonNextChapter ? styles.iconDisable : styles.iconEnable]} />
        </TouchableOpacity>
      </View>

      <FlatList
        keyExtractor={(item) => {
          return item.url;
        }}
        initialNumToRender={10}
        data={chapterImages}
        renderItem={renderItem}
      />
    </GlobalContainer>
  );
}