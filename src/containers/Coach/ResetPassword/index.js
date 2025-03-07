import React, { useEffect, useState } from "react";
import { View, ScrollView, BackHandler } from "react-native";
import { NavService } from "../../../config";
import CustomBackground from "../../../components/CustomBackground";
import { AuthTextInput } from "../../../components/CustomTextInput";
import CustomButton from "../../../components/CustomButton";
import Icons from "../../../assets/Icons";
import Toast from "react-native-toast-message";
import { ApplicationLogsHistory, ResetPass } from "../../../redux/APIs";
const ResetPassword = ({ route,navigation }) => {
  const { user_id, role } = route?.params;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetHandler = async () => {
    await ResetPass(user_id, password, confirmPassword, role);
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
  //     ApplicationLogsHistory('RESET PASSWORD');
  //   });
  
  //   BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
  
  //   return () => {
  //     focusListener();
  //     BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
  //   };
  // }, [navigation]);
  

  return (
    <CustomBackground
      back={true}
      onBack={() => NavService.navigate("Login", { from: role })}
      title={"RESET PASSWORD"}
    >
      {/* <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={{flex: 1}}
        contentContainerStyle={{
          alignItems: 'center',
          flexGrow: 1,
        }}> */}
      <View
        style={{
          alignItems: "center",
          width: "100%",
        }}
      >
        <AuthTextInput
          maxLength={30}
          icon={Icons.password}
          label={"New Password"}
          onChangeText={(value) => setPassword(value)}
          isPassword
        />
        <AuthTextInput
          maxLength={30}
          icon={Icons.password}
          label={"Confirm Password"}
          onChangeText={(value) => setConfirmPassword(value)}
          isPassword
        />
        <CustomButton
          title={"CONTINUE"}
          buttonStyle={{ marginTop: 20 }}
          onPress={async () => {
            resetHandler();
            // await resetPassword(password, confirmPassword, email)
          }}
        />
      </View>
      {/* </ScrollView> */}
    </CustomBackground>
  );
};

export default ResetPassword;
