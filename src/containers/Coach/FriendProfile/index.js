import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Modal from "react-native-modal";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { Colors, Shadows, NavService, Common } from "../../../config";
import AppBackground from "../../../components/AppBackground";
import Icons from "../../../assets/Icons";
import Images from "../../../assets/Images";
import CustomButton from "../../../components/CustomButton";
import {
  ApplicationLogsHistory,
  getOtherUser,
  PostFollowUnfollow,
} from "../../../redux/APIs";
import NativeVideoPlayer from "../../../components/NativeVideoPlayer";
const { width, height } = Dimensions.get("screen");

const FriendProfile = ({ route, navigation }) => {
  const { item, checkRole, id, role, isfriend, name } = route?.params;
  const user = useSelector((state) => state.reducer.user);
  console.log(user, "9999user");
  console.log(item?.role, "123hhh");
  // console.log(item.role, "123hhh");
  console.log("ietettetetetete", item);
  const [alertPopup, setAlertPopup] = useState(false);
  const [userData, setUserData] = useState(null);
  const [changeIcon, setChangeIcon] = useState();

  const [portfolio, setPortfolio] = useState([]);
  const [showAllFields, setShowAllFields] = useState(false);
  //PAGINATION

  const [activeSlidePortfolio, setActiveSlidePortfolio] = useState(0);
  const pagination = (data, activeSlides) => {
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
  // PORTFOLIO SECTION

  const renderItem = ({ item }) => {
    const extension = String(item)?.split(".")?.pop();
    return (
      <View
        style={{
          width: "90%",
          alignSelf: "center",
          borderRadius: 30,
          alignItems: "center",
        }}
      >
        {extension == "jpg" || extension == "jpeg" || extension == "png" ? (
          <Image
            style={{
              width: "100%",
              height: 200,
              backgroundColor: Colors.grey,
              // marginTop: 20,
              alignSelf: "center",
            }}
            source={{ uri: `${Common?.assetURL}${item}` }}
          />
        ) : extension == "mp4" ? (
          <NativeVideoPlayer
            videoUrl={item}
            style={[styles.videoStyle, { width: "100%", height: 200 }]}
          />
        ) : null}
      </View>
    );
  };
  const dismissAlertPopup = () => {
    if (user?.role == "athlete") {
      setAlertPopup(!alertPopup);
    } else {
      navigation.navigate("ChatScreen", {
        data: userData?.user[0],
        profile: true,
      });
    }
  };
  const getUser = async () => {
    const data = await getOtherUser(id);
    await setUserData(data);
    if (data?.portfolio[0]?.portfolio) {
      setPortfolio(data?.portfolio[0]?.portfolio);
    } else {
      setPortfolio([]);
    }
    setChangeIcon(data?.user[0]?.isFriend == 1 ? true : false);
  };
  // useEffect(() => {
  //   const data = navigation.addListener("focus", () => {
  //     getUser();
  //   });
  //   return data;
  // }, [navigation]);

  const FolowUnfollow = async (id) => {
    const response = await PostFollowUnfollow(id);
    if (response?.status == 1) {
      setChangeIcon(!changeIcon);
    }
  };

  useEffect(() => {
    const focusListener = navigation.addListener("focus", () => {
      getUser();
      ApplicationLogsHistory(` ${name ? name : item?.name} Profile`);
    });
    return () => {
      focusListener();
    };
  }, [navigation]);

  const profileFields = [
    { label: "Name:", value: userData?.user[0]?.name },
    // { label: "Email:", value: userData?.user[0]?.email },
    { label: "Country:", value: userData?.user[0]?.country },
    { label: "City:", value: userData?.user[0]?.city },
    { label: "State:", value: userData?.user[0]?.state },
    { label: "Gender:", value: userData?.user[0]?.gender },
    { label: "Height:", value: userData?.user[0]?.height },
    { label: "Weight:", value: userData?.user[0]?.weight },
    { label: "Specialization:", value: userData?.user[0]?.specialization },
    { label: "Sport:", value: userData?.user[0]?.sportsType },
    { label: "Sport Type:", value: userData?.user[0]?.subType1 },
    { label: "Sport SubType:", value: userData?.user[0]?.subType2 },
    { label: "Position:", value: userData?.user[0]?.position },
    { label: "Racism:", value: userData?.user[0]?.racism },
    { label: "Bio:", value: userData?.user[0]?.bio },
  ];
  const profileFieldsCoach = [
    { label: "Name:", value: userData?.user[0]?.name },
    { label: "Email:", value: userData?.user[0]?.email },
    { label: "Age:", value: userData?.user[0]?.age },
    { label: "Country:", value: userData?.user[0]?.country },
    { label: "City:", value: userData?.user[0]?.city },
    { label: "State:", value: userData?.user[0]?.state },
    { label: "Gender:", value: userData?.user[0]?.gender },
    { label: "Specialization:", value: userData?.user[0]?.specialization },
    { label: "Sport:", value: userData?.user[0]?.sportsType },
    { label: "Experience:", value: `${userData?.user[0]?.experience} years` },
    { label: "Racism:", value: userData?.user[0]?.racism },
    { label: "Bio:", value: userData?.user[0]?.bio },
  ];
  const renderProfileField = ({ item }) => {
    // console.log("itemmmmasdasdas", userData.certificate[0]?.role);
    console.log(userData?.user[0]?.role, "userData?.user[0]?.role");
    if (!item.value) return null;
    console.log(profileFields, "profileFieldsprofileFields");
    if (profileFields[0].value) {
      <View>
        <Text style={{ backgroundColor: "red" }}>{profileFields[0].value}</Text>
      </View>;
    }
    console.log("userData", userData);
    return (
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>{item.label}</Text>
        <Text
          style={[
            styles.value,
            {
              color:
                item.label == "Name:" && userData?.user[0]?.role == "coach"
                  ? "green"
                  : "black",
              fontWeight: item.label == "Name:" ? "bold" : "400",
            },
          ]}
        >
          {item.value}
        </Text>
      </View>
    );
  };
  return (
    <AppBackground
      title={"Profile"}
      back={true}
      profile={false}
      isCoach={user?.role == "athlete" ? false : true}
      notification={false}
    >
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <>
          <View style={styles.profileContainer}>
            <View style={styles.headerContent}>
              <View
                style={{
                  flexDirection: "row",
                  flex: 3,
                }}
              >
                <Image
                  style={styles.avatar}
                  source={
                    userData?.user[0]?.image?.length > 0
                      ? {
                          uri: `${Common?.assetURL}${userData?.user[0]?.image}`,
                        }
                      : Images?.user
                  }
                />
                <CustomButton
                  title={"New"}
                  buttonStyle={styles.new}
                  textStyle={{ fontSize: 8 }}
                />

                {/* <CustomButton
                  title={"Basic Package"}
                  buttonStyle={styles.Basic}
                  textStyle={{ fontSize: 12 }}
                /> */}
                <View>
                  <Text style={styles.name}>{item?.name}</Text>
                  <Text style={styles.name}>{"Basic Package"}</Text>
                </View>
              </View>

              <View
                style={{ flexDirection: "row", alignSelf: "flex-end", flex: 1 }}
              >
                <TouchableOpacity
                  style={{
                    marginLeft: "auto",
                    marginBottom: 40,
                    marginHorizontal: 5,
                  }}
                  onPress={() => {
                    dismissAlertPopup();
                  }}
                >
                  <Image source={Icons.chatNew} style={styles.editBtn} />
                </TouchableOpacity>

                {/* FOLLOW UNFOLLOW BTN  */}
                {userData?.user?.isFriend !== "undefined" && (
                  <TouchableOpacity
                    style={{
                      marginLeft: "auto",
                      marginBottom: 40,
                      marginHorizontal: 5,
                    }}
                    onPress={() => {
                      FolowUnfollow(userData?.user[0]?._id);
                    }}
                  >
                    <Image
                      source={changeIcon ? Icons.unfollow : Icons.follow}
                      style={styles.editBtn}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
            {userData?.user[0]?.is_private == 1 &&
            user?.role == "athlete" ? null : (
              <View>
                <FlatList
                  data={
                    showAllFields ? profileFields : profileFields.slice(0, 5)
                  }
                  renderItem={renderProfileField}
                  keyExtractor={(item, index) => index.toString()}
                />
                <TouchableOpacity
                  onPress={() => setShowAllFields(!showAllFields)} // Toggle showAllFields
                  style={styles.showMoreButton}
                >
                  {showAllFields ? (
                    <Image
                      tintColor={
                        user?.role == "coach"
                          ? Colors.orange
                          : user?.role == "athlete"
                          ? Colors.darkBlue
                          : Colors.orange
                      }
                      source={Icons.upArrow}
                      style={{ width: 20, height: 20 }}
                      resizeMode="contain"
                    />
                  ) : (
                    <Image
                      tintColor={
                        user?.role == "coach"
                          ? Colors.orange
                          : user?.role == "athlete"
                          ? Colors.darkBlue
                          : Colors.orange
                      }
                      source={Icons.dropdown}
                      style={{ width: 15, height: 15 }}
                      resizeMode="contain"
                    />
                  )}
                </TouchableOpacity>
                {/* FOLLOWERS FOLLOWING */}
                <View style={styles?.bottomView}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation?.navigate("FollowersList", {
                        id: userData?.user[0]?._id,
                        totalFollowers: userData?.followers,
                      })
                    }
                  >
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={[
                          styles.followers,
                          {
                            color:
                              user?.role == "coach"
                                ? Colors.orange
                                : user?.role == "athlete"
                                ? Colors.darkBlue
                                : Colors.orange,
                          },
                        ]}
                      >
                        {userData?.followers}
                      </Text>
                      <Text style={styles.bottomText}>Fans</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("FollowingList", {
                        id: userData?.user[0]?._id,
                        totalFollowing: userData?.following,
                      })
                    }
                  >
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={[
                          styles.followers,
                          {
                            color:
                              user?.role == "coach"
                                ? Colors.orange
                                : user?.role == "athlete"
                                ? Colors.darkBlue
                                : Colors.orange,
                          },
                        ]}
                      >
                        {/* {userData?.following} Following */}
                        {userData?.following}
                      </Text>
                      <Text style={styles.bottomText}>
                        {/* {userData?.following} Following */}
                        Tracking
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>

          {userData?.user[0]?.is_private == 1 ? null : (
            <>
              <TouchableOpacity
                onPress={() =>
                  NavService?.navigate("CertificateList", {
                    data:
                      userData?.certificate[0]?.certificate?.length > 0
                        ? userData?.certificate[0]?.certificate
                        : [],
                    dataitem: item,
                  })
                }
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 20,
                  alignSelf: "center",
                }}
              >
                <Image
                  source={Icons.trophy}
                  style={{
                    width: 30,
                    height: 30,
                    right: 10,
                    marginTop: 10,
                    tintColor: Colors.green,
                  }}
                  resizeMode={"contain"}
                />
                {item?.role == "athlete" ? (
                  <Text
                    style={[
                      styles?.Awards,
                      {
                        color: item?.role == "athlete" ? Colors.green : "black",
                      },
                    ]}
                  >
                    Awards & Trophies
                  </Text>
                ) : (
                  <Text
                    style={[
                      styles?.Awards,
                      {
                        color: Colors.green,
                      },
                    ]}
                  >
                    Credentials and Awards
                  </Text>
                )}
              </TouchableOpacity>

              <View style={styles?.headingView}>
                <Text
                  style={[
                    styles.title,
                    { color: user?.role == "coach" ? "white" : "black" },
                  ]}
                >
                  My Portfolio
                </Text>
                <Carousel
                  // ref={(c) => {
                  //   portfolio_carousel = c;
                  // }}
                  data={portfolio}
                  renderItem={(item) => renderItem(item)}
                  sliderWidth={width - 5}
                  itemWidth={width - 5}
                  onSnapToItem={(index) => {
                    setActiveSlidePortfolio(index);
                  }}
                />
                {portfolio?.length > 0 &&
                  pagination(portfolio, activeSlidePortfolio)}
              </View>
            </>
          )}
        </>
      </ScrollView>
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
            Alert
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
                setTimeout(() => {
                  NavService?.navigate("Subscription");
                }, 3000);
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

export default FriendProfile;

const styles = StyleSheet.create({
  headerContent: {
    flexDirection: "row",
    // alignItems: "center",
    // justifyContent: "space-between",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 63,
    borderWidth: 2,
    borderColor: Colors.darkBlue,
    marginBottom: 10,
  },
  Awards: {
    fontSize: 20,
    color: Colors.red,
    fontWeight: "700",
    marginLeft: 5,
    textAlign: "center",
    marginTop: 20,
  },
  name: {
    fontSize: 16,
    color: Colors.black,
    fontWeight: "700",
    marginLeft: 5,
    textAlign: "center",
    flex: 1,
    textDecorationLine: "underline",
  },
  profileContainer: {
    width: width * 0.9,
    borderRadius: 20,
    padding: 18,
    ...Shadows.shadow5,
    backgroundColor: Colors.white,
    alignSelf: "center",
    marginTop: 40,
  },
  editBtn: {
    width: 25,
    height: 25,
    marginLeft: "auto",
    tintColor: Colors.darkBlue,
  },
  txt: {
    color: Colors.DarkGrey,
    fontSize: 13,
    lineHeight: 20,
    fontWeight: "400",
  },
  title: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: "600",
    textDecorationLine: "underline",
    marginVertical: 20,
  },
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
  followerName: {
    fontSize: 20,
    fontWeight: "500",
    color: Colors.white,
    lineHeight: 30,
  },

  bottomView: {
    justifyContent: "space-between",
    marginHorizontal: 20,
    flexDirection: "row",
    marginTop: 10,
  },
  bottomText: {
    color: Colors.darkBlue,
    fontSize: 18,
    fontWeight: "800",
  },
  followers: {
    color: Colors.orange,
    fontSize: 18,
    // backgroundColor:'red',
    width: 20,

    alignSelf: "center",
    fontWeight: "800",
    // marginRight:5
  },
  upload: {
    width: 20,
    height: 20,
    tintColor: "white",
    marginTop: 20,
    marginLeft: 10,
  },
  title: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: "600",
    textDecorationLine: "underline",
    marginVertical: 20,
    marginHorizontal: 30,
  },
  videoView: {
    height: 220,
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: Colors.DarkGrey,
  },
  videoStyle: {
    // width: "90%",
    height: 200,
    backgroundColor: Colors.grey,
  },
  headingView: {
    alignContent: "center",
  },
  new: {
    width: 30,
    height: 20,
    borderRadius: 10,
    position: "absolute",
    left: 45,
    top: 0,
  },
  showMoreButton: {
    alignSelf: "center",
    color: Colors.black,
    fontWeight: "600",
  },
  fieldContainer: {
    flexDirection: "row",
    paddingVertical: 5,
    flex: 1,
  },
  label: {
    color: Colors.black,
    fontSize: 16,
    flex: 4,
  },
  value: {
    color: Colors.black,
    fontSize: 16,
    paddingLeft: 10,
    flex: 6,
  },
  Basic: {
    width: "30%",
    height: 20,
    borderRadius: 10,
  },
});
