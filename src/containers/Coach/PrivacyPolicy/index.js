import React, { useEffect } from "react";
import { Text, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import AppBackground from "../../../components/AppBackground";
import { Colors } from "../../../config";
import { ApplicationLogsHistory } from "../../../redux/APIs";

const PrivacyPolicy = ({ navigation }) => {
  const user = useSelector((state) => state.reducer.user);
  useEffect(() => {
    const focusListener = navigation.addListener("focus", () => {
      ApplicationLogsHistory(`PRIVACY POLICY`);
    });
    return () => {
      focusListener();
    };
  }, [navigation]);
  return (
    <AppBackground
      profile={false}
      title={"PRIVACY POLICY"}
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
            color:
              user && user?.role == "athlete" ? Colors.black : Colors.white,
            fontSize: 16,
            marginHorizontal: 20,
          }}
        >
          By using the app, the app is provided "as is" and the developers are
          not liable for any damages or losses incurred while using the app.
          {"\n"}
          {"\n"}Users must not engage in any form of cheating, hacking, or other
          unauthorized activities while using the app.{"\n"}
          {"\n"}The developers reserve the right to suspend or terminate user
          abide by these terms and conditions.{"\n"}
          {"\n"}Please note that these are accounts for violating these terms
          and just general guidelines and you may need to customize them based
          on the condition.{"\n"}
          {"\n"}To use the app, you must be at least 13 years old. If you are
          under 16 years old, you will need parental permission to use the app.
          This helps ensure safety and compliance with regulations.
        </Text>
      </ScrollView>
    </AppBackground>
  );
};

export default PrivacyPolicy;
