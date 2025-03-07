import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  View,
  Dimensions,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import { useSelector } from "react-redux";
import Carousel, { Pagination } from "react-native-snap-carousel";
import AppBackground from "../../../components/AppBackground";
import { Colors, NavService, Common, size } from "../../../config";
import {
  ApplicationLogsHistory,
  getPostForCoachCorner,
} from "../../../redux/APIs";
import NativeVideoPlayer from "../../../components/NativeVideoPlayer";
import { log } from "react-native-reanimated";

const { width, height } = Dimensions?.get("screen");

const CoachCorner = ({ navigation }) => {
  const user = useSelector((state) => state.reducer.user);
  console.log(user.role,'useruseruser');
  const [coachCornerPosts, setCoachCornerPosts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const getCoachCornerPosts = async () => {
    const data = await getPostForCoachCorner();
    if (data?.length) {
      setCoachCornerPosts(data);
    }
  };
  useEffect(() => {
    const focusListener = navigation.addListener("focus", () => {
      getCoachCornerPosts();
      ApplicationLogsHistory("Tips and Techniques");
    });
    return focusListener;
  }, []);

  const openImageModal = (image) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const openVideoModal = (video) => {
    setSelectedVideo(video);
    setModalVisible(true);
  };

  return (
    <AppBackground
      title={"Tips and Techniques"}
      profile={false}
      notification={false}
      back
      isCoach={user && user?.role == "athlete" ? false : true}
    >
      <FlatList
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
              No coach corner tip found
            </Text>
          </View>
        )}
        contentContainerStyle={{
          width: "100%",
          flexGrow: 1,
        }}
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        data={coachCornerPosts}
        renderItem={({ item, index }) => (
          <List
            item={item}
            index={index}
            openImageModal={openImageModal}
            openVideoModal={openVideoModal}
          />
        )}
      />
      {user?.role == "coach" ? (
        <View style={{ position: "absolute", bottom: 40, right: 15 }}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => NavService.navigate("CreateCoachCorner")}
            style={{
              backgroundColor: Colors.orange,
              borderRadius: 40,
              padding: 20,
            }}
          >
            <Image source={Icons.plus} style={{ width: 30, height: 30 }} />
          </TouchableOpacity>
        </View>
      ) : null}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          {selectedImage && (
            <Image
              source={{ uri: Common?.assetURL + selectedImage }}
              style={styles.modalImage}
            />
          )}
          {selectedVideo && (
            <NativeVideoPlayer
              videoUrl={selectedVideo}
              style={styles.modalVideo}
            />
          )}
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.closeButton}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </AppBackground>
  );
};

const List = ({ item, index, openImageModal, openVideoModal }) => {
  const data = item?.coachCornerInfo;
  const [activeSlideVideo, setActiveSlideVideo] = useState(0);
  const showCarousal = item?.coachCornerInfo?.length > 0 ? true : false;

  const renderItem = ({ item }) => {
    if (item?.text) {
      return (
        <View style={[styles.videoView, { backgroundColor: Colors.white }]}>
          <Text style={styles.textType}>"Topic: {item?.type} "</Text>
          <View style={styles.subView}>
            <Text style={styles.textStyle}>" {item?.text} "</Text>
          </View>
        </View>
      );
    } else if (item?.image) {
      return (
        <TouchableOpacity 
        // onPress={() => openImageModal(item.image)}
        >
          <View style={styles.videoView}>
            <Text style={styles.textType}>" {item?.type} "</Text>
            <Image
              source={{ uri: Common?.assetURL + item?.image }}
              style={{ width: "100%", height: 220, borderRadius: 20 }}
            />
          </View>
        </TouchableOpacity>
      );
    } else if (item?.video) {
      return (
        <TouchableOpacity onPress={() => openVideoModal(item.video)}>
          <View style={styles.videoView}>
            <Text style={styles.textType}>" {item?.type} "</Text>
            <NativeVideoPlayer
              videoUrl={item?.video}
              style={styles.styleVideo}
            />
          </View>
        </TouchableOpacity>
      );
    } else return null;
  };

  const pagination = (activeSlides) => {
    const numberOfDots = data?.length;
    if (numberOfDots == 1) return <View style={{ height: 20 }} />;
    return (
      <Pagination
        dotsLength={numberOfDots}
        activeDotIndex={activeSlides}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: "black",
        }}
        containerStyle={{
          marginVertical: 0.01 * height,
          paddingVertical: 0,
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  };

  return (
    <>
      <View style={{ height: 260, position: "relative" }}>
        {showCarousal && (
          <Carousel
            data={[...data]}
            renderItem={renderItem}
            sliderWidth={width - 5}
            itemWidth={width - 5}
            onSnapToItem={(index) => {
              setActiveSlideVideo(index);
            }}
          />
        )}
        {showCarousal && pagination(activeSlideVideo)}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  videoView: {
    height: 220,
    width: "90%",
    marginVertical: 10,
    marginHorizontal: 10,
    alignSelf: "center",
    // alignItems: "center",
    // justifyContent: "center",
    borderRadius: 20,
    backgroundColor: Colors.DarkGrey,
  },
  subView: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  videoStyle: {
    width: "100%",
    height: 200,
    backgroundColor: Colors.grey,
    borderRadius: 10,
  },
  styleVideo: {
    width: "100%",
    height: 220,
    backgroundColor: Colors.grey,
  },
  textStyle: {
    fontSize: 15,
    fontWeight: "500",
    fontStyle: "italic",
    textTransform: "capitalize",
  },
  title: {
    color: Colors.black,
    marginLeft: 25,
    fontSize: size.medium,
    fontWeight: "700",
    textDecorationLine: "underline",
  },
  textType: {
    fontSize: 15,
    fontWeight: "500",
    fontStyle: "italic",
    textTransform: "capitalize",
    textDecorationLine: "underline",
    marginVertical: 10,
    marginLeft: 15,
  },
});

export default CoachCorner;
