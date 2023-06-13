import React, { useRef, useEffect } from 'react';
import { Animated, FlatList, Image, Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';
import Images from '../../assets/images';
import NetInfo from "@react-native-community/netinfo"; // Thêm thư viện NetInfo
import screenString from '../../constants/screens';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import { ComicItem } from './ComicItem';
import { useTranslation } from 'react-i18next';

function ourTime(ourTime) {
  const {t} = useTranslation();
  const data = ourTime.split(" ");
  if(data[1] == "phút") {
      return data[0] + ` ${t("minsAgo")}`
  } else if(data[1] == "ngày") {
      return data[0] + ` ${t("daysAgo")}`
  } else if(data[1] == "giờ") {
      return data[0] + ` ${t("hoursAgo")} `
  }
}

const PlaceholderComponent = () => {

  const {t} = useTranslation()
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

  
  return (
    <>
      <View style={styles.containerTruyen}>
        {/* thumbnai */}

        <View style={styles.mangaContainer}>
          <Image
            source={Images.loading}
            style={[styles.manga_thumbnai, { height: 280, width: 175 }]}
          />
          <View style={styles.mangaViewsContainer}>
            <SimpleLineIcons name="eye" style={styles.eyeIcon} />
            <Text style={[styles.manga_views]}>
              {"1000"}
            </Text>
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
            {ourTime("10 giờ trước")}
          </Text>
          <Animated.View style={{ opacity: opacityAnimation }}>
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
          {t("loading")}
        </Text>
      </View>

      <View style={styles.containerTruyen}>
        {/* thumbnai */}

        <View style={styles.mangaContainer}>
          <Image
            source={Images.loading}
            style={[styles.manga_thumbnai, { height: 175, width: 175 }]}
          />
          <View style={styles.mangaViewsContainer}>
            <SimpleLineIcons name="eye" style={styles.eyeIcon} />
            <Text style={[styles.manga_views]}>
              {"1000"}
            </Text>
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
            {ourTime("10 giờ trước")}
          </Text>
          <Animated.View style={{ opacity: opacityAnimation }}>
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
          {t("loading")}
        </Text>
      </View>
    </>
  )
}

export default ComicFlatList = ({ navigation, data, isLoading, isConnected }) => {

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


  if (!isConnected && isLoading) {
    return <PlaceholderComponent />;
  }

  if (isLoading) {
    return <PlaceholderComponent />;
  }

  const renderComicItem = ({ item }) => {
    return (
      <ComicItem item={item} navigation={navigation} />
    );
  }
  const comicKeyExtractor = (item) => {
    return item._id;
  }


  return (
    <FlatList
      keyExtractor={comicKeyExtractor}
      horizontal
      showHorizontalScrollIndicator={false}
      data={data}
      renderItem={renderComicItem}
    />
  );
};
