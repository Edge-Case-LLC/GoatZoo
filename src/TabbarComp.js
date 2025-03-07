import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from "react-native";
import { connect } from "react-redux";
import { Colors, Icon } from "./config";
import Icons from "./assets/Icons";

class TabBarComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyboardStatus: false,
      isVisible: false,
    };
  }

  componentDidMount() {
    this.showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      this.setState({ keyboardStatus: true });
    });
    this.hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      this.setState({ keyboardStatus: false });
    });
  }
  componentWillUnmount() {
    this.showSubscription.remove();
    this.hideSubscription.remove();
  }
  render() {
    const { state, navigation } = this.props;
    const { keyboardStatus } = this.state;
    console.log(keyboardStatus, "keyboardStatuskeyboardStatus");
    return (
      <>
        {/* <View
          style={{
            backgroundColor: "red",
          }}
        /> */}

        {keyboardStatus == true ? (
          <View
            style={{
              height: 75 / 2,

              // backgroundColor: Colors.orange,
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
            }}
          >
            <View
              style={
                {
                  // flexDirection: "row",
                  // overflow: "hidden",
                  // justifyContent: "space-between",
                  // borderTopRightRadius: 40,
                  // borderTopLeftRadius: 40,
                  // backgroundColor: Colors.orange,
                  // padding: 7.5,
                  // paddingHorizontal: 10,
                }
              }
            >
              {state.routes.map((route, index) => {
                const isFocused = state.index === index;

                const onPress = () => {
                  navigation.navigate(route.name);
                };

                let imageSrc = Icons.home;
                if (route.name === "Profile") imageSrc = Icons.profile;
                if (route.name === "Chat House") imageSrc = Icons.chat;
                if (route.name === "My Locker") imageSrc = Icons.myLocker;
                // if (route.name === "Create") imageSrc = Icons.plus;
                return (
                  <TouchableOpacity
                    key={index}
                    accessibilityState={isFocused ? { selected: true } : {}}
                    accessibilityRole="button"
                    activeOpacity={0.8}
                    onPress={onPress}
                    style={styles.tabs}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        width: "100%",
                        alignItems: "center",
                        // justifyContent: "center",
                        justifyContent: "space-around",
                        padding: 7.5,
                        borderRadius: 20,
                        backgroundColor: isFocused
                          ? Colors.white + "30"
                          : "transparent",
                      }}
                    >
                      <Image
                        source={imageSrc}
                        style={{
                          height: 18,
                          width: 18,
                          tintColor: isFocused ? Colors.white : null,
                          // marginLeft: isFocused
                          //   ? route?.name == "My Locker" ||
                          //     route?.name == "Chat House"
                          //     ? 10
                          //     : 0
                          //   : 0,
                        }}
                        resizeMode="contain"
                      />
                      {isFocused && (
                        <Text
                          style={{
                            color: Colors.white,
                            fontSize: 12,
                            paddingLeft:
                              route?.name == "My Locker" ||
                              route?.name == "Chat House"
                                ? 11
                                : 10,
                            fontWeight: "600",
                            // marginRight: 4,
                          }}
                        >
                          {route.name}
                        </Text>
                      )}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ) : (
          <View
            style={{
              // backgroundColor: Colors.orange,
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                overflow: "hidden",
                justifyContent: "space-between",
                borderTopRightRadius: 40,
                borderTopLeftRadius: 40,
                backgroundColor:
                  this?.props?.user?.role == "coach"
                    ? Colors.orange
                    : this?.props?.user?.role == "athlete"
                    ? Colors.darkBlue
                    : "transparent",
                padding: 7.5,
                paddingHorizontal: 10,
              }}
            >
              {state.routes.map((route, index) => {
                const isFocused = state.index === index;

                const onPress = () => {
                  navigation.navigate(route.name);
                };

                let imageSrc = Icons.home;
                if (route.name === "Profile") imageSrc = Icons.profile;
                if (route.name === "Chat House") imageSrc = Icons.chat;
                if (route.name === "My Locker") imageSrc = Icons.myLocker;
                // if (route.name === "Create") imageSrc = Icons.plus;
                return (
                  <TouchableOpacity
                    key={index}
                    accessibilityState={isFocused ? { selected: true } : {}}
                    accessibilityRole="button"
                    activeOpacity={0.8}
                    onPress={onPress}
                    style={styles.tabs}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        width: "100%",
                        alignItems: "center",
                        // justifyContent: "center",
                        justifyContent: "space-around",
                        padding: 7.5,
                        borderRadius: 20,
                        backgroundColor: isFocused
                          ? Colors.white + "30"
                          : "transparent",
                      }}
                    >
                      <Image
                        source={imageSrc}
                        style={{
                          height: 18,
                          width: 18,
                          tintColor: isFocused ? Colors.white : null,
                          // marginLeft: isFocused
                          //   ? route?.name == "My Locker" ||
                          //     route?.name == "Chat House"
                          //     ? 10
                          //     : 0
                          //   : 0,
                        }}
                        resizeMode="contain"
                      />
                      {isFocused && (
                        <Text
                          style={{
                            color: Colors.white,
                            fontSize: 12,
                            paddingLeft:
                              route?.name == "My Locker" ||
                              route?.name == "Chat House"
                                ? 11
                                : 10,
                            fontWeight: "600",
                            // marginRight: 4,
                          }}
                        >
                          {route.name}
                        </Text>
                      )}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  tabs: {
    flex: 1,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
});

function mapState({ reducer: { user } }) {
  return {
    user,
  };
}

export default connect(mapState, null)(TabBarComp);
