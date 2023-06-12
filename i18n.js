import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import config from './src/config';
import screens from './src/constants/screens';

i18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: false,
    lng: config.DEFAULT_LANGUAGE,
    fallbackLng: config.DEFAULT_LANGUAGE,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      vi: {
        translation: {
          vietnamese: 'Tiếng Việt',
          english: 'Tiếng Anh',
          version: 'Phiên bản:',
          language: 'Ngôn ngữ:',
          settings: screens.SETTINGS,
          home: screens.HOME,
          follow: screens.FOLLOW,
          search: screens.SEARCH,
          ads: 'Quảng cáo:',
          darkMode: 'Giao diện tối:',
          ranking: "Xếp hạng",
          category: "Thể loại",
          newUpdates: "Mới cập nhật",
          comicNewUpdates: "Truyện mới cập nhật",
          minAgo: "phút trước",
          comicListIsEmpty: "Danh sách truyện theo dõi trống",
          comicRefresh: "Đang làm mới truyện",
          views: "lượt xem",
          update: "Cập nhật:",
          update_1: "Cập nhật",
          unFollow: "Bỏ theo dõi",
          addToFollowList: "Đã thêm vào danh sách theo dõi",
          removeToFollowList: "Đã bỏ theo dõi truyện",
        },
      },
      en: {
        translation: {
          vietnamese: 'Vietnamese',
          english: 'English',
          version: 'Version:',
          language: 'Languages:',
          settings: 'Settings',
          home: "Home",
          follow: "Follow",
          search: "Search",
          ads: 'Adsense:',
          darkMode: 'Dark Mode:',
          ranking: "Ranking",
          category: "Category",
          newUpdates: "New updates",
          comicNewUpdates: "Comic new updates",
          minAgo: "mins ago",
          comicListIsEmpty: "Comic follow list is empty",
          comicRefresh: "Comic refreshing",
          views: "views",
          update: "Update:",
          update_1: "Update",
          unFollow: "Unfollow",
          addToFollowList: "Already add to follow list",
          removeToFollowList: "Already unfollow comic",
        },
      },
    },
  });

export default i18n;
