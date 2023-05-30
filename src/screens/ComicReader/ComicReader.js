import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, FlatList, ActivityIndicator, Image as Images } from 'react-native';
import GlobalHeader from '../../components/Header/Header';

import styles from './styles';
import MangaService from '../../services/MangaService';
import GlobalContainer from '../../components/Container/Container';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import PhotoView from 'react-native-photo-view';
import FastImage from 'react-native-fast-image'
import ImageSize from 'react-native-image-size'
import { Dimensions } from 'react-native';
import Image from 'react-native-scalable-image';

export default function ComicReader({ route, navigation }) {

  const { width, height } = Dimensions.get('window');

  const { name, id, index, length } = route.params

  let [comicList, setComicList] = React.useState({});

  let [indexNavigate, setIndexNavigate] = React.useState(index);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000)
  }, []);

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

  // console.log(comicList.data.length)

  // const chapterImages = ['https://cdn.apitruyen.tk/image/645681ebaf35ab19246c2755/37/1', 'https://cdn.apitruyen.tk/image/645681ebaf35ab19246c2755/37/2', 'https://cdn.apitruyen.tk/image/645681ebaf35ab19246c2755/37/3', 'https://cdn.apitruyen.tk/image/645681ebaf35ab19246c2755/37/4', 'https://cdn.apitruyen.tk/image/645681ebaf35ab19246c2755/37/5', 'https://cdn.apitruyen.tk/image/645681ebaf35ab19246c2755/37/6', 'https://cdn.apitruyen.tk/image/645681ebaf35ab19246c2755/37/7', 'https://cdn.apitruyen.tk/image/645681ebaf35ab19246c2755/37/8', 'https://cdn.apitruyen.tk/image/645681ebaf35ab19246c2755/37/9', 'https://cdn.apitruyen.tk/image/645681ebaf35ab19246c2755/37/10', 'https://cdn.apitruyen.tk/image/645681ebaf35ab19246c2755/37/11', 'https://cdn.apitruyen.tk/image/645681ebaf35ab19246c2755/37/12', 'https://cdn.apitruyen.tk/image/645681ebaf35ab19246c2755/37/13', 'https://cdn.apitruyen.tk/image/645681ebaf35ab19246c2755/37/14', 'https://cdn.apitruyen.tk/image/645681ebaf35ab19246c2755/37/15', 'https://cdn.apitruyen.tk/image/645681ebaf35ab19246c2755/37/16', 'https://cdn.apitruyen.tk/image/645681ebaf35ab19246c2755/37/17', 'https://cdn.apitruyen.tk/image/645681ebaf35ab19246c2755/37/18']

  const chapterImages = [];

  if (comicList.data) {
    for (let i = 0; i < comicList.data.length; i++) {
      chapterImages.push({ url: comicList.data[i].url })
    }
    // chapterImages.pop();
  }

  // console.log(chapterImages)

  const onChapterPressed = params => {
    if(params == 'back') {
      MangaService.comicReader(id, indexNavigate-1).then(data => {
        setIndexNavigate(indexNavigate-1)
        setComicList(data);
      });
    } else if(params == 'next') {
      MangaService.comicReader(id, indexNavigate+1).then(data => {
        setIndexNavigate(indexNavigate+1)
        setComicList(data);
      });
    }
  }


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
          {/* <Image
                    source={{ uri: props.uri }}
                    style={{ height: height, width: width }}
                /> */}

                {/* <PhotoView
                source={{ uri: props.uri }}
                // minimumZoomScale={1}
                // maximumZoomScale={4}
                androidScaleType="fitCenter"
                // resizeMode="center"
                // onLoad={() => console.log("Image loaded!")}
                style={{ height: height, width: width }}
                // scale={2}
                // showsHorizontalScrollIndicator={false}
              /> */}

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
        {/* <Image
          width={Dimensions.get('window').width} // height will be calculated automatically
          source={{ uri: item.item.url }}
        /> */}
        {/* <PhotoView
                source={{ uri: item.item.url }}
                // minimumZoomScale={1}
                // maximumZoomScale={4}
                androidScaleType="center"
                // resizeMode="center"
                // onLoad={() => console.log("Image loaded!")}
                style={[styles.image]}
                // scale={2}
                // showsHorizontalScrollIndicator={false}
              /> */}
        {/* <FastImage
          style={{width: width, height: height }}
          source={{
            uri: item.item.url,
            priority: FastImage.priority.high,
            // cache: FastImage.cacheControl.cacheOnly
          }}
          resizeMode={FastImage.resizeMode.contain}
        /> */}
      </View>
    )
  }


  return (
    <GlobalContainer>
      <GlobalHeader
        navigation={navigation}
        showLeftButton={true}
        children={<Text style={styles.title_header}>{name}</Text>}
      />

      {/* button next chapter */}
      <View style={styles.nextChapterContainer}>
        {/* button back*/}
        <TouchableOpacity
          disabled={disableButtonBackChapter}
          onPress={() => onChapterPressed('back')}
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
        // horizontal
        // showHorizontalScrollIndicator={false}
        initialNumToRender={10}
        data={chapterImages}
        renderItem={renderItem}
      />


    </GlobalContainer>
  );
}