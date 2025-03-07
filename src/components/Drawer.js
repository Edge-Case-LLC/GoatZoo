import React, { Component, createRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Linking,
  Share,
} from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { connect } from "react-redux";
import Toast from "react-native-toast-message";
import Icons from "../assets/Icons";
import { Colors, NavService } from "../config";
import ProfileImage from "./ProfileImage";
import Common from "../config/Common";
import { DeleteAccount, Logout } from "../redux/APIs";
import ConfirmationPopup from "../components/Modal/ConfirmationPopUp";
import CustomImagePicker from "./CustomImagePicker";

const menuItems = [
  {
    icon: Icons.homeDrawer,
    title: "Home",
    nav: "Home",
  },
  {
    icon: Icons.myLocker,
    title: "My Locker",
    nav: "SavedItem",
  },
  {
    icon: Icons.coachCorner,
    title: "Coach's Corner",
    nav: "CoachCorner",
  },
  {
    icon: Icons.chatNew,
    title: "Messages",
    nav: "MessageRequest",
  },
  {
    icon: Icons.chat,
    title: "Messaging",
    nav: "ChatList",
  },
  {
    icon: Icons.chat,
    title: "Fan Club",
    nav: "FanClub",
  },
  {
    icon: Icons.membership,
    title: "Membership",
    nav: "Subscription",
  },
  {
    icon: Icons.merchandise,
    title: "Merchandise",
    nav: "Merchandise",
  },
  {
    icon: Icons.settings,
    title: "Settings",
    nav: "Settings",
  },
  {
    icon: Icons.termsConditions,
    title: "Terms & Conditions",
    nav: "TermsConditions",
  },
  {
    icon: Icons.privacyPolicy,
    title: "Privacy Policy",
    nav: "PrivacyPolicy",
  },
  {
    icon: Icons.trash,
    title: "Delete Account",
  },
  {
    icon: Icons.logout,
    title: "Log Out",
  },
];
// const menuItems = [
//   {
//     icon: Icons.coachCorner,
//     title: "Coach's Corner",
//     nav: "CoachCorner",
//   },
//   {
//     icon: Icons.trash,
//     title: "Delete Account",
//   },
//   {
//     icon: Icons.homeDrawer,
//     title: "Home",
//     nav: "Home",
//   },

//   {
//     icon: Icons.logout,
//     title: "Log Out",
//   },
//   {
//     icon: Icons.merchandise,
//     title: "Merchandise",
//     nav: "Merchandise",
//   },
//   {
//     icon: Icons.myLocker,
//     title: "My Locker",
//     nav: "SavedItem",
//   },
//   {
//     icon: Icons.membership,
//     title: "Membership",
//     nav: "Subscription",
//   },
//   {
//     icon: Icons.privacyPolicy,
//     title: "Privacy Policy",
//     nav: "PrivacyPolicy",
//   },
//   {
//     icon: Icons.settings,
//     title: "Settings",
//     nav: "Settings",
//   },
//   {
//     icon: Icons.termsConditions,
//     title: "Terms & Conditions",
//     nav: "TermsConditions",
//   },
// ];

class Drawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deletePopup: false,
      logoutPopup: false,
    };
  }
  actionBottomSheet = createRef();
  submit = async () => {
    const url = "https://www.google.com";
    const supported = Linking.canOpenURL(url);
    if (supported) {
      Linking.openURL(url);
    }
  };

  onShare = async () => {
    try {
      const result = await Share.share({
        message:
          "React Native | A framework for building native apps using React",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  _renderItem({ title, icon, nav }, index) {
    const isFocused = index === this.props.state.index;
    const role = this.props.user.role;
    console.log("User List: ", role);
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          if (title === "Log Out") {
            this.setState({ logoutPopup: !this.state.logoutPopup });
            // this.props.logout();
          } else if (title === "Share") {
            this?.props?.navigation?.closeDrawer();
            this.onShare();
          } else if (title == "Delete Account") {
            this?.props?.navigation?.closeDrawer();
            this.setState({ deletePopup: true });
          } else if (title == "My Locker") {
            if (this?.props?.user?.role == "athlete") {
              Toast.show({
                text1: "Membership required",
                type: "error",
                visibilityTime: 3000,
              });
            } else {
              this.props.navigation.navigate("BottomTab", {
                screen: "My Locker",
              });
            }
          } else {
            this.props.navigation.navigate(nav);
          }
        }}
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: isFocused ? Colors.white + "30" : "transparent",
          paddingHorizontal: 25,
          paddingVertical: 5,
          display: title === "Fan Club" && role === "coach" ? "none" : "flex",
        }}
      >
        <View
          style={{
            padding: 10,
            borderRadius: 7,
          }}
        >
          <Image
            source={icon}
            style={{
              width: 20,
              height: 20,
              resizeMode: "contain",
              tintColor: Colors.white,
            }}
          />
        </View>
        <Text
          style={{
            marginLeft: 10,
            color: Colors.white,
            fontSize: 16,
            fontWeight: "500",
          }}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  }
  render() {
    const { user } = this.props;
    const { deletePopup, logoutPopup } = this.state;
    console.log("user", user);
    return (
      <View
        style={{
          width: "100%",
          height: "100%",
          backgroundColor:
            user?.role == "athlete" ? Colors.darkBlue : Colors.orange,
          // alignItems: 'center',
          paddingTop: getStatusBarHeight(),
          borderTopRightRadius: 30,
          borderBottomRightRadius: 30,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 12,
            borderBottomWidth: 1,
            borderBottomColor: Colors.white,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              onPress={() =>
                NavService.navigate("BottomTab", { screen: "Profile" })
              }
              activeOpacity={0.8}
              style={{
                borderRadius: 100,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 3,
                borderColor: Colors.white,
                width: 100,
                height: 100,
              }}
            >
              <ProfileImage
                size={90}
                resizeMode="cover"
                imageUri={
                  user?.image !== null
                    ? `${Common?.assetURL}${user?.image}`
                    : ""
                }
                name={user?.name}
              />
            </TouchableOpacity>
            {user?.height && (
              <Text
                style={{
                  color: Colors.white,
                  fontSize: 12,
                  fontWeight: "600",
                  marginTop: 5,
                }}
              >
                Height: {user?.height}
              </Text>
            )}
            {user?.weight && (
              <Text
                style={{
                  color: Colors.white,
                  fontSize: 12,
                  fontWeight: "600",
                  marginTop: 5,
                }}
              >
                Weight: {user?.weight}
              </Text>
            )}
          </View>

          <TouchableOpacity
            onPress={() => NavService.navigate("Profile")}
            activeOpacity={0.8}
            style={{
              flex: 1,
              justifyContent: "center",
              paddingLeft: 12,
            }}
          >
            {user?.name && (
              <Text
                maxLength={15}
                numberOfLines={1}
                style={{
                  color: Colors.white,
                  fontSize: 20,
                  fontWeight: "600",
                }}
              >
                {user?.name}
              </Text>
            )}

            {/* SPORTS TYPE */}
            {user?.sportsType && (
              <Text
                // numberOfLines={1}
                style={{
                  color: Colors.white,
                  fontSize: 14,
                  marginTop: 5,
                  fontWeight: "500",
                  // width:'80%'
                }}
              >
                {user?.sportsType} {user?.subType1 && `/${user?.subType1}`}
                {user?.subType2 && `/${user?.subType2}`}
              </Text>
            )}

            {/* //POSITION */}
            {user?.position && user?.role == "athlete" ? (
              <Text
                numberOfLines={1}
                style={{
                  color: Colors.white,
                  fontSize: 14,
                  marginTop: 5,
                  fontWeight: "500",
                }}
              >
                {user?.position}
              </Text>
            ) : null}

            {/* AREA */}
            {user?.country && (
              <Text
                style={{
                  color: Colors.white,
                  fontSize: 14,
                  marginTop: 5,
                  fontWeight: "500",
                }}
              >
                {user?.country} / {user?.state} / {user?.city}
              </Text>
            )}

            {/* ZIPCODE */}
            {user?.zipCode && (
              <Text
                numberOfLines={1}
                style={{
                  color: Colors.white,
                  fontSize: 14,
                  marginTop: 5,
                  fontWeight: "500",
                }}
              >
                {user?.zipCode}
              </Text>
            )}

            {/* COACH TYPE */}
            {user?.specialization && user?.role == "coach" ? (
              <Text
                numberOfLines={1}
                style={{
                  color: Colors.white,
                  fontSize: 14,
                  marginTop: 5,
                  fontWeight: "500",
                }}
              >
                {user?.specialization}
              </Text>
            ) : null}

            <Text
              numberOfLines={1}
              style={{
                color: Colors.white,
                fontSize: 14,
                marginTop: 5,
                fontWeight: "500",
              }}
            >
              GoatZoo Level: <Text style={{ color: "green" }}>(1)</Text>
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1, marginTop: 30, width: "100%" }}>
          <FlatList
            bounces={false}
            showsVerticalScrollIndicator={false}
            data={menuItems}
            renderItem={({ item, index }) => this._renderItem(item, index)}
          />
        </View>
        <ConfirmationPopup
          visible={deletePopup}
          toggleVisibility={() =>
            this.setState({ deletePopup: !this.state.deletePopup })
          }
          // title="Confirmation"
          subTitle="Are you sure, you want to delete your account?"
          onAccept={() => this.props.deleteaccount()}
        />
        <ConfirmationPopup
          visible={logoutPopup}
          toggleVisibility={() =>
            this.setState({ logoutPopup: !this.state.logoutPopup })
          }
          // title="Confirmation"
          subTitle="Are you sure, you want to logout?"
          onAccept={() => this.props.logout()}
        />
      </View>
    );
  }
}

function mapState({ reducer: { user } }) {
  return {
    user,
  };
}

function mapDispatch(dispatch) {
  return {
    logout: () => {
      Logout();
    },
    deleteaccount: () => {
      DeleteAccount();
    },
  };
}

export default connect(mapState, mapDispatch)(Drawer);
