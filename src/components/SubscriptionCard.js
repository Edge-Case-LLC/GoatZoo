import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Colors } from "../config";
import { color } from "react-native-reanimated";
import { useState } from "react";


const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

const SubscriptionCard = ({item}) => {
  return (
      <View style={styles.card}>
      <View style={[styles.tag,{backgroundColor:item.color}]}>
        <Text style={styles.tagText} >{item.title}</Text>
      </View>
        <View style={styles.header}>
          <Text style={styles.des}>
            {item.des}
          </Text>
        </View>
        <View style={[styles.footer,{backgroundColor:item.color}]}>
          <Text style={styles.year}>{item.price}</Text>
        </View>
      </View>
  );
};

export default SubscriptionCard;

const styles = StyleSheet.create({
  card: {
    ...Shadows.shadow5,
    borderRadius: 10,
    backgroundColor: Colors.white,
    width: width * 0.8,
    position: "relative",
    marginVertical: 20
  },
  header: {
    padding: 25,
  },
  footer: {
    backgroundColor: "green",
    paddingVertical: 15,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  year: {
    fontWeight: "800",
    textAlign: "center",
    color: Colors.white,
    fontSize: 20,
  },
  des: {
    color: "gray",
    textAlign: "center",
    paddingTop: 15
  },
  tag: {
    width: width * 0.5,
    backgroundColor: "green",
    padding: 10,
    alignSelf: "center",
    borderRadius: 10,
    position: "absolute",
    top: -20,
  },
  tagText: {
    color: Colors.white,
    fontWeight: "700",
    fontSize: 18,
    textAlign: "center",
  },
});
