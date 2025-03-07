import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TextInput,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AppBackground from "../../../components/AppBackground";
import CustomButton from "../../../components/CustomButton";
import CustomImagePicker from "../../../components/CustomImagePicker";
import { Colors, Common } from "../../../config";
import Icons from "../../../assets/Icons";
import ImageCropPicker from "react-native-image-crop-picker";
import Images from "../../../assets/Images";
import VideoPlayer from "../../../components/VideoRn";
import {
  Image as ImageCompressor,
  Video as VideoCompressor,
} from "react-native-compressor";
import { ApplicationLogsHistory, EditUserPost } from "../../../redux/APIs";
const { width } = Dimensions.get("screen");

const EditPost = ({ route, navigation }) => {
  const { data } = route?.params;
  const user = useSelector((state) => state.reducer.user);
  const [media, setMedia] = useState(
    data?.postVideo ? `${Common?.assetURL}${data?.postVideo}` : ""
  );
  const [text, setText] = useState(data?.postText);
  const [image, setImage] = useState(
    data?.postImage ? `${Common?.assetURL}${data?.postImage}` : ""
  );
  const [Imagemime, setImagemime] = useState("");
  const [videoVisible, setVideoVisible] = useState(false);
  const [videoMime, setVideoMime] = useState("");

  const onVideoPress = () => {
    ImageCropPicker.openPicker({
      mediaType: "video",
      includeExif: true,
    }).then(async (video) => {
      const result = await VideoCompressor.compress(video.path, {
        compressionMethod: "auto",
      });
      setImage("");
      setMedia(result);
      setVideoMime(video?.mime);
    });
  };
  const postHandler = async (id) => {
    const data = await EditUserPost(
      image,
      Imagemime,
      text,
      media,
      videoMime,
      id
    );
    if (data?.status == 1) {
      setMedia("");
      setText("");
      setImage("");
      setImagemime("");
    }
  };
  useEffect(() => {
    const focusListener = navigation.addListener("focus", () => {
      ApplicationLogsHistory("Edit Post");
    });
    return () => {
      focusListener();
    };
  }, [navigation]);
  return (
    <AppBackground
      title={"Edit Post"}
      profile={false}
      back={true}
      isCoach={user && user?.role == "athlete" ? false : true}
    >
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center",
        }}
      >
        <Modal
          animationType="slide"
          transparent={true}
          visible={videoVisible}
          onRequestClose={() => {
            setVideoVisible(!videoVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <VideoPlayer
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                }}
                resizeMode="cover"
                repeat={true}
                video={media}
                controls={true}
              />
            </View>
          </View>
        </Modal>
        <View style={styles.postContainer}>
          <Image
            source={
              user?.image
                ? { uri: `${Common?.assetURL}${user?.image}` }
                : Images.user
            }
            resizeMode={"cover"}
            style={styles.profileImage}
          />

          <View style={{ flex: 1, backgroundColor: "white", marginTop: 10 }}>
            <TextInput
              value={text}
              onChangeText={(text) => setText(text)}
              multiline={true}
              style={{ marginLeft: 10, color: "black", marginVertical: 10 }}
              placeholder={"Write something"}
              placeholderTextColor={Colors.DarkGrey}
            />
            {media && (
              <TouchableOpacity
                style={styles?.videoStyle}
                onPress={() => {
                  setVideoVisible(true);
                }}
              >
                <Image
                  resizeMode="contain"
                  source={Icons.video}
                  style={{ width: 30, height: 30 }}
                />
                <View
                  style={{
                    position: "absolute",
                    zIndex: 1000,
                    right: 0,
                    top: 0,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setMedia("");
                      setVideoMime("");
                    }}
                    style={{
                      backgroundColor: "red",
                      borderRadius: 100,
                      width: 22,
                      height: 22,
                      alignItems: "center",
                      justifyContent: "center",
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
              </TouchableOpacity>
            )}
            {image && (
              <>
                <Image
                  source={{ uri: image }}
                  style={styles.videoStyle}
                  resizeMode={"contain"}
                />
                <View
                  style={{
                    position: "absolute",
                    zIndex: 1000,
                    right: 0,
                    top: 20,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setImage("");
                      setImagemime("");
                    }}
                    style={{
                      backgroundColor: "red",
                      borderRadius: 100,
                      width: 22,
                      height: 22,
                      alignItems: "center",
                      justifyContent: "center",
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
              </>
            )}
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              marginTop: 5,
            }}
          >
            <TouchableOpacity onPress={onVideoPress}>
              <Image
                resizeMode="contain"
                source={Icons.video}
                style={{ width: 30, height: 30, marginRight: 20 }}
              />
            </TouchableOpacity>
            <CustomImagePicker
              onImageChange={(path, mime) => {
                console.log(path, image);
                setImage(path);
                setImagemime(mime);
                setMedia("");
              }}
            >
              <Image
                resizeMode="contain"
                source={Icons.picture}
                style={{ width: 30, height: 30 }}
              />
            </CustomImagePicker>
          </View>
        </View>

        <CustomButton
          title={"Post"}
          onPress={() => {
            postHandler(data?._id);
          }}
          buttonStyle={{
            marginTop: 20,
          }}
        />
      </ScrollView>
    </AppBackground>
  );
};

export default EditPost;

const styles = StyleSheet.create({
  postContainer: {
    borderWidth: 1,
    width: width * 0.9,
    // height: height * 0.4,
    borderRadius: 20,
    borderColor: Colors.darkBlue,
    padding: 18,
    ...Shadows.shadow5,
    backgroundColor: Colors.white,
    alignSelf: "center",
    marginTop: 20,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 40 / 2,
  },
  videoStyle: {
    width: "100%",
    height: 200,
    backgroundColor: Colors.grey,
    justifyContent: "center",
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: 600,
    width: "90%",
    borderRadius: 20,
  },
});
