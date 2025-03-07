import React, { useEffect, useState } from "react";
import { Text, View, Switch, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import AppBackground from "../../../components/AppBackground";
import CustomButton from "../../../components/CustomButton";
import { Colors, NavService } from "../../../config";
import {
  ApplicationLogsHistory,
  awardsAndTrophyToggle,
  getNotificationKey,
} from "../../../redux/APIs";

const Settings = ({ navigation }) => {
  const user = useSelector((state) => state.reducer.user);

  const [notifications, setNotifications] = useState(
    user?.is_notification == 1 ? true : false
  );
  const [awardsAndTrophy, setAwardsAndTrophy] = useState(
    user?.is_private == 0 ? true : false
  );

  const toggle = async (value) => {
    const notificationkey = await getNotificationKey();
    if (notificationkey?.status == 1) {
      setNotifications(value);
    }
  };

  const awardsAndTrophyToggleHandler = async (value) => {
    const trophyKey = await awardsAndTrophyToggle();
    if (trophyKey?.status == 1) {
      setAwardsAndTrophy(value);
    }
  };

  const SwitchButton = ({ label, value, onToggle }) => {
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.text}>{label}</Text>
        <Switch
          trackColor={{ false: Colors.DarkGrey, true: Colors.green }}
          thumbColor={value ? Colors.white : Colors.grey}
          ios_backgroundColor={value ? Colors.primary : Colors.DarkGrey}
          onValueChange={onToggle}
          value={value}
        />
      </View>
    );
  };
  useEffect(() => {
    const focusListener = navigation.addListener("focus", () => {
      ApplicationLogsHistory("SETTINGS");
    });
    return () => {
      focusListener();
    };
  }, [navigation]);
  return (
    <AppBackground
      profile={false}
      title={"SETTINGS"}
      notification={false}
      back={true}
      bgColor={Colors.white}
      isCoach={user && user?.role == "athlete" ? false : true}
    >
      {/* <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 25,
          borderColor: Colors.DarkGrey,
          borderWidth: 1,
          padding: 10,
          borderRadius: 5,
          marginHorizontal: 20,
          backgroundColor: Colors.grey,
        }}>
        <Text style={{ fontSize: 16, color: Colors.secondary, fontWeight: "400" }}>
          ENABLE NOTIFICATIONS
        </Text>
        <Switch
          trackColor={{ false: Colors.secondary, true: Colors.green }}
          thumbColor={notifications ? Colors.white : Colors.primary}
          ios_backgroundColor={
            notifications ? Colors.primary : Colors.secondary
          }
          onValueChange={(value) => toggle(value)}
          value={notifications}
        />
      </View>


      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 25,
          borderColor: Colors.DarkGrey,
          borderWidth: 1,
          padding: 10,
          borderRadius: 5,
          marginHorizontal: 20,
          backgroundColor: Colors.grey,
        }}>
        <Text style={{ fontSize: 16, color: Colors.secondary, fontWeight: "400" }}>
          ENABLE AWARDS / TROPHIES 
        </Text>
        <Switch
          trackColor={{ false: Colors.secondary, true: Colors.green }}
          thumbColor={awardsAndTrophy ? Colors.white : Colors.primary}
          ios_backgroundColor={
            awardsAndTrophy ? Colors.primary : Colors.secondary
          }
          onValueChange={(value) => awardsAndTrophyToggle(value)}
          value={awardsAndTrophy}
        />
      </View> */}

      {/* SwitchButton component */}
      <SwitchButton
        label="ENABLE NOTIFICATIONS"
        value={notifications}
        onToggle={(value) => toggle(value)}
      />

      <SwitchButton
        label="ENABLE AWARDS / TROPHIES"
        value={awardsAndTrophy}
        onToggle={(value) => awardsAndTrophyToggleHandler(value)}
      />
      <View
        style={{
          marginTop: 10,
          alignItems: "center",
          marginHorizontal: 20,
        }}
      >
        <CustomButton
          title="CHANGE PASSWORD"
          buttonStyle={{ width: "100%" }}
          onPress={() => NavService.navigate("ChangePassword")}
        />
        {/* {user?.role == "athlete" && ( */}
        <CustomButton
          title="Help & Feedback"
          buttonStyle={{ width: "100%" }}
          onPress={() => NavService.navigate("Feedback")}
        />
        {/* // )} */}
      </View>
    </AppBackground>
  );
};

export default Settings;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 25,
    borderColor: Colors.DarkGrey,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 20,
    backgroundColor: Colors.grey,
  },
  text: { fontSize: 16, color: Colors.secondary, fontWeight: "400" },
});
