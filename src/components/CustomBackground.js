import React from "react";
import {
  ImageBackground,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import Images from "../assets/Images";
import { Colors, NavService } from "../config";
import Logo from "./Logo";
import { getStatusBarHeight } from "react-native-status-bar-height";

export default ({ children, title, back = false, coach, onBack = null }) => {
  return (
    <ImageBackground source={Images.background} style={{ flex: 1 }}>
      <View
        style={{
          marginTop: getStatusBarHeight() + 15,
          width: "100%",
          justifyContent: "center",
          marginBottom: 10,
          alignItems: "center",
        }}
      >
        {back && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              if (onBack != null) {
                onBack();
              } else {
                NavService.goBack();
              }
            }}
            style={{ position: "absolute", left: 20 }}
          >
            <Image
              source={Icons.back}
              style={{
                width: 22,
                height: 22,
                resizeMode: "contain",
                tintColor: Colors.white,
                zIndex: 99,
              }}
            />
          </TouchableOpacity>
        )}
        <Text
          style={{
            color: Colors.white,
            fontWeight: "600",
            fontSize: 22,
            width: "70%",
            textAlign: "center",
          }}
        >
          {title}
        </Text>
      </View>

      <ScrollView
        // keyboardShouldPersistTaps="handled"
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{
          alignItems: "center",
          flexGrow: 1,
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Logo size={200} />
        </View>
        <View style={{ flex: 3 }}>{children}</View>
      </ScrollView>
    </ImageBackground>
  );
};
