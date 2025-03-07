import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  TextInput,
} from "react-native";
import React, { createRef, useState } from "react";
import { Colors } from "../../config";
const { width } = Dimensions.get("window");
// import Video from "../../../components/react-native-af-video-player-reimplemented";
import Images from "../../assets/Images";

const Delete = ({ setModalVisible }) => {
  return (
    <View style={styles.container}>
      <View style={styles.modalView}>
      <Text>hello</Text>
      </View>
    </View>
  );
};

export default Delete;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "rgba(0,0,0,0.5)",
    backgroundColor:'red',
  },
  modalView: {
    borderRadius: 12,
    backgroundColor: Colors.orange,
    padding: 20,
    height:300
  },
});
