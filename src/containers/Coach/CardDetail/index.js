import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Dimensions, View, Image } from 'react-native';
import { useSelector } from 'react-redux';
import AppBackground from '../../../components/AppBackground';
import Icons from '../../../assets/Icons';
import { AuthTextInput } from '../../../components/CustomTextInput';
import CustomButton from '../../../components/CustomButton';
import { Colors, NavService } from "../../../config";
import { ApplicationLogsHistory } from '../../../redux/APIs';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

const CardDetails = ({navigation}) => {
  const user = useSelector(state => state.reducer.user);
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [cardExpiryDate, setCardExpiryDate] = useState('');
  const [cardHolderCvc, setCardHolderCvc] = useState('');
  useEffect(() => {
    const focusListener = navigation.addListener("focus", () => {
      ApplicationLogsHistory("Card Detail");
    });
    return () => {
      focusListener();
    };
  }, [navigation]);
  return (
    <AppBackground back title={'Card Details'} profile={false} notification={false} isCoach={user && user?.role == 'athlete' ? false : true}>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
        }}>
        <View style={{ flexDirection: 'row', marginRight: 10 }} >
          <View style={{ width: width * 0.7 }}>
            <AuthTextInput
              label="Card Number"
              value={cardNumber}
              onChangeText={text => setCardNumber(text)}
              keyboardType={'numeric'}
            />
          </View>
          <View style={{ width: width * 0.25 }}>
            <View style={{
              alignSelf: 'center',
              width: '90%',
              borderRadius: 12,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'white',
              paddingHorizontal: 20,
              height: 50,
              marginTop: 20
            }}>
              <Image source={Icons.visa} style={{ marginLeft: 3, width: 45, height: 40 }} resizeMode={'contain'} />
            </View>
          </View>
        </View>
        <AuthTextInput
          label="Card Holder Name"
          value={cardHolderName}
          onChangeText={text => setCardHolderName(text)}
          keyboardType={'email-address'}

        />
        <View style={{ flexDirection: 'row', marginRight: 10 }} >
          <View style={{ width: width * 0.7 }}>
            <AuthTextInput
              label="Expiry Date"
              value={cardExpiryDate}
              onChangeText={text => setCardExpiryDate(text)}
              keyboardType={'numeric'}
            />
          </View>
          <View style={{ width: width * 0.25 }}>
            <AuthTextInput
              label="Cvc"
              value={cardHolderCvc}
              onChangeText={text => setCardHolderCvc(text)}
              keyboardType={'numeric'}
            />
          </View>
        </View>
        <CustomButton
          title="Pay"
          onPress={() => NavService.goBack()}
        />
      </ScrollView>
    </AppBackground>
  );
}

export default CardDetails

const styles = StyleSheet.create({})