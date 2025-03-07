import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  SectionList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getFanClubRequest, handleFanClubRequest } from "../../../redux/APIs";
import Images from "../../../assets/Images";
import Common from "../../../config/Common";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import IonIcon from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";

const FanClubRequest = ({ navigation }) => {
  const [fanClubRequest, setFanClubRequest] = useState([]);
  const retriveRequest = async () => {
    try {
      const data = await getFanClubRequest();
      setFanClubRequest(data);
    } catch (error) {
      console.log("Error in retriving: ", error);
    }
  };
  useEffect(() => {
    const subscribe = navigation.addListener("focus", () => {
      retriveRequest();
    });
    return subscribe;
  }, []);
  useEffect(() => {
    console.log("fanClubRequest: ", fanClubRequest);
  }, [fanClubRequest]);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 20,
        }}
      >
        <Pressable
          onPress={navigation.goBack}
          style={{
            marginTop: 10,
            width: 40,
            height: 40,
            borderRadius: 20,
            borderWidth: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IonIcon name="arrow-back" color={"#000"} size={20} />
        </Pressable>
        <Text
          style={{
            color: "black",
            fontSize: 20,
            paddingHorizontal: 20,
            fontWeight: "900",
            marginTop: 10,
          }}
        >
          Fan Club Requests
        </Text>
      </View>
      <View style={{
        flex: 0.7
      }}>
        <FlatList
        bounces={false}
          data={fanClubRequest}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => (
            <View style={{ alignItems: "center" }}>
              {item.requests.map((element, index) => (
                <View
                  style={{
                    width: "90%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: 'space-between',
                    borderWidth: 1,
                    marginTop: 10,
                    padding: 10,
                    borderRadius: 10
                  }}
                  key={index}
                >
                  <View>
                    <Image
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        resizeMode: "contain",
                      }}
                      source={
                        element?.image
                          ? { uri: Common.assetURL + element.image }
                          : Images.user
                      }
                    />
                  </View>
                  <View style={{
                    width: '50%'
                  }}>
                    <Text>
                      {element?.name} wants to join {item?.name}
                    </Text>
                  </View>
                  <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '20%',
                    justifyContent: 'space-between'
                  }}>
                    <TouchableOpacity onPress={() => handleFanClubRequest(item._id,element._id, true,retriveRequest)}>
                        <IonIcon name="checkmark-circle-outline" color="#000" size={30} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleFanClubRequest(item._id,element._id, true,retriveRequest)}>
                        <Entypo name="circle-with-cross" color="red" size={30} />
                    </TouchableOpacity>
                  </View>  
                </View>
              ))}
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default FanClubRequest;
