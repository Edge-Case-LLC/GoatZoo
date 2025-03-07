import React, { useEffect } from "react";
import SplashScreen from "react-native-splash-screen";
import Orientation from "react-native-orientation-locker";
import DrawerCustom from "./components/Drawer";

// Navigation here
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Colors, NavService } from "./config";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import TabbarComp from "./TabbarComp";
import messaging from "@react-native-firebase/messaging";

//Screens
import {
  PreLogin,
  Login,
  Signup,
  ForgetPassword,
  OTP,
  ResetPassword,
  CompleteProfile,
  Home,
  Profile,
  TermsConditions,
  PrivacyPolicy,
  Settings,
  EditProfile,
  ChangePassword,
  Subscription,
  Merchandise,
  Chat,
  ChatList,
  ChatHouseForum,
  ChatHouseUsers,
  PaymentMethod,
  CardDetails,
  Create,
  Notification,
  FriendProfile,
  Liked,
  Comment,
  SavedItem,
  SearchScreen,
  LikeList,
  CertificateList,
  CoachCorner,
  CreateCoachCorner,
  FollowingList,
  FollowersList,
  EditPost,
  MessageRequest,
} from "./containers";
import Images from "./assets/Images";
import PoleSelection from "./containers/PoleSelection";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
import Toast from "react-native-toast-message";
import ChatInvite from "./containers/Coach/ChatInvite";
import Feedback from "./containers/Coach/Feedback";
import Terms from "./containers/Coach/Terms";
import FanPage from "./containers/Coach/Fanpage";
import FanClubRequest from "./containers/Coach/FanClubRequest";

const AuthStack = () => {
  return (
    <ImageBackground source={Images.background} style={{ flex: 1 }}>
      <Stack.Navigator
        screenOptions={{
          contentStyle: { backgroundColor: "transparent" },
          animation: "simple_push",
          gestureEnabled: false,
        }}
        initialRouteName="PoleSelection"
      >
        <Stack.Screen
          name="PoleSelection"
          component={PoleSelection}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PreLogin"
          component={PreLogin}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgetPassword"
          component={ForgetPassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OTP"
          component={OTP}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CompleteProfile"
          component={CompleteProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TermsConditions"
          component={TermsConditions}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicy}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </ImageBackground>
  );
};
const DrawerStack = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerType: "front",
        drawerStyle: {
          width: "80%",
          backgroundColor: "transparent",
        },
      }}
      drawerContent={(props) => <DrawerCustom {...props} />}
      initialRouteName={"Home"}
    >
      <Drawer.Screen
        name="BottomTab"
        component={BottomTab}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Subscription"
        component={Subscription}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Merchandise"
        component={Merchandise}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Notification"
        component={Notification}
        options={{ headerShown: false }}
      />

      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{ headerShown: false }}
      />
       <Drawer.Screen
        name="FanClub"
        component={FanPage}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="TermsConditions"
        component={TermsConditions}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Create"
        component={Create}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="SavedItem"
        component={SavedItem}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="MessageRequest"
        component={MessageRequest}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
};
const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: "transparent" },
        animation: "simple_push",
        headerShown: false,
      }}
      initialRouteName="DrawerStack"
    >
      <Stack.Screen name="DrawerStack" component={DrawerStack} />

      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Feedback"
        component={Feedback}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Terms"
        component={Terms}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Liked"
        component={Liked}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Comment"
        component={Comment}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChatScreen"
        component={Chat}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PaymentMethod"
        component={PaymentMethod}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CardDetail"
        component={CardDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FriendProfile"
        component={FriendProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Create"
        component={Create}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LikeList"
        component={LikeList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CertificateList"
        component={CertificateList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CoachCorner"
        component={CoachCorner}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateCoachCorner"
        component={CreateCoachCorner}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FollowingList"
        component={FollowingList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FollowersList"
        component={FollowersList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditPost"
        component={EditPost}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChatInvite"
        component={ChatInvite}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChatList"
        component={ChatList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChatHouseUsers"
        component={ChatHouseUsers}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RequestFanPage"
        component={FanClubRequest}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
const BottomTab = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <TabbarComp {...props} />}
      initialRouteName={"Home"}
    >
      {/* <Tab.Screen
        name="Create"
        component={Create}
        options={{ headerShown: false }}
      /> */}
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Chat House"
        component={ChatHouseForum}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="My Locker"
        component={SavedItem}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

const Navigation = () => {
  const user = useSelector(({ reducer: { user } }) => user);

  //NOTIFICATION

  const RouteTo = (route, data) => {
    let userData;
    let postData;
    if (data?.userId) {
      userData = JSON.parse(JSON.stringify(data?.userId));
    }
    if (data?.postId) {
      postData = JSON.parse(JSON.stringify(data?.postId));
    }
    if (route == "Follow") {
      NavService?.navigate("FollowersList", { id: userData?._id });
    } else if (route == "Like") {
      NavService?.navigate("LikeList", {
        id: postData?._id,
        totalLikes: postData?.totalLikes,
        userId: userData?._id,
      });
    } else if (route == "Comment") {
      NavService?.navigate("Comment", { post_id: postData?._id });
    } else if (route == "coachCorner") {
      NavService?.navigate("CoachCorner");
    }
  };

  const onNewNotification = (remoteMessage, isAppOpen) => {
    if (remoteMessage?.data && isAppOpen) {
      console.log("insideToast", remoteMessage?.notification?.body);
      Toast.show({
        text1: JSON.stringify(remoteMessage?.notification?.body),
        textStyle: { textAlign: "center" },
        type: "success",
        visibilityTime: 5000,
        onPress: RouteTo(remoteMessage?.data?.action, remoteMessage?.data),
      });
    }
  };

  const recieveInitialNotificationMessages = () => {
    messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        console.log("onNotificationOpenedApp1234", remoteMessage);
        await onNewNotification(remoteMessage, false);
      });
  };
  const recieveBackgroundMessages = () => {
    messaging().onNotificationOpenedApp(async (remoteMessage) => {
      console.log(remoteMessage, "onNotificationOpenedApp1234");
      await onNewNotification(remoteMessage, false);
    });
  };
  const recieveForgroundMessages = () => {
    messaging().onMessage(async (remoteMessage) => {
      console.log("onNotificationOpenedApp123477878", remoteMessage);
      await onNewNotification(remoteMessage, true);
    });
  };

  useEffect(() => {
    Orientation.lockToPortrait();
    // recieveInitialNotificationMessages();
    // recieveBackgroundMessages();
    // recieveForgroundMessages();
    setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
  }, []);
  return (
    <ImageBackground source={Images.background} style={{ flex: 1 }}>
      <NavigationContainer
        ref={(ref) => NavService.setTopLevelNavigator(ref)}
        screenOptions={{ animation: "simple_push" }}
      >
        {user && user !== null ? (
          <Stack.Navigator
            screenOptions={{
              contentStyle: { backgroundColor: "transparent" },
              animation: "simple_push",
            }}
            initialRouteName={"AppStack"}
          >
            <Stack.Screen
              name="AppStack"
              component={AppStack}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator
            screenOptions={{
              contentStyle: { backgroundColor: "transparent" },
              animation: "simple_push",
            }}
            initialRouteName={"AuthStack"}
          >
            <Stack.Screen
              name="AuthStack"
              component={AuthStack}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </ImageBackground>
  );
};

export default Navigation;

const styles = StyleSheet.create({
  TabIcon: {
    width: 30,
    height: 30,
    tintColor: Colors.white,
    resizeMode: "contain",
  },
});
