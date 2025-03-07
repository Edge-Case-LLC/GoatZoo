import React, {Component} from 'react';
import {Image} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import Images from '../assets/Images';

export default ({size = 180}) => {
  return (
    <Image
      source={Images.logo}
      style={{height: size, width: size, paddingTop: getStatusBarHeight()}}
      resizeMode="contain"
    />
  );
};
