import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import AppBackground from '../../../components/AppBackground'
import CustomButton from '../../../components/CustomButton';
import { Colors, NavService, Shadows } from '../../../config';
import Icons from '../../../assets/Icons';
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const PaymentMethod = ({navigation}) => {
  const user = useSelector(state => state.reducer.user);
  const methods = [
    {
      name: 'Credit Card',
      icon: Icons.creditCard,
      onPress: () => { },
    },
    {
      name: 'Stripe',
      icon: Icons.stripe,
      onPress: () => { },
    },
    {
      name: 'PayPal',
      icon: Icons.paypal,
      onPress: () => { }
    },

  ];
  useEffect(() => {
    const focusListener = navigation.addListener("focus", () => {
      ApplicationLogsHistory(`Card Details`)
    });
    return () => {
      focusListener();
    };
  }, [navigation]);
  return (
    <AppBackground title={'Card Details'} back profile={false} isCoach={user && user?.role == 'athlete' ? false : true}>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
        }}>
        <View
          style={styles.Container}>
          {methods.map((method, i) => {
            const { color, name, icon, onPress } = method;
            return (
              <TouchableOpacity style={[styles.btn, Shadows.shadow5]}>
                <Image
                  source={icon}
                  style={styles.img}
                  resizeMode={'contain'}
                />
                <Text
                  style={{
                    marginLeft: 20,
                    fontSize: 15,
                    color: Colors.black,
                    fontWeight: '400',
                  }}>
                  {name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <CustomButton title={'New'} onPress={() => { NavService.navigate('CardDetail') }} />
      </ScrollView>
    </AppBackground>
  );
}

export default PaymentMethod

const styles = StyleSheet.create({
  btn: {
    borderRadius: 10,
    width: width - 60,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 7,
    height: 55,
    backgroundColor: Colors.white,
  },
  img: { marginLeft: 20, width: 30, height: 30 },
  txt: {
    marginLeft: 20,
    fontSize: 15,
    color: Colors.black,
    fontWeight: '400',
  },
});