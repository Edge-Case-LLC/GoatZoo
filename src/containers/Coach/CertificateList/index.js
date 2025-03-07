import React, { useEffect } from "react";
import {
  Image,
  Linking,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";
import { useSelector } from "react-redux";
import Images from "../../../assets/Images";
import AppBackground from "../../../components/AppBackground";
import Common from "../../../config/Common";
import DocumentExtensionIcon from "../../../components/documentExtensionIcon";
import { Colors } from "../../../config";
import { ApplicationLogsHistory } from "../../../redux/APIs";

const CertificateList = ({ route, navigation }) => {
  const certificateData = route?.params?.data;
  const data = route?.params?.dataitem;
  const userData1 = route?.params?.dataitem;
  console.log(userData1?.user?.role, "userData1userData1");

  // userData?.user
  console.log(data.role, "datadatadata");

  console.log(certificateData, "----itemitem");

  const user = useSelector((state) => state.reducer.user);
  const RenderList = ({ item }) => {
    console.log(item, "----itemitem");

    const extension = String(item)?.split(".")?.pop();
    return (
      <View
        style={[
          styles.wrapper,
          item?.id % 2 === 0
            ? {
                paddingLeft: 10,
              }
            : {
                paddingRight: 10,
              },
        ]}
      >
        {extension == "jpg" || extension == "jpeg" || extension == "png" ? (
          <Image
            resizeMode="cover"
            style={styles.backgroundForDocx}
            source={{ uri: `${Common?.assetURL}${item}` }}
          />
        ) : (
          <TouchableOpacity
            onPress={() => Linking.openURL(`${Common?.assetURL}${item}`)}
          >
            <Image
              resizeMode="cover"
              style={[styles.backgroundForDocx, { opacity: 0.8 }]}
              source={Images?.background}
            />
            <DocumentExtensionIcon
              extension={extension}
              IconSize={70}
              styles={styles.icon}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  };
  useEffect(() => {
    const focusListener = navigation.addListener("focus", () => {
      ApplicationLogsHistory("Awards & Trophies");
    });
    return () => {
      focusListener();
    };
  }, [navigation]);
  // console.log(item, "----itemitem");

  return (
    <AppBackground
      title={
        data.role == "athlete" || userData1?.user?.role == "athlete"
          ? "Awards & Trophies"
          : "Credentials and Awards"
      }
      back
      notification={false}
      isCoach={user && user?.role == "athlete" ? false : true}
    >
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
              style={{ color: user?.role == "athlete" ? "black" : "white" }}
            >
              No Awards & Trophies found
            </Text>
          </View>
        )}
        style={{ marginHorizontal: 20, flex: 1 }}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        numColumns={2}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        data={certificateData}
        renderItem={({ item }) => <RenderList item={item} />}
      />
    </AppBackground>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: "50%",
    height: 150,
    borderRadius: 10,
    marginVertical: 10,
  },
  backgroundForDocx: {
    width: "100%",
    height: 150,
    borderRadius: 20,
  },
  icon: {
    position: "absolute",
    top: 40,
    left: 60,
  },
});
export default CertificateList;
