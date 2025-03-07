import React, { useState } from "react";
import { useEffect } from "react";
import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";
import { useSelector } from "react-redux";
import Icons from "../../../assets/Icons";
import Images from "../../../assets/Images";
import AppBackground from "../../../components/AppBackground";
import { Colors, Common, NavService } from "../../../config";
import {
  ApplicationLogsHistory,
  getlikeList,
  loaderStart,
  loaderStop,
  PostFollowUnfollow,
} from "../../../redux/APIs/index";
const LikeList = ({ route, navigation }) => {
  const user = useSelector((state) => state.reducer.user);
  const [likeList, setListList] = useState([]);
  const totalLikes = route?.params?.totalLikes;
  const getLikes = async () => {
    const list = await getlikeList(route?.params?.id);
    loaderStart();
    setListList(list);
    loaderStop();
  };
  const FolowUnfollow = async (id) => {
    const response = await PostFollowUnfollow(id);
    if (response?.status == 1) {
      await getLikes();
    }
  };
  useEffect(() => {
    const focusListener = navigation.addListener("focus", () => {
      getLikes();
      ApplicationLogsHistory(`Fan Club`)
    });
    return () => {
      focusListener();
    };
  }, []);

  const Header = () => {
    return (
      <View style={{}}>
        <View style={styles?.line}></View>
        <View style={[styles.headercontainer, { marginTop: 10 }]}>
          <Image
            source={Icons.thumbsUp}
            resizeMode={"contain"}
            style={{
              width: 25,
              height: 25,
              tintColor: Colors.blue,
              marginRight: 10,
            }}
          />
          <Text
            style={[
              styles.name,
              {
                marginTop: 2,
                color: user?.role == "athlete" ? "black" : "white",
              },
            ]}
          >
            {totalLikes}
          </Text>
        </View>
        <View style={styles?.line}></View>
      </View>
    );
  };
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
          onPress={() =>
            NavService.navigate("FriendProfile", {
              name: item?.name,
              id: item?._id,
            })
          }
        >
          <Image
            source={
              item?.data?.image || item?.image
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
        {item?.isFriend !== undefined ? (
          <TouchableOpacity
            onPress={() => {
              FolowUnfollow(item?._id);
            }}
          >
            <Image
              source={
                item?.isFriend !== undefined && item?.isFriend == 1
                  ? Icons.unfollow
                  : Icons.follow
              }
              style={styles.editBtn}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    );
  };
  return (
    <AppBackground
      title={"Fan Club"}
      back
      notification={false}
      profile={false}
      isCoach={user?.role == "athlete" ? false : true}
    >
      <FlatList
        contentContainerStyle={{
          flexGrow: 1,
        }}
        style={{ flex: 1 }}
        ListHeaderComponent={Header}
        bounces={false}
        showsVerticalScrollIndicator={false}
        data={likeList}
        renderItem={({ item, index }) => List(item, index)}
        ItemSeparatorComponent={() => (
          <View style={{ backgroundColor: Colors?.DarkGrey, height: 2 }} />
        )}
        ListEmptyComponent={() => (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "black" }}>No list found</Text>
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
    resizeMode: "contain",
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

export default LikeList;
