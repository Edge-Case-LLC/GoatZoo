import { Dimensions, Keyboard, Text, View } from "react-native";
import React, { Component } from "react";
import AppBackground from "../../../components/AppBackground";
import CustomTextInput, {
  CustomTextMyInput,
} from "../../../components/CustomTextInput";
import CustomButton from "../../../components/CustomButton";
import { Colors, NavService } from "../../../config";
import { Toast } from "react-native-toast-message/lib/src/Toast";
const { width } = Dimensions.get("screen");

export class Feedback extends Component {
  constructor() {
    super();
    this.state = {
      message: "",
      subject: "",
      showModal: false,
      setKeyboardStatus: false,
    };
  }
  onSubmit = () => {
    const { subject, message } = this.state;
    // const { role } = this.props?.route?.params;
    // console.log(role, 'roleroleroleaaaa');
    // setting user type here
    // this.props.setUserType();

    if (!subject) {
      Toast.show({
        text1: "Subject field can`t be empty",
        type: "error",
        visibilityTime: 3000,
      });
    } else if (!message) {
      Toast.show({
        text1: "Message field can`t be empty",
        type: "error",
        visibilityTime: 3000,
      });
    } else {
      Keyboard.dismiss();
      NavService.navigate("Settings");
      Toast.show({
        text1: "Thankyou for your feedback",
        type: "success",
        visibilityTime: 3000,
      });

      // let payload = {
      //   // role: role,
      //   // email: email,
      //   password: '123456',
      // };
      // console.log(role, 'rolerrrrrsssssss');
      // this.props.loginUser(payload);
      setTimeout(() => {
        this.setState({ showModal: true });
      }, 350);
    }
  };
  render() {
    const { imageArray, subject, message } = this.state;

    return (
      <AppBackground  back notification={false} title={"Help & Feedback"}>
        <View></View>
        <CustomTextInput
          placeholder={"Subject"}
          value={subject}
          maxLength={30}
          onChangeText={(value) => this.setState({ subject: value })}
          //   onChangeText={(value) => {
          //     setOtherCountry(value);
          //   }}
          //   value={otherCountry}
        />

        <CustomTextMyInput
          multiline
          color={Colors.black}
          textAlignVertical="top"
          placeholder={"Description"}
          placeholderColor={Colors.black}
          value={message}
          maxLength={275}
          onChangeText={(value) => this.setState({ message: value })}
          keyboardType={"email-address"}
          containerStyle={{
            backgroundColor: "white",
            height: 200,
          }}
        />
        <CustomButton
          onPress={this.onSubmit}
          buttonStyle={{ alignSelf: "center", width: width - 60 }}
          title={"Submit"}
        />
      </AppBackground>
    );
  }
}

export default Feedback;
