import {Dimensions, StyleSheet} from 'react-native';

// import appStyles from '../../appStyles';
// import {colors} from '../../../utils';
import { Colors } from '../../../config';
const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  mainContainer: {
    // ...appStyles.mainContainer,
  },
  heading: {
    color: Colors.primary,
    // ...appStyles.font16,
    // ...appStyles.family_Poppins_Bold,
    marginBottom: 10,
  },
  para: {
    // ...appStyles.family_Poppins_SemiBold,
    // ...appStyles.margin1Percent,
    color: Colors.darkGray,
    lineHeight: 20,
    width: '95%',
    alignSelf: 'center',
    textAlign: 'justify',
    // ...appStyles.family_Poppins_Medium,
  },
});
export default styles;
