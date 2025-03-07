import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  TextInput,
} from "react-native";
import React, { createRef, useState } from "react";
import { Colors } from "../../config";
const { width } = Dimensions.get("window");
// import Video from "../../../components/react-native-af-video-player-reimplemented";
import Video from "../react-native-af-video-player-reimplemented";
import CustomImagePicker from "../CustomImagePicker";
import Images from "../../assets/Images";
import MultipleImagesPicker from "../multipleImagesPicker";
import { Image as ImageCompressor } from "react-native-compressor";

const Porfolio = ({ setModalVisible }) => {
  const [media, setMedia] = useState();
  const [text, setText] = useState("");
  const [image, setImage] = useState([]);
  //   const image = [];
  const [Imagemime, setImagemime] = useState();

  const onVideoPress = () => {
    ImageCropPicker.openPicker({
      mediaType: "video",
      includeExif: true,
    }).then((video) => {
      setMedia(video);
    });
  };
  const ImagesFunc = async (result) => {
    const res2 = await ImageCompressor.compress(result, {
      maxHeight: 400,
      maxWidth: 400,
      quality: 0.8,
    });
    await setImage([...image, res2]);
  };
  return (
    <View style={styles.container}>
      <View style={styles.modalView}>
        <View style={styles?.postContainer}>
          <Image source={Images?.user} style={styles.profileImage} />
          <View style={{ backgroundColor: "white", marginTop: 10 }}>
            <TextInput
              onChangeText={(text) => setText(text)}
              multiline={true}
              style={{ marginLeft: 10, color: "black" }}
              placeholder={"Write something"}
              placeholderTextColor={Colors.DarkGrey}
            />
            {media && (
              <Video
                // url={'file:///data/user/0/com.appsnado.goatzoo/cache/react-native-image-crop-picker/file_example_MP4_1920_18MG.mp4'}
                style={styles.videoStyle}
                url={media?.path}
                resizeMode={"contain"}
                // rotateToFullScreen
                // lockPortraitOnFsExit
                // inlineOnly
                // onFullScreen={onFullScreen}
                theme={theme}
                // title={"video"}
                // placeholder={"content?.banner"}
              />
            )}
            {
              // image &&
              //   image?.map((item) => {
              <Image
                source={{
                  uri: image[0],
                }}
                style={styles.imagestyle}
                resizeMode={"contain"}
              />
              //   })
            }
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
            <MultipleImagesPicker
              onImageChange={(result) => {
                // ImagesFunc(result);
                // await ImageCompressor.compress(item?.path, {
                //     maxHeight: 400,
                //     maxWidth: 400,
                //     quality: 1,
                //   });
                // console.log(result);
                // setImage(path);
                // setImagemime(mime);
              }}
            >
              <Image
                resizeMode="contain"
                source={Icons.picture}
                style={{ width: 30, height: 30 }}
              />
            </MultipleImagesPicker>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Porfolio;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    borderRadius: 12,
    backgroundColor: Colors.white,
    padding: 20,
  },
  title: {
    color: Colors.orange,
    fontSize: 18,
    textDecorationLine: "underline",
    fontWeight: "600",
    marginTop: 20,
  },
  postContainer: {
    borderWidth: 1,
    width: width * 0.9,
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
    resizeMode: "contain",
    borderRadius: 100,
  },
  videoStyle: {
    width: "100%",
    height: 200,
    backgroundColor: Colors.grey,
  },
  imagestyle: {
    width: 200,
    height: 200,
    backgroundColor: "red",
  },
});
