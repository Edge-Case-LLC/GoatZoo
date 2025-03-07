import React from "react";
import { Text, View, Image, Dimensions } from "react-native";
import { useSelector } from "react-redux";
import Icons from "../assets/Icons";
import { Colors } from "../config";
const { width } = Dimensions.get("window");

export default function CustomTextInput(props) {
  const user = useSelector(({ reducer: { user } }) => user);
  // console.log(user, "useruseruser");
  const [dropdown, setDropdown] = React.useState(props?.isDropdown);
  const [upload, setUpload] = React.useState(props?.upload);
  console.log(props?.role, "props1212");
  return (
    <View
      style={{
        width: "100%",
        marginTop: props?.asterick ? 5 : 10,
        alignItems: "center",
      }}
    >
      {props?.asterick ? (
        <Text
          style={[
            {
              marginRight: "auto",
              alignSelf: "flex-end",
              height: 20,
              justifyContent: "flex-end",
              marginVertical: 5,
              color: 'white',
              fontSize: 15,
              fontWeight: "600",
            },
            props?.labelStyles,
          ]}
        >
          {props?.label}{" "}
          <Text
            style={{
              marginRight: "auto",
              alignSelf: "flex-end",
              height: 15,
              justifyContent: "flex-end",
              marginVertical: 5,
              color: "red",
            }}
          >
            *
          </Text>
        </Text>
      ) : (
        <Text
          style={{
            marginRight: "auto",
            alignSelf: "flex-end",
            height: 12,
            justifyContent: "flex-end",
            marginVertical: 5,
            color: "red",
          }}
        ></Text>
      )}
      <View
        style={{
          width: props.setWidth ? width * 0.8 : width - 60,
          height: 50,
          backgroundColor: Colors.white,
          paddingHorizontal: 15,
          borderRadius: 7,
          flexDirection: "row",
          alignItems: "center",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.16,
          shadowRadius: 2.22,
          elevation: 3,
        }}
      >
        {/* <Image
          source={props?.icon}
          style={{
            width: 18,
            height: 18,
            resizeMode: 'contain',
            tintColor: Colors.icon,
            marginRight: 10,
          }}
        />  */}

        <Text
          //  style={{ flex: 1, color: "black" }}
          style={[
            {
              width: "90%",
              color:
                props?.value?.length && props?.role == "athlete"
                  ? "black"
                  : props?.value?.length && props?.role == "coach"
                  ? Colors.darkBlue
                  : "black",
              alignItems: "center",
            },
            props?.mainContainerStyle,
          ]}
        >
          {props?.value?.length ? props?.value : props?.placeholder}
        </Text>
        {props?.isDropdown && (
          <Image
            source={Icons.dropdown}
            style={{
              width: 15,
              height: 15,
              tintColor:
                user?.role == "athlete"
                  ? Colors.darkBlue
                  : user?.role == "coach"
                  ? Colors.orange
                  : "transparent",
            }}
            resizeMode={"contain"}
          />
        )}
        {props?.upload && (
          <Image
            source={Icons.upload}
            style={{
              width: 15,
              height: 15,
              resizeMode: "contain",
              tintColor:
                user?.role == "athlete"
                  ? Colors.darkBlue
                  : user?.role == "athlete"
                  ? Colors.darkBlue
                  : "transparent",
            }}
          />
        )}
      </View>
    </View>
  );
}
export function AuthTextInputSelector(props) {
  const [dropdown, setDropdown] = React.useState(props?.isDropdown);
  return (
    <View
      style={[
        {
          width: "90%",
          marginTop: 15,
          alignItems: "center",
        },
        props?.mainContainerStyle,
      ]}
    >
      {props?.value?.length ? (
        <Text
          style={{
            color: Colors.white,
            fontSize: 14,
            width: "100%",
          }}
        >
          {props?.placeholder}
        </Text>
      ) : null}
      <View
        style={{
          height: 50,
          textDecorationLine: "underline",
          flexDirection: "row",
          borderBottomWidth: 1,
          borderBottomColor: Colors.white,
          alignItems: "center",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.16,
          shadowRadius: 2.22,
          elevation: 3,
        }}
      >
        {props?.icon && (
          <Image
            source={props?.icon}
            style={{
              width: 22,
              height: 22,
              resizeMode: "contain",
              tintColor: Colors.primary,
              marginRight: 15,
            }}
          />
        )}
        <Text style={{ flex: 1, color: Colors.white, fontSize: 17 }}>
          {props?.value?.length ? props?.value : props?.placeholder}
        </Text>

        {props?.isDropdown && (
          <Image
            source={Icons.dropdown}
            style={{
              width: 15,
              height: 15,
              resizeMode: "contain",
              tintColor: Colors.white,
            }}
          />
        )}
      </View>
    </View>
  );
}
