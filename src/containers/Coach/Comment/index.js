import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Image,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import moment from "moment";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import Background from "../../../components/Background";
import { Colors, NavService } from "../../../config";
import {
  fetchComments,
  commentOnPost,
  ApplicationLogsHistory,
} from "../../../redux/APIs";
import Images from "../../../assets/Images";
import { Common } from "../../../config";
import AppBackground from "../../../components/AppBackground";

const vh = Dimensions.get("window").height * 0.01;

const Comment = ({ route,navigation }) => {
  const { post_id } = route?.params;

  const user = useSelector((state) => state.reducer.user);
  const [commentsList, setCommentsList] = useState([]);
  const [comment, setComment] = useState("");

  const getComments = async () => {
    const response = await fetchComments(post_id);
    if (response?.status == 1) {
      setCommentsList(response?.comments);
    }
  };
  const sendComment = async () => {
    if (!comment) {
      Toast.show({
        type: "error",
        text1: "Please enter comment",
      });
      return;
    }
    let payload = {
      comment,
    };
    const response = await commentOnPost(post_id, payload);
    if (response?.status == 1) {
      await getComments();
    }
    setComment("");
  };
  const _renderItem = ({ item }) => {
    return (
      <View style={styles.bubbleContainer}>
        <TouchableOpacity
          style={styles.innerContainer}
          onPress={() => {
            user?._id !== item?.user?._id
              ? NavService.navigate("FriendProfile", {
                  name: item?.user?.userName,
                  item: item?.user,
                  id: item?.user?._id,
                  role: user?.role,
                  isfriend: item?.isFriend,
                  comment: true,
                })
              : NavService.navigate("BottomTab", { screen: "Profile" });
          }}
        >
          <Image
            // source={{
            //   uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQey3S6VQ4qIppedXehx8CQYDshaMBwU1UwpQ&usqp=CAU',
            // }}
            source={
              item?.user?.image?.length
                ? { uri: Common?.assetURL + item?.user?.image }
                : Images?.user
            }
            style={styles.userImage}
          />
          <View style={[styles.messageContainer, { backgroundColor: "white" }]}>
            <Text
              style={[
                styles.message,
                { fontWeight: "600", fontSize: 1.8 * vh, marginBottom: 4 },
              ]}
            >
              {item?.user?.name}
            </Text>
            <Text style={styles.message}>{item?.comment}</Text>
            <Text style={[styles.time, { color: "#000", marginTop: 5 }]}>
              {moment(item?.createdAt).format("hh:mm A")}
            </Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.timeText}>
          {moment(item?.createdAt).format("MMM-DD-YYYY")}
        </Text>
      </View>
    );
  };
  // useEffect(() => {
  //   getComments();
  // }, []);
  useEffect(() => {
    const focusListener = navigation.addListener("focus", () => {
      ApplicationLogsHistory("Comments");
    });

    getComments();

    return () => {
      focusListener();
    };
  }, [navigation]);

  return (
    <AppBackground
      title={"Viewers Comments"}
      back={true}
      profile={false}
      isCoach={user && user?.role == "athlete" ? false : true}
      notification={false}
    >
      <FlatList
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 10 }}
        showsVerticalScrollIndicator={false}
        data={commentsList}
        renderItem={_renderItem}
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
              No comments found
            </Text>
          </View>
        )}
      />
      <View style={[styles.inputContainer]}>
        <TextInput
          placeholder="Type a comment..."
          placeholderTextColor={"black"}
          style={styles.inputStyles}
          value={comment}
          onChangeText={(text) => setComment(text)}
        />
        <TouchableOpacity style={styles.button} onPress={() => sendComment()}>
          <Text style={styles.sendText}>POST</Text>
        </TouchableOpacity>
      </View>
    </AppBackground>
  );
};
export default Comment;
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: Colors.white,
    paddingVertical: 10,
  },
  inputContainer: {
    flexDirection: "row",
    backgroundColor: Colors.white,
    padding: 10,
    paddingBottom: 15,
    alignItems: "center",
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    height: 70,
  },
  attachements: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    marginLeft: 5,
    backgroundColor: Colors.grey,
  },
  inputStyles: {
    flex: 1,
    height: 50,
    marginHorizontal: 10,
    color: "black",
  },
  button: {
    height: 40,
    justifyContent: "center",
  },
  sendText: {
    fontSize: 2.5 * vh,
    color: Colors.blue,
  },
  userImage: {
    width: 4 * vh,
    height: 4 * vh,
    borderRadius: (4 * vh) / 2,
    backgroundColor: Colors.grey,
  },
  bubbleContainer: {
    marginVertical: 5,
    flexWrap: "wrap",
    marginHorizontal: 5,
  },
  ownContainer: {
    flexWrap: "wrap-reverse",
  },
  messageContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginLeft: 10,
    borderRadius: 10,
    borderTopLeftRadius: 0,
    backgroundColor: "#00000020",
    width: "89%",
  },
  ownMessageContainer: {
    marginRight: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 0,
  },
  innerContainer: {
    flexDirection: "row",
  },
  timeText: {
    fontSize: 1.6 * vh,
    marginTop: 2,
    marginLeft: 40,
    color: Colors.darkBlue,
  },
  ownTimeText: {
    alignSelf: "flex-start",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  ownMessage: {
    color: Colors.white,
    fontSize: 1.9 * vh,
  },
  message: {
    fontSize: 1.7 * vh,
  },
  time: {
    alignSelf: "flex-end",
    fontSize: 1.2 * vh,
  },
});
