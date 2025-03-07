import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, View, Text } from "react-native";
import { useSelector } from "react-redux";
import AppBackground from "../../../components/AppBackground";
import Card from "../../../components/Card";
import { ApplicationLogsHistory, getPostSavedInLocker } from "../../../redux/APIs";

const SavedItem = ({ navigation }) => {
  const user = useSelector((state) => state.reducer.user);
  const [postData, setPostData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const ListEmptyComponent = () => {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: user?.role == "coach" ? "white" : "black" }}>
          No post found
        </Text>
      </View>
    );
  };
  const getSavedPosts = async () => {
    const data = await getPostSavedInLocker();
    if (data?.status == 1) {
      await setPostData(data?.locker);
    } else {
      setPostData([]);
    }
  };
  useEffect(() => {
    const focusListener = navigation.addListener("focus", () => {
      getSavedPosts();
      ApplicationLogsHistory('My Locker')
    });
    return () => {
      focusListener();
    };
  }, [navigation]);
  console.log(postData?.user?.role,'postData');
  return (
    <AppBackground
      profile={false}
      title={"My Locker"}
      menu
      notification={false}
      childrenContainerStyle={{
        marginHorizontal: 0,
        marginBottom: 0,
      }}
      isCoach={user && user?.role == "athlete" ? false : true}
    >
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={async () => {
              setRefreshing(true);
              await getSavedPosts();
              setRefreshing(false);
            }}
          />
        }
        ListEmptyComponent={<ListEmptyComponent />}
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 20,
          paddingBottom: 100 ,
        }}
        showsVerticalScrollIndicator={false}
        data={postData}
        renderItem={(item) => {
          return (
            <Card
              item={item?.item}
              getAllPosts={() => getSavedPosts()}
              showDots
            />
          );
        }}
      />
    </AppBackground>
  );
};

export default SavedItem;

const styles = StyleSheet.create({});
