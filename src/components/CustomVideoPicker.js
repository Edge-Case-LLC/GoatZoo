// npm i react-native-image-crop-picker react-native-actions-sheet react-native-actions-sheet; cd ios; pod install; cd ..

import React, { useRef } from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import ImageCropPicker from "react-native-image-crop-picker";
import ActionSheet from "react-native-actions-sheet";


export default CustomVideopicker = ({
  children,
  onVideoChange = () => {},
  style,
  pick = true,
  showAlert
}) => {
  const actionSheetRef = useRef(null);

  const videoChange = (method = "gallery") => {
    if (method === "camera") {
      ImageCropPicker.openCamera({
        mediaType: "video",
      }).then((video) => {
        actionSheetRef.current.hide();
        console.log("video: ", video)
        onVideoChange(video.path,video.mime);
      });
    } else {
      ImageCropPicker.openPicker({
        mediaType: "video",
      }).then((video) => {
        actionSheetRef.current.hide();
        console.log('video: ', video)
        onVideoChange(video.path,video.mime);
      });
    }
  };
  return (
    <TouchableOpacity
      onPress={() => (pick ? actionSheetRef.current.show() : showAlert(true))}
      style={style}
      activeOpacity={0.8}
    >
      <ActionSheet
        ref={actionSheetRef}
        containerStyle={{ backgroundColor: "transparent" }}
      >
        <View style={{ padding: 10 }}>
          <View
            style={{
              backgroundColor: "rgba(241,241,241,0.8)",
              borderRadius: 10,
              marginBottom: 10,
            }}
          >
            <View
              style={{
                borderBottomWidth: 1.5,
                borderBottomColor: "#ccc",
                paddingVertical: 10,
              }}
            >
              <Text style={{ color: "grey", textAlign: "center" }}>
                Choose an option to pick a Video
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                videoChange("camera");
              }}
              style={{
                paddingVertical: 12,
                alignItems: "center",
                borderBottomWidth: 1.5,
                borderBottomColor: "#ccc",
              }}
            >
              <Text style={{ color: "rgb(0,88,200)", fontSize: 18 }}>
                Shoot a Video
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                videoChange("gallery");
              }}
              style={{ paddingVertical: 12, alignItems: "center" }}
            >
              <Text style={{ color: "rgb(0,88,200)", fontSize: 18 }}>
                Choose from Library
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => actionSheetRef.current.hide()}
            style={{
              backgroundColor: "white",
              borderRadius: 10,
              paddingVertical: 12,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "rgb(0,88,200)",
                fontSize: 18,
                fontWeight: "600",
              }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </ActionSheet>
      {children}
    </TouchableOpacity>
  );
};
