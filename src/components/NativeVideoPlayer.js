import React, { useState, useEffect } from "react";
import Orientation from "react-native-orientation-locker";
import Video from "./react-native-af-video-player-reimplemented";
import FullScreenPopUpVideo from "./Modal/fullScreenAndroidPopupVideo";
import { Colors, Common, NavService, Shadows } from "../config";

let getVideoDuration = 0;

const theme = {
  title: "transparent",
  more: "transparent",
  center: Colors.white,
  fullscreen: Colors.white,
  volume: Colors.white,
  scrubberThumb: Colors.white,
  scrubberBar: Colors.darkBlue,
  seconds: Colors.white,
  duration: Colors.white,
  progress: Colors.darkBlue,
  loading: Colors.darkBlue,
};

const NativeVideoPlayer = React.memo(({ videoUrl, style }) => {
  const [cacheVideoUrl, setCacheVideoUrl] = useState("");
  const [isFullScreen, setFullScreen] = useState(false);
  const getVideoDurations = (duration) => {
    getVideoDuration = Number(duration);
  };
  const dismissModal = (videoUrl) => {
    Orientation.unlockAllOrientations();
    setCacheVideoUrl(videoUrl);
    setFullScreen(!isFullScreen);
  };
  const dismissModalNew = () => {
    Orientation.lockToPortrait();
    setFullScreen(!isFullScreen);
  };
  useEffect(() => {
    return () => {
      Orientation.lockToPortrait();
      setFullScreen(false);
    };
  }, []);
  return (
    <>
      <Video
        url={`${Common?.assetURL}${videoUrl}`}
        style={style}
        dismissModal={dismissModal}
        getVideoDuration={getVideoDurations}
        videoDuration={getVideoDuration}
        theme={theme}
      />
      <FullScreenPopUpVideo
        isVisible={isFullScreen}
        dismissModalNew={dismissModalNew}
        cacheVideoUrl={cacheVideoUrl}
        themes={theme}
        getVideoDuration={getVideoDurations}
        videoDuration={getVideoDuration}
      />
    </>
  );
});

export default NativeVideoPlayer;
