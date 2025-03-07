import React, { useEffect } from "react";
import { View, TextInput, Image, TouchableOpacity, Text } from "react-native";
import Icons from "../assets/Icons";
import { Colors, Shadows } from "../config";
import NavService from "../config";
import { useNavigation } from "@react-navigation/native";
const Search = ({
  onChangeText = () => {},
  setModalVisible,
  home,
  noFilter,
  searchtext,
  searchedItem,
  setSearchList,
  clickItem,
  SearchHistorLog = () => {},
  setActiveId,
}) => {
  const navigation = useNavigation();
  const [search, setSearch] = React.useState();

  useEffect(() => {
    if (clickItem) {
      setSearch(clickItem);
    }
  }, [clickItem]);
  return (
    <View
      style={[
        {
          backgroundColor: Colors.background,
          height: 50,
          marginTop: 15,
          paddingHorizontal: 20,
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 10,
          borderRadius: 5,
          ...Shadows.shadow3,
          width: "100%",
          // ...style,
        },
      ]}
    >
      {home ? (
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => {
            navigation.navigate("SearchScreen");
          }}
        >
          <Text style={{ color: Colors.DarkGrey, fontSize: 16 }}>
            Search...
          </Text>
        </TouchableOpacity>
      ) : (
        <TextInput
          onChangeText={(text) => {
            if (text) {
              searchedItem(text);
              setSearch(text);
              onChangeText(text);
            } else {
              setSearch("");
              searchedItem(text);
              setSearchList([]);
              setModalVisible(false);
              SearchHistorLog();
              setActiveId("post");
            }
          }}
          returnKeyType="search"
          placeholder={"Search..."}
          value={search}
          placeholderTextColor={Colors.DarkGrey}
          style={{
            flex: 1,
            color: Colors.secondary,
            fontSize: 16,
          }}
          maxLength={20}
        />
      )}
      <TouchableOpacity
        onPress={() => {
          if (searchtext) {
            searchtext(search);
          } else {
            // setModalVisible(true);
          }
        }}
      >
        <Image
          source={noFilter ? Icons.search_new : null}
          style={{ height: 20, width: 20, resizeMode: "contain" }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Search;
