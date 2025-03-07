import { View, Text, Modal, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import CustomTextInput from "../CustomTextInput";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

const CreateFanClub = ({ visible, setVisible, body, setBody, handleSubmit }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      <Pressable
        onPress={() => setVisible(false)}
        style={{
          flex: 1,
          backgroundColor: "rgba(90,90,90,0.8)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Pressable
          onPress={() => ""}
          style={{
            backgroundColor: "#fff",
            minHeight: Dimensions.get("window").height * 0.4,
            width: "90%",
            borderRadius: 20,
          }}
        >
          <CustomTextInput
            placeholder="Enter Fanclub name"
            setWidth={true}
            labelStyles={{ color: "black", marginLeft: 10 }}
            asterick={true}
            label="FanClub Name"
            isPassword={false}
            value={body?.name}
            onChangeText={(val) =>
              setBody({
                ...body,
                name: val,
              })
            }
          />
          <CustomTextInput
            placeholder="Enter Fanclub description"
            setWidth={true}
            labelStyles={{ color: "black", marginLeft: 10 }}
            asterick={true}
            label="FanClub Description"
            isPassword={false}
            value={body?.description}
            onChangeText={(val) =>
              setBody({
                ...body,
                description: val,
              })
            }
          />
          <Text
            style={{
              marginRight: "auto",
              alignSelf: "flex-end",
              height: 20,
              justifyContent: "flex-end",
              marginVertical: 5,
              color: "black",
              fontSize: 15,
              fontWeight: "600",
              marginLeft: 10,
              marginTop: 20,
            }}
          >
            Private Fan Club*
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "50%",
              marginLeft: 20,
            }}
          >
            <Pressable
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={()=>setBody({
                ...body,
                is_private: true
              })}
            >
              <FontAwesome name={body.is_private?"dot-circle-o":"circle-o"} size={20} color="#000" />
              <Text
                style={{
                  color: "#000",
                  fontSize: 16,
                  marginLeft: 10,
                }}
              >
                Yes
              </Text>
            </Pressable>
            <Pressable
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={()=>setBody({
                ...body,
                is_private: false
              })}
            >
              <FontAwesome name={!body.is_private?"dot-circle-o":"circle-o"} size={20} color="#000" />
              <Text
                style={{
                  color: "#000",
                  fontSize: 16,
                  marginLeft: 10,
                }}
              >
                No
              </Text>
            </Pressable>
          </View>
          <View>
            <TouchableOpacity
              style={{
                width: "80%",
                backgroundColor: "#5bc0de",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
                alignSelf: "center",
                borderRadius: 20,
                paddingVertical: 10,
              }}
              onPress={handleSubmit}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 14,
                }}
              >
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default CreateFanClub;
