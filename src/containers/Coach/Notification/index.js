import {
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
import { Common, NavService } from "../../../config";
import Images from "../../../assets/Images";
import { getNotifications } from "../../../redux/APIs";
import { ApplicationLogsHistory } from "../../../redux/APIs";
import moment from "moment";

const Notification = ({ navigation }) => {
  const user = useSelector((state) => state.reducer.user);
  const [notificationList, setNotificationList] = useState([]);

  const getNotification = async () => {
    const list = await getNotifications();
    setNotificationList(list?.notification);
  };
  useEffect(() => {
    getNotification();
  }, []);

  useEffect(() => {
    const focusListener = navigation.addListener("focus", () => {
      getNotification();
      ApplicationLogsHistory(`Notification`);
    });
    return () => {
      focusListener();
    };
  }, [navigation]);

  const [data, setData] = useState([
    {
      id: 1,
      image: Images.user,
      name: "Frank Odalthh",
      comment:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
    },
    {
      id: 2,
      image: Images.user,
      name: "John DoeLink",
      comment:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
    },
    {
      id: 3,
      image: Images.user,
      name: "March SoulLaComa",
      comment:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
    },
    {
      id: 4,
      image: Images.user,
      name: "Finn DoRemiFaso",
      comment:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
    },
    {
      id: 5,
      image: Images.user,
      name: "Maria More More",
      comment:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
    },
  ]);
  const RouteTo = (route, data) => {
    console.log(route,'routeroute');
    if (route == "Follow") {
      NavService?.navigate("FollowersList", { id: data?.userId?._id });
    } else if (route == "Like") {
      NavService?.navigate("LikeList", {
        id: data?.postId?._id,
        totalLikes: data?.postId.totalLikes,
        userId: data?.userId?._id,
        image: data?.otherUserId?._image,
      });
    } else if (route == "Comment") {
      NavService?.navigate("Comment", { post_id: data?.postId?._id });
    } else if (route == "coachCorner") {
      NavService?.navigate("CoachCorner");
    } else if (route == "invite") {
      NavService?.navigate("MessageRequest");
    }
  };
  return (
    <AppBackground
      back
      profile={false}
      title={"Notification"}
      isCoach={user && user?.role == "athlete" ? false : true}
    >
      {/* <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
        }}
      > */}
      <FlatList
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        ListEmptyComponent={() => (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{ color: user?.role == "athlete" ? "black" : "white" }}
            >
              No notifications found
            </Text>
          </View>
        )}
        data={notificationList}
        ItemSeparatorComponent={() => {
          return <View style={styles.separator} />;
        }}
        keyExtractor={(item) => {
          return item.id;
        }}
        renderItem={(item) => {
          const Notification = item?.item;
          return (
            <View style={styles.container}>
              <TouchableOpacity
                onPress={() => {
                  RouteTo(Notification?.route, Notification);
                }}
                style={{ flexDirection: "row" }}
              >
                <TouchableOpacity onPress={() => {}}>
                  <Image
                    style={styles.image}
                    source={
                      Notification.otherUserId?.image?.length
                        ? {
                            uri: `${Common?.assetURL}${Notification.otherUserId?.image}`,
                          }
                        : Images?.user
                    }
                  />
                </TouchableOpacity>
                <View style={styles.content}>
                  <View style={styles.contentHeader}>
                    <View
                      style={{
                        flexDirection: "row",
                        width: "75%",
                        alignItems: "center",
                        marginTop: 10,
                      }}
                    >
                      <Text
                        style={[
                          styles.name,
                          user && user?.role == "athlete"
                            ? { color: "#000" }
                            : { color: "#fff" },
                        ]}
                      >
                        {Notification?.otherUserId?.name}{" "}
                        <Text
                          style={
                            user && user?.role == "athlete"
                              ? {
                                  color: "#000",
                                  fontSize: 14,
                                  fontWeight: "400",
                                }
                              : {
                                  color: "#fff",
                                  fontSize: 14,
                                  fontWeight: "400",
                                }
                          }
                        >
                          {Notification.title}
                        </Text>
                      </Text>
                    </View>
                  </View>

                  <View style={{ justifyContent: "center" }}>
                    <Text
                      style={[
                        styles.time,
                        user && user?.role == "athlete"
                          ? { color: "#000" }
                          : { color: "#fff" },
                      ]}
                    >
                      {moment(Notification?.createdAt).format("LT")}
                    </Text>
                    <Text
                      style={[
                        styles.date,
                        user && user?.role == "athlete"
                          ? { color: "#000" }
                          : { color: "#fff" },
                      ]}
                    >
                      {moment(Notification?.createdAt).format("L")}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
      />
      {/* </ScrollView> */}
    </AppBackground>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    // paddingLeft: 19,
    // paddingRight: 16,
    paddingVertical: 12,

    // alignItems: "flex-start",
  },
  content: {
    marginLeft: 16,
    flex: 1,
  },
  contentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC",
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 20,
  },
  time: {
    fontSize: 11,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  date: {
    fontSize: 11,
    top: -13,
    alignSelf: "flex-end",
  },
});
