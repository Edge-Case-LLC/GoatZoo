import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import Icons from "../assets/Icons";
import Images from "../assets/Images";
import { Colors, NavService } from "../config";

export function AppBackground({
  children,
  title,
  back = false,
  nav = "",
  notification = true,
  isCoach = true,
  bgColor = Colors.background,
  titleColor = isCoach ? Colors.white : Colors.darkBlue,
  fontSize = 20,
  filter = false,
  onFilterPress = () => {},
  forumUser = false,
}) {
  const onPress = () => {
    nav.length
      ? NavService.navigate(nav)
      : back
      ? NavService.goBack()
      : NavService.openDrawer();
  };
  return (
    <ImageBackground
      source={isCoach ? Images.bg : null}
      style={{ flex: 1, backgroundColor: bgColor }}
    >
      <View
        style={{
          marginTop: getStatusBarHeight(),
          flexDirection: "row",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onPress}
          style={{ position: "absolute", left: 20 }}
        >
          {!back ? (
            <Image
              source={Icons.menu}
              style={{
                width: 20,
                height: 20,
                resizeMode: "contain",
                tintColor: titleColor,
              }}
            />
          ) : (
            <Image
              source={Icons.back}
              style={{
                width: 20,
                height: 20,
                resizeMode: "contain",
                tintColor: titleColor,
              }}
            />
          )}
        </TouchableOpacity>

        <View>
          <Text
            style={{
              color: titleColor,
              fontWeight: "600",
              fontSize: fontSize,
            }}
          >
            {title}
          </Text>
        </View>
        {notification && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => NavService.navigate("Notification")}
            style={{ position: "absolute", right: 20 }}
          >
            <Image
              source={Icons.notification}
              style={{
                width: 22,
                height: 22,
                resizeMode: "contain",
                tintColor: titleColor,
              }}
            />
          </TouchableOpacity>
        )}
        {filter && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onFilterPress()}
            style={{ position: "absolute", right: 50 }}
          >
            <Image
              source={Icons.search}
              style={{
                width: 22,
                height: 22,
                resizeMode: "contain",
                tintColor: titleColor,
              }}
            />
          </TouchableOpacity>
        )}
        {forumUser && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => NavService.navigate("ChatHouseUsers")}
            style={{ position: "absolute", right: 80 }}
          >
            <Image
              source={Icons.user}
              style={{
                width: 22,
                height: 22,
                resizeMode: "contain",
                tintColor: titleColor,
              }}
            />
          </TouchableOpacity>
        )}
      </View>
      <View
        style={{
          flex: 1,
          overflow: "visible",
        }}
      >
        {children}
      </View>
    </ImageBackground>
  );
}

export default AppBackground;
