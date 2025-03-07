import React from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import Modal from "react-native-modal";
import { Colors, Shadows } from "../../config";
import CustomButton from "../CustomButton";

const { width, height } = Dimensions.get("screen");

const ConfirmationPopup = ({
  visible = false,
  toggleVisibility = () => {},
  title = "",
  subTitle = "",
  onAccept = () => {},
}) => {
  //methods
  const hide = () => {
    toggleVisibility();
  };
  const accept = () => {
    hide();
    onAccept();
  };
  return (
    <Modal
      key={"cbt"}
      isVisible={visible}
      backdropColor={Colors.white}
      backdropOpacity={0.7}
      onBackButtonPress={hide}
      onBackdropPress={hide}
    >
      <View style={styles.container}>
        {title && <Text style={styles.title}>{title}</Text>}
        <View
          style={{
            paddingHorizontal: 25,
            marginBottom: 5,
            justifyContent: "center",
          }}
        >
          <Text style={styles.subtitle}>{subTitle}</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <CustomButton
            title={"No"}
            onPress={() => {
              hide();
            }}
            buttonStyle={{ width: width * 0.20, marginRight: 15 }}
          />
          <CustomButton
            title={"Yes"}
            onPress={() => {
              accept();
            }}
            buttonStyle={{
              backgroundColor: Colors.darkBlue,
              width: width * 0.20,
            }}
          />
        </View>
      </View>
    </Modal>
  );
};
export default ConfirmationPopup;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 0.17 * height,
    borderRadius: 15,
    ...Shadows.shadow3,
  },
  title: {
    color: Colors.blue,
    fontSize: 24,
    textTransform: "uppercase",
  },
  subtitle: {
    textAlign: "center",
    color: Colors.black,
    fontSize: 16,
  },
  checkboxBtn: {
    width: 56 * width,
    marginTop: 2 * height,
    marginBottom: 0,
  },
  btnRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: -0.1 * height,
  },
  acceptBtn: {
    width: 0.45 * width,
    height: 0.06 * height,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 5,
  },
  rejectBtn: {
    backgroundColor: Colors.darkBlue,
    width: 0.45 * width,
    height: 0.06 * height,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 5,
  },
  checkText: {
    color: Colors.black,
  },
  btnLabelStyle: {
    fontSize: 20,
    textTransform: "uppercase",
  },
  acceptBtnLabel: {
    fontSize: 20,
    textTransform: "uppercase",
    color: Colors.white,
  },
});
