import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Image } from 'react-native';
import GlobalHeader from '../../components/Header/Header';

import styles from './styles';
import MangaService from '../../services/MangaService';
import GlobalContainer from '../../components/Container/Container';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import PhotoView from 'react-native-photo-view';
import FastImage from 'react-native-fast-image'
import ImageSize from 'react-native-image-size'

export default function ComicReader({ route, navigation }) {

  const { name, id, index } = route.params

  let [comicList, setComicList] = React.useState({});

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

  const disableButtonBackChapter = false;
  const disableButtonNextChapter = false;

  // console.log(comicList.data.length)

  // const chapterImages = ['https://cdn.apitruyen.tk/image/645681ebaf35ab19246c2755/37/1', 'https://cdn.apitruyen.tk/image/645681ebaf35ab19246c2755/37/2', 'https://cdn.apitruyen.tk/image/645681ebaf35ab19246c2755/37/3', 'https://cdn.apitruyen.tk/image/645681ebaf35ab19246c2755/37/4', 'https://cdn.apitruyen.tk/image/645681ebaf35ab19246c2755/37/5', 'https://cdn.apitruyen.tk/image/645681ebaf35ab19246c2755/37/6', 'https://cdn.apitruyen.tk/image/645681ebaf35ab19246c2755/37/7', 'https://cdn.apitruyen.tk/image/645681ebaf35ab19246c2755/37/8', 'https://cdn.apitruyen.tk/image/645681ebaf35ab19246c2755/37/9', 'https://cdn.apitruyen.tk/image/645681ebaf35ab19246c2755/37/10', 'https://cdn.apitruyen.tk/image/645681ebaf35ab19246c2755/37/11', 'https://cdn.apitruyen.tk/image/645681ebaf35ab19246c2755/37/12', 'https://cdn.apitruyen.tk/image/645681ebaf35ab19246c2755/37/13', 'https://cdn.apitruyen.tk/image/645681ebaf35ab19246c2755/37/14', 'https://cdn.apitruyen.tk/image/645681ebaf35ab19246c2755/37/15', 'https://cdn.apitruyen.tk/image/645681ebaf35ab19246c2755/37/16', 'https://cdn.apitruyen.tk/image/645681ebaf35ab19246c2755/37/17', 'https://cdn.apitruyen.tk/image/645681ebaf35ab19246c2755/37/18']

  const chapterImages = [];

  if (comicList.data) {
    for (let i = 0; i < comicList.data.length; i++) {
      chapterImages.push(comicList.data[i].url)
    }
    // chapterImages.pop();
  }

  const [imgState, setImgState] = React.useState({
    imgWidth: 0,
    imgHeight: 0,
  });


  const size = (url) => {
    ImageSize.getSize(uri).then(size => {
      // size.height
      // size.width
      setImgState({
        imgWidth: size.width,
        imgHeight: size.height,
      })
  })
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
          onPress={() => this.onChapterPressed('back')}
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
          onPress={() => this.onChapterPressed('next')}
        >
          <MaterialCommunityIcons name="chevron-right-box" style={[styles.iconBackNextChapter, disableButtonNextChapter ? styles.iconDisable : styles.iconEnable]} />
        </TouchableOpacity>
      </View>


      <ScrollView>
        {/* images */}
        {chapterImages.map((img, index) => {
          size(img);
          return (
            <View style={styles.imageContainer} key={index}>
              {/* <PhotoView
                source={{ uri: img }}
                minimumZoomScale={1}
                maximumZoomScale={4}
                // androidScaleType="fitCenter"
                // resizeMode="center"
                // onLoad={() => console.log("Image loaded!")}
                style={[styles.image, index != 0 ? { marginTop: 1000 } : {}]}
                scale={2}
                // showsHorizontalScrollIndicator={false}
              /> */}
              {/* <FastImage
                style={[styles.image, index != 0 ? { marginTop: 1000 } : {}]}
                source={{
                    uri: img,
                    priority: FastImage.priority.high,
                    // cache: FastImage.cacheControl.cacheOnly
                }}
                resizeMode={FastImage.resizeMode.cover}
            /> */}

              <Image
                                    // resizeMode={ 'cover' }
                                    style={{height: imgState.imgHeight,
                                      width: imgState.imgWidth,
                                       flex:1}}
                                    source={{ uri: img }}
                                />
            
            </View>
          )
        })}
      </ScrollView>

    </GlobalContainer>
  );
}