import React, {useRef, useEffect} from 'react';
import {Animated, FlatList, Image, Text, View, NetInfo } from 'react-native';
import styles from './styles';
import Images from '../../assets/images';
// import NetInfo from '@react-native-community/netinfo'; // Thêm thư viện NetInfo


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
              style={[styles.manga_thumbnai, { height: 280, width: 175}]}
            />
            <View style={styles.mangaViewsContainer}>
              <Text
                style={[
                  styles.eyeIcon,
                  {marginLeft: 10, marginRight: 5, fontSize: 20},
                ]}>
                👀
              </Text>
              <Text style={[styles.manga_views, {marginTop: 4}]}>
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
            {"Test"}
          </Text>
        </View>
        
        <View style={styles.containerTruyen}>
          {/* thumbnai */}

          <View style={styles.mangaContainer}>
            <Image
              source={Images.loading}
              style={[styles.manga_thumbnai, { height: 175, width: 175}]}
            />
            <View style={styles.mangaViewsContainer}>
              <Text
                style={[
                  styles.eyeIcon,
                  {marginLeft: 10, marginRight: 5, fontSize: 20},
                ]}>
                👀
              </Text>
              <Text style={[styles.manga_views, {marginTop: 4}]}>
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
            {"Test"}
          </Text>
        </View>
        </>
    )
}

export default MangaFlatList = ({data, isLoading}) => {

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

  // const [isConnected, setIsConnected] = React.useState(true); // Thêm state isConnected

  // useEffect(() => {
  //   const unsubscribe = NetInfo.addEventListener(state => {
  //     setIsConnected(state.isConnected);
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);
  

  const renderItem = ({item}) => {
    return (
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
              <Text
                style={[
                  styles.eyeIcon,
                  {marginLeft: 10, marginRight: 5, fontSize: 20},
                ]}>
                👀
              </Text>
              <Text style={[styles.manga_views, {marginTop: 4}]}>
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
      );
  }

  // if (!isConnected) {
  //   return <PlaceholderComponent />;
  // }

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
