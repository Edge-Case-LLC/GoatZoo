import React, { useState } from "react";
import { useEffect } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";
import { useSelector } from "react-redux";
import Images from "../../../assets/Images";
import AppBackground from "../../../components/AppBackground";
import { Colors, Common, NavService } from "../../../config";
import {
  ApplicationLogsHistory,
  getFollowingList,
  PostFollowUnfollow,
} from "../../../redux/APIs/index";

const FollowingList = ({ route, navigation }) => {
  const user = useSelector((state) => state.reducer.user);
  const [followingList, setFollowingList] = useState([]);
  const { role, id, opposite } = route?.params;
  const getFollowing = async () => {
    let list = [];
    // if (opposite) {
    // list = await getFollowersList(id);
    // console.log(opposite, "if", list);
    // } else {
    list = await getFollowingList(id);
    // console.log(opposite, "else", list);
    // }
    setFollowingList(list);
  };

  const FolowUnfollow = async () => {
    const response = await PostFollowUnfollow(id);
    if (response?.status == 1) {
      await getFollowing();
    }
  };
  useEffect(() => {
    const focusListener = navigation.addListener("focus", () => {
      getFollowing();
      ApplicationLogsHistory('Tracking')
    });
    return () => {
      focusListener();
    };
  }, [navigation]);

  const List = (item) => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 20,
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            marginVertical: 10,
          }}
          onPress={() => {
            item?._id !== user?._id
              ? NavService.navigate("FriendProfile", {
                  name: item?.name,
                  id: item?._id,
                })
              : NavService.navigate("BottomTab", { screen: "Profile" });
          }}
        >
          <Image
            source={
              item?.image
                ? { uri: `${Common?.assetURL}${item?.image}` }
                : Images?.user
            }
            style={styles.profileImage}
          />
          <View style={styles.textContainer}>
            <Text
              style={[
                styles.name,
                { color: user?.role == "athlete" ? "black" : "white" },
              ]}
            >
              {item?.name}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <AppBackground
      title={"Tracking"}
      // title={"Following"}
      back
      notification={false}
      profile={false}
      isCoach={user?.role == "athlete" ? false : true}
    >
      <FlatList
        bounces={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 75 / 2,
        }}
        showsVerticalScrollIndicator={false}
        data={followingList}
        renderItem={({ item, index }) => List(item, index)}
        ItemSeparatorComponent={() => (
          <View style={{ backgroundColor: Colors?.DarkGrey, height: 2 }} />
        )}
        style={{ flex: 1 }}
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
              {/* No following found */}
              No Tracking found
            </Text>
          </View>
        )}
      />
    </AppBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
  },
  headercontainer: {
    flexDirection: "row",
    marginTop: 20,
    marginHorizontal: 20,
    marginLeft: 30,
  },
  profileImage: {
    width: 50,
    height: 50,
    // resizeMode: "contain",
    borderWidth: 1,
    borderRadius: 50 / 2,
  },
  textContainer: {
    marginLeft: 10,
    justifyContent: "center",
  },
  time: {
    fontSize: 12,
    fontWeight: "400",
    color: Colors.DarkGrey,
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    marginLeft: 30,
  },
  name: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  line: {
    width: "100%",
    height: 2,
    backgroundColor: Colors?.DarkGrey,
    marginTop: 10,
  },
  editBtn: {
    width: 30,
    height: 30,
    tintColor: Colors.darkBlue,
    margin: 15,
    marginHorizontal: 0,
  },
});

export default FollowingList;
