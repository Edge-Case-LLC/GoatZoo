import React, { useState } from "react";
import {
  View,
  TextInput,
  Image,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import moment from "moment";
import Toast from "react-native-toast-message";
import Background from "../../../components/Background";
import { Colors, NavService } from "../../../config";
import Icons from "../../../assets/Icons";
import Images from "../../../assets/Images";
import { ApplicationLogsHistory } from "../../../redux/APIs";

const vh = Dimensions.get("window").height * 0.01;

const Like = ({navigation}) => {
  const [likeList, setLikeList] = useState([
    {
      name: "John Smith Lyon",
    },
    {
      name: "Smith Lyon",
    },
    {
      name: "Jessica Smith Jessica Smith Jessica Smith",
    },
  ]);
  useEffect(() => {
    const focusListener = navigation.addListener("focus", () => {
      ApplicationLogsHistory(`Fan Club`)
    });
    return () => {
      focusListener();
    };
  }, [navigation]);

  const _renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => NavService.navigate("FriendProfile")}
        style={styles.innerContainer}
      >
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          <Image source={Images.user} style={styles.userImage} />
          <View style={{ width: "70%" }}>
            <Text
              style={[styles.person, styles.messageContainer]}
              numberOfLines={2}
            >
              {item?.name}
            </Text>
          </View>
        </View>
        <Image
          resizeMode="cover"
          source={Icons.addUser}
          style={[styles.likeIcon]}
        />
      </TouchableOpacity>
    );
  };
  const ItemSeparatorComponent = () => {
    return (
      <View
        style={{
          height: 10,
          borderBottomWidth: 0.4,
          borderBottomColor: "grey",
        }}
      />
    );
  };
  return (
    <Background back={true} title={"Fan Club"} profile={false}>
      <View style={styles.container}>
        <FlatList
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 10 }}
          showsVerticalScrollIndicator={false}
          data={likeList}
          renderItem={_renderItem}
          ItemSeparatorComponent={ItemSeparatorComponent}
        />
      </View>
    </Background>
  );
};

export default Like;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingVertical: 10,
  },
  inputContainer: {
    flexDirection: "row",
    backgroundColor: Colors.white,
    padding: 10,
    paddingBottom: 15,
    alignItems: "center",
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    height: 70,
  },
  attachements: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    marginLeft: 5,
    backgroundColor: Colors.grey,
  },
  inputStyles: {
    flex: 1,
    height: 50,
    marginHorizontal: 10,
    color: "black",
  },
  button: {
    height: 40,
    justifyContent: "center",
  },
  sendText: {
    fontSize: 2.5 * vh,
    color: Colors.blue,
  },
  userImage: {
    width: 6 * vh,
    height: 6 * vh,
    borderRadius: (6 * vh) / 2,
    resizeMode: "contain",
    backgroundColor: Colors.grey,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  likeIcon: {
    width: 3 * vh,
    height: 3 * vh,
    // borderRadius: (4 * vh) / 2,
    // tintColor: Colors.primary,
    backgroundColor: Colors.grey,
  },
  ownContainer: {
    flexWrap: "wrap-reverse",
  },
  messageContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginLeft: 10,
  },
  ownMessageContainer: {
    marginRight: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 0,
  },
  innerContainer: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    alignSelf: "center",
    marginVertical: 6,
  },
  timeText: {
    fontSize: 1.6 * vh,
    marginTop: 2,
    marginLeft: 40,
    color: Colors.darkBlue,
  },
  ownTimeText: {
    alignSelf: "flex-start",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  ownMessage: {
    color: Colors.white,
    fontSize: 1.9 * vh,
  },
  person: {
    fontSize: 1.9 * vh,
    fontWeight: "500",
    color: Colors.black,
  },
});
