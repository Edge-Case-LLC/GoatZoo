import React from "react";
import { WebView } from "react-native-webview";
// import {colors} from '../utils';
import { Colors } from "../config";
const VideoPlayer = (props) => {
  return (
    <WebView
      source={{ uri: props.video }}
      style={[
        {
          backgroundColor: "lightgrey",
        },
        props.style,
      ]}
      {...props}
    />
  );
};
export default VideoPlayer;
