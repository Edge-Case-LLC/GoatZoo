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
  ImageBackground,
  Linking,
  FlatList,
} from "react-native";
import Modal from "react-native-modal";
import Carousel, { Pagination } from "react-native-snap-carousel";
import AppBackground from "../../../components/AppBackground";
import { Colors, Shadows, NavService } from "../../../config";
import Icons from "../../../assets/Icons";
import NativeVideoPlayer from "../../../components/NativeVideoPlayer";
import Images from "../../../assets/Images";
import Common from "../../../config/Common";
import { ApplicationLogsHistory, getProfile } from "../../../redux/APIs";
import VideoPlayer from "../../../components/VideoRn";
import ProfileImage from "../../../components/ProfileImage";
import CustomButton from "../../../components/CustomButton";

const { width, height } = Dimensions.get("screen");

const Profile = ({ navigation }) => {
  const [video, setVideo] = useState("");
  const [activeSlidePortfolio, setActiveSlidePortfolio] = useState(0);
  const [userData, setUserData] = useState("");
  const [showAllFields, setShowAllFields] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [portfolio, setPortfolio] = useState([]);
  const user = useSelector((state) => state.reducer.user);
  // console.log(user.role, ";useruser");
  console.log("useruseruser", userData?.user?.role);
  const pagination = (data, activeSlides) => {
    const numberOfDots = data?.length;
    if (numberOfDots == 1) return <View style={{ height: 20 }} />;
    return (
      <View>
        <Text style={styles.totals}>Portfolio Count: {numberOfDots}</Text>
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
      </View>
    );
  };
  const getData = async () => {
    const profile = await getProfile();
    await setUserData(profile);
    setPortfolio(profile?.portfolio[0].portfolio);
  };
  // useEffect(() => {
  //   const data = navigation.addListener(
  //     "focus",
  //     () => {
  //       getData();
  //     },
  //     []
  //   );
  //   return data;
  // }, [navigation]);
  useEffect(() => {
    const focusListener = navigation.addListener("focus", () => {
      getData();
      ApplicationLogsHistory(` ${userData?.user?.name} Profile`);
    });
    return () => {
      focusListener();
    };
  }, [navigation]);
  useEffect(() => {
    getData();
  }, []);
  const renderItem = ({ item }) => {
    const portfolio = item;
    const extension = String(portfolio)?.split(".")?.pop();
    return (
      <View style={{ width: "100%", alignSelf: "center", borderRadius: 30 }}>
        {extension == "jpg" || extension == "jpeg" || extension == "png" ? (
          <Image
            style={{
              width: "86%",
              height: 180,
              backgroundColor: Colors.grey,
            }}
            source={{ uri: `${Common?.assetURL}${item}` }}
          />
        ) : extension == "mp4" ? (
          <NativeVideoPlayer
            videoUrl={item}
            style={[styles.videoStyle, { width: "86%", height: 180 }]}
          />
        ) : null}
      </View>
    );
  };
  const RenderList = ({ item }) => {
    const extension = String(item)?.split(".")?.pop();
    return (
      <View
        style={[
          {
            width: "50%",
            height: 150,
            borderRadius: 10,
            marginVertical: 10,
          },
          item?.id % 2 === 0
            ? {
                paddingLeft: 10,
              }
            : {
                paddingRight: 10,
              },
        ]}
      >
        {extension == "mp4" ? (
          <>
            <TouchableOpacity
              onPress={async () => {
                await setModalVisible(true), await setVideo(item);
              }}
            >
              <Image
                resizeMode="cover"
                style={{
                  width: "100%",
                  height: 150,
                  borderRadius: 20,
                }}
                source={Images?.background}
              />
              <Image
                style={{
                  position: "absolute",
                  width: 40,
                  height: 40,
                  justifyContent: "center",
                  position: "absolute",
                  top: "37%",
                  left: "37%",
                }}
                source={Icons?.play}
              />
            </TouchableOpacity>
          </>
        ) : (
          <Image
            resizeMode="cover"
            style={{
              width: "100%",
              height: 150,
              borderRadius: 20,
            }}
            source={{ uri: `${Common?.assetURL}${item}` }}
          />
        )}
      </View>
    );
  };
  const profileFields = [
    { label: "Name:", value: userData?.user?.name },
    { label: "Email:", value: userData?.user?.email },
    { label: "Age:", value: userData?.user?.age },
    { label: "Country:", value: userData?.user?.country },
    { label: "City:", value: userData?.user?.city },
    { label: "State:", value: userData?.user?.state },
    { label: "Gender:", value: userData?.user?.gender },
    { label: "Height:", value: userData?.user?.height },
    { label: "Weight:", value: userData?.user?.weight },
    { label: "Specialization:", value: userData?.user?.specialization },
    { label: "Sport:", value: userData?.user?.sportsType },
    { label: "Sport Type:", value: userData?.user?.subType1 },
    { label: "Sport SubType:", value: userData?.user?.subType2 },
    { label: "Position:", value: userData?.user?.position },
    { label: "Racism:", value: userData?.user?.racism },
    { label: "Bio:", value: userData?.user?.bio },
  ];
  const profileFieldsCoach = [
    { label: "Name:", value: userData?.user?.name },
    { label: "Email:", value: userData?.user?.email },
    { label: "Age:", value: userData?.user?.age },
    { label: "Country:", value: userData?.user?.country },
    { label: "City:", value: userData?.user?.city },
    { label: "State:", value: userData?.user?.state },
    { label: "Gender:", value: userData?.user?.gender },
    { label: "Specialization:", value: userData?.user?.specialization },
    { label: "Sport:", value: userData?.user?.sportsType },
    { label: "Experience:", value: `${userData?.user?.experience} years` },
    { label: "Racism:", value: userData?.user?.racism },
    { label: "Bio:", value: userData?.user?.bio },
  ];
  const renderProfileField = ({ item }) => {
    if (!item.value) return null;

    return (
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>{item.label}</Text>
        <Text style={styles.value}>{item.value}</Text>
      </View>
    );
  };

  return (
    <AppBackground
      title={"Profile"}
      profile={false}
      isCoach={user && user?.role == "athlete" ? false : true}
    >
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 30,
          paddingBottom: 60,
        }}
      >
        {user && user?.role == "athlete" ? (
          <>
            <View style={styles.profileContainer}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                  NavService.navigate("EditProfile", { profile: userData });
                }}
              >
                <Image source={Icons.edit} style={styles.editBtn} />
              </TouchableOpacity>
              <View style={styles.headerContent}>
                <View
                  style={{
                    position: "relative",
                  }}
                >
                  <Image
                    style={styles.avatar}
                    source={
                      userData?.user?.image !== null
                        ? {
                            uri: `${Common?.assetURL}${userData?.user?.image}`,
                          }
                        : Images.user
                    }
                  />
                  <CustomButton
                    title={"New"}
                    buttonStyle={styles.new}
                    textStyle={{ fontSize: 8 }}
                  />
                </View>
                <Text style={styles.titlename}>{userData?.user?.name}</Text>
                <Text style={styles.name}>{userData?.user?.email}</Text>
              </View>
              {/* <View style={{ marginTop: 20 }}>
                {userData?.user?.sportsType ? (
                  <Text style={styles.txt}>
                    Sports: {userData?.user?.sportsType}
                  </Text>
                ) : null}
                {userData?.user?.sportsType == "Hockey" &&
                userData?.user?.hockeyType ? (
                  <Text style={styles.txt}>{userData?.user?.hockeyType}</Text>
                ) : null}
                {userData?.user?.sportsType == "Boxing" &&
                userData?.user?.classWeight ? (
                  <Text style={styles.txt}>
                    Weight Class: {userData?.user?.classWeight} KG
                  </Text>
                ) : null}
                {userData?.user?.country ? (
                  <Text style={styles.txt}>
                    Country: {userData?.user?.country}
                  </Text>
                ) : null}
                {userData?.user?.state ? (
                  <Text style={styles.txt}>State: {userData?.user?.state}</Text>
                ) : null}
                {userData?.user?.city ? (
                  <Text style={styles.txt}>City: {userData?.user?.city}</Text>
                ) : null}
                {userData?.user?.position ? (
                  <Text style={styles.txt}>
                    Position: {userData?.user?.position}
                  </Text>
                ) : null}
                {userData?.user?.zipCode ? (
                  <Text style={styles.txt}>
                    Zipcode: {userData?.user?.zipCode}
                  </Text>
                ) : null}
                {userData?.user?.age ? (
                  <Text style={styles.txt}>Age: {userData?.user?.age}</Text>
                ) : null}
                {userData?.user?.gender ? (
                  <Text style={styles.txt}>
                    Gender: {userData?.user?.gender}
                  </Text>
                ) : null}
                {userData?.user?.racism ? (
                  <Text style={styles.txt}>Race: {userData?.user?.racism}</Text>
                ) : null}

                {userData?.user?.bio && (
                  <Text style={styles.txt}>Bio: {userData?.user?.bio}</Text>
                )}
              </View> */}
              <View style={{ marginTop: 20 }}>
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
              </View>

              {/* FOLLOWERS */}
              <View style={styles?.bottomView}>
                <TouchableOpacity
                  onPress={() =>
                    NavService?.navigate("FollowersList", {
                      opposite: true,
                      id: userData?.user?._id,
                      totalFollowers: userData?.followers,
                    })
                  }
                >
                  <View style={styles.alignFlex}>
                    <Text
                      style={[
                        styles.bottomText,
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
                      {userData?.followers + " "}
                    </Text>
                    <Text
                      style={[
                        styles.bottomText,
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
                      Fans
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    NavService.navigate("FollowingList", {
                      opposite: true,
                      id: userData?.user?._id,
                      totalFollowers: userData?.following,
                    })
                  }
                >
                  <View style={styles.alignFlex}>
                    <Text
                      style={[
                        styles.bottomText,
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
                      {userData?.following + " "}
                    </Text>
                    <Text
                      style={[
                        styles.bottomText,
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
                      Tracking
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            {/* CERTIFICATE SECTION */}
            <TouchableOpacity
              onPress={() =>
                userData?.user?.is_private == 0
                  ? NavService?.navigate("CertificateList", {
                      data:
                        userData?.certificate[0]?.certificate?.length > 0
                          ? userData?.certificate[0]?.certificate
                          : [],
                      dataitem: userData?.user,
                    })
                  : null
              }
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
                justifyContent: "center",
              }}
            >
              <Image
                tintColor={Colors.darkGreen}
                source={Icons?.trophy}
                style={styles.certificateIcon}
              />

              <Text
                style={[
                  styles?.name,
                  {
                    color:
                      user?.role == "athlete"
                        ? "green"
                        : item.role == "athlete"
                        ? "green"
                        : "white",
                  },
                ]}
              >
                View Awards & Trophies
              </Text>
            </TouchableOpacity>

            {/* MY PORTFOLIO SECTION  */}
            <View style={styles?.headingView}>
              <Text style={[styles.title, { color: "black" }]}>
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
        ) : (
          <>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                NavService.navigate("EditProfile", { profile: userData });
              }}
              style={{ position: "absolute", top: 25, right: 15 }}
            >
              <Image
                source={Icons.edit}
                style={{ width: 30, height: 30, tintColor: Colors.white }}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View
              style={{
                width: 135,
                height: 135,
                borderRadius: 100,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 2,
                borderColor: Colors.darkBlue,
                marginTop: 50,
                alignSelf: "center",
              }}
            >
              <ProfileImage
                size={125}
                imageUri={
                  userData?.user?.image !== null
                    ? {
                        uri: `${Common?.assetURL}${userData?.user?.image}`,
                      }
                    : ""
                }
                name={userData?.user?.name ? userData?.user?.name : "user"}
                innerAsset={userData?.user?.image !== null ? true : false}
              />
            </View>

            {/* VIDEO MODAL  */}
            <Modal
              isVisible={isModalVisible}
              onBackButtonPress={() => setModalVisible(!isModalVisible)}
              onBackdropPress={() => setModalVisible(!isModalVisible)}
            >
              <View style={styles.mainVideoContainer}>
                <View style={styles.videoContainer}>
                  <NativeVideoPlayer
                    videoUrl={video}
                    style={[styles.videoStyle, { height: 250 }]}
                  />
                </View>
              </View>
            </Modal>

            {/* FOLLOWERS */}
            <View style={styles?.bottomView}>
              <TouchableOpacity
                onPress={() =>
                  NavService?.navigate("FollowersList", {
                    opposite: true,
                    id: userData?.user?._id,
                    totalFollowers: userData?.followers,
                  })
                }
              >
                <View style={styles.alignFlex}>
                  <Text style={[styles.bottomText, { color: Colors.orange }]}>
                    {userData?.followers}
                  </Text>
                  <Text
                    style={[
                      styles.bottomText,
                      { color: Colors.darkBlue, left: 10 },
                    ]}
                  >
                    Fans
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  NavService.navigate("FollowingList", {
                    opposite: true,
                    id: userData?.user?._id,
                    totalFollowing: userData?.following,
                  })
                }
              >
                <View style={styles.alignFlex}>
                  <Text style={[styles.bottomText, { color: Colors.orange }]}>
                    {/* {userData?.following} Following */}
                    {userData?.following + " "}
                  </Text>
                  <Text style={[styles.bottomText, { color: Colors.darkBlue }]}>
                    {/* {userData?.following} Following */}
                    Tracking
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.container}>
              <FlatList
                data={
                  showAllFields
                    ? profileFieldsCoach
                    : profileFieldsCoach.slice(0, 5)
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
                    tintColor={Colors.orange}
                    source={Icons.upArrow}
                    style={{ width: 20, height: 20 }}
                    resizeMode="contain"
                  />
                ) : (
                  <Image
                    source={Icons.dropdown}
                    style={{ width: 15, height: 15 }}
                    resizeMode="contain"
                  />
                )}
              </TouchableOpacity>
            </View>

            {/* CERTIFICATES SECTION  */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={
                () =>
                  // userData?.user?.is_private == 1
                  NavService?.navigate("CertificateList", {
                    data:
                      userData?.certificate[0]?.certificate?.length > 0
                        ? userData?.certificate[0]?.certificate
                        : [],
                    dataitem: userData?.user,
                  })
                // : null
              }
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={Icons.trophy}
                style={{
                  height: 30,
                  width: 30,
                  alignSelf: "center",
                  top: 8,
                  right: 10,
                  tintColor: Colors.green,
                }}
              />
              {user.role == "coach" ? (
                <Text
                  style={[
                    styles?.name,
                    {
                      color: "white",
                    },
                  ]}
                >
                  {/* View Certificates */}
                  View Credentials and Awards
                </Text>
              ) : (
                <Text
                  style={[
                    styles?.name,
                    {
                      color: "white",
                    },
                  ]}
                >
                  {/* View Certificates */}
                  View Awards & Trophies
                </Text>
              )}
            </TouchableOpacity>

            <View style={styles?.headingView}>
              <Text style={styles.title}>My Portfolio</Text>
              <FlatList
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                numColumns={2}
                contentContainerStyle={{}}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                data={portfolio}
                renderItem={({ item }) => <RenderList item={item} />}
              />
            </View>
          </>
        )}
      </ScrollView>
    </AppBackground>
  );
};

export default Profile;

const styles = StyleSheet.create({
  headerContent: {
    // padding: 30,
    alignItems: "center",
  },
  totals: {
    textAlign: "center",
    color: Colors.black,
    fontWeight: "400",
    marginTop: 4,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 63,
    borderWidth: 2,
    borderColor: Colors.darkBlue,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    color: Colors.darkBlue,
    fontWeight: "600",
  },
  titlename: {
    fontSize: 20,
    color: Colors.darkBlue,
    fontWeight: "600",
  },
  profileContainer: {
    borderWidth: 1,
    width: width * 0.9,
    // height: height * 0.3,
    borderRadius: 20,
    borderColor: Colors.darkBlue,
    padding: 18,
    ...Shadows.shadow5,
    backgroundColor: Colors.white,
    alignSelf: "center",
    marginTop: 20,
  },
  editBtn: {
    width: 25,
    height: 25,
    alignSelf: "flex-end",
    // marginRight: 20,
    // marginTop: 10,
  },
  txt: {
    color: Colors.black,
    fontSize: 14,
    lineHeight: 20,
    flex: 1,
    fontWeight: "400",
  },
  title: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: "600",
    textDecorationLine: "underline",
    marginVertical: 20,
  },
  followerName: {
    fontSize: 20,
    fontWeight: "500",
    color: Colors.white,
    lineHeight: 30,
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

  headingView: {
    // flexDirection: "row",
    // justifyContent: "space-between",
    // alignItems: "center",
  },
  plusIcon: {
    borderWidth: 2,
    borderRadius: 20,
    // padding:5,
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors?.orange,
  },
  bottomView: {
    justifyContent: "space-between",
    marginHorizontal: 30,
    flexDirection: "row",
    marginTop: 10,
  },
  bottomText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "800",
  },
  // fieldsView: {
  //   alignItems: "center",
  //   marginTop: 20,
  //   flexDirection: "row",
  //   width: "90%",
  //   alignSelf: "center",
  // },
  // fieldOne: { flex: 1, alignItems: "center", borderRightWidth: 1 },
  // fieldTwo: { flex: 1, alignItems: "center" },
  // fieldOneText: {
  //   color: "white",
  //   fontSize: 16,
  // },
  // fieldTwoText: {
  //   color: "white",
  //   fontSize: 16,
  // },

  //
  container: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.darkBlue,
    borderRadius: 20,
    padding: 10,
    marginVertical: 10,
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

  field: {
    color: "white",
    fontSize: 16,
  },
  upload: {
    width: 20,
    height: 20,
    tintColor: "white",
    marginLeft: 10,
    marginTop: 22,
  },
  name: {
    fontSize: 20,
    color: Colors.black,
    fontWeight: "700",
    marginLeft: 5,
    textAlign: "center",
    marginTop: 10,
  },
  videoStyle: {
    width: "100%",
    height: 200,
    backgroundColor: Colors.grey,
    justifyContent: "center",
  },
  mainVideoContainer: {
    backgroundColor: Colors.black,
    flex: 0.25,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  videoContainer: {
    borderRadius: 30,
    width: "100%",
    height: "100%",
    marginVertical: 8,
  },
  icon: {
    position: "absolute",
    top: 40,
    left: 60,
  },
  alignFlex: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  certificateIcon: {
    width: 22,
    height: 22,
    resizeMode: "contain",
  },
  new: {
    width: 30,
    height: 20,
    borderRadius: 10,
    position: "absolute",
    top: 10,
    right: -20,
  },
  fieldsView: {
    alignItems: "center",
    marginTop: 20,
  },
  field: {
    color: "white",
    fontSize: 16,
  },
});
