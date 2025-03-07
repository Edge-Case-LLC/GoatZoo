import React, { useState } from "react";
import {
  View,
  TextInput,
  Image,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import moment from "moment";
import Toast from "react-native-toast-message";
import { Colors } from "../config";
import Images from "../assets/Images";
import { useSelector } from "react-redux";

const Comment = () => {
  const user = useSelector((state) => state.reducer.user);
  const [commentsList, setCommentsList] = useState([]);
  const [comment, setComment] = useState("");
  const sendComment = () => {
    if (!comment) {
      Toast.show({
        type: "error",
        text1: "Please enter comment",
      });
      return;
    }
    let commentObject = {
      comment,
      name: "John",
      date: new Date(),
    };
    let commentListUpdated = [...commentsList];
    commentListUpdated.push(commentObject);
    setCommentsList(commentListUpdated);
  };
  const _renderItem = ({ item }) => {
    return (
      <View style={styles.bubbleContainer}>
        <View style={styles.innerContainer}>
          <Image
            // source={{
            //   uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQey3S6VQ4qIppedXehx8CQYDshaMBwU1UwpQ&usqp=CAU',
            // }}
            source={Images.user}
            style={styles.userImage}
          />
          <View style={styles.messageContainer}>
            <Text style={styles.message}>{item.comment}</Text>
          </View>
        </View>
        <Text style={styles.timeText}>
          {moment(item?.date).format("MMM Do YYYY")}
        </Text>
      </View>
    );
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
    <View style={styles.container}>
      <FlatList
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        data={commentsList}
        renderItem={_renderItem}
        ListEmptyComponent={<ListEmptyComponent />}
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
    </View>
  );
};
export default Comment;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingVertical: 10,
  },
  inputContainer: {
    flexDirection: "row",
    backgroundColor: Colors.white,
    padding: 10,
    paddingBottom: 15,
    alignItems: "center",
    shadowColor: "#000",
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
    backgroundColor: "grey",
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
    fontSize: 12,
    color: Colors.red,
  },
  userImage: {
    width: "10%",
    height: "10%",
    borderRadius: "10%" / 2,
    resizeMode: "contain",
    backgroundColor: "grey",
  },
  bubbleContainer: {
    marginHorizontal: 20,
    marginVertical: 5,
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
    fontSize: 1.8,
    marginTop: 2,
    marginLeft: 40,
    color: Colors.gray,
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
    fontSize: 1.9,
  },
  message: {
    fontSize: 1.9,
  },
});
function Wrapper({ children }) {
  if (Platform.OS === "ios")
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        {children}
      </KeyboardAvoidingView>
    );
  return <View style={{ flex: 1 }}>{children}</View>;
}
