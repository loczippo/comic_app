import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  ToastAndroid,
} from 'react-native';
import GlobalHeader from '../../components/Header/Header';
import screenString from '../../constants/screens';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Images from '../../assets/images';
import GlobalButton from '../../components/Button/Button';
import GlobalContainer from '../../components/Container/Container';
import styles1 from '../../components/Header/styles';
import GlobalTag from '../../components/Tag/Tag';
import MangaService from '../../services/MangaService';
import styles from './styles';
import { addComicToAsyncStorageArray, removeComicFromAsyncStorageArray, isIssetComicAsyncStorageArray, countAsyncStorage } from '../../utils/storage'
import config from '../../config';
import { useDispatch, useSelector } from 'react-redux';
import { setStorageCount } from '../../redux/storageSlice';
import { useTranslation } from 'react-i18next';

export default function ComicDetails({ route, navigation }) {

  const {t} = useTranslation();

  const dispatch = useDispatch();

  const { name, id } = route.params;

  const [contentActive, setContentActive] = useState(false);

  const [refreshing, setRefreshing] = React.useState(false);

  const [isFollowing, setIsFollowing] = useState(false);

  let [info, setInfo] = useState([]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000)
  }, []);

  useEffect(() => {
    if (!refreshing) {
      MangaService.comicInfo(id).then(data => {
        setInfo(data);
        if (refreshing) {
          setRefreshing(false);
        }
      });
      isIssetComicAsyncStorageArray(config.COMIC_STORAGE, {
        _id: id
      }).then(result => {
        setIsFollowing(result)
      })
    }
  }, [refreshing]);

  const [sortIcon, setSortIcon] = useState("sort")

  const sortChapter = () => {

    let icon = sortIcon == "sort-amount-down-alt" ? "sort-amount-up-alt" : "sort-amount-down-alt"

    setSortIcon(icon)

    const tempInfo = { ...info }; // Tạo bản sao của đối tượng info
    tempInfo.listChapter = tempInfo.listChapter.reverse(); // Giá trị mới cho listChapter

    setInfo(tempInfo);
    // tempInfo.listChapter.reverse();
    // setInfo(tempInfo)
  }

  let type2 = info.suggest_type || ";";
  
  const onChapterPressed = (index, id, name, length) => {
    navigation.navigate(screenString.COMIC_READER, {
      index, id, name, length
    })
  }

  const onFollowPressed = () => {
    ToastAndroid.show(isFollowing ? t("removeToFollowList") : t("addToFollowList"), ToastAndroid.SHORT);
    if (!isFollowing) {
      addComicToAsyncStorageArray(config.COMIC_STORAGE, { _id: id });
    } else {
      removeComicFromAsyncStorageArray(config.COMIC_STORAGE, { _id: id });
    }
    countAsyncStorage(config.COMIC_STORAGE).then(result => {
      dispatch(setStorageCount(result));
    })
    setIsFollowing(previousState => !previousState)
  }

  const renderItemChapter = ({ item: chapter }) => {
    return (
      <TouchableHighlight
        underlayColor="#E1DCDC"
        onPress={() => onChapterPressed(chapter.index, info._id, info.name, info.listChapter.length)}>
        <View style={styles.rowItemChapter}>
          <Text style={styles.item_soChuong}>{chapter.name}</Text>
          <Text style={styles.item_capNhat}>{chapter.updatedAt}</Text>
        </View>
      </TouchableHighlight>
    );
  };

  const mangaKeyExtractor = (chapter) => {
    return chapter.name;
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
        comicId={id}
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
            source={info.image ? {
              uri: info.image,
            } : Images.loading}
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
                <Text style={styles.views}>{info.viewcounts} {t("views")}</Text>
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

          <View style={{ width: 1, backgroundColor: 'gray' }} />

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

        <View style={{ flex: 1 }}>
          {contentActive ? (
            <View>
              <View style={styles.tomTatTruyen_button}>
                <Text style={{ marginVertical: 5, color: 'black' }}>Mô tả</Text>
                <Icon name="info" style={styles.iconContent} />
              </View>
              <View style={styles.tomTatTruyen_container}>
                <Text style={{ color: 'red' }}>{info.description == "Đang Cập Nhật" ? <>Truyện <Text style={{ color: 'green' }}>{info.name}</Text> chưa có mô tả</> : info.description}</Text>
              </View>
            </View>
          ) : (
            <View style={styles.tabListChapterContainer}>
              <View style={styles.headerItemChapter}>
                <Text style={[styles.headerItem_soChuong]} onPress={sortChapter}>Danh sách chương {" "}
                  <FontAwesome5 name={sortIcon}
                    onPress={sortChapter}
                  />
                </Text>
                <Text style={styles.headerItem_capNhat}>{t("update_1")}</Text>
              </View>

              <FlatList
                data={info.listChapter}
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
          onPress={onFollowPressed}>
          <Text>{isFollowing ? t("unFollow") : t("follow")}</Text>
        </GlobalButton>
      </View>
    </GlobalContainer>
  );
}
