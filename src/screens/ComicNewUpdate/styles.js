import { ScaledSheet, verticalScale } from 'react-native-size-matters';
import { Dimensions } from 'react-native';

import FontSizes from '../../constants/colors';
import Sizes from '../../constants/colors';
import Colors from '../../constants/colors';

const { width, height } = Dimensions.get('window');

export default ScaledSheet.create({
    title_header: {
        fontSize: FontSizes.FontSizes.p,
        color: Colors.Colors.info,
        textAlign: 'center',
    },
});