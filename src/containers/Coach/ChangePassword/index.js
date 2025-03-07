import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import CustomTextInput from "../../../components/CustomTextInput";
import CustomButton from "../../../components/CustomButton";
import Icons from "../../../assets/Icons";
import AppBackground from "../../../components/AppBackground";
import { NavService } from "../../../config";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { ApplicationLogsHistory, ChangePass } from "../../../redux/APIs";

const ChangePassword = ({navigation}) => {
  const user = useSelector((state) => state.reducer.user);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  useEffect(() => {
    const focusListener = navigation.addListener("focus", () => {
      ApplicationLogsHistory("Change Password");
    });
    return () => {
      focusListener();
    };
  }, [navigation]);
  const changeHandler = async () => {
    await ChangePass(currentPassword, confirmPassword, newPassword, user?.role);
  };
  
  return (
    <AppBackground
      title={"Change Password"}
      back
      profile={false}
      isCoach={user && user?.role == "athlete" ? false : true}
    >
      <ScrollView
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
            alignItems: "center",
            flex: 1,
            paddingHorizontal: 40,
          }}
        >
          <View style={{ flex: 1 }}>
            <CustomTextInput
              maxLength={30}
              icon={Icons.password}
              placeholder={"Exisiting Password"}
              onChangeText={(value) => setCurrentPassword(value)}
              value={currentPassword}
              isPassword={true}
            />
            <CustomTextInput
              maxLength={30}
              icon={Icons.password}
              placeholder={"New Password"}
              onChangeText={(value) => setNewPassword(value)}
              value={newPassword}
              isPassword={true}
            />
            <CustomTextInput
              maxLength={30}
              icon={Icons.password}
              placeholder={"Confirm New Password"}
              onChangeText={(value) => setConfirmPassword(value)}
              value={confirmPassword}
              isPassword={true}
            />
            <View style={{ marginTop: 10 }}>
              <CustomButton
                title={"Change"}
                onPress={async () => {
                  changeHandler();
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </AppBackground>
  );
};

export default ChangePassword;
