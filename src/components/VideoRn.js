import React from 'react';
import Video from 'react-native-video';
import Common from "../config/Common";

const VideoPlayer = props => {
  return (
    <Video source={{uri: Common.assetURL+props?.video}} style={[props.style]} {...props} />
  );
};
export default VideoPlayer;