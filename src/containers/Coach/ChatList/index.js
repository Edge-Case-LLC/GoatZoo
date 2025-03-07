import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AppBackground from "../../../components/AppBackground";
import { NavService, Colors, Common } from "../../../config";
import Icons from "../../../assets/Icons";
import Images from "../../../assets/Images";
import Modal from "react-native-modal";
import CustomButton from "../../../components/CustomButton";
import { ApplicationLogsHistory, getChatList } from "../../../redux/APIs";
import moment from "moment";

const ChatList = ({ navigation }) => {
  const user = useSelector((state) => state.reducer.user);
  const [chatData, setChatData] = useState([]);

  const getChats = async () => {
    const chatList = await getChatList();
    if (chatList) {
      setChatData(chatList);
    }
  };

  // useEffect(() => {
  //   const data = navigation.addListener(
  //     "focus",
  //     () => {
  //       getChats();
  //     },
  //     []
  //   );
  //   return data;
  // }, [navigation]);
  useEffect(() => {
    const focusListener = navigation.addListener("focus", () => {
      ApplicationLogsHistory("Chat List");
      getChats();
    });

    return () => {
      focusListener();
    };
  }, [navigation]);

  const handleChat = (item) => {
    NavService.navigate("ChatScreen", {
      data: item,
    });
  };
  const ListEmptyComponent = () => {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: user?.role == "athlete" ? "black" : "white" }}>
          No chat found
        </Text>
      </View>
    );
  };

  return (
    <AppBackground
      profile={false}
      back
      // title={"Chat House"}
      title={"Goat Note"}
      isCoach={user && user?.role == "athlete" ? false : true}
    >
      <FlatList
        ListEmptyComponent={<ListEmptyComponent />}
        contentContainerStyle={{ flexGrow: 1 }}
        data={chatData}
        ItemSeparatorComponent={() => {
          return <View style={styles.separator} />;
        }}
        keyExtractor={(item) => {
          return item.id;
        }}
        renderItem={(item, index) => {
          const itemData = item.item;
          console.log("itemData?.messageitemData?.message", itemData?.message);
          return (
            <View key={index} style={styles.container}>
              <TouchableOpacity
                onPress={() => handleChat(item?.item)}
                style={{ flexDirection: "row" }}
              >
                <TouchableOpacity style={{}} onPress={() => {}}>
                  <Image
                    // resizeMode="contain"
                    style={styles.image}
                    source={
                      itemData?.receiver_id?._id !== user?._id &&
                      itemData?.receiver_id?.image !== null
                        ? {
                            uri: `${Common?.assetURL}${itemData?.receiver_id?.image}`,
                          }
                        : itemData?.sender_id?._id !== user?._id &&
                          itemData?.sender_id?.image !== null
                        ? {
                            uri: `${Common?.assetURL}${itemData?.sender_id?.image}`,
                          }
                        : Images.user
                    }
                  />
                  <View
                    style={[
                      styles.online,
                      { position: "absolute", right: 0, bottom: 5 },
                    ]}
                  />
                </TouchableOpacity>
                <View style={styles.content}>
                  {/* <View
                    style={[styles.contentHeader, { backgroundColor: "red" }]}
                  >
                    <Text
                      style={[
                        styles.name,
                        user && user?.role == "athlete"
                          ? { color: "#000" }
                          : { color: "#fff" },
                      ]}
                    >
                      {itemData?.receiver_id?._id !== user?._id
                        ? itemData?.receiver_id?.name
                        : itemData?.sender_id?.name}
                    </Text>
                   
                    <Text
                      style={[
                        styles.time,
                        user && user?.role == "athlete"
                          ? { color: "#000" }
                          : { color: "#fff" },
                      ]}
                    >
                      {moment(itemData?.updatedAt).format("LT")}
                    </Text>
                  </View>
                  <Text
                    rkType="primary3 mediumLine"
                    style={
                      user && user?.role == "athlete"
                        ? { color: "#000" }
                        : { color: "#fff" }
                    }
                  >
                    {itemData?.message == ""
                      ? "Photo"
                      : itemData?.message?.length < 30
                      ? itemData.message
                      : itemData?.message?.slice(0, 30) + "..."}
                  </Text>
                  <Text
                    style={[
                      styles.date,
                      user && user?.role == "athlete"
                        ? { color: "#000" }
                        : { color: "#fff" },
                    ]}
                  >
                    {moment(itemData?.updatedAt).format("L")}
                  </Text> */}
                  <View style={{ width: "70%" }}>
                    <Text
                      style={[
                        styles.name,
                        user && user?.role == "athlete"
                          ? { color: "#000" }
                          : { color: "#fff" },
                      ]}
                    >
                      {itemData?.receiver_id?._id !== user?._id
                        ? itemData?.receiver_id?.name
                        : itemData?.sender_id?.name}
                    </Text>
                    <Text
                      rkType="primary3 mediumLine"
                      style={
                        user && user?.role == "athlete"
                          ? { color: "#000" }
                          : { color: "#fff" }
                      }
                    >
                      {itemData?.message == undefined
                        ? ""
                        : itemData?.message?.length < 30
                        ? itemData.message
                        : itemData?.message?.slice(0, 30) + "..."}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "30%",
                    }}
                  >
                    <Text
                      style={[
                        styles.time,
                        user && user?.role == "athlete"
                          ? { color: "#000" }
                          : { color: "#fff" },
                      ]}
                    >
                      {moment(itemData?.updatedAt).format("LT")}
                    </Text>
                    <Text
                      style={[
                        styles.date,
                        user && user?.role == "athlete"
                          ? { color: "#000" }
                          : { color: "#fff" },
                      ]}
                    >
                      {moment(itemData?.updatedAt).format("L")}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
      />
      <View style={{ position: "absolute", bottom: 100, right: 15 }}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            NavService.navigate(`ChatInvite`);
          }}
          style={{
            backgroundColor:
              user?.role == "coach"
                ? Colors.orange
                : user?.role == "athlete"
                ? Colors.darkBlue
                : Colors.orange,
            borderRadius: 40,
            padding: 20,
          }}
        >
          <Image source={Icons.plus} style={{ width: 30, height: 30 }} />
        </TouchableOpacity>
      </View>
    </AppBackground>
  );
};
export default ChatList;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 19,
    paddingRight: 16,
    paddingVertical: 12,
    alignItems: "flex-start",
  },
  content: {
    marginLeft: 16,
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
  },
  contentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
    marginTop: 3,
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    borderWidth: 1,
  },
  time: {
    fontSize: 11,
    color: "#fff",
    alignSelf: "flex-end",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  date: {
    fontSize: 11,
    alignSelf: "flex-end",
    marginTop: "auto",
  },
  online: {
    width: 10,
    height: 10,
    borderRadius: 100,
    backgroundColor: Colors.green,
    // justifyContent:'center',
    // alignItems:'center',
    marginTop: 20,
    marginLeft: 10,
  },
});
