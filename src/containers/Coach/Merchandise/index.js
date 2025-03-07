import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useSelector } from "react-redux";
import AppBackground from "../../../components/AppBackground";
import { ApplicationLogsHistory } from "../../../redux/APIs";
import { Colors } from "../../../config";

const Merchandise = ({ navigation }) => {
  const user = useSelector((state) => state.reducer.user);
  useEffect(() => {
    const focusListener = navigation.addListener("focus", () => {
      ApplicationLogsHistory(`Merchandise`);
    });
    return () => {
      focusListener();
    };
  }, []);
  return (
    <AppBackground
      title={"Merchandise"}
      back
      profile={false}
      isCoach={user && user?.role == "athlete" ? false : true}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{
            fontSize: 14,
            color:
              user && user?.role == "athlete" ? Colors.darkBlue : Colors.orange,
            fontWeight: "500",
          }}
        >
          GoatZoo gear coming soon
        </Text>
      </View>
    </AppBackground>
  );
};

export default Merchandise;
