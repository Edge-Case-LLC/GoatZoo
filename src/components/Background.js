import React from 'react';
import {Text, View, TouchableOpacity, Image,ImageBackground} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import Images from '../assets/Images';
import {Colors, NavService} from '../config';

export function Background({
  children,
  title,
  back = false,
  nav = '',
  profile = true,
  bgColor = Colors.background,
  titleColor = Colors.white,
  fontSize = 20,
  
}) {
  const onPress = () => {
    nav.length
      ? NavService.navigate(nav)
      : back
      ? NavService.goBack()
      : NavService.openDrawer();
  };
  return (
    <ImageBackground source={Images.bg} style={{flex: 1}}>
      <View
        style={{
          marginTop: getStatusBarHeight() + 15,
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 10,
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onPress}
          style={{position: 'absolute', left: 20}}>
          {!back ? (
            <Image
              source={Icons.menu}
              style={{
                width: 20,
                height: 20,
                resizeMode: 'contain',
                tintColor:Colors.white
              }}
          
            />
          ) : (
            <Image
              source={Icons.back}
              style={{
                width: 20,
                height: 20,
                resizeMode: 'contain',
                tintColor: titleColor,
              }}
            />
          )}
        </TouchableOpacity>

        <View>
          <Text
            style={{
              color: titleColor,
              fontWeight: '600',
              fontSize: fontSize,
            }}>
            {title
            // .toUpperCase()
            }
          </Text>
        </View>
        {profile && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => NavService.navigate('Profile')}
            style={{position: 'absolute', right: 20}}>
            <Image
              source={Images.user}
              style={{
                width: 35,
                height: 35,
                resizeMode: 'cover',
                borderRadius: 50,
              }}
            />
          </TouchableOpacity>
        )}
      </View>
      <View
        style={{
          flex: 1,
          overflow: 'visible',
        }}>
        {children}
      </View>
    </ImageBackground>
  );
}

export default Background;
