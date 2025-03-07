import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default class DimensionHelper {
    static getScreenWidth = () => {
        return windowWidth
    }
    static getScreenHeight = () => {
        return windowHeight
    }

    static vertical(value){
        return `${(value/windowHeight)*100}%`
    }
    static horizontal(value){
        return `${(value/windowWidth)*100}%`
    }

    static fontSize12 = DimensionHelper.getScreenWidth()*0.03
    static fontSize14 = DimensionHelper.getScreenWidth()*0.035
    static fontSize10 = DimensionHelper.getScreenWidth()*0.027
    static fontSize16 = DimensionHelper.getScreenWidth()*0.04
    static fontSize18 = DimensionHelper.getScreenWidth()*0.045
    static fontSize20 = DimensionHelper.getScreenWidth()*0.052
    static fontSize22 = DimensionHelper.getScreenWidth()*0.060
    static fontSize36 = DimensionHelper.getScreenWidth()*0.095

    // static HorizontalValue = 24
    static HorizontalValue = `${(24/windowWidth)*100}%`
    static HorizontalValueSmall = `${(16/windowWidth)*100}%`
}