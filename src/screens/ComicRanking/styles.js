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
    container: {
        flex: 1,
      },
      tabBar: {
        flexDirection: 'row',
        backgroundColor: 'rgba(0, 0, 0, 0.01)',
        padding: 10,
        paddingBottom: 0
      },
      tabItem: {
        flex: 1,
        alignItems: 'center',
        // padding: 16,
      },
});