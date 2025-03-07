import React, { useState } from "react";
import {
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Dimensions,
  Text,
} from "react-native";
import { useSelector } from "react-redux";
import Icons from "../assets/Icons";
import { Colors, Shadows, size } from "../config";
import { Fumi } from "./AnimatedTextInput";

const { width } = Dimensions.get("window");

export function CustomTextInputWithHeading(props) {
  const [hidden, setHidden] = useState(props.isPassword);
  return (
    <View style={{ width: "100%", marginTop: 10, alignItems: "center" }}>
      <Text
        style={[
          {
            alignSelf: "flex-start",
            marginBottom: 10,
            fontSize: 16,
            fontWeight: "500",
            color: Colors.secondary,
          },
          Shadows.shadow5,
        ]}
      >
        {props.heading}
      </Text>

      <View
        style={{
          width: width - 60,
          height: 50,
          backgroundColor: Colors.white,
          paddingHorizontal: 5,
          borderRadius: 7,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,

          elevation: 3,
          flexDirection: "row",
          paddingHorizontal: 15,
        }}
      >
        <Image
          source={props?.icon}
          style={{
            width: 18,
            height: 18,
            resizeMode: "contain",
            tintColor: Colors.icon,
          }}
        />
        <TextInput
          style={{
            flex: 1,
            height: 50,
            color: Colors.secondary,
          }}
          placeholderTextColor={Colors.secondary}
          secureTextEntry={hidden}
          {...props}
        />
        {props?.isPassword && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setHidden(!hidden)}
          >
            <Image
              source={hidden ? Icons.eyeHidden : Icons.eyeShown}
              style={{
                width: 25,
                height: 25,
                resizeMode: "contain",
                tintColor: Colors.DarkGrey,
              }}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
export default function CustomTextInput(props) {
  const user = useSelector((state) => state.reducer.user);
  const [hidden, setHidden] = useState(props.isPassword);
  return (
    <View
      style={{
        width: "100%",
        marginTop: !props?.asterick ? 20 : 15,
        alignItems: "center",
      }}
    >
      {props?.asterick && (
        <Text
          style={[
            {
              marginRight: "auto",
              alignSelf: "flex-end",
              height: 20,
              justifyContent: "flex-end",
              marginVertical: 5,
              color: "white",
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
      )}
      <View
        style={{
          width: props.setWidth ? width * 0.8 : width - 60,
          height: !props?.multi ? 50 : null,
          backgroundColor: Colors.white,
          paddingHorizontal: 5,
          borderRadius: 7,
          flexDirection: "row",
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,

          elevation: 3,
          paddingHorizontal: 12,
        }}
      >
        {/* <Image
          source={props?.icon}
          style={{
            width: 18,
            height: 18,
            resizeMode: 'contain',
            tintColor: Colors.icon,
          }}
        /> */}

        {props?.icon ? (
          <Image
            source={props?.icon}
            style={{
              width: 20,
              height: 20,
              resizeMode: "contain",
              tintColor:
                user?.role == "coach"
                  ? Colors.orange
                  : user?.role == "athlete"
                  ? Colors.darkBlue
                  : Colors.orange,
              marginRight: 15,
            }}
          />
        ) : null}

        <TextInput
          maxLength={props?.maxLength}
          style={{
            flex: 1,
            height: props?.multi ? 130 : 50,
            color: Colors.secondary,
            marginVertical: 8,
          }}
          placeholderTextColor={Colors.secondary}
          secureTextEntry={hidden}
          keyboardType={props.keyboardType}
          {...props}
          multiline={props?.multi ? true : false}
          numberOfLines={props?.multi ? 100 : null}
          textAlignVertical={props?.multi ? "top" : null}
        />
        {props?.isPassword && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setHidden(!hidden)}
          >
            <Image
              source={hidden ? Icons.eyeHidden : Icons.eyeShown}
              style={{
                width: 20,
                height: 20,
                resizeMode: "contain",
                // marginTop: 20,
                tintColor:
                  user?.role == "coach"
                    ? Colors.orange
                    : user?.role == "athlete"
                    ? Colors.darkBlue
                    : Colors.orange,
              }}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

export function AuthTextInput(props) {
  const [hidden, setHidden] = useState(props?.isPassword);
  return (
    <View style={{ width: "100%", marginTop: props?.asterick ? 5 : 20 }}>
      {
        props?.asterick ? (
          <Text
            style={{
              marginRight: "auto",
              alignSelf: "flex-end",
              height: 20,
              justifyContent: "flex-end",
              marginVertical: 5,
              color: "white",
              fontSize: 15,
              fontWeight: "600",
            }}
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
        ) : // <Text
        //   style={{
        //     marginRight: "auto",
        //     alignSelf: "flex-end",
        //     height: 15,
        //     justifyContent: "flex-end",
        //     marginVertical: 5,
        //     color: "red",
        //   }}
        // >
        null
        // </Text>
      }

      <View
        style={{
          alignSelf: "center",
          width: props.setWidth ? width * 0.8 : width - 60,
          borderRadius: 8,
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: Colors.white,
          paddingHorizontal: 20,
          height: 50,
        }}
      >
        {/* <View
          style={{
            // borderBottomWidth: 1,
            // borderBottomColor: Colors.white,
            flex: 1,
            // paddingBottom: 10,
           
            flexDirection: 'row',
            alignItems: 'center',
          }}> */}
        {props?.icon ? (
          <Image
            source={props?.icon}
            style={{
              width: 20,
              height: 20,
              resizeMode: "contain",
              tintColor: Colors.orange,
              marginRight: 15,
            }}
          />
        ) : null}
        <TextInput
          placeholder={props.label}
          inputPadding={0}
          style={{
            flex: 1,
            color: Colors.black,
            fontSize: 17,
          }}
          inputStyle={{ color: Colors.white, fontSize: 12 }}
          placeholderTextColor={"darkgray"}
          secureTextEntry={hidden}
          keyboardType={props.keyboardType}
          maxLength={props.maxlength}
          {...props}
        />
        {props?.isPassword && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setHidden(!hidden)}
          >
            <Image
              source={hidden ? Icons.eyeHidden : Icons.eyeShown}
              style={{
                width: 20,
                height: 20,
                resizeMode: "contain",
                // marginTop: 20,
                tintColor: Colors.orange,
              }}
            />
          </TouchableOpacity>
        )}
        {/* </View> */}
      </View>
    </View>
  );
}

export function CustomTextMyInput(props) {
  const [hidden, setHidden] = useState(props?.isPassword);
  const { width } = Dimensions.get("screen");

  const {
    containerStyle,
    types,
    placeholder,
    color,
    placeholderColor,
    verify,
    borderStyles,
    Iconcolor,
    Lineiconcolor,
    Lineicon,
    labeltext,
    label,
    textInputStyles,
    onSubmitEditing,
    search,
    onChangeText,
    rightImage,
    rightimagetext,
    rightImagetintColor,
    multiline,
  } = props;

  return (
    <View style={{}}>
      <View
        style={[
          {
            width: width - 64,
            alignSelf: "center",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#0F1B3C",
            borderRadius: 10,
            paddingHorizontal: 7,
            paddingVertical: 2,
            height: 55,
            borderWidth: 0,
            borderColor: Colors.lightGray,
            marginVertical: 0,
            marginTop: 10,
            // backgroundColor:'red',
            // ...Shadows.shadow3,
          },
          containerStyle,
        ]}
      >
        {props?.leftIcon ? (
          <Image
            source={props?.leftIcon}
            style={{
              width: 18,
              height: 18,
              resizeMode: "contain",
              tintColor: Iconcolor,
              marginHorizontal: 10,
            }}
          />
        ) : null}

        {props?.Lineicon ? (
          <Image
            source={props?.Lineicon}
            style={{
              width: 18,
              height: 30,
              resizeMode: "contain",
              tintColor: Lineiconcolor,
              marginHorizontal: -10,
            }}
          />
        ) : null}
        <View
          style={[
            {
              flex: 1,
              marginLeft: 10,
              // alignItems: 'center',
              borderLeftWidth: 0,
              borderLeftColor: Colors.border,
            },
            borderStyles,
          ]}
        >
          {label && (
            <CustomText
              text={labeltext}
              style={{
                color: Colors.white,
                // ...appStyles.font14,
                bottom: 5,
                marginLeft: Platform.OS == "ios" ? 0 : 3,
                // ...appStyles.margin1Percent,
                // ...appStyles.family_Poppins_SemiBold,
              }}
            />
          )}

          <TextInput
            placeholderTextColor={props?.placeholderColor || Colors.white}
            multiline={multiline}
            style={[
              {
                flex: 1,
                color: Colors.white,
                left: label ? -1 : 0,
                alignItems: "center",
                top: label ? 5 : 0,
                justifyContent: "center",
                marginTop: label ? -20 : Platform.OS == "android" ? 0 : 0,
                // fontSize: size.xxsmall,
                // fontFamily: family.RedHatDisplay_Regular,
              },
              textInputStyles,
            ]}
            secureTextEntry={hidden}
            autoCapitalize="none"
            onSubmitEditing={onSubmitEditing}
            onChangeText={onChangeText}
            {...props}
          />
          {props?.rightIcon && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setHidden(!hidden)}
            >
              <Image
                source={!hidden ? appIcons.eye : appIcons.eyeNot}
                style={{
                  height: 22,
                  width: 22,
                  resizeMode: "contain",
                }}
              />
            </TouchableOpacity>
          )}
          {props?.search && (
            <TouchableOpacity
              activeOpacity={0.8}
              // onPress={() => setHidden(!hidden)}
            >
              <Image
                source={props?.search}
                style={{
                  height: 22,
                  width: 22,
                  marginRight: 10,
                  resizeMode: "contain",
                }}
              />
            </TouchableOpacity>
          )}
          {props?.rightImage && (
            <View
              style={{
                position: "absolute",
                right: 5,
                top: 15,
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Image
                source={rightImage}
                style={{
                  tintColor: rightImagetintColor,
                  height: 20,
                  width: 20,
                  resizeMode: "contain",
                  marginRight: 4,
                }}
              />
              <CustomText
                style={{
                  color: Colors.secondary,
                  // ...appStyles.family_Poppins_Medium,
                  // ...appStyles.font13,
                }}
                text={rightimagetext}
              />
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
