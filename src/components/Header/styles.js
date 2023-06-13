import { Platform } from 'react-native';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';


import FontSizes from '../../constants/colors';
import Sizes from '../../constants/colors';
import Colors from '../../constants/colors';


export default ScaledSheet.create({
    title_header: {
        fontSize: FontSizes.p,
        color: Colors.Colors.info,
        textAlign: 'center',
    },

    dark: {
        backgroundColor: '#606A80'
    },

    container: {
        width: '100%',
        height: Sizes.Sizes.s10,
        paddingHorizontal: Sizes.Sizes.s2,
        backgroundColor: Colors.HEADER,
        flexDirection: 'row',
        alignItems: 'center',
        // marginTop: Platform.OS === 'ios' ? '25@ms' : '35@ms',
    },

    separator: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },

    titleTextStyle: {
        fontSize: FontSizes.FontSizes.p,
        color: Colors.Colors.info,
        fontWeight: 'bold',
    },

    leftButton_Icon: {
        color: Colors.GRAY,
        fontSize: FontSizes.FontSizes.large,
    },

    rightButton_Icon: {
        // top: '3@ms',
        color: Colors.GRAY,
        fontSize: FontSizes.FontSizes.large,
    },

    search_Icon: {
        marginTop: '5@ms',
        marginRight: '10@ms',
        color: Colors.Colors.info,
        fontSize: FontSizes.FontSizes.h5,
    },

    rightButtonContainer: { 
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },

    leftButtonContainer: {
        flex: 1,
    }

});