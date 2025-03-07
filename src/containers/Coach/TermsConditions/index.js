import React, { useEffect } from "react";
import { Text, ScrollView, BackHandler } from "react-native";
import { useSelector } from "react-redux";
import AppBackground from "../../../components/AppBackground";
import { Colors, NavService } from "../../../config";
import { ApplicationLogsHistory } from "../../../redux/APIs";

const TermsConditions = ({ navigation }) => {
  const user = useSelector((state) => state.reducer.user);
  function handleBackButtonClick() {
    NavService.navigate("PreLogin", { from: role });
    return true;
  }
  useEffect(() => {
    const focusListener = navigation.addListener("focus", () => {
      ApplicationLogsHistory("TERMS & CONDITIONS");
    });

    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);

    return () => {
      focusListener();
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, [navigation]);
  return (
    <AppBackground
      profile={false}
      title={"TERMS & CONDITIONS"}
      notification={false}
      back={true}
      isCoach={user && user?.role == "athlete" ? false : true}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1, paddingTop: 15 }}
      >
        <Text
          style={{
            color: user && user?.role == "athlete" ? Colors.black : Colors.white,
            fontSize: 16,
            marginHorizontal: 20,
            textAlign: "justify",
          }}
        >
          App Users are responsible for complying with terms and conditions of
          the GoatZoo App. Any content posted be sports related. You must also
          respect other users on the app.{"\n"}
          {"\n"}You are not permitted to add or upload any pornography, or
          belligerent language. Goatzoo reserves the right to remove any content
          or and users that violate the terms and conditions.{"\n"}
          {"\n"}Users are restricted from using the app for any illegal
          activities or purposes.
          {"\n"}
          {"\n"}GoatZoo isn’t responsible for any be at injuries or damages that
          may occur while using the app.{"\n"}
          {"\n"}Users are responsible for keeping their account information
          secure and confidential.{"\n"}
          {"\n"}Users are responsible for keeping their personal information
          confidential, and their account be used in accordance. login
          information must not be shared with others.
        </Text>
      </ScrollView>
    </AppBackground>
  );
};

export default TermsConditions;
