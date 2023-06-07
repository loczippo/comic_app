import React, {useRef, useEffect} from 'react';
import {Animated, Image, Text, TouchableOpacity, View} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import screenString from '../../constants/screens';
import styles from './styles';
import FastImage from 'react-native-fast-image';
import images from '../../assets/images';
import GlobalTag from '../../components/Tag/Tag';

export const ComicItem = ({item, direction, navigation, isLoading}) => {
  const opacityAnimation = useRef(new Animated.Value(0)).current;
  const startPulseAnimation = () => {
    Animated.sequence([
      Animated.timing(opacityAnimation, {
        toValue: 2,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnimation, {
        toValue: 0,
        duration: 900,
        useNativeDriver: true,
      }),
    ]).start(() => {
      startPulseAnimation();
    });
  };

  useEffect(() => {
    startPulseAnimation();
  }, []);

  let type2 = item.suggest_type || ";";

  // console.log(isLoading)
  if (direction === 'vertical') {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(screenString.COMIC_DETAILS, {
            name: item.name,
            id: item._id,
          });
        }}>
        <View style={styles.containerHorizontal}>
          {/* thumbnai */}

          <View style={{flex: 1}}>
            {/* <Image source={{
              uri: item.image,
            }} style={[styles.manga_thumbnai, {width: 130, resizeMode: 'cover'}]} /> */}
            <FastImage
              style={{width: 130, height: 135}}
              source={{
                uri: item.image,
                priority: FastImage.priority.high,
                // cache: FastImage.cacheControl.web,
              }}
              resizeMode={FastImage.resizeMode.stretch}
            />
            {/* <View style={ styles.mangaViewsContainer }>
                        <Icon name="eye" style={ styles.eyeIcon } />
                        <Text style={ styles.manga_views }>{ manga.comicView }</Text>
                    </View> */}
          </View>

          <View style={styles.infoMangaHorizontal}>
            {/* name */}
            <Text
              style={[styles.manga_name, {marginLeft: 40}]}
              numberOfLines={2}
              ellipsizeMode="tail">
              {item.name}
            </Text>
            {/* Chapter */}
            <GlobalTag direction={direction} data={type2.split(";")} />
            <Text style={[styles.subText, {marginLeft: 40}]}>
              {item.latest_chapter}
            </Text>
            <View style={[{flexDirection: 'row'}, {marginLeft: 40}]}>
              {/* Time */}
              <Text style={styles.subText}>Cập nhật: {item.ourTime}</Text>
              {/* View */}
              <Text style={styles.subText}>{item.viewcounts} lượt xem</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          navigation.navigate(screenString.COMIC_DETAILS, {
            name: item.name,
            id: item._id,
          });
        }}>
        <View style={styles.containerTruyen}>
          {/* thumbnai */}

          <View style={styles.mangaContainer}>
            <Image
              source={{
                uri: item.image,
              }}
              style={styles.manga_thumbnai}
            />
            <View style={styles.mangaViewsContainer}>
              <SimpleLineIcons name="eye" style={styles.eyeIcon} />
              <Text style={styles.manga_views}>{item.viewcounts}</Text>
            </View>
          </View>

          <View style={styles.mangaTimeLineContainer}>
            <Text
              style={{
                fontSize: 13,
                fontWeight: 400,
                color: '#fff',
                backgroundColor: '#56ccf2',
                borderRadius: 5,
                padding: 1,
                paddingLeft: 3,
                paddingRight: 3,
              }}>
              {item.ourTime}
            </Text>
            <Animated.View style={{opacity: opacityAnimation}}>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: 400,
                  color: '#fff',
                  backgroundColor: '#ff2853',
                  marginLeft: 2,
                  borderRadius: 5,
                  padding: 1,
                  paddingLeft: 3,
                  paddingRight: 3,
                }}>
                HOT
              </Text>
            </Animated.View>
          </View>

          {/* name */}
          <Text
            style={styles.manga_name}
            numberOfLines={1}
            ellipsizeMode="tail">
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
};
