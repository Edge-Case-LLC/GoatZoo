import React, { Component, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  Image,
  BackHandler,
} from "react-native";
import { Colors, NavService } from "../../../config";
import CustomBackground from "../../../components/CustomBackground";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import Icons from "../../../assets/Icons";
import {
  ApplicationLogsHistory,
  ResendOtp,
  VerifyOtp,
} from "../../../redux/APIs";
const height = Dimensions.get("window").height;

const OTP = ({ navigation, route }) => {
  const { user_id, role, signup, from } = route.params;
  console.log(role, from, "54545");
  const [code, setCode] = useState("");
  const [timerCode, setTimerCode] = useState(30);
  const [resend, setResend] = useState(false);

  let timer = null;
  useEffect(() => {
    startInterval();
    return () => {
      clearInterval(timer);
    };
  }, []);

  const startInterval = () => {
    setTimerCode(30);
    clearInterval(timer);
    timer = setInterval(() => {
      setTimerCode((timerCode) => {
        if (timerCode > 0) {
          return timerCode - 1;
        } else {
          setResend(true);
          clearInterval(timer);
          return "0";
        }
      });
    }, 1000);
  };

  const onComplete = async (inputPin) => {
    if (inputPin >= 6) {
      await VerifyOtp(inputPin, user_id, role, signup, from);
    }
  };
  const Resend = async () => {
    await ResendOtp(user_id, role);
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
  //     ApplicationLogsHistory('OTP VERIFICATION');
  //   });

  //   BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);

  //   return () => {
  //     focusListener();
  //     BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
  //   };
  // }, [navigation]);

  return (
    <CustomBackground
      back
      title={"OTP VERIFICATION"}
      onBack={() => NavService.navigate("Login", { from: role })}
    >
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={{ flexGrow: 1 }}
        contentContainerStyle={{
          alignItems: "center",
          flexGrow: 1,
          paddingHorizontal: 40,
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontWeight: "400",
            color: Colors.white,
            marginBottom: 20,
            textAlign: "justify",
          }}
        >
          We have sent you an email containing a verification code and
          instructions.Please follow the instructions to verify your email
          address
        </Text>
        <OTPInputView
          autoFocusOnLoad={true}
          style={{ width: "100%", height: height * 0.08 }}
          pinCount={6}
          code={code}
          onCodeChanged={(num) => setCode(num)}
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={(code) => {
            onComplete(code);
          }}
        />
        <Image
          source={Icons.clock}
          style={styles.clock}
          resizeMode={"contain"}
        />
        <Text
          style={[styles.clockText, { fontWeight: resend ? "800" : "600" }]}
        >
          00:{timerCode < 10 ? 0 : null}
          {timerCode}
        </Text>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          <Text style={styles.account}>
            Didn't recieve the verification code?{" "}
            <Text
              onPress={
                resend
                  ? async () => {
                      setCode("");
                      setResend(false);
                      setTimerCode(30);
                      startInterval();
                      Resend();
                    }
                  : null
              }
              style={styles.resendText}
            >
              Resend
            </Text>
          </Text>
        </View>
      </ScrollView>
    </CustomBackground>
  );
};

export default OTP;

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: "red",
  },

  underlineStyleBase: {
    width: 50,
    height: 50,
    borderWidth: 1,
    // borderBottomWidth: 1,
    backgroundColor: Colors.white,
    borderRadius: 10,
    color: Colors.orange,
  },

  underlineStyleHighLighted: {
    borderColor: Colors.white,
    borderBottomWidth: 1,
  },
  circleView: {
    backgroundColor: Colors.darkOrange,
    borderRadius: 100,
    width: 120,
    height: 120,
    alignItems: "center",
    justifyContent: "center",
  },
  clock: {
    width: 50,
    height: 50,
    marginVertical: 10,
  },
  clockText: {
    color: "#fff",
    fontSize: 15,
  },
  account: {
    fontSize: 14,
    fontWeight: "400",
    color: Colors.white,
    marginVertical: 30,
  },
  resendText: {
    fontWeight: "600",
    color: Colors.primary,
    textDecorationLine: "underline",
  },
});
