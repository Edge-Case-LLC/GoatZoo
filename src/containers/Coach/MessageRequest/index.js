import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect } from "react";
import AppBackground from "../../../components/AppBackground";
import { useSelector } from "react-redux";
import { InviteForChat, MessageRequestList } from "../../../redux/APIs";
import Icons from "../../../assets/Icons";
import CustomButton from "../../../components/CustomButton";
import { Colors, Common, size } from "../../../config";
import { useState } from "react";
import moment from "moment";

const vh = Dimensions.get("window").height * 0.01;
const MessageRequest = () => {
  const user = useSelector((state) => state.reducer.user);
  const [requestList, setRequestList] = useState([]);
  const ListEmptyComponent = () => {
    return (
      <View style={styles.listEmptyMainContainer}>
        <Text style={{ color: user?.role == "athlete" ? "black" : "white" }}>
          No Message Request found
        </Text>
      </View>
    );
  };
  const requestHandler = async () => {
    const data = await MessageRequestList();
    setRequestList(data);
  };
  useEffect(() => {
    requestHandler();
  }, []);
  const callback = (id,type,) => {
    console.log(type,id,'==type,id');
    InviteForChat(id,type)
    requestHandler()
  }
  return (
    <AppBackground
      profile={false}
      title={"Message Request"}
      isCoach={user && user?.role == "athlete" ? false : true}
      back
    >
      <FlatList
        // style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        data={requestList}
        ListEmptyComponent={<ListEmptyComponent />}
        ItemSeparatorComponent={() => {
          return <View style={styles.separator} />;
        }}
        keyExtractor={(item) => {
          return item.id;
        }}
        renderItem={({ item,index }) => {
          return (
            <TouchableOpacity
            key={index}
              activeOpacity={0.8}
              onPress={() => {
                // RouteTo(item?.type, item);
              }}
              style={styles.innerContainer}
            >
              <View style={styles.main}>
                <Image
                  resizeMode="contain"
                  style={styles.userImage}
                  source={
                    item?.sender_id?.image !== null
                      ? `${Common.assetURL}${item?.sender_id?.image}`
                      : Icons.user
                  }
                />
                <View >
                 <Text style={styles.name}>{item?.sender_id?.name}</Text>
                </View>
                <View style={styles.buttonContainer}>
                <CustomButton
                  onPress={() => {
                    callback(item?._id, "reject");
                  }}
                  title="Reject"
                  buttonStyle={[styles.pressAble1]}
                  textStyle={{ fontSize: size.xtiny, fontWeight: "400" }}
                />
                <CustomButton
                  onPress={() => {
                    callback(item?._id, "accept");
                  }}
                  title="Accept"
                  buttonStyle={[styles.pressAble]}
                  textStyle={{ fontSize: size.xtiny, fontWeight: "400" }}
                />
              </View>
              </View>
     
            </TouchableOpacity>
          );
        }}
      />
    </AppBackground>
  );
};

export default MessageRequest;

const styles = StyleSheet.create({
  listEmptyMainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC",
  },

  underline: {
    textDecorationLine: "underline",
    color: Colors.primary,
    fontWeight: "800",
    marginLeft: 5,
  },
  userImage: {
    width: 6 * vh,
    height: 6 * vh,
    // right: 7,
    borderRadius: (6 * vh) / 2,
    resizeMode: "contain",
    marginVertical: 5,
    // backgroundColor: Colors.grey,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    borderWidth: 1.5,
    borderColor: Colors?.primary,
  },
  acceptText: {
    backgroundColor: "red",
  },
  pressAble: {
    width: "30%",
    height: 32,
    marginHorizontal: 2,
    left: 54,
    bottom: 10,
  },
  pressAble1: {
    width: "30%",
    height: 32,
    marginHorizontal: 2,
    left: 47,
    bottom: 10,
    backgroundColor: Colors.secondary,
  },

  name: {
    color: Colors.black,
    fontSize: size.tiny,
    bottom: 5,
    // alignSelf:'center'
  },
  innerContainer: {
    marginTop: 10,
    width: "94%",
    alignSelf: "center",
    paddingHorizontal:10,
    marginVertical:10
  },
  day: {
    color: Colors.gray,
    fontSize: size.tiny,
    left: 27,
  },
  main: {
    flexDirection: "row",
    // flexWrap: "wrap",
    // width: "100%",
    alignItems: "center",
    justifyContent:"space-between",
  },
  buttonContainer: {
    flexDirection: "row",
    marginLeft:"10%"
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  button: {
    backgroundColor: Colors.secondary,
    borderRadius: 20,
    height: 30,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  friendText: {
    color: Colors.primary,
    fontSize: size.tiny,
    left: 5,
    bottom: 5,
    fontWeight: "500",

    textDecorationLine: "underline",
  },
  buttonText: {
    color: "white",
    fontSize: size.large,
  },
});
