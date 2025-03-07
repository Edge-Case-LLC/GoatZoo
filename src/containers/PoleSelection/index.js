import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import CustomBackground from "../../components/CustomBackground";
import { Colors, NavService } from "../../config";
const { width } = Dimensions.get("window");

const PoleSelection = () => {
  const methods = [
    {
      name: "Athlete",
      onPress: () => NavService.navigate("PreLogin", { from: "athlete" }),
      color: Colors.white,
    },
    {
      name: "Coach/Staff/Other",
      color: Colors.orange,
      onPress: () => NavService.navigate("PreLogin", { from: "coach" }),
    },
  ];

  return (
    <CustomBackground>
      <View style={styles.container}>
        <Text style={styles.txt}>Role Selection</Text>
        <View style={styles.subContainer}>
          {methods.map((method, i) => {
            const { color, name, icon, onPress } = method;
            if (Platform.OS !== "ios" && name === "Apple") return null;
            return (
              <TouchableOpacity
                onPress={onPress}
                key={i}
                activeOpacity={0.9}
                style={[styles.btn, { backgroundColor: color }]}
              >
                <Text
                  style={[
                    styles.btnText,
                    {
                      color:
                        name === "Athlete" ? Colors.black : Colors.white,
                    },
                  ]}
                >
                  Continue as {name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </CustomBackground>
  );
};

export default PoleSelection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  subContainer: {
    marginTop: 20,
    alignItems: "center",
    flex: 1,
    width: "100%",
  },
  txt: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: "700",
  },
  btn: {
    borderRadius: 10,
    width: width - 60,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 7,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    fontWeight: "600",
    fontSize: 16,
    width:300,
    // backgroundColor:'red',
    position: "absolute",
    // left: width / 4,
    textAlign: "center",
  },
});
