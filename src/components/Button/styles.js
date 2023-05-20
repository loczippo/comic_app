import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import FontSizes from '../../constants/colors';
import Sizes from '../../constants/colors';
import Colors from '../../constants/colors';

export default ScaledSheet.create({
    container: {
        height: Sizes.Sizes.s10,
        width: '100%',
        flexDirection: 'column',
        borderRadius: moderateScale(3),
        position: 'relative',
        overflow: 'hidden',
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.Colors.button,
        borderRadius: moderateScale(3),
    },
    buttonText: {
        color: Colors.Colors.info,
        fontSize: FontSizes.FontSizes.p,
        fontWeight: 'bold',
    },
    buttonShadow: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: '100%',
        height: '4@ms',
        backgroundColor: 'gray'
    },

    buttonContainer__primaryOutline: {
        backgroundColor: 'transparent',
        borderColor: Colors.Colors.primary,
        borderWidth: moderateScale(1),
    },
    buttonText__primaryOutline: {
        color: Colors.Colors.primary,
    },

    buttonContainer__lightenPrimary: {
        backgroundColor: Colors.Colors.lightenPrimary,
    },
    buttonText__lightenPrimary: {
        color: Colors.Colors.info,
    },

    buttonContainer__lightenPrimaryOutline: {
        backgroundColor: 'transparent',
        borderColor: Colors.Colors.lightenPrimary,
        borderWidth: moderateScale(1),
    },
    buttonText__lightenPrimaryOutline: {
        color: Colors.Colors.lightenPrimary,
    },

    container__3dLightenPrimary: {
        paddingBottom: '4@ms',
    },
    buttonShadow__3dLightenPrimary: {
        backgroundColor: '#00934A',
    },

    buttonContainer__warning: {
        backgroundColor: Colors.Colors.warning,
    },
    buttonText__warning: {
        color: Colors.Colors.info,
    },
});