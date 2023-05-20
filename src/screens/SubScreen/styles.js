import { ScaledSheet, verticalScale } from 'react-native-size-matters';
import { Dimensions } from 'react-native';

import FontSizes from '../../constants/colors';
import Sizes from '../../constants/colors';
import Colors from '../../constants/colors';

const { width, height } = Dimensions.get('window');

export default ScaledSheet.create({
    container: {
        flex: 1,
        padding: Sizes.Sizes.s2,
    },

    title_header: {
        fontSize: FontSizes.FontSizes.p,
        color: Colors.Colors.info,
        textAlign: 'center',
    },

    truyen_container: {
        flexDirection: 'row',
        height: height * 0.3,
    },

    thumbnai: {
        height: 200,
        width: 150,
    },

    info: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: Sizes.Sizes.s2,
    },

    mangaName: {
        fontSize: FontSizes.FontSizes.small,
        color: Colors.Colors.darkText,
        marginBottom: Sizes.Sizes.s1,
    },

    autherName: {
        fontSize: FontSizes.FontSizes.extraSmall,
        color: Colors.Colors.lightText,
        marginBottom: Sizes.Sizes.s1,
    },

    otherMangaName: {
        fontSize: FontSizes.FontSizes.extraSmall,
        color: Colors.Colors.lightText,
        marginBottom: Sizes.Sizes.s1,
    },

    status: {
        fontSize: FontSizes.FontSizes.extraSmall,
        color: Colors.Colors.lightText,
        marginBottom: Sizes.Sizes.s1,
    },

    viewLike_container: {
        flexDirection: 'row',
        marginTop: Sizes.Sizes.s5,
        justifyContent: 'space-between',
    },

    views_container: {
        backgroundColor: Colors.Colors.active,
        borderRadius: Sizes.Sizes.s5,
        paddingVertical: Sizes.Sizes.s1,
        paddingHorizontal: Sizes.Sizes.s2,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },

    views: {
        fontSize: FontSizes.FontSizes.extraSmall,
        color: Colors.Colors.lightText,
    },

    eyeIcon: {
        fontSize: FontSizes.FontSizes.p,
        color: Colors.Colors.lightText,
        marginRight: Sizes.Sizes.s1,
    },                                    
    
    likes: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    numberOfLike: {
        fontSize: FontSizes.FontSizes.extraSmall,
        color: Colors.Colors.lightText,
        marginRight: Sizes.Sizes.s1,
    },

    likeIcon: {
        fontSize: FontSizes.FontSizes.p,
        color: Colors.Colors.lightText,
    },

    listChapter_container: {
        flex: 1,
        backgroundColor: Colors.Colors.active
    },

    headerItemChapter: {
        height: Sizes.Sizes.v6,
        backgroundColor: Colors.Colors.lightenPrimary,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Sizes.Sizes.s1
    },

    rowItemChapter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: Sizes.Sizes.s1,
        paddingVertical: Sizes.Sizes.s3,
        borderBottomWidth: 1,
        borderBottomColor: Colors.Colors.lightGray,
    },
    
    headerItem_soChuong: {
        flex: 6,
        color: Colors.Colors.darkText,
    },

    headerItem_capNhat: {
        flex: 4,
        textAlign: 'center',
        color: Colors.Colors.darkText,
    },

    headerItem_luotXem: {
        flex: 3,
        textAlign: 'center',
    },

    item_soChuong: {
        flex: 6,
        fontSize: Sizes.Sizes.p,
        color: Colors.Colors.darkText,
    },

    item_capNhat: {
        flex: 4,
        textAlign: 'center',
        fontSize: Sizes.Sizes.extraSmall,
        color: Colors.Colors.darkText,
    },

    item_luotXem: {
        flex: 3,
        textAlign: 'center',
        fontSize: Sizes.Sizes.extraSmall,
        color: Colors.Colors.darkText,
    },

    tomTatTruyen_button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.Colors.lightenPrimary,
        paddingHorizontal: Sizes.Sizes.s1,
    },

    iconContent: {
        fontSize: FontSizes.FontSizes.h4,
        color: Colors.GRAY,
        marginRight: Sizes.Sizes.s1,
    },

    tomTatTruyen_container: {
        marginHorizontal: Sizes.Sizes.s1,
        marginVertical: Sizes.Sizes.s2,
    },

    menuTabContainer: {
        flexDirection: 'row',
        backgroundColor: Colors.Colors.primary,
    },

    menuTabItem: {
        flex: 1,
        alignItems: 'center',
        paddingTop: '6@s',
        paddingBottom: '6@s',
    },

    contentActive: {
        color: Colors.Colors.active,
        paddingLeft: '5@s',
        fontSize: '14@s',
        fontWeight: 'bold',
    },

    contentNotActive: {
        color: Colors.Colors.lightBackground,
        paddingLeft: '5@s',
        fontSize: '14@s'
    },

    tabListChapterContainer: {
        flex: 1,
    },

    
    //button follow
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonFollow: {
        backgroundColor: Colors.Colors.active,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    }
});