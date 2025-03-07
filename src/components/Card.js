import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import NativeVideoPlayer from "../components/NativeVideoPlayer";
import { Colors, Common, NavService, Shadows } from "../config";
import Icons from "../assets/Icons";
import {
  DeleteUserPost,
  LikePost,
  PostFollowUnfollow,
  SendGoatnotes,
  saveCurrentPostToMyLocker,
} from "../redux/APIs";
import Images from "../assets/Images";
import Modal from "react-native-modal";
import CustomButton from "./CustomButton";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const { width, height } = Dimensions.get("screen");

const Card = React.memo(
  ({
    item,
    getAllPosts,
    showDots,
    obj,
    ImageUrl = () => {},
    home,
    roleCheckByAPI,
    inviteHandler = () => {},
    route,
    navigation,
    // inviteSent,
  }) => {
    const user = useSelector((state) => state.reducer.user);
    const [isVisible, setIsVisible] = useState(false);
    const [text, setText] = useState("");
    const [alertPopup, setAlertPopup] = useState(false);
    const [inviteSent, setInviteSent] = useState(false);
    // const [save, setSave] = useState(item?.isLock == 0 ? false : true);
    const [ImageModal, setImageModal] = useState(false);
    const [isliked, setIsLiked] = useState(item?.isLiked == 1 ? true : false);
    const postTime =
      moment(item?.createdAt)?.format("MMM Do YY") ==
      moment().format("MMM Do YY")
        ? moment(item?.createdAt)?.format("LT")
        : moment(item?.createdAt)?.format("ll");
    const Liked = async (id) => {
      const response = await LikePost(id);
      if (response?.status == 1) {
        setIsLiked(!isliked);
        (await obj) ? getAllPosts(obj) : getAllPosts();
        return;
      }
    };
    const savePostToMyLocker = async (id) => {
      const showDots1 = showDots || item?.isLock == 1 ? true : false;
      const response = await saveCurrentPostToMyLocker(id, showDots1);
      if (response?.status == 1) {
        setIsVisible(!isVisible);
        // setSave(!save)
        (await obj) ? getAllPosts(obj) : getAllPosts();
        return;
      }
    };
    const FolowUnfollow = async (id) => {
      const response = await PostFollowUnfollow(id);
      if (response?.status == 1) {
        (await obj) ? getAllPosts(obj) : getAllPosts();
      }
    };
    const DeletePost = async (id) => {
      const data = await DeleteUserPost(id);
      if (data?.status == 1) {
        setIsVisible(!isVisible);
        (await obj) ? getAllPosts(obj) : getAllPosts();
        return;
      }
    };
    const dismissAlertPopup = () => {
      setAlertPopup(!alertPopup);
    };

    const sendgoatnote = (sender_id, receiver_id, post_id, message) => {
      SendGoatnotes(sender_id, receiver_id, post_id, text);

      dismissAlertPopup();
    };
    console.log("rendering.......");
    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.98}
        onPress={() => setIsVisible(false)}
      >
        <View style={[styles.header]}>
          <TouchableOpacity
            onPress={() =>
              user?._id !== item?.user?._id
                ? NavService.navigate("FriendProfile", {
                    name: item?.name,
                    item: item?.user,
                    id: item?.userId,
                    role: user?.role,
                    isfriend: item?.isFriend,
                  })
                : NavService.navigate("BottomTab", { screen: "Profile" })
            }
          >
            <View style={{ flexDirection: "row" }}>
              <Image
                source={
                  item?.user?.image?.length > 0
                    ? { uri: `${Common?.assetURL}${item?.user?.image}` }
                    : Images?.user
                }
                style={styles.profileImage}
              />
              <CustomButton
                title={"New"}
                buttonStyle={styles.new}
                textStyle={{ fontSize: 8 }}
              />
              <View style={styles.textContainer}>
                {item?.postOwner == 1 ? (
                  <Text style={styles.postOwner}>{item?.user?.name}</Text>
                ) : (
                  <Text style={styles.name}>{item?.user?.name}</Text>
                )}
                <Text style={styles.time}>{postTime}</Text>
              </View>
            </View>
          </TouchableOpacity>

          {item?.user?._id !== user?._id ? (
            item?.isFriend !== "undefined" || item?.isFriend !== undefined ? (
              <TouchableOpacity
                onPress={() => {
                  FolowUnfollow(item?.user?._id);
                }}
                style={{
                  position: 'absolute',
                  right: 20,
                  top: 8
                  // marginRight: "auto",
                  // marginLeft: 10,
                  // marginBottom: 15,
                }}
              >
                <Text
                  style={{
                    color:
                      user?.role == "coach"
                        ? Colors.orange
                        : user?.role == "athlete"
                        ? Colors.darkBlue
                        : Colors.orange,
                    fontSize: 14,
                    fontWeight: "600",
                  }}
                >
                  {(item?.isFriend !== "undefined" ||
                    item?.isFriend !== undefined) &&
                  item?.isFriend == 0
                    ? "Drop/Released"
                    : "Track"}
                </Text>
              </TouchableOpacity>
            ) : null
          ) : null}

          {
            <TouchableOpacity
              style={{ marginBottom: 20 }}
              onPress={() => setIsVisible(!isVisible)}
            >
              <Image source={Icons.dots} style={styles.dot} />
            </TouchableOpacity>
          }

          {isVisible ? (
            <View style={styles.menu}>
              {item?.postOwner == 1 ? (
                <View style={{ width: width * 0.2 }}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={async () => {
                      setIsVisible(!isVisible);
                      NavService?.navigate("EditPost", {
                        data: item,
                        edit: true,
                      });
                    }}
                  >
                    <Text style={styles.menuText}>Edit</Text>
                  </TouchableOpacity>

                  <View
                    style={{
                      width: 75,
                      height: 1,
                      backgroundColor: Colors?.DarkGrey,
                    }}
                  ></View>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={async () => {
                      DeletePost(item?._id);
                    }}
                  >
                    <Text style={styles.menuText}>Delete</Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      width: 75,
                      height: 1,
                      backgroundColor: Colors?.DarkGrey,
                    }}
                  ></View>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      NavService.navigate("LikeList", {
                        id: item?._id,
                        totalLikes: item?.totalLikes,
                        role: item?.role,
                        userId: item?.userId,
                        isfriend: item?.isFriend,
                      });
                    }}
                  >
                    <Text style={styles.menuText}>Fan club</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={{ width: width * 0.31 }}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={async () => {
                      await savePostToMyLocker(
                        showDots ? item?.post?._id : item?._id
                      );
                    }}
                  >
                    <Text style={styles.menuText}>
                      {item?.isLock == 0
                        ? "Save to my locker"
                        : "Remove from locker"}
                      {""}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        dismissAlertPopup();
                      }}
                      // onPress={() => {
                      //   NavService.navigate("Chat House");
                      // }}
                    >
                      <Text style={styles.menuText}>
                        {item?.isLock == 0 ? "" : "Send Goat Note"}
                      </Text>

                      <Modal
                        isVisible={alertPopup}
                        animationIn="slideInRight"
                        animationOut="slideOutLeft"
                        // onBackButtonPress={dismissAlertPopup}
                        // onBackdropPress={dismissAlertPopup}
                        animationInTiming={600}
                        animationOutTiming={600}
                      >
                        {user?.role == "athlete" ? (
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
                              Alert
                            </Text>
                            <Image
                              source={Icons.exclamation}
                              style={{
                                width: width * 0.2,
                                height: height * 0.2,
                              }}
                              resizeMode={"contain"}
                            />

                            <Text style={{ fontSize: 17, fontWeight: "700" }}>
                              {/* Chat require premium account */}
                              Take Subscription To Send Notes
                            </Text>
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                              }}
                            >
                              <CustomButton
                                title="Continue"
                                onPress={() => {
                                  setTimeout(() => {
                                    NavService?.navigate("Subscription");
                                  }, 3000);
                                  dismissAlertPopup();
                                }}
                                buttonStyle={{
                                  width: width * 0.35,
                                  marginRight: 15,
                                }}
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
                        ) : (
                          <View
                            style={{
                              backgroundColor: "white",
                              alignItems: "center",
                              width: width * 0.8,
                              height: height * 0.2,
                              borderRadius: 20,

                              alignSelf: "center",
                            }}
                          >
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                width: "100%",
                                marginTop: 10,
                                justifyContent: "center",
                              }}
                            >
                              <Text
                                style={[
                                  styles.subscribe,
                                  { fontSize: 20, textDecorationLine: "none" },
                                ]}
                              >
                                Send Goat Notes
                              </Text>
                              <TouchableOpacity
                                onPress={dismissAlertPopup}
                                style={{ position: "absolute", right: 20 }}
                              >
                                <Image
                                  source={Icons.close}
                                  resizeMode={"contain"}
                                  style={{
                                    width: 20,
                                    height: 20,

                                    tintColor: Colors.blue,
                                    // tintColor: !isliked ? "grey" : Colors.blue,
                                  }}
                                />
                              </TouchableOpacity>
                            </View>
                            <TextInput
                              onChangeText={(text) => setText(text)}
                              style={{
                                color: "black",
                                width: width * 0.7,
                                marginTop: 10,
                                borderRadius: 10,
                                paddingLeft: 15,
                                backgroundColor: Colors.grey,
                              }}
                              placeholder={"Write something"}
                              placeholderTextColor={Colors.DarkGrey}
                            />
                            <CustomButton
                              onPress={() => {
                                // console.log(item, "111item");
                                if (text == "") {
                                  Toast.show({
                                    text1: "Goat Note Message can`t be empty",
                                    type: "error",
                                    visibilityTime: 5000,
                                  });
                                } else {
                                  sendgoatnote(
                                    user?._id,
                                    item?.user?._id,
                                    item?.post?._id
                                      ? item?.post?._id
                                      : item?._id
                                  );
                                }
                              }}
                              title={"Send"}
                              buttonStyle={{ width: 270 }}
                            />
                          </View>
                        )}
                      </Modal>
                    </TouchableOpacity>
                  </TouchableOpacity>
                  {user?.role == "coach" && roleCheckByAPI == "athlete" ? (
                    <TouchableOpacity
                      // style={{backgroundColor:inviteSent ? Colors.orange : Colors.grey}}
                      disabled={inviteSent ? true : false}
                      onPress={() => {
                        setInviteSent(true);
                        inviteHandler(item?.user?._id);
                        setIsVisible(!isVisible);
                      }}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.menuText}>
                        {inviteSent ? `Invite Sent` : "Invite for player"}
                      </Text>
                    </TouchableOpacity>
                  ) : null}
                </View>
              )}
            </View>
          ) : null}
        </View>

        <View style={{ flex: 1, marginVertical: 10 }}>
          <Text style={styles.post}>
            {showDots ? item?.post?.postText : item?.postText}
          </Text>
        </View>

        {showDots ? (
          item?.post?.postVideo !== null ? (
            <NativeVideoPlayer
              videoUrl={item?.post?.postVideo}
              style={styles.videoStyle}
            />
          ) : item?.post?.postImage !== null ? (
            <TouchableOpacity
              activeOpacity={0.99}
              onPress={() => setImageModal(!ImageModal)}
            >
              <Image
                style={styles.videoStyle}
                source={
                  item?.post?.postImage
                    ? { uri: `${Common?.assetURL}${item?.post?.postImage}` }
                    : ""
                }
              />
            </TouchableOpacity>
          ) : null
        ) : item?.postVideo !== null ? (
          <NativeVideoPlayer
            videoUrl={item?.postVideo}
            style={styles.videoStyle}
          />
        ) : item?.postImage !== null ? (
          <TouchableOpacity
            activeOpacity={0.99}
            onPress={() => setImageModal(!ImageModal)}
          >
            <Image
              style={styles.videoStyle}
              source={
                item?.postImage
                  ? { uri: `${Common?.assetURL}${item?.postImage}` }
                  : ""
              }
            />
          </TouchableOpacity>
        ) : null}

        {item?.totalLikes > 0 && (
          <TouchableOpacity
            style={{ marginTop: 10, flexDirection: "row" }}
            onPress={() => {
              NavService.navigate("LikeList", {
                id: item?._id,
                totalLikes: item?.totalLikes,
                role: item?.role,
                userId: item?.userId,
                isfriend: item?.isFriend,
              });
            }}
          >
            <Image
              source={Icons.thumbsUp}
              resizeMode={"contain"}
              style={{
                width: 15,
                height: 15,
                tintColor: Colors.blue,
              }}
            />
            <Text style={{ fontSize: 12, color: "grey" }}>
              {item?.isLiked == 0 && item?.totalLikes > 0
                ? " " + item?.totalLikes
                : item?.totalLikes > 1
                ? " You and " +
                  (item?.totalLikes > 1
                    ? item?.totalLikes - 1
                    : item?.totalLikes) +
                  " others"
                : item?.totalLikes}
            </Text>
          </TouchableOpacity>
        )}

        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() => Liked(showDots ? item?.post?._id : item?._id)}
          >
            <Image
              source={Icons.thumbsUp}
              resizeMode={"contain"}
              style={{
                width: 20,
                height: 20,
                tintColor: item?.isLiked == 0 ? "grey" : Colors.blue,
                // tintColor: !isliked ? "grey" : Colors.blue,
              }}
            />
          </TouchableOpacity>
          <Text style={[styles.likes]}>{item?.totalLikes}</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{ flexDirection: "row" }}
            onPress={() =>
              NavService.navigate("Comment", {
                post_id: showDots ? item?.post?._id : item?._id,
              })
            }
          >
            <Image
              source={Icons.commentBox}
              resizeMode={"contain"}
              style={{
                width: 20,
                height: 20,
                marginLeft: 20,
              }}
            />
            <Text style={[styles.likes, {}]}>{item?.totalComments}</Text>
            <Text
              style={[
                styles.likes,
                {
                  color: user?.role == "coach" ? Colors.black : Colors.blue,
                  right: 5,
                },
              ]}
            >
              comment{item?.totalComments > 1 ? "s" : ""}
            </Text>
          </TouchableOpacity>
        </View>

        {/* //IMAGE MODAL */}
        <Modal
          style={{ marginHorizontal: 0, flex: 1 }}
          isVisible={ImageModal}
          onBackButtonPress={() => setImageModal(!ImageModal)}
          onBackdropPress={() => setImageModal(!ImageModal)}
        >
          <View style={styles.mainImageContainer}>
            <View
              style={{
                position: "absolute",
                zIndex: 1000,
                left: 20,
                top: 20,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setImageModal(!ImageModal);
                }}
                style={{
                  borderRadius: 100,
                  width: 22,
                  height: 22,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "red",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 12,
                  }}
                >
                  X
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.imageContainer}>
              <Image
                style={styles.ImageStyle}
                source={
                  !showDots
                    ? { uri: `${Common?.assetURL}${item?.postImage}` }
                    : { uri: `${Common?.assetURL}${item?.post?.postImage}` }
                }
              />
            </View>
          </View>
        </Modal>
      </TouchableOpacity>
    );
  }
);

export default Card;

const styles = StyleSheet.create({
  card: {
    ...Shadows.shadow5,
    borderRadius: 10,
    paddingVertical: 10,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    marginTop: 20,
    position: "relative",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    marginLeft: 2,
  },
  profileImage: {
    width: 50,
    height: 50,
    resizeMode: "cover",
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 50 / 2,
  },
  textContainer: {
    marginLeft: 0,
    justifyContent: "center",
  },
  time: {
    fontSize: 12,
    fontWeight: "400",
    color: Colors.DarkGrey,
  },
  name: { fontSize: 15, fontWeight: "600" },
  postOwner: { fontSize: 15, fontWeight: "600", color: Colors.darkBlue },

  dot: {
    width: 13,
    height: 20,
    resizeMode: "contain",
    tint: Colors.black,
  },
  footer: {
    flexDirection: "row",
    marginTop: 5,
    alignItems: "center",
    borderTopWidth: 0.4,
    borderColor: "lightgrey",
    paddingTop: 10,
  },
  videoStyle: {
    width: "100%",
    height: 270,
    backgroundColor: Colors.grey,
  },
  likes: {
    marginLeft: 10,
    fontSize: 13,
    color: Colors.DarkGrey,
  },
  post: {
    flex: 1,
    fontSize: 14,
    fontWeight: "300",
    color: Colors.black,
    justifyContent: "center",
  },
  menu: {
    backgroundColor: Colors.grey,
    padding: 5,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    position: "absolute",
    right: 11,
    top: 10,
    alignItems: "center",
    zIndex: 1000,
    paddingHorizontal: 0,
  },
  menu1: {
    backgroundColor: Colors.grey,
    width: width * 0.2,
    padding: 5,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    position: "absolute",
    right: 11,
    top: 10,
    alignItems: "center",
    zIndex: 1000,
    paddingHorizontal: 0,
  },
  menuText: {
    fontSize: 11,
    color: Colors.black,
    fontWeight: "400",
    lineHeight: 30,
    textAlign: "center",
  },
  parentContainerView: {
    height: height * 0.2,
    marginBottom: 10,
    marginTop: 5,
  },
  videoContainer: {
    borderRadius: 30,
    width: "100%",
    height: height * 0.4,
    marginVertical: 8,
  },
  videoIcon: {
    position: "absolute",
    top: "40%",
    left: "43%",
    right: "40%",
  },
  mainImageContainer: {
    backgroundColor: Colors.white,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    borderRadius: 30,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  icon: {
    position: "absolute",
    top: 40,
    left: 60,
  },
  ImageStyle: {
    width: "100%",
    height: 300,
    backgroundColor: Colors.grey,
  },
  new: {
    width: 25,
    height: 20,
    borderRadius: 10,
    position: "relative",
    top: 10,
    right: 10,
  },
});
