import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AppBackground from "../../../components/AppBackground";
import CustomButton from "../../../components/CustomButton";
import CustomImagePicker from "../../../components/CustomImagePicker";
import { Colors, Common } from "../../../config";
import Icons from "../../../assets/Icons";
import ImageCropPicker from "react-native-image-crop-picker";
import Images from "../../../assets/Images";
import {
  PostCreateCoachCorner,
  loaderStart,
  loaderStop,
  ApplicationLogsHistory,
} from "../../../redux/APIs";
import VideoPlayer from "../../../components/VideoRn";
import { Video as VideoCompressor } from "react-native-compressor";
import Toast from "react-native-toast-message";
import DropDownPicker from "../../../components/DropDownPicker";
const { width } = Dimensions.get("screen");

const theme = {
  title: "transparent",
  more: "transparent",
  center: Colors.white,
  fullscreen: "transparent",
  volume: Colors.white,
  scrubberThumb: Colors.white,
  scrubberBar: Colors.darkBlue,
  seconds: Colors.white,
  duration: Colors.white,
  progress: Colors.darkBlue,
  loading: Colors.darkBlue,
};

const CreateCoachCorner = ({navigation}) => {
  const user = useSelector((state) => state.reducer.user);
  const [media, setMedia] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [Imagemime, setImagemime] = useState("");
  const [videoVisible, setVideoVisible] = useState(false);
  const [videoMime, setVideoMime] = useState("");
  const [dropDownSelectionValues, setDropDownSelectionValues] = useState('')
  const DropDownValues = ['Tip of the day', 'Health'];

  const onVideoPress = () => {
    ImageCropPicker.openPicker({
      mediaType: "video",
      includeExif: true,
    }).then(async (video) => {
      const duration = video?.duration / 60000;
      if (duration < 10) {
        loaderStart();
        const result = await VideoCompressor.compress(video.path, {
          compressionMethod: "auto",
        });
        setImage("");
        setMedia(result);
        setVideoMime(video?.mime);
        loaderStop();
      } else {
        Toast.show({
          text1: "Video duration can not be greater than 10 minutes",
          type: "error",
          visibilityTime: 5000,
        });
        return;
      }
    });
  };
  const postHandler = async () => {
    const data = await PostCreateCoachCorner(
      image,
      Imagemime,
      text,
      media,
      videoMime,
      dropDownSelectionValues
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
      ApplicationLogsHistory("Create Coach Corner");
    });
  
    return () => {
      focusListener();
    };
  }, [navigation]);
  return (
    <AppBackground
      title={"Create Coach Corner"}
      profile={false}
      back={true}
      notification={false}
      isCoach={user && user?.role == "athlete" ? false : true}>
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
          isVisible={videoVisible}
          backdropOpacity={0.6}
          onBackButtonPress={() => setVideoVisible(!videoVisible)}
          onBackdropPress={() => setVideoVisible(!videoVisible)}
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

        <DropDownPicker
            arrowcolor={Colors.primary}
            title={'Select type'}
            value={dropDownSelectionValues}
            dropDownLabelAlignment={Colors.black}
            data={DropDownValues}
            placeHolderColor={Colors.black}
            containerStyle={styles.groupContainer}
            onSelected={(key, value) =>
              setDropDownSelectionValues(value)
            }
          />


        <View style={styles.postContainer}>
          <Image
            source={
              user?.image
                ? { uri: `${Common?.assetURL}${user?.image}` }
                : Images.user
            }
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
                setImage(path);
                setImagemime(mime);
                setMedia("");
                setVideoMime("");
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
          title={"POST"}
          onPress={() => {
            postHandler();
          }}
          buttonStyle={{
            marginTop: 20,
          }}
        />
      </ScrollView>
    </AppBackground>
  );
};

export default CreateCoachCorner;

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
    // resizeMode: "contain",
    borderWidth: 1,
    borderRadius: 40 / 2,
  },
  videoStyle: {
    width: "100%",
    height: 200,
    marginVertical: 10,
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
  groupContainer: {
    width: width * 0.9,
    borderRadius: 10,
    height: 55,
    marginTop: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
  },
});
