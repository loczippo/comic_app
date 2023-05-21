import { ScaledSheet, verticalScale } from 'react-native-size-matters';
import { Dimensions } from 'react-native';

import FontSizes from '../../constants/colors';
import Sizes from '../../constants/colors';
import Colors from '../../constants/colors';

const { width, height } = Dimensions.get('window');

export default ScaledSheet.create({
    title_header: {
        fontSize: FontSizes.p,
        color: Colors.Colors.info,
        textAlign: 'center',
    },

    nextChapterContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: Sizes.Sizes.s1,
        backgroundColor: Colors.Colors.lightenPrimary,
    },

    iconBackNextChapter: {
        fontSize: FontSizes.FontSizes.large,
        
    },

    iconEnable: {
        color: Colors.Colors.active,
    },

    iconDisable: {
        color: Colors.Colors.lightGray,
    },

    imageContainer: {
        flex: 1,
    },

    image: {
        flex: 1,
        width: width,
        height: height,
    },

    //selector chapter
    selectorChapterContainer: {
        flex: 1,
        backgroundColor: Colors.Colors.button,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: Sizes.Sizes.s2,
    },

    nameChapter: {
        fontSize: FontSizes.FontSizes.small,
        color: Colors.Colors.info,
    },

    viewBtnFilter: {
        marginRight: '10@s',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    btnFilter: {
        color: '#FFF',
        fontSize: '12@s'
    },

    viewButtonFilter: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },

    viewDropDown: {
        width: '90@s',
        backgroundColor: Colors.Colors.gray,
        borderColor: Colors.Colors.primary,
        borderWidth: '1@s',
    },

    dropDownTextStyle: {
        fontSize: '12@s',
        color: Colors.Colors.darkText,
        backgroundColor: Colors.Colors.primary,
        textAlign: 'center'
    },

    dropDownTextHighlightStyle: {
        fontSize: '12@s',
        color: Colors.Colors.active,
    },

});