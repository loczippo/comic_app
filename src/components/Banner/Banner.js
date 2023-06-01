import React, { useEffect, useState } from "react";
import {
    Animated,
    Image,
    View,
    Dimensions
} from "react-native";
import FastImage from 'react-native-fast-image'
const { width, height } = Dimensions.get("window");

import styles from "./styles";

const Banner = ({ data }) => {
  const scrollX = new Animated.Value(0);
  const [dataList, setDataList] = useState(data);

  useEffect(() => {
    setDataList(data);
  }, [data]);

  const infiniteScroll = () => {
    const numberOfData = dataList.length;
    let scrollValue = 0,
      scrolled = 0;

    setInterval(function () {
      scrolled++;
      if (scrolled < numberOfData) scrollValue = scrollValue + width;
      else {
        scrollValue = 0;
        scrolled = 0;
      }

      // Animate the scroll view to the new offset
      this.flatList.scrollToOffset({
        animated: true,
        offset: scrollValue,
      });
    }, 15000);
  };

  useEffect(() => {
    infiniteScroll();
  }, []);

  const position = Animated.divide(scrollX, width);

  const renderDot = (_, i) => {
    const opacity = position.interpolate({
      inputRange: [i - 1, i, i + 1],
      outputRange: [0.3, 1, 0.3],
      extrapolate: "clamp",
    });

    return (
      <Animated.View
        key={i}
        style={{
          opacity,
          height: 10,
          width: 10,
          backgroundColor: "#595959",
          margin: 8,
          borderRadius: 5,
        }}
      />
    );
  };

  const renderSlide = ({ item }) => {
    return (
      <View style={styles.cardView}>
        {/* <Image resizeMode="cover" style={styles.image} source={{ uri: item.url }} /> */}
        <FastImage
            style={styles.image}
            source={{
              uri: item.url,
              priority: FastImage.priority.high,
              cache: FastImage.cacheControl.web
            }}
            resizeMode={FastImage.resizeMode.stretch}
          />
      </View>
    );
  };

  return (
    <View>
      <Animated.FlatList
        data={data}
        ref={(flatList) => {
          this.flatList = flatList;
        }}
        keyExtractor={(item, index) => "key" + index}
        horizontal
        pagingEnabled
        scrollEnabled
        snapToAlignment="center"
        scrollEventThrottle={16}
        decelerationRate={"fast"}
        showsHorizontalScrollIndicator={false}
        renderItem={renderSlide}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: true,
        })}
      />

      <View style={styles.dotView}>{data.map(renderDot)}</View>
    </View>
  );
};



export default Banner;