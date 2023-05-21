import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Modal  } from 'react-native';
import GlobalHeader from '../../components/Header/Header';

import styles from './styles';
import MangaService from '../../services/MangaService';
import GlobalContainer from '../../components/Container/Container';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ImageViewer from 'react-native-image-zoom-viewer';

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

  if(comicList.data) {
    for (let i = 0;i < comicList.data.length; i++) {
      chapterImages.push(comicList.data[i].url)
    }
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
              <ImageViewer style={ styles.image } imageUrls={[{url: img}]} saveToLocalByLongPress={false} />
            </View>
          )
        })}
      </ScrollView>

    </GlobalContainer>
  );
}