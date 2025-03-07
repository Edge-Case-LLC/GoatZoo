import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import AppBackground from "../../../components/AppBackground";
import { useSelector } from "react-redux";
import { ApplicationLogsHistory, getForumUsers } from "../../../redux/APIs";
import List from "../../../components/UserList";

const ChatHouseUsers = ({ navigation }) => {
  const user = useSelector((state) => state.reducer.user);
  const [userListData, setUserListData] = useState([]);

  const getUserList = async () => {
    const userList = await getForumUsers();
    if (userList) {
      setUserListData(userList);
    }
  };
  useEffect(() => {
    const focusListener = navigation.addListener("focus", () => {
      getUserList();
      ApplicationLogsHistory("Forum Users");
    });
    return () => {
      focusListener;
    };
  }, [navigation]);

  return (
    <AppBackground
      title={"Users"}
      profile={false}
      back={true}
      isCoach={user && user?.role == "athlete" ? false : true}
    >
      <FlatList
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 20, flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        data={userListData}
        ListEmptyComponent={() => (
          <View style={styles.listEmtyContainer}>
            <Text
              style={{ color: user?.role == "athlete" ? "black" : "white" }}
            >
              No Data found
            </Text>
          </View>
        )}
        renderItem={({ item, index }) => (
          <List item={item} index={index} isChatHouse />
        )}
      />
    </AppBackground>
  );
};

export default ChatHouseUsers;

const styles = StyleSheet.create({
  listEmtyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
