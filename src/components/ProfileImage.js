import React from "react";
import { Image, Text, View } from "react-native";
import Images from "../assets/Images";
import { Colors } from "../config";

const ProfileImage = ({
  size = 140,
  imageUri,
  innerAsset = false,
  name = "",
  style,
}) => {
  if (imageUri)
    return (
      <Image
        source={innerAsset ? imageUri : { uri: imageUri }}
        style={[
          {
            width: size,
            height: size,
            resizeMode: "cover",
            borderRadius: size / 2,
            backgroundColor: Colors.grey,
            borderWidth: size / 50,
            borderColor: Colors.primary,
          },
          style,
        ]}
      />
    );
  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          // borderWidth: size / 50,
          borderColor: Colors.primary,
          backgroundColor: Colors.background,
          alignItems: "center",
          justifyContent: "center",
        },
        style,
      ]}
    >
      {/* <Text
        numberOfLines={1}
        style={{
          color: Colors.orange,
          fontSize: size * 0.75,
          fontWeight: "800",
          width: "100%",
          textAlign: "center",
        }}
      >
        {name[0]?.toUpperCase()}
      </Text> */}
      <Image
        source={Images?.user}
        style={[
          {
            width: size,
            height: size,
            resizeMode: "cover",
            borderRadius: size / 2,
            backgroundColor: Colors.grey,
            borderWidth: size / 50,
            borderColor: Colors.primary,
          },
        ]}
      />
    </View>
  );
};

export default ProfileImage;
