// npm i react-native-image-crop-picker react-native-actions-sheet react-native-actions-sheet; cd ios; pod install; cd ..

import React, { useRef, useState } from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import Toast from "react-native-toast-message";
import ImageCropPicker from "react-native-image-crop-picker";
import ActionSheet from "react-native-actions-sheet";
import { Image as ImageCompressor } from "react-native-compressor";
import { Colors } from "../config";
import DocumentPicker from "react-native-document-picker";

const camera = require("../assets/camera.png");

export default MultipleItemPicker = ({
  children,
  onImageChange = () => {},
  style,
  isMultiple = false,
  disable = false,
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
    } else {
      ImageCropPicker.openPicker({
        multiple: isMultiple,
        mediaType: "photo",
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
  };
  const selectDocument = async () => {
    const result = await DocumentPicker.pickMultiple({
      type: [DocumentPicker.types.pdf],
    });
    actionSheetRef.current.hide();
    onImageChange(result, result[0]?.type, "document");
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
                Choose an option to pick an Image or file
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => {
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
                selectDocument();
              }}
              style={{ paddingVertical: 12, alignItems: "center" }}
            >
              <Text style={{ color: "rgb(0,88,200)", fontSize: 18 }}>
                Upload Document
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
