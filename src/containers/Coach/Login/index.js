import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, BackHandler } from "react-native";
import { Colors, NavService } from "../../../config";
import CustomBackground from "../../../components/CustomBackground";
import { AuthTextInput } from "../../../components/CustomTextInput";
import CustomButton from "../../../components/CustomButton";
import Icons from "../../../assets/Icons";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationLogsHistory, login } from "../../../redux/APIs";

var passwordValidator = require("password-validator");
var schema = new passwordValidator();
schema.is().min(8).is().max(100);

const Login = ({ navigation, route }) => {
  const { from } = route?.params;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const LoginHandle = async () => {
    await login(email, password, from);
  };

  //BACK HANDLER
  function handleBackButtonClick() {
    navigation.navigate("PreLogin", { from: from });
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
  //     ApplicationLogsHistory('LOGIN');
  //   });

  //   BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);

  //   return () => {
  //     focusListener();
  //     BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
  //   };
  // }, [navigation]);

  return (
    <CustomBackground
      title={"LOGIN"}
      back
      onBack={() => NavService.navigate("PreLogin", { from: from })}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          width: "100%",
        }}
      >
        <View
          style={{
            marginTop: 20,
            alignItems: "center",
            flex: 1,
            width: "100%",
          }}
        >
          <AuthTextInput
            maxlength={35}
            icon={Icons.email}
            label="Enter Email"
            value={email?.toLowerCase()}
            onChangeText={(text) => setEmail(text)}
            keyboardType={"email-address"}
          />
          <AuthTextInput
            maxlength={30}
            icon={Icons.password}
            label="Enter Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            isPassword
          />
          <TouchableOpacity
            style={{ alignSelf: "flex-end" }}
            activeOpacity={0.8}
            onPress={() =>
              NavService.navigate("ForgetPassword", { role: from })
            }
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: Colors.white,
                marginVertical: 20,
                textDecorationLine: "underline",
              }}
            >
              Forgot Password
            </Text>
          </TouchableOpacity>
          <CustomButton title="LOGIN" onPress={() => LoginHandle()} />
        </View>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "400",
            color: Colors.white,
            marginVertical: 30,
          }}
        >
          Don't have an account?{" "}
          <Text
            onPress={() => {
              NavService.navigate("Signup", { from });
              setEmail(""), setPassword("");
            }}
            style={{
              fontWeight: "900",
              color: Colors.white,
              textDecorationLine: "underline",
              fontSize: 16,
            }}
          >
            SIGN UP
          </Text>
        </Text>
      </View>
    </CustomBackground>
  );
};

export default Login;
