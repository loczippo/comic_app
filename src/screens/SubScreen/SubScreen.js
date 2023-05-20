import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import screenString from '../../constants/screens';
import GlobalHeader from '../../components/Header/Header';

import styles1 from '../../components/Header/styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import GlobalContainer from '../../components/Container/Container';
import GlobalButton from '../../components/Button/Button';
import GlobalTag from '../../components/Tag/Tag';
import MangaService from '../../services/MangaService';

export default function SubScreen({route, navigation}) {
  const {name, id} = route.params;

  const [contentActive, setContentActive] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [listFollowing, setListFollowing] = useState([]);

  const [refreshing, setRefreshing] = React.useState(false);

  let [info, setInfo] = useState([]);

  useEffect(() => {
    if (!refreshing) {
      MangaService.infoManga(id).then(data => {
        setInfo(data);
        if (refreshing) {
          setRefreshing(false);
        }
      });
    }
  }, [refreshing]);

  const data = [
    {
      comicChapter: 'Chương 1',
      comicDateUpdate: '10 phút trước',
    },
    {
      comicChapter: 'Chương 2',
      comicDateUpdate: '20 phút trước',
    },
  ];

  const mota =
    'Sau khi nhóm nhạc nam hàng đầu hoàn toàn chìm nghỉm, Yeon Seo Ho, người phụ trách vẻ đẹp của nhóm, trở thành một diễn viên có máu mặt trong giới, còn anh đội trưởng có gương mặt bây bi, sau khi xuất ngũ, biến thành một kẻ vô công rỗi nghề. Bấy giờ Yeon Seo Ho lại đến tận nhà… Ơ kìa! Chẳng phải chúng ta đã không còn ghép CP nữa hay sao?';

  const type = ['Manga', 'Yuri', 'Manhwa'];
  let type2 = info.suggest_type || ";";
  // console.log()

  const renderItemChapter = ({item: chapter}) => {
    return (
      <TouchableHighlight
        underlayColor="#E1DCDC"
        onPress={() => onChapterPressed(chapter)}>
        <View style={styles.rowItemChapter}>
          <Text style={styles.item_soChuong}>{chapter.comicChapter}</Text>
          <Text style={styles.item_capNhat}>{chapter.comicDateUpdate}</Text>
        </View>
      </TouchableHighlight>
    );
  };

  const mangaKeyExtractor = chapter => {
    return chapter.comicChapter;
  };

  const activeContent = title => {
    switch (title) {
      case 'content':
        setContentActive(true);
        break;
      case 'chapters':
        setContentActive(false);
        break;
    }
  };

  return (
    <GlobalContainer>
      {/* header */}
      <GlobalHeader
        navigation={navigation}
        showLeftButton={true}
        showRightButton={true}
        children={<Text style={styles1.title_header}>{name}</Text>}
      />
      <View style={styles.container}>
        {/* tom tat truyen  */}
        <View style={styles.truyen_container}>
          {/* thumbnai */}
          <Image
            style={styles.thumbnai}
            source={{
              uri: info.image,
            }}
          />

          {/* info */}
          <View style={styles.info}>
            {/* ten truyen */}
            <Text style={styles.mangaName}>{name}</Text>

            {/* Ten khác */}
            <Text style={styles.otherMangaName}>
              Tên khác: {info.other_name}
            </Text>

            {/* Ten tac gia */}
            <Text style={styles.autherName}>Tên tác giả: {info.author}</Text>

            {/* Trang thai */}
            <Text style={styles.status}>Trạng thái: {info.status}</Text>

            {/* tag the loai truyen */}
            <GlobalTag data={type2.split(";")} />

            {/* Luot doc, thich */}
            <View style={styles.viewLike_container}>
              {/* views */}
              <View style={styles.views_container}>
                <SimpleLineIcons name="eye" style={styles.eyeIcon} />
                <Text style={styles.views}>{info.viewcounts} lượt xem</Text>
              </View>
              {/* likes */}
              <View style={styles.likes}>
                <Text style={styles.numberOfLike}>2.000</Text>
                <SimpleLineIcons name="like" style={styles.likeIcon} />
              </View>
            </View>
          </View>
        </View>

        {/* menu tab */}
        <View style={styles.menuTabContainer}>
          <TouchableOpacity
            style={styles.menuTabItem}
            onPress={() => activeContent('content')}>
            <View>
              <Text
                style={
                  contentActive ? styles.contentActive : styles.contentNotActive
                }>
                INTRODUCE
              </Text>
            </View>
          </TouchableOpacity>

          <View style={{width: 1, backgroundColor: 'gray'}} />

          <TouchableOpacity
            style={styles.menuTabItem}
            onPress={() => activeContent('chapters')}>
            <View>
              <Text
                style={
                  contentActive ? styles.contentNotActive : styles.contentActive
                }>
                MENU
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{flex: 1}}>
          {contentActive ? (
            <View>
              <View style={styles.tomTatTruyen_button}>
                <Text style={{marginVertical: 5, color: 'black'}}>Mô tả</Text>
                <Icon name="info" style={styles.iconContent} />
                {/* <Text style={styles.iconContent}>🖤</Text> */}
              </View>
              <View style={styles.tomTatTruyen_container}>
                <Text style={{color: 'red'}}>{info.description}</Text>
              </View>
            </View>
          ) : (
            <View style={styles.tabListChapterContainer}>
              <View style={styles.headerItemChapter}>
                <Text style={styles.headerItem_soChuong}>Tên chương</Text>
                <Text style={styles.headerItem_capNhat}>Cập nhật</Text>
              </View>

              <FlatList
                data={data}
                renderItem={renderItemChapter}
                keyExtractor={mangaKeyExtractor}
              />
            </View>
          )}
        </View>
      </View>

      {/* theo doi button */}
      <View style={styles.buttonContainer}>
        <GlobalButton
          style={styles.buttonFollow}
          type="outlinePrimary"
          locKey={
            isFollowing ? 'MangaScreen.following' : 'MangaScreen.button_follow'
          }
          onPress={{}}>
          <Text>Theo dõi</Text>
        </GlobalButton>
      </View>
    </GlobalContainer>
  );

  // return (
  //   <View style={styles.container}>
  //     <GlobalHeader
  //       navigation={navigation}
  //       showLeftButton={true}
  //       showRightButton={true}
  //       children={<Text style={styles1.title_header}>{name}</Text>}
  //     />
  //     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
  //       <Text style={{fontSize: 26, fontWeight: 'bold', color: 'black'}}>
  //         Đây là TRANG INFO TRUYỆN
  //       </Text>
  //       <Text
  //           onPress={() => navigation.navigate(screenString.SUB+"2")}
  //           style={{fontSize: 26, fontWeight: 'bold', color: 'green'}}>
  //           Vào trang ĐỌC TRUYỆN
  //         </Text>
  //     </View>
  //   </View>
  // );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });
