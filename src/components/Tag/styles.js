import { ScaledSheet, moderateScale } from 'react-native-size-matters';

import FontSizes from '../../constants/colors';
import Sizes from '../../constants/colors';
import Colors from '../../constants/colors';

export default ScaledSheet.create({
    container: {
        flexDirection: 'row',
    },

    tagContainer: {
        flex: 1,
        borderRadius: Sizes.Sizes.s1,
        borderWidth: 1,
        borderColor: Colors.Colors.lightGray,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: '2@ms',
        paddingHorizontal: Sizes.Sizes.s1,
        marginRight: Sizes.Sizes.s2,
    },

    tagText: {
        fontSize: FontSizes.FontSizes.extraSmall,
        color: Colors.Colors.lightGray,
    }
});