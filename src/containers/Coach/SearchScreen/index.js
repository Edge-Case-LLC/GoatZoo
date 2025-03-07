import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Colors, Common, NavService } from "../../../config";
import Search from "../../../components/Search";
import Card from "../../../components/Card";
import Images from "../../../assets/Images";
import AppBackground from "../../../components/AppBackground";
import { useSelector } from "react-redux";
import {
  ApplicationLogsHistory,
  DeleteSearchHistory,
  getSearchList,
  PostFollowUnfollow,
  saveSearchRecord,
  SearchHistory,
} from "../../../redux/APIs";
import List from "../../../components/UserList";
import Icons from "../../../assets/Icons";
import ConfirmationPopup from "../../../components/Modal/ConfirmationPopUp";
const { width, height } = Dimensions.get("screen");

const SearchScreen = ({ navigation }) => {
  const user = useSelector((state) => state.reducer.user);
  const [isModalVisible, setModalVisible] = useState(false);
  const [activeId, setActiveId] = useState("post");
  const [searchList, setSearchList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchLogs, setSearchLogs] = useState([]);
  const [clickItem, setClickItem] = useState("");
  const [id, setId] = useState("");
  const [key, setKey] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);
  console.log(searchList,'searchList');

  const FolowUnfollow = async (id) => {
    const response = await PostFollowUnfollow(id);
    
    if (response?.status == 1) {
      await SearchData(searchText, "people");
    }
  };

  const ToggleButton = ({ active, onPress, label }) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={{
          backgroundColor: active ? Colors.darkBlue : Colors.grey,
          marginRight: 20,
          width: 70,
          height: 30,
          borderRadius: 6,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: active ? Colors.white : Colors.black,
          }}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    SearchHistorLog();
    const focusListener = navigation.addListener("focus", () => {
      ApplicationLogsHistory("Search");
    });
    return () => {
      focusListener();
    };
  }, [navigation]);

  const SearchData = async (text, type) => {
    setSearchList([]);
    if (text) {
      setSearchText(text);
      // const SaveSearchedItems = await saveSearchRecord(text, activeId);
      const SearchedItems = await getSearchList(text, activeId);
      if (activeId === "people" || activeId === "location") {
        if (SearchedItems && SearchedItems.posts) {
          setSearchList(SearchedItems.posts);
          setModalVisible(true);
        }
      } else if (activeId === "post") {
        if (SearchedItems && SearchedItems.posts) {
          setSearchList(SearchedItems.posts);
          setModalVisible(true);
        }
      }
    } else {
      setSearchList([]);
    }
  };

  const SearchHistorLog = async () => {
    const searchHistory = await SearchHistory();
    setSearchLogs(searchHistory);
  };

  const DeleteHandler = async (id) => {
    await DeleteSearchHistory(id);
    SearchHistorLog();
  };

  return (
    <AppBackground
      title={"Search Results"}
      back={true}
      isCoach={user && user?.role == "athlete" ? false : true}
      notification={false}
    >
      <View
        style={{
          paddingHorizontal: 20,
          flex: 1,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Search
            clickItem={clickItem}
            searchedItem={(text) => setSearchText(text)}
            setModalVisible={setModalVisible}
            noFilter
            searchtext={(text) => SearchData(text)}
            setSearchList={setSearchList}
            SearchHistorLog={SearchHistorLog}
            setActiveId={setActiveId}
          />
        </View>
        {isModalVisible ? (
          <>
            <ScrollView
              style={{ height: 40, flexGrow: 0 }}
              contentContainerStyle={{ flexGrow: 0 }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <ToggleButton
                active={activeId === "post"}
                onPress={() => {
                  SearchData(searchText, "post");
                  setActiveId("post");
                }}
                label="Posts"
              />
              <ToggleButton
                active={activeId === "people"}
                onPress={() => {
                  SearchData(searchText, "people");
                  setActiveId("people");
                }}
                label="People"
              />
              <ToggleButton
                active={activeId === "location"}
                onPress={() => {
                  SearchData(searchText, "location");
                  setActiveId("location");
                }}
                label="Location"
              />
            </ScrollView>
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
                    style={{
                      color: user?.role == "athlete" ? "black" : "white",
                    }}
                  >
                    {activeId == "people"
                      ? "No user found"
                      : activeId == "post"
                      ? "No post found"
                      : "No data found"}
                  </Text>
                </View>
              )}
              contentContainerStyle={{
                paddingBottom: 50,
                flexGrow: 1,
              }}
              style={{ flex: 1 }}
              showsVerticalScrollIndicator={false}
              data={searchList}
              renderItem={(item, index) => {
                const itemData = item?.item;
                console.log(itemData, "==opoo");
                return activeId == "post" ? (
                  <Card
                    item={item.item}
                    getAllPosts={() => {
                      SearchData(searchText, activeId);
                    }}
                  />
                ) : (
                  <View style={styles.card}>
                    <View style={[styles.header]}>
                      <TouchableOpacity
                        onPress={() =>
                          user?._id !== itemData?._id
                            ? NavService.navigate("FriendProfile", {
                                name: itemData?.name,
                                item: itemData?.user,
                                id: itemData?._id,
                                role: user?.role,
                                isfriend: itemData?.isFriend,

                                name: item?.userName,
                              })
                            : NavService.navigate("BottomTab", {
                                screen: "Profile",
                              })
                        }
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            width: "100%",
                          }}
                        >
                          <Image
                            source={
                              itemData?.image?.length > 0
                                ? {
                                    uri: `${Common?.assetURL}${itemData?.image}`,
                                  }
                                : Images?.user
                            }
                            style={styles.profileImage}
                          />
                          <View style={styles.textContainer}>
                            <Text style={styles.name}>
                              {itemData?.name?.length > 25
                                ? itemData?.name?.slice(0, 25) + "..."
                                : itemData?.name}
                            </Text>
                            <Text style={styles.country}>
                              {itemData?.country?.length > 25
                                ? itemData?.country?.slice(0, 25) + "..."
                                : itemData?.country}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>

                      {itemData?._id !== user?._id ? (
                        itemData?.isFriend !== "undefined" ||
                        itemData?.isFriend !== undefined ? (
                          <TouchableOpacity
                            onPress={() => {
                              FolowUnfollow(itemData?._id);
                            }}
                            style={{
                              marginRight: "auto",
                              alignSelf: "center",
                            }}
                          >
                            <Text
                              style={{
                                color: Colors?.orange,
                                fontSize: 14,
                                fontWeight: "600",
                              }}
                            >
                              {(itemData?.isFriend !== "undefined" ||
                                itemData?.isFriend !== undefined) &&
                              itemData?.isFriend == 0
                                ? // ? "Follow"
                                  "Track"
                                : // : "Unfollow"}
                                  "Untrack"}
                            </Text>
                          </TouchableOpacity>
                        ) : null
                      ) : null}
                    </View>
                  </View>
                );
              }}
            />
          </>
        ) : (
          <FlatList
            key={key}
            style={{ flex: 1 }}
            contentContainerStyle={{ marginHorizontal: 10, flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            data={searchLogs}
            ItemSeparatorComponent={() => {
              return <View style={styles.separator} />;
            }}
            keyExtractor={(item, index) => item._id}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => {
                  setClickItem(item?.name);
                }}
                style={styles.flexRow}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={Icons.clock}
                    style={[
                      styles.clock,
                      {
                        tintColor:
                          user && user?.role == "athlete"
                            ? Colors.grey
                            : Colors.white,
                      },
                    ]}
                  />
                  <Text
                    numberOfLines={1}
                    style={[
                      styles.LogName,
                      {
                        color:
                          user && user?.role == "athlete"
                            ? Colors.black
                            : Colors.white,
                      },
                    ]}
                  >
                    {item?.name}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setId(item?._id);
                    // DeleteHandler(item?._id);
                    setConfirmationModal(true);
                  }}
                >
                  <Image
                    resizeMode="contain"
                    source={Icons.trash}
                    style={[
                      styles.trash,
                      {
                        tintColor:
                          user && user?.role == "athlete"
                            ? Colors.black
                            : Colors.white,
                      },
                    ]}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
      <ConfirmationPopup
        visible={confirmationModal}
        toggleVisibility={() => {
          setConfirmationModal(!confirmationModal);
        }}
        subTitle="Are you sure, you want to delete?"
        onAccept={() => {
          DeleteHandler(id);
        }}
      />
    </AppBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  cardContainer: {
    flexDirection: "row",
  },
  profileImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    borderColor: Colors?.darkBlue,
    borderWidth: 2,
    borderRadius: 60 / 2,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  likes: {
    marginLeft: 8,
    fontSize: 12,
    color: Colors.darkBlue,
    marginTop: 2,
  },
  textbox: {
    marginLeft: 10,
    marginTop: 18,
  },
  name: {
    fontSize: 17,
    fontWeight: "700",
  },
  des: {
    color: Colors?.DarkGrey,
    fontSize: 12,
    marginVertical: 10,
  },
  dot: {
    width: 15,
    height: 20,
    resizeMode: "contain",
    tint: Colors.black,
  },
  menu: {
    backgroundColor: Colors.grey,
    width: width * 0.3,
    padding: 5,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    position: "absolute",
    right: 11,
    top: 15,
    alignItems: "center",
    zIndex: 1000,
  },
  menuText: {
    fontSize: 11,
    color: Colors.black,
    fontWeight: "400",
    lineHeight: 20,
    // textAlign:'center'
  },

  //CARD
  card: {
    ...Shadows.shadow5,
    borderRadius: 10,
    paddingVertical: 10,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    marginTop: 20,
    position: "relative",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
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
    width: "70%",
  },
  time: {
    fontSize: 12,
    fontWeight: "400",
    color: Colors.DarkGrey,
  },
  name: { fontSize: 15, fontWeight: "600" },
  country: { fontSize: 12, color: "grey" },
  dot: {
    width: 15,
    height: 20,
    resizeMode: "contain",
    tint: Colors.black,
  },
  footer: {
    flexDirection: "row",
    marginTop: 5,
    alignItems: "center",
    borderTopWidth: 0.4,
    borderColor: "lightgrey",
    paddingTop: 10,
  },
  videoStyle: {
    width: "100%",
    height: 270,
    backgroundColor: Colors.grey,
  },
  likes: {
    marginLeft: 10,
    fontSize: 13,
    color: Colors.DarkGrey,
  },
  post: {
    flex: 1,
    fontSize: 14,
    fontWeight: "300",
    color: Colors.black,
    justifyContent: "center",
  },
  menu: {
    backgroundColor: Colors.grey,
    width: width * 0.3,
    padding: 5,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    position: "absolute",
    right: 11,
    top: 10,
    alignItems: "center",
    zIndex: 1000,
  },
  menuText: {
    fontSize: 11,
    color: Colors.black,
    fontWeight: "400",
    lineHeight: 20,
    // textAlign:'center'
  },
  parentContainerView: {
    height: height * 0.2,
    marginBottom: 10,
    marginTop: 5,
  },
  videoContainer: {
    borderRadius: 30,
    width: "100%",
    height: height * 0.4,
    marginVertical: 8,
  },
  videoIcon: {
    position: "absolute",
    top: "40%",
    left: "43%",
    right: "40%",
  },
  listEmtyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  clock: {
    width: 30,
    height: 30,
    tintColor: Colors.DarkGrey,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    justifyContent: "space-between",
  },
  LogName: {
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 20,
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC",
  },
  trash: {
    width: 20,
    height: 20,
  },
});
export default SearchScreen;
