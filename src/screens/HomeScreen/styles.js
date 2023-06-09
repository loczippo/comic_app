import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

import {
  ScaledSheet,
  moderateScale,
  verticalScale,
} from 'react-native-size-matters';

import IconSizes from '../../constants/colors';
import FontSizes from '../../constants/colors';
import Sizes from '../../constants/colors';
import Colors from '../../constants/colors';

export default styles = ScaledSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.Colors.info,
  },

  viewBanner: {
    height: '167@s',
    borderRadius: Sizes.Sizes.s1,
  },

  // separator: {
  //     height: Sizes.Sizes.s2,
  //     backgroundColor: Colors.Colors.lightBackground,
  // },

  menuContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.Colors.info,
    height: '100@ms',
    // width: width,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Sizes.Sizes.s2,
    backgroundColor: Colors.Colors.lightenPrimary,
  },

  menuButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Sizes.Sizes.s1,
    paddingBottom: Sizes.Sizes.s1,
    width: width * 0.3,
  },

  menuImageContainer: {
    width: '100%',
    height: '30@ms',
    borderTopLeftRadius: Sizes.Sizes.s1,
    borderTopRightRadius: Sizes.Sizes.s1,
    backgroundColor: Colors.Colors.info,
    paddingVertical: Sizes.Sizes.s1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  menuRanking: {
    backgroundColor: '#faa6a6',
  },

  menuPhanLoai: {
    backgroundColor: '#fbd178',
  },

  menuCapNhatMoi: {
    backgroundColor: '#66e9fb',
  },

  menuTitle: {
    fontSize: FontSizes.FontSizes.small,
    color: Colors.Colors.info,
  },

  menuImage: {
    width: IconSizes.IconSizes.extraSmall,
    height: IconSizes.IconSizes.extraSmall,
  },

  listManagaContainer: {
    flex: 1,
  },

  listTruyenConGaiThichContainer: {
    paddingVertical: Sizes.Sizes.s2,
    paddingBottom: -Sizes.Sizes.s1
  },

  title_truyenConGaiThich: {
    fontSize: FontSizes.FontSizes.h5,
    color: Colors.Colors.primary,
    fontWeight: 'bold',
    paddingHorizontal: Sizes.Sizes.s2,
  },

  truyenContainer: {
    width: width * 0.3,
    height: height * 0.3,
    margin: 3,
  },

  truyenImageContainer: {},

  truyenImage: {},

  truyenName: {
    fontSize: FontSizes.FontSizes.small,
    color: Colors.Colors.darkText,
  },

  list: {
    flexDirection: 'row',
    paddingHorizontal: Sizes.Sizes.s1,
  },
  imageTitle: {
    height: 200,
    width: '100%',
    resizeMode: 'cover',
  },
  containerTruyen: {
    padding: Sizes.Sizes.s1,
    flexDirection: 'column',
    backgroundColor: 'white',
    height: 280,
    width: 175,
},

containerHorizontal: {
    padding: Sizes.Sizes.s1,
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 150,
    width: '100%',
    borderBottomWidth: Sizes.Sizes.s1,
    borderBottomColor: Colors.Colors.lightBackground
},

comicInfoHorizontal: {
    flex: 3,
    marginLeft: Sizes.Sizes.s1,  
    justifyContent: 'space-between',
    paddingVertical: Sizes.Sizes.s2,
},

mangaContainer: {
   flex: 1,
},

manga_thumbnai: {
    flex: 1,
},

mangaViewsContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'rgba(0,0,0, 0.4)'
},

mangaTimeLineContainer: {
    position: 'absolute',
    top: 8,
    flexDirection: 'row',
    width: '100%',
    paddingTop: 2,
    paddingBottom: 3,
    paddingLeft: 12,
    // backgroundColor: 'rgba(0,0,0, 0.4)'
},

eyeIcon: {
    color: Colors.Colors.info,
    fontSize: FontSizes.FontSizes.p,
    marginHorizontal: Sizes.Sizes.s1,
},

manga_views: {
    color: Colors.Colors.info,
    fontSize: FontSizes.FontSizes.extraSmall,
},

manga_name: {
    color: Colors.Colors.darkText,
    fontSize: FontSizes.FontSizes.small,
    fontWeight: 500,
},

subText: {
    color: Colors.Colors.lightText,
    fontSize: FontSizes.FontSizes.extraSmall,
    marginRight: Sizes.Sizes.s2,
}
});
