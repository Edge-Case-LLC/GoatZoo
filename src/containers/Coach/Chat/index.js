import React, { useState, useEffect } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { useSelector } from "react-redux";
import moment from "moment";
import Toast from "react-native-toast-message";
import AppBackground from "../../../components/AppBackground";
import { Colors, Devices, Shadows, Common, NavService } from "../../../config";
import ProfileImage from "../../../components/ProfileImage";
import Icons from "../../../assets/Icons";
import CustomImagePicker from "../../../components/CustomImagePicker";
import {
  ApplicationLogsHistory,
  InviteForChat,
  loaderStart,
  loaderStop,
  SendChatImage,
  SendChatVideo,
} from "../../../redux/APIs";
import CustomButton from "../../../components/CustomButton";
import Modal from "react-native-modal";
import Images from "../../../assets/Images";
import AntDesign from "react-native-vector-icons/AntDesign";
import CustomVideoPicker from "../../../components/CustomVideoPicker";
import VideoPlayer from "../../../components/VideoRn";
const { width, height } = Dimensions.get("screen");
const vh = Dimensions.get("screen").height * 0.01;

const Chat = ({ route, navigation }) => {
  const { data, profile, userID, screenName } = route.params;

  const user = useSelector((state) => state.reducer.user);
  const socket = useSelector((state) => state.socket);

  const [message, setMessage] = useState("");
  const [chatList, setChatList] = useState([]);
  const [image, setImage] = useState("");
  const [imageMime, setImageMime] = useState("");
  const [imagedata, setImageData] = useState("");
  const [video, setVideo] = useState("");
  const [alertPopup, setAlertPopup] = useState(false);

  const sender_id = user?._id;
  const reciever_id =
    data.type === "fanClub"
      ? data._id
      : profile
      ? data?._id
      : data?.receiver_id?._id !== user?._id
      ? data?.receiver_id?._id
      : data?.sender_id?._id;

  const sendNewMessage = async (image, mediaType = "") => {
    if (message.length > 0 || image || imagedata || video) {
      loaderStart();
      let payload;
      if (image || imagedata) {
        payload =
          data.type === "fanClub"
            ? {
                sender_id: sender_id,
                group_id: data._id,
                chatVideo: "",
                message: message ? message : "",
                gallery: imagedata ? imagedata : image,
              }
            : {
                sender_id: sender_id,
                receiver_id: reciever_id,
                message: message ? message : "",
                gallery: imagedata ? imagedata : image,
              };
      }
      if (video || mediaType === 'video') {
        payload =
          data.type === "fanClub"
            ? {
                sender_id: sender_id,
                group_id: data._id,
                message: message ? message : "",
                chatVideo: video ? video : image,
                gallery: "",
              }
            : {
                sender_id: sender_id,
                receiver_id: reciever_id,
                message: message ? message : "",
                chatVideo: video ? video : image,
                gallery: "",
              };
      } else {
        payload =
          data.type === "fanClub"
            ? {
                sender_id: sender_id,
                group_id: data._id,
                message: message ? message : "",
                chatVideo: "",
                gallery: "",
              }
            : {
                sender_id: sender_id,
                receiver_id: reciever_id,
                message: message,
              };
      }
      socket.emit("send_message", payload);
      setMessage("");
      setImageData("");
      setVideo("");
      loaderStop();
    } else {
      Toast.show({
        text1: "Enter_message",
        type: "error",
        visibilityTime: 3000,
      });
    }
  };

  const response = () => {
    socket?.emit(
      "get_messages",
      data.type === "fanClub"
        ? {
            group_id: data._id,
          }
        : {
            sender_id: sender_id,
            receiver_id: reciever_id,
          }
    );
    socket?.on("response", (data) => {
      console.log("response", data, "payload", {
        sender_id: sender_id,
        receiver_id: reciever_id,
      });
      if (data?.message?.length == 0) {
        loaderStop();
        return;
      }
      if (data?.object_type == "get_messages") {
        const messages = data?.data || [];
        messages.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setChatList(() => messages);
      } else {
        setChatList((chatList) =>
          Array.isArray(data.data)
            ? [...data.data, ...chatList]
            : [data.data, ...chatList]
        );
      }
      loaderStop();
    });
    socket.on("error", (data) => {
      loaderStop();
    });
  };

  const SendImage = async (path, mime) => {
    const imagedata = await SendChatImage(path, mime);
    if (imagedata) {
      setImageData(imagedata?.image);
      sendNewMessage(imagedata?.image);
    }
  };

  const sendVideo = async (path, mime) => {
    console.log("Path Video", path, mime);

    const videoData = await SendChatVideo(path, mime);
    console.log(videoData.data[0]?.chatVideo);
    setVideo(videoData.data[0]?.chatVideo);
    setImage("");
    setImageData("");
    sendNewMessage(videoData.data[0]?.chatVideo, "video");
  };

  const dismissAlertPopup = () => {
    setAlertPopup(!alertPopup);
  };
  useEffect(() => {
    const focusListener = navigation.addListener("focus", () => {
      ApplicationLogsHistory("Chat");
    });
    return () => {
      focusListener();
    };
  }, [navigation]);

  useEffect(() => {
    response();
  }, []);

  return (
    <AppBackground
      profile={false}
      title={
        data.type === "fanClub"
          ? data.name
          : profile
          ? data?.name
          : data?.sender_id?._id !== user?._id
          ? data?.sender_id?.name
          : data?.receiver_id?.name
      }
      back
      notification={false}
      callID="123"
      childrenContainerStyle={{
        marginHorizontal: 0,
        marginBottom: 0,
      }}
      isCoach={user && user?.role == "athlete" ? false : true}
    >
      <FlatList
        data={[...chatList]}
        inverted
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, marginBottom: 10 }}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 3,
          marginHorizontal: 20,
        }}
        renderItem={({ item }) => (
          <MessageList item={item} receiverData={data} />
        )}
      />
      <TouchableOpacity
        onPress={() =>
          // user?.role == "athlete" ? setAlertPopup(!alertPopup) : {}
          user?.role == "athlete" ? {} : {}
        }
        activeOpacity={0.9}
        style={{
          height: 70,
          width: width,
          backgroundColor: Colors.orange,
          ...Shadows.shadow5,
          paddingBottom: Devices.isIphoneX ? 15 : 0,
          paddingHorizontal: 30,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{ flex: 1, height: "100%", justifyContent: "center" }}
          onPress={() =>
            // user?.role == "athlete" ? setAlertPopup(!alertPopup) : {}
            user?.role == "athlete" ? {} : {}
          }
        >
          <TextInput
            editable={user?.role == "athlete" ? true : true}
            style={{ color: Colors.white }}
            placeholder="Type your message here..."
            placeholderTextColor={Colors.grey}
            value={message}
            onChangeText={(text) => setMessage(text)}
          />
        </TouchableOpacity>
        <CustomImagePicker
          // showAlert={() => setAlertPopup(!alertPopup)}
          pick={user?.role == "athlete" ? true : true}
          onImageChange={(path, mime) => {
            setImage(path);
            setImageMime(mime);
            SendImage(path, mime);
          }}
        >
          <Image
            source={Icons.picture}
            style={{
              width: 24,
              height: 24,
              marginRight: 10,
              tintColor: Colors.white,
            }}
            resizeMode={"contain"}
          />
        </CustomImagePicker>
        <CustomVideoPicker
          onVideoChange={(path, mime) => {
            setVideo(path);
            // setImageMime(mime);
            sendVideo(path, mime);
          }}
        >
          <View
            style={{
              marginRight: 10,
            }}
          >
            <AntDesign name="videocamera" color="#fff" size={25} />
          </View>
        </CustomVideoPicker>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{ flexDirection: "row" }}
          onPress={() =>
            user?.role == "athlete" ? sendNewMessage() : sendNewMessage()
          }
        >
          <Image
            source={Icons.send}
            style={{ width: 24, height: 24 }}
            resizeMode={"contain"}
          />
        </TouchableOpacity>
      </TouchableOpacity>

      <Modal
        isVisible={alertPopup}
        onBackButtonPress={dismissAlertPopup}
        onBackdropPress={dismissAlertPopup}
      >
        <View
          style={{
            borderRadius: 25,
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
            width: width * 0.8,
            alignSelf: "center",
            height: height * 0.4,
          }}
        >
          <Text
            style={[
              styles.subscribe,
              { fontSize: 30, textDecorationLine: "none" },
            ]}
          >
            Subscription Required
          </Text>
          <Image
            source={Icons.exclamation}
            style={{ width: width * 0.2, height: height * 0.2 }}
            resizeMode={"contain"}
          />
          <Text style={{ fontSize: 17, fontWeight: "700" }}>
            {/* Chat require premium account */}
            Chat requires next or star pass
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <CustomButton
              title="Continue"
              onPress={() => {
                NavService?.navigate("Subscription");
                dismissAlertPopup();
              }}
              buttonStyle={{ width: width * 0.35, marginRight: 15 }}
            />
            <CustomButton
              title="Cancel"
              onPress={() => dismissAlertPopup()}
              buttonStyle={{
                backgroundColor: Colors.darkBlue,
                width: width * 0.35,
              }}
            />
          </View>
        </View>
      </Modal>
    </AppBackground>
  );
};
const MessageList = ({ item, receiverData }) => {
  console.log("Item_message: ", item);
  const user = useSelector((state) => state.reducer.user);
  const { message, createdAt } = item;
  const isMine =
    user?._id == item?.sender_id?._id
      ? true
      : user?._id == item?.receiver_id?._id
      ? false
      : false;
  return (
    <View>
      <Text
        style={[
          styles.Date,
          user && user?.role == "athlete"
            ? { color: "#000" }
            : { color: "#fff" },
        ]}
      >
        {moment(createdAt).format("MMM-DD-YYYY")}
      </Text>
      <View
        style={{
          flexDirection: isMine ? "row-reverse" : "row",
          marginBottom: 15,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            user?._id !== item?.sender_id?._id
              ? NavService.navigate("FriendProfile", {
                  name: item?.sender_id?.name,
                  item: item?.sender_id,
                  id: item?.sender_id?._id,
                  role: user?.role,
                  isfriend: item?.isFriend,
                })
              : null;
          }}
        >
          <ProfileImage
            size={50}
            imageUri={
              item?.sender_id?.image?.length
                ? Common?.assetURL + item?.sender_id?.image
                : ""
            }
            name={item?.sender_id?.name}
            style={{
              borderWidth: 0,
              marginRight: isMine ? 0 : 10,
              marginLeft: isMine ? 10 : 0,
            }}
          />
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: isMine ? Colors.orange : Colors.darkBlue,
            borderRadius: 5,
            borderTopLeftRadius: isMine ? 20 : 0,
            borderTopRightRadius: isMine ? 0 : 20,
            width: width - 160,
            padding: 10,
            ...Shadows.shadow3,
          }}
        >
          {item?.gallery && (
            <Image
              source={{ uri: Common?.assetURL + item?.gallery }}
              resizeMode={"contain"}
              style={{
                width: "100%",
                height: 150,
                backgroundColor: Colors.grey,
                borderRadius: 15,
              }}
            />
          )}
          {item?.chatVideo && (
            <View
              style={{
                width: "100%",
                height: 150,
                backgroundColor: Colors.grey,
                borderRadius: 15,
              }}
            >
              <VideoPlayer style={{width: '100%', height: '100%'}} video={item?.chatVideo} />
            </View>
          )}
          <Text style={{ color: isMine ? Colors.white : Colors.white }}>
            {message || ""}
          </Text>
          <Text
            style={{
              color: isMine ? Colors.white : Colors.white,
              fontSize: 12,
              marginTop: 5,
              alignSelf: "flex-end",
            }}
          >
            {moment(createdAt).format("LT") || ""}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Chat;

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
    marginLeft: 20,
  },
  time: {
    fontSize: 11,
    color: "#fff",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  Date: {
    textAlign: "center",
    fontSize: 1.6 * vh,
    marginBottom: 2,
    color: Colors.darkBlue,
  },
});
