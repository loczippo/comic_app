import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Modal } from 'react-native';
import GlobalHeader from '../../components/Header/Header';

import styles from './styles';
import MangaService from '../../services/MangaService';
import GlobalContainer from '../../components/Container/Container';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import PhotoView from 'react-native-photo-view';
import FastImage from 'react-native-fast-image'

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

  const chapterImages = []

  if (comicList.data) {
    for (let i = 0; i < comicList.data.length; i++) {
      chapterImages.push(comicList.data[i].url)
    }
    // chapterImages.pop();
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
          return (
            <View style={styles.imageContainer} key={index}>
              {/* <PhotoView
                source={{ uri: img }}
                minimumZoomScale={1}
                maximumZoomScale={2}
                androidScaleType="fitCenter"
                // onLoad={() => console.log("Image loaded!")}
                style={styles.image}
                scale={1}
                // showsHorizontalScrollIndicator={false}
              /> */}
              <FastImage
                style={styles.image}
                source={{
                    uri: img,
                    priority: FastImage.priority.high,
                    // cache: FastImage.cacheControl.cacheOnly
                }}
                resizeMode={FastImage.resizeMode.cover}
            />
            </View>
          )
        })}
      </ScrollView>

    </GlobalContainer>
  );
}