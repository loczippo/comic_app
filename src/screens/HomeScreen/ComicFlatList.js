import React, { useRef, useEffect } from 'react';
import { Animated, FlatList, Image, Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';
import Images from '../../assets/images';
import NetInfo from "@react-native-community/netinfo"; // Thêm thư viện NetInfo
import screenString from '../../constants/screens';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';


const PlaceholderComponent = () => {
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
            {"10 giờ trước"}
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
          {"Đang tải..."}
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
            {"10 giờ trước"}
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
          {"Đang tải..."}
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



  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity activeOpacity={1} onPress={() => {
        navigation.navigate(screenString.COMIC_DETAILS, {name: item.name, id: item._id})
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
              <Text style={styles.manga_views}>
                {item.viewcounts}
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
              {item.ourTime}
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
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  if (!isConnected && isLoading) {
    return <PlaceholderComponent />;
  }

  if (isLoading) {
    return <PlaceholderComponent />;
  }


  return (
    <FlatList
      keyExtractor={index => {
        return index.image;
      }}
      horizontal
      showHorizontalScrollIndicator={false}
      data={data}
      renderItem={renderItem}
    />
  );
};
