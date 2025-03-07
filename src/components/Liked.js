import React from 'react';
import { StyleSheet, View } from 'react-native';
import Background from './Background';
import Comment from './Comment';

const Liked = () => {
  return (
    <Background back={true} title={'People who Reacted'} profile={false}>
        {/* <View
        style={{borderTopColor:'white', borderTopWidth:2,}}
        /> */}
        <Comment/>
  
    </Background>
  )
}

export default Liked

const styles = StyleSheet.create({})