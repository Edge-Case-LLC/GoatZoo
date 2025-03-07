import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from "react-native";
import Images from "../assets/Images";
import { Colors, Common, NavService, Shadows } from "../config";
import CustomButton from "./CustomButton";
const { width, height } = Dimensions.get("screen");
import Modal from "react-native-modal";
import { useSelector } from "react-redux";
const List = ({ item = null, isChatHouse = false }) => {
  const user = useSelector((state) => state.reducer.user);
  const [alertPopup, setAlertPopup] = useState(false);
  const dismissAlertPopup = () => {
    setAlertPopup(!alertPopup);
  };
  const handleChat = (item) => {
    NavService.navigate("ChatScreen", {
      data: item,
    });
  };
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      disabled={!isChatHouse ? true : false}
      onPress={() => {
        user?._id !== item?._id
          ? NavService.navigate("FriendProfile", {
              name: item?.name,
              item: item,
              id: item?._id,
              role: user?.role,
              isfriend: item?.isFriend,
            })
          : NavService.navigate("BottomTab", { screen: "Profile" });
      }}
      style={[styles.flexRow, styles.verticalCard]}
    >
      <View style={styles.flexRow}>
        <Image
          source={
            item?.image
              ? { uri: `${Common?.assetURL}${item?.image}` }
              : Images?.user
          }
          style={styles.img}
        />
        <Text numberOfLines={1} style={styles.name}>
          {item?.name}
        </Text>
      </View>
      {!isChatHouse ? (
        <View
          style={{
            alignItems: "flex-end",
          }}
        >
          <CustomButton
            title={"Message"}
            onPress={() => handleChat(item)}
            buttonStyle={{ width: width * 0.2, height: 40, marginTop: 0 }}
          />
        </View>
      ) : null}

      <Modal
        isVisible={alertPopup}
        onBackButtonPress={dismissAlertPopup}
        onBackdropPress={dismissAlertPopup}
      >
        <View style={styles.mainModalContainer}>
          <Text style={[styles.subscribe]}>Alert</Text>
          <Image
            source={Icons.exclamation}
            style={{ width: width * 0.2, height: height * 0.2 }}
            resizeMode={"contain"}
          />
          <Text style={{ fontSize: 17, fontWeight: "700" }}>
            {/* Chat require premium account */}
            Chat requires next or star pass
          </Text>
          <View style={styles.buttonContainer}>
            <CustomButton
              title="Continue"
              onPress={() => {
                NavService?.navigate("Subscription");
                dismissAlertPopup();
              }}
              buttonStyle={{ width: width * 0.35, marginRight: 15 }}
            />
            <CustomButton
              title="Cancel"
              onPress={() => dismissAlertPopup()}
              buttonStyle={{
                backgroundColor: Colors.darkBlue,
                width: width * 0.35,
              }}
            />
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
};
export default List;
const styles = StyleSheet.create({
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  verticalCard: {
    borderRadius: 10,
    paddingVertical: 13,
    paddingHorizontal: 20,
    backgroundColor: Colors.textInput,
    marginVertical: 8,
    justifyContent: "space-between",
    borderWidth: 0.7,
    backgroundColor: Colors.white,
  },
  name: {
    color: Colors.black,
    fontSize: 12,
    fontWeight: "600",
    marginHorizontal: 10,
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 100,
    ...Shadows.shadow5,
  },
  btnStyle: {
    width: "90%",
    height: 35,
  },
  bottomBtn: {
    position: "absolute",
    bottom: 0,
  },
  btnTitle: {
    fontSize: 12,
  },
  mainModalContainer: {
    borderRadius: 25,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.8,
    alignSelf: "center",
    height: height * 0.4,
  },
  subscribe: { fontSize: 30, textDecorationLine: "none" },
  buttonContainer: { flexDirection: "row", justifyContent: "space-between" },
});
