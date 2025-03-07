import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Pressable,
} from "react-native";
import React from "react";
import AppBackground from "../../../components/AppBackground";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { connect, useDispatch } from "react-redux";
import { useEffect } from "react";
import { createFanClub, getAllFanClub, joinFanClub } from "../../../redux/APIs";
import { useState } from "react";
import Toast from "react-native-toast-message";
import CreateFanClub from "../../../components/Modal/CreateFanClub";

const FanPage = ({ user, navigation, fanclub }) => {
  const [fanClubs, setFanClubs] = useState([]);
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const [body, setBody] = useState({
    name: "",
    description: "",
    is_private: false,
  });
  const allFanClubs = async () => {
    const response = await getAllFanClub();
    if (response?.length > 0) {
      const myClub = response.filter((item) => item.admin._id === user._id);
      const finalMyClubIds = myClub.map((item) => item._id);
      // console.log("My_Club: ", myClub)
      dispatch({ type: "FANCLUB", payload: finalMyClubIds });
      setFanClubs(response);
    } else {
      Toast.show({
        type: "error",
        text1: "Fan Club Error",
        text2: "Can't Fetch Fanclubs.",
      });
    }
  };
  useEffect(() => {
    const subscribe = navigation.addListener("focus", () => {
      allFanClubs();
    });
    return subscribe;
  }, []);
  useEffect(() => {
    console.log("FANCLUB: ", fanclub);
  }, [fanclub]);

  return (
    <AppBackground>
      <View style={styles.row}>
        <Text style={styles.title}>Fan Clubs</Text>
        <TouchableOpacity onPress={() => setVisible(!visible)}>
          <AntDesign name="pluscircleo" color="#fff" size={25} />
        </TouchableOpacity>
      </View>
      <View>
        <Pressable
          onPress={() => navigation.navigate("RequestFanPage")}
          style={{
            width: "90%",
            alignSelf: "center",
            marginTop: 10,
          }}
        >
          <Text
            style={{
              color: "white",
            }}
          >
            Press to view my Fanclub joining Requests
          </Text>
        </Pressable>
        <View
          style={{
            height: "90%",
          }}
        >
          <FlatList
            automaticallyAdjustContentInsets
            data={fanClubs}
            renderItem={({ item }) => {
              const member = item.members.findIndex((e) => e._id === user._id);
              const request = item.requests.findIndex(
                (e) => e._id === user._id
              );
              return (
                <View
                  style={{
                    width: "85%",
                    alignSelf: "center",
                    marginTop: 20,
                    backgroundColor: "#fff",
                    padding: 15,
                    borderRadius: 10,
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        color: "#000",
                        fontSize: 15,
                      }}
                    >
                      {item?.name}
                    </Text>
                    {fanclub.includes(item._id) || member > -1 ? (
                      <Pressable onPress={()=>navigation.navigate('ChatScreen', {data: {...item, type: 'fanClub'}})}>
                       <AntDesign name="wechat" color="#000" size={20} />
                      </Pressable>
                    ) : request > -1 ? (
                      <Text
                        style={{
                          color: "orange",
                        }}
                      >
                        Requested
                      </Text>
                    ) : (
                      <TouchableOpacity
                        onPress={() => joinFanClub(item._id, allFanClubs)}
                      >
                        <FontAwesome5 name="user-plus" color="#000" size={22} />
                      </TouchableOpacity>
                    )}
                  </View>
                  <Text
                    style={{
                      color: "#000",
                      fontSize: 15,
                    }}
                  >
                    {item?.description}
                  </Text>
                  <Text
                    style={{
                      color: "gray",
                      fontSize: 12,
                    }}
                  >
                    created by {item?.admin?.name}
                  </Text>
                </View>
              );
            }}
            keyExtractor={(item) => item?._id}
          />
        </View>
      </View>
      <CreateFanClub
        handleSubmit={() => createFanClub(body, allFanClubs)}
        visible={visible}
        setVisible={setVisible}
        body={body}
        setBody={setBody}
      />
    </AppBackground>
  );
};

function mapStateToProps({ reducer: { user, fanclub } }) {
  return {
    user,
    fanclub,
  };
}

const actions = {};

export default connect(mapStateToProps, actions)(FanPage);

const styles = StyleSheet.create({
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
});
