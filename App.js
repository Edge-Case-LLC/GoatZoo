import React, { useEffect } from "react";
import {
  View,
  StatusBar,
  LogBox,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { io } from "socket.io-client";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import messaging from "@react-native-firebase/messaging";
import { Provider } from "react-redux";
import { requestNotifications, openSettings } from "react-native-permissions";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { store } from "./src/redux";
import Navigation from "./src";
import { Colors, Loader, Common } from "./src/config";

LogBox.ignoreAllLogs(true);
LogBox.ignoreLogs(["Remote debugger"]);

const requestNotificationPermission = async () => {
  if (Platform.OS == "android") {
    requestNotifications(["alert", "sound", "badge", "carPlay"]).then(
      ({ status, settings }) => {
        if (status == "granted") {
          console.log("status", status);
        } else if (status == "denied") {
          Toast.show({
            text1: "Please open notification setting to recieve notification",
            type: "error",
            visibilityTime: 5000,
          });
          openSettings();
        } else if (status == "blocked") {
          Toast.show({
            text1: "Please open notification setting to recieve notification",
            type: "error",
            visibilityTime: 5000,
          });
          openSettings();
        }
      }
    );
  }
  const authStatus = await messaging().requestPermission({
    alert: true,
    announcement: false,
    badge: true,
    carPlay: true,
    provisional: false,
    sound: true,
  });
  if (
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL
  ) {
    // getFCMToken();
    // await handleBackgroundMessages();
  } else {
    // alert(' noti disabled’)
  }
};

const saveSocket = () => {
  const socket = io(Common.socketURL);
  store.dispatch({ type: "SET_SOCKET", payload: socket });
};

const App = () => {
  useEffect(() => {
    saveSocket();
    requestNotificationPermission();
  }, []);
  return (
    <Wrapper>
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: "white" }}>
        <StatusBar
          translucent={true}
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <Provider store={store}>
          <Loader />
          <Navigation />
          <Toast config={toastConfig} />
        </Provider>
      </GestureHandlerRootView>
    </Wrapper>
  );
};

export default App;

function Wrapper({ children }) {
  if (Platform.OS === "ios")
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        {children}
      </KeyboardAvoidingView>
    );
  return <View style={{ flex: 1 }}>{children}</View>;
}

const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      text1NumberOfLines={5}
      style={{
        borderLeftColor: Colors.orange,
        maxHeight: 120,
        height: "100%",
        paddingVertical: 20,
      }}
      text1Style={{
        fontSize: 12,
        color: Colors.black,
      }}
      text2Style={{
        fontSize: 18,
        color: Colors.black,
      }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      text1NumberOfLines={5}
      text2NumberOfLines={5}
      style={{
        borderLeftColor: Colors.orange,
        maxHeight: 120,
        height: "100%",
        paddingVertical: 20,
      }}
      text1Style={{
        fontSize: 12,
        // fontFamily: Fonts.regular,
        color: Colors.black,
      }}
    />
  ),
};
