// npm i react-native-image-crop-picker react-native-actions-sheet react-native-actions-sheet; cd ios; pod install; cd ..

import React, { useRef } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import ImageCropPicker from "react-native-image-crop-picker";
import ActionSheet from "react-native-actions-sheet";
import {
  Image as ImageCompressor,
  Video as VideoCompressor,
} from "react-native-compressor";
import { Toast } from "react-native-toast-message/lib/src/Toast";

export default CustomNewImagePicker = ({
  children,
  onImageChange = () => {},
  style,
  isMultiple = false,
  disable,
}) => {
  const actionSheetRef = useRef(null);

  const imageChange = (method = "gallery") => {
    if (method === "camera") {
      ImageCropPicker.openCamera({
        mediaType: "photo",
      }).then(async (image) => {
        actionSheetRef.current.hide();
        const result = await ImageCompressor.compress(image.path, {
          maxHeight: 400,
          maxWidth: 400,
          quality: 1,
        });
        onImageChange(result, image.mime, "image");
      });
    } 
    else if (method === "gallery") {
      ImageCropPicker.openPicker({
        multiple: isMultiple,
        mediaType: "photo",
        // maxFiles : isMultiple && 15
      }).then(async (image) => {
        actionSheetRef.current.hide();
        let result;
        if (isMultiple) {
          onImageChange(image, image[0]?.mime, "image");
        } else {
          result = await ImageCompressor.compress(image.path, {
            maxHeight: 400,
            maxWidth: 400,
            quality: 1,
          });
          onImageChange(result, image.mime, "image");
        }
      });
    }
     else if (method === "videoGallery") {
      ImageCropPicker.openPicker({
        multiple: isMultiple,
        mediaType: "video",
      }).then(async (video) => {
        actionSheetRef.current.hide();
        let result;
        if (isMultiple) {
          onImageChange(video, video[0]?.mime, "video");
        } else {
          result = await VideoCompressor.compress(video.path, {
            compressionMethod: "auto",
          });
          onImageChange(result, video.mime, "video");
        }
      });
    } else if (method === "videoCamera") {
      ImageCropPicker.openCamera({
        mediaType: "video",
        multiple: isMultiple,
      }).then(async (video) => {
        actionSheetRef.current.hide();
        const result = await VideoCompressor.compress(video.path, {
          compressionMethod: "auto",
        });
        onImageChange(result, video.mime, "video");
      });
    }
  };

  return (
    <TouchableOpacity
      onPress={() =>
        disable
          ? Toast.show({
              text1: "Subscribe mebership",
              type: "error",
              visibilityTime: 3000,
            })
          : actionSheetRef.current.show()
      }
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
                Choose an option to pick an Image
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                // ref.hide()
                imageChange("camera");
              }}
              style={{
                paddingVertical: 12,
                alignItems: "center",
                borderBottomWidth: 1.5,
                borderBottomColor: "#ccc",
              }}
            >
              <Text style={{ color: "rgb(0,88,200)", fontSize: 18 }}>
                Take Photo
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                // ref.hide()
                imageChange("gallery");
              }}
              style={{ paddingVertical: 12, alignItems: "center" }}
            >
              <Text style={{ color: "rgb(0,88,200)", fontSize: 18 }}>
                Choose Photo from Library
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                imageChange("videoCamera");
              }}
              style={{
                paddingVertical: 12,
                alignItems: "center",
                borderBottomWidth: 1.5,
                borderBottomColor: "#ccc",
              }}
            >
              <Text style={{ color: "rgb(0,88,200)", fontSize: 18 }}>
                Make Video
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                imageChange("videoGallery");
              }}
              style={{ paddingVertical: 12, alignItems: "center" }}
            >
              <Text style={{ color: "rgb(0,88,200)", fontSize: 18 }}>
                Choose Video from Library
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
