import React, { useEffect, useState, useRef } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from "react-native";
import Modal from "react-native-modal";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import ActionSheet from "react-native-actions-sheet";
import AppBackground from "../../../components/AppBackground";
import { NavService, Colors, Common } from "../../../config";
import Icons from "../../../assets/Icons";
import {
  ApplicationLogsHistory,
  getChatList,
  requestChat,
  getForumPost,
} from "../../../redux/APIs";
import Card from "../../../components/Card";
import LocationModal from "../../../components/Modal/LocationModal";

const ChatHouseForum = ({ navigation }) => {
  const user = useSelector((state) => state.reducer.user);
  const flatListRef = useRef();
  const actionSheetFilterRef = useRef(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [postData, setPostData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [obj, setObj] = useState();
  const [inviteSent, setInviteSent] = useState(false);
  const [filterPost, setFilterPost] = useState("");

  const getData = async (filterBy) => {
    const forumPosts = await getForumPost(filterBy);
    if (forumPosts) {
      setPostData(forumPosts);
    }
  };
  const toTop = () => {
    flatListRef?.current?.scrollToOffset({ animated: true, offset: 0 });
  };
  useEffect(() => {
    const focusListener = navigation.addListener("focus", () => {
      ApplicationLogsHistory("Chat House");
      getData("all");
    });

    return () => {
      focusListener();
      toTop();
    };
  }, [navigation]);

  useEffect(() => {
    if (filterPost !== "") {
      getData(String(filterPost).toLowerCase());
    }
  }, [filterPost]);
  const ListEmptyComponent = () => {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: user?.role == "athlete" ? "black" : "white" }}>
          No post found
        </Text>
      </View>
    );
  };
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
      profile={false}
      // title={"Chat House"}
      title={"Chat House"}
      isCoach={user && user?.role == "athlete" ? false : true}
      filter
      forumUser
      onFilterPress={() => actionSheetFilterRef.current.show()}
    >
      <ActionSheet
        ref={actionSheetFilterRef}
        containerStyle={{ backgroundColor: "transparent" }}
      >
        <View style={{ padding: 10, paddingBottom: 20 }}>
          <ActionSheetCommponent
            title={"Filter"}
            dataset={["All", "Followers"]}
            onPress={async (item) => {
              actionSheetFilterRef.current.hide();
              setFilterPost(item);
            }}
          />
          <TouchableOpacity
            onPress={() => actionSheetFilterRef.current.hide()}
            style={{
              backgroundColor: "white",
              borderRadius: 10,
              paddingVertical: 12,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "rgb(0,88,200)",
                fontSize: 18,
                fontWeight: "600",
              }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </ActionSheet>
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
            user?.role == "athlete"
              ? Toast.show({
                  text1: "Membership required",
                  type: "error",
                  visibilityTime: 3000,
                })
              : NavService.navigate("Create", { isForum: true });
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
export default ChatHouseForum;

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

const ActionSheetCommponent = ({
  title = "",
  dataset = [],
  onPress = () => {},
}) => {
  console.log(title, "titllee");
  return (
    <View
      style={{
        backgroundColor: "rgba(241,241,241,0.9)",
        borderRadius: 10,
        marginBottom: 10,
        overflow: "hidden",
      }}
    >
      <View
        style={{
          borderBottomWidth: 1.5,
          borderBottomColor: "#ccc",
          paddingVertical: 10,
        }}
      >
        <Text
          style={{
            color: "rgb(0,88,200)",
            textAlign: "center",
            fontSize: 18,
            fontWeight: "500",
          }}
        >
          {title}
        </Text>
      </View>
      <ScrollView
        style={{ maxHeight: 200 }}
        showsVerticalScrollIndicator={false}
      >
        {dataset?.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => onPress(item)}
              style={{
                paddingVertical: 12,
                alignItems: "center",
                borderBottomWidth: 1.5,
                borderBottomColor: "#ccc",
              }}
            >
              <Text style={{ color: "#000", fontSize: 16 }} numberOfLines={1}>
                {item?.state_name?.length
                  ? item?.state_name
                  : item?.type
                  ? item?.type
                  : item?.name
                  ? item.name
                  : item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};
