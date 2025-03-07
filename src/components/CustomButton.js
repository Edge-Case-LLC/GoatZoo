import React from "react";
import { useSelector } from "react-redux";
import { Dimensions, Text, TouchableOpacity } from "react-native";
import { Colors, Shadows } from "../config";
const { width } = Dimensions.get("screen");

export default function CustomButton(props) {
  const { color, title, onPress, buttonStyle, textStyle } = props;
  const user = useSelector(({ reducer: { user } }) => user);
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        {
          width: width - 45,
          height: 50,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: color
            ? color
            : user?.role == "coach"
            ? Colors.orange
            : user?.role == "athlete"
            ? Colors.darkBlue
            : Colors.orange,
          marginTop: 15,
          borderRadius: 7,
          ...Shadows.shadow5,
        },
        buttonStyle,
      ]}
    >
      <Text
        style={[
          { fontSize: 16, color: Colors.white, fontWeight: "700" },
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
