import React, { useEffect, useState } from "react";
import { View, Text, BackHandler } from "react-native";
import { Colors, NavService } from "../../../config";
import CustomBackground from "../../../components/CustomBackground";
import { AuthTextInput } from "../../../components/CustomTextInput";
import CustomButton from "../../../components/CustomButton";
import Icons from "../../../assets/Icons";
import Toast from "react-native-toast-message";
import * as EmailValidator from "email-validator";
import { forgetPassword } from "../../../redux/APIs";

const ForgotPassword = ({ route, navigation }) => {
  const { role } = route?.params;
  const [email, setEmail] = useState("");

  const ForgetHandle = async () => {
    await forgetPassword(email, role);
  };
  //BACK HANDLER
  function handleBackButtonClick() {
    navigation.navigate("Login", { from: role });
    return true;
  }

  useEffect(() => {
    BackHandler?.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler?.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, []);

  // useEffect(() => {
  //   const focusListener = navigation.addListener("focus", () => {
  //     ApplicationLogsHistory("FORGOT PASSWORD");
  //   });
  //   BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
  //   return () => {
  //     focusListener();
  //     BackHandler.removeEventListener(
  //       "hardwareBackPress",
  //       handleBackButtonClick
  //     );
  //   };
  // }, [navigation]);

  return (
    <CustomBackground
      title={"FORGOT PASSWORD"}
      back={true}
      onBack={() => NavService.navigate("Login", { from: role })}
    >
      <View
        style={{
          alignItems: "center",
          width: "100%",
        }}
      >
        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            color: Colors.white,
          }}
        >
          Forgot Password
        </Text>
        <AuthTextInput
          maxlength={35}
          icon={Icons.email}
          label="Email Address"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType={"email-address"}
        />

        <CustomButton title="Reset" onPress={() => ForgetHandle()} />
      </View>
    </CustomBackground>
  );
};

export default ForgotPassword;
