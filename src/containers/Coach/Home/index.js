import React, { useEffect, useRef, useState } from "react";
import AppBackground from "../../../components/AppBackground";
import { useSelector } from "react-redux";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Text,
} from "react-native";
import Modal from "react-native-modal";
import { Colors, NavService, Shadows } from "../../../config";
import Icons from "../../../assets/Icons";
import Search from "../../../components/Search";
import LocationModal from "../../../components/Modal/LocationModal";
import Card from "../../../components/Card";
import {
  ApplicationLogsHistory,
  requestChat,
  getPost,
} from "../../../redux/APIs";
import messaging from "@react-native-firebase/messaging";
import Toast from "react-native-toast-message";

const Home = ({ navigation }) => {
  const user = useSelector((state) => state.reducer.user);
  const flatListRef = useRef();
  const [isModalVisible, setModalVisible] = useState(false);
  const [postData, setPostData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [obj, setObj] = useState();
  const [inviteSent, setInviteSent] = useState(false);

  const getData = async (obj) => {
    const data = await getPost(obj);
    setPostData(data);
  };
  const toTop = () => {
    flatListRef?.current?.scrollToOffset({ animated: true, offset: 0 });
  };
  const ListHeaderComponent = () => {
    return <Search setModalVisible={setModalVisible} home={"home"} />;
  };
  const ListEmptyComponent = () => {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: user?.role == "athlete" ? "black" : "white" }}>
          No post found
        </Text>
      </View>
    );
  };

  //NOTIFICATION
  const RouteTo = (route, data) => {
    const userData = JSON?.parse(data?.userId);
    const postData = data?.postId ? JSON?.parse(data?.postId) : null;
    if (route == "Follow") {
      NavService?.navigate("FollowersList", { id: userData?._id });
    } else if (route == "Like") {
      NavService?.navigate("LikeList", {
        id: postData?._id,
        totalLikes: postData?.totalLikes,
        userId: userData?._id,
      });
    } else if (route == "Comment") {
      NavService?.navigate("Comment", { post_id: postData?._id });
    } else if (route == "Coach Corner") {
      NavService?.navigate("CoachCorner");
    }
  };
  const onNewNotification = (remoteMessage, isAppOpen) => {
    if (remoteMessage?.data && isAppOpen) {
      Toast.show({
        text1: JSON.stringify(remoteMessage?.notification?.body),
        textStyle: { textAlign: "center" },
        type: "success",
        visibilityTime: 5000,
      });
    } else {
      RouteTo(remoteMessage?.data?.action, remoteMessage?.data);
    }
  };
  const recieveInitialNotificationMessages = () => {
    messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        console.log("onNotificationj", remoteMessage?.data);
        await onNewNotification(remoteMessage, false);
      });
  };
  const recieveBackgroundMessages = () => {
    messaging().onNotificationOpenedApp(async (remoteMessage) => {
      await onNewNotification(remoteMessage, false);
    });
  };
  const recieveForgroundMessages = () => {
    messaging().onMessage(async (remoteMessage) => {
      await onNewNotification(remoteMessage, true);
    });
  };
  useEffect(() => {
    const focusListener = navigation.addListener("focus", () => {
      getData();
      ApplicationLogsHistory("Home");
      // recieveInitialNotificationMessages();
      // recieveBackgroundMessages();
      // recieveForgroundMessages();
    });
    return () => {
      focusListener();
      toTop();
    };
  }, [navigation]);

  useEffect(() => {
    recieveInitialNotificationMessages();
    recieveBackgroundMessages();
    recieveForgroundMessages();
  }, []);

  const inviteHandler = async (user_id) => {
    const data = await requestChat(user_id);
    if (data.status == 1) {
      // setInviteSent(true)
      return Toast.show({
        text1: "Invite Sent Succesfully",
        type: "success",
        visibilityTime: 3000,
      });
    }
  };

  return (
    <AppBackground
      title={"Home"}
      profile={false}
      isCoach={user && user?.role == "athlete" ? false : true}
    >
      <FlatList
        ref={flatListRef}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={async () => {
              setRefreshing(true);
              await getData();
              setRefreshing(false);
            }}
          />
        }
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 20,
          paddingBottom: 100,
        }}
        ListHeaderComponent={<ListHeaderComponent />}
        ListEmptyComponent={<ListEmptyComponent />}
        showsVerticalScrollIndicator={false}
        data={postData}
        initialNumToRender={postData?.length}
        extraData={postData?.length}
        renderItem={({ item }) => {
          return (
            <Card
              home
              item={item}
              getAllPosts={(obj) => getData(obj)}
              obj={obj}
              roleCheckByAPI={item?.user?.role}
              inviteHandler={(user_id) => inviteHandler(user_id)}
              inviteSent={inviteSent}
            />
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={{ position: "absolute", bottom: 100, right: 15 }}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            NavService.navigate("Create", { isForum: false });
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

      <Modal
        isVisible={isModalVisible}
        onBackButtonPress={() => setModalVisible(!isModalVisible)}
        onBackdropPress={() => setModalVisible(!isModalVisible)}
      >
        <LocationModal
          setModalVisible={setModalVisible}
          setFilter={(obj) => {
            getData(obj), setObj(obj);
          }}
        />
      </Modal>
    </AppBackground>
  );
};

export default React.memo(Home);

const styles = StyleSheet.create({
  card: {
    ...Shadows.shadow5,
    borderRadius: 10,
    paddingVertical: 10,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  profileImage: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    borderWidth: 1,
    borderRadius: 60 / 2,
  },
  textContainer: {
    marginLeft: 10,
    justifyContent: "center",
    flex: 1,
  },
  time: {
    fontSize: 12,
    fontWeight: "400",
    color: Colors.DarkGrey,
  },
  name: { fontSize: 15, fontWeight: "600" },
  post: {
    flex: 1,
    fontSize: 14,
    fontWeight: "300",
    color: Colors.black,
  },
  postCardVideo: {
    ...Shadows.shadow5,
    borderRadius: 10,
    paddingVertical: 10,
    backgroundColor: Colors.white,
    // paddingHorizontal:20,
    marginTop: 20,
  },
  likes: {
    marginLeft: 10,
    fontSize: 13,
    color: Colors.DarkGrey,
  },
  flexBox: {
    flexDirection: "row",
    marginTop: 15,
    alignItems: "center",
    paddingHorizontal: 20,
  },
});
