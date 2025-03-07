import React, { createRef, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  BackHandler,
} from "react-native";
import { Colors, NavService } from "../../../config";
import CustomBackground from "../../../components/CustomBackground";
import { AuthTextInput } from "../../../components/CustomTextInput";
import CustomButton from "../../../components/CustomButton";
import Icons from "../../../assets/Icons";
import Toast from "react-native-toast-message";
import * as EmailValidator from "email-validator";
import ActionSheet from "react-native-actions-sheet";
import CustomSelector from "../../../components/TextWithActionSheet";
import CustomTextInput from "../../../components/CustomTextInput";
import {
  ApplicationLogsHistory,
  getCities,
  getCountries,
  getStates,
  signUP,
} from "../../../redux/APIs";
import cities from "../../../assets/Data/cities";
import states from "../../../assets/Data/states";
import { useSelector } from "react-redux";

const Signup = ({ navigation, route }) => {
  const { from } = route.params;
  const [fullName, setFullName] = useState("");
  const [newCities, setNewCities] = useState(cities[`American Samao`]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [city, setCity] = useState();
  const [zipCode, setZipCode] = useState();
  const [country, setCountry] = useState();
  const [otherCountry, setOtherCountry] = useState();
  const [stateOfUs, setStateOfUs] = useState("");
  const [otherStateOfUs, setOtherStateOfUs] = useState("");
  const [otherCoach, setOtherCoach] = useState("");
  const [coach, setCoach] = useState("");
  const [position, setPosition] = useState("");
  const [classWeight, setClassWeight] = useState("");
  const [citiesList, setCitiesList] = useState([]);
  const [statesList, setStatesList] = useState([]);
  const [countriesList, setCountriesList] = useState([]);
  const [otherCity, setOtherCity] = useState("");
  const [hockeyType, setHockeyType] = useState("");
  const [racism, setRacism] = useState("");
  console.log(statesList, "statesList");

  let passwordRegex =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()-+=^.]).{8,16}$/;

  const CoachType = [
    {
      state_name: "Coach",
    },
    {
      state_name: "Trainer",
    },
    {
      state_name: "Scout",
    },
    {
      state_name: "Recruiter",
    },
    {
      state_name: "Other",
    },
  ];
  const Position = [
    {
      state_name: "Positon A",
    },
    {
      state_name: "Positon B",
    },
    {
      state_name: "Positon C",
    },
    {
      state_name: "Positon D",
    },
  ];
  const StateTypeOfUS = [
    {
      name: `California`,
    },
    {
      name: `Minnesota`,
    },
    {
      name: `Tennessee`,
    },
    {
      name: `Colorado`,
    },
  ];

  const SignUp = async ({ navigation }) => {
    Keyboard.dismiss();
    await signUP(
      fullName,
      email,
      password,
      confirmPassword,
      from,
      country,
      city,
      stateOfUs,
      zipCode,
      coach,
      otherCoach,
      // position,
      navigation,
      otherCountry,
      otherCity,
      otherStateOfUs
    );
  };
  const actionSheetCoachRef = createRef();
  const actionSheetPositionRef = createRef();
  const actionSheetStateRef = createRef();
  const actionSheetCountryRef = createRef();
  const actionSheetCityRef = createRef();
  const actionSheetRacismRef = createRef();
  //BACK HANDLER
  function handleBackButtonClick() {
    navigation?.navigate("Login", { from: from });
    return true;
  }
  const GetCountries = async () => {
    const countries = await getCountries();
    countries.push({ name: "Other" });
    setCountriesList(countries);
  };
  const GetStates = async (id) => {
    const states = await getStates(id);

    states.push({ name: "Other" });
    setStatesList(states);
  };
  const GetCities = async (id) => {
    const cities = await getCities(id);
    // cities.push({ name: "Other" });
    setCitiesList(cities);
  };
  useEffect(() => {
    GetCountries();
  }, []);

  useEffect(() => {
    BackHandler?.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler?.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, []);

  // useEffect(() => {
  //   const focusListener = navigation.addListener("focus", () => {
  //     ApplicationLogsHistory('SIGN UP');
  //   });

  //   BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);

  //   return () => {
  //     focusListener();
  //     BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
  //   };
  // }, [navigation]);

  const user = useSelector((state) => state.authReducer);
  console.log(user, "useruseruser");
  return (
    <CustomBackground
      title={"SIGN UP"}
      back={true}
      onBack={() => NavService.navigate("Login", { from: from })}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          width: "100%",
        }}
      >
        <View
          style={{
            alignItems: "center",
            flex: 1,
            width: "100%",
          }}
        >
          {/* CoachType */}
          <ActionSheet
            ref={actionSheetCoachRef}
            containerStyle={{ backgroundColor: "transparent" }}
          >
            <View style={{ padding: 10, paddingBottom: 20 }}>
              <ActionSheetComponent
                title="Select a Coach /Staff Type"
                dataset={CoachType}
                onPress={async (item) => {
                  actionSheetCoachRef.current.hide();
                  setCoach(item.state_name);
                }}
              />
              <TouchableOpacity
                onPress={() => actionSheetCoachRef.current.hide()}
                style={{
                  backgroundColor: "white",
                  borderRadius: 10,
                  paddingVertical: 12,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "rgb(0,88,200)",
                    fontSize: 18,
                    fontWeight: "600",
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </ActionSheet>
          {/* Position */}
          <ActionSheet
            ref={actionSheetPositionRef}
            containerStyle={{ backgroundColor: "transparent" }}
          >
            <View style={{ padding: 10, paddingBottom: 20 }}>
              <ActionSheetComponent
                title="Select a Position"
                dataset={Position}
                onPress={async (item) => {
                  actionSheetPositionRef.current.hide();
                  setPosition(item.state_name);
                }}
              />
              <TouchableOpacity
                onPress={() => actionSheetPositionRef.current.hide()}
                style={{
                  backgroundColor: "white",
                  borderRadius: 10,
                  paddingVertical: 12,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "rgb(0,88,200)",
                    fontSize: 18,
                    fontWeight: "600",
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </ActionSheet>
          {/* {State of US} */}
          <ActionSheet
            ref={actionSheetStateRef}
            containerStyle={{ backgroundColor: "transparent" }}
          >
            <View style={{ padding: 10, paddingBottom: 20 }}>
              <ActionSheetComponent
                title="Select State/Province/Territory"
                dataset={statesList}
                onPress={async (item) => {
                  setStateOfUs(item?.name);
                  setCity("");
                  GetCities(item?.id);
                  actionSheetStateRef.current.hide();
                }}
              />
              <TouchableOpacity
                onPress={() => actionSheetStateRef.current.hide()}
                style={{
                  backgroundColor: "white",
                  borderRadius: 10,
                  paddingVertical: 12,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "rgb(0,88,200)",
                    fontSize: 18,
                    fontWeight: "600",
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </ActionSheet>
          {/* COUNTRIES */}
          <ActionSheet
            ref={actionSheetCountryRef}
            containerStyle={{ backgroundColor: "transparent" }}
          >
            <View style={{ padding: 10, paddingBottom: 20 }}>
              <ActionSheetComponent
                title={"Select Country"}
                dataset={countriesList}
                onPress={async (item) => {
                  GetStates(item?.id);
                  setCountry(item?.name);
                  setStateOfUs("");
                  setCity("");
                  actionSheetCountryRef.current.hide();
                  setCitiesList([]);
                  setStatesList([]);
                }}
              />
              <TouchableOpacity
                onPress={() => actionSheetCountryRef.current.hide()}
                style={{
                  backgroundColor: "white",
                  borderRadius: 10,
                  paddingVertical: 12,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "rgb(0,88,200)",
                    fontSize: 18,
                    fontWeight: "600",
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </ActionSheet>
          {/* CITY */}
          <ActionSheet
            ref={actionSheetCityRef}
            containerStyle={{ backgroundColor: "transparent" }}
          >
            <View style={{ padding: 10, paddingBottom: 20 }}>
              <ActionSheetComponent
                title={"Select City"}
                dataset={citiesList}
                onPress={async (item) => {
                  actionSheetCityRef.current.hide();
                  console.log(item);
                  setCity(item?.name);
                  // setCity("Other");
                }}
              />
              <TouchableOpacity
                onPress={() => actionSheetCityRef.current.hide()}
                style={{
                  backgroundColor: "white",
                  borderRadius: 10,
                  paddingVertical: 12,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "rgb(0,88,200)",
                    fontSize: 18,
                    fontWeight: "600",
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </ActionSheet>
          {/* FULL NAME */}
          <AuthTextInput
            asterick
            color={from == "athlete" ? Colors.black : Colors.darkBlue}
            maxlength={30}
            icon={Icons.user}
            label="Full Name"
            value={fullName}
            onChangeText={(text) => setFullName(text)}
          />
          {/* EMAIL */}
          <AuthTextInput
            maxlength={35}
            icon={Icons.email}
            color={from == "athlete" ? Colors.black : Colors.darkBlue}
            label="Email Address"
            value={email?.toLowerCase()}
            onChangeText={(text) => setEmail(text)}
            keyboardType={"email-address"}
            asterick
          />

          {/* PASSWORD */}
          <AuthTextInput
            asterick
            maxlength={30}
            color={from == "athlete" ? Colors.black : Colors.darkBlue}
            icon={Icons.password}
            label="Enter Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            isPassword
          />

          {/* CONFIRM PASSWORD */}
          <AuthTextInput
            asterick
            maxlength={30}
            icon={Icons.password}
            color={from == "athlete" ? Colors.black : Colors.darkBlue}
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            isPassword
          />

          {/* COUNTRY */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => actionSheetCountryRef.current.show()}
            style={{ width: "100%" }}
          >
            <CustomSelector
              role={from}
              placeholder={"Country"}
              label={"Country"}
              value={country}
              isDropdown={true}
              asterick
            />
          </TouchableOpacity>

          {/* OTHER COUNTRY INPUT */}
          {country == "Other" ? (
            <CustomTextInput
              color={from == "athlete" ? Colors.black : Colors.blue}
              placeholder={"Please Enter Country"}
              onChangeText={(value) => {
                setOtherCountry(value);
              }}
              value={otherCountry}
            />
          ) : null}

          {/* STATE */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => actionSheetStateRef.current.show()}
            style={{ width: "100%" }}
          >
            <CustomSelector
              role={from}
              placeholder={"State/Province/Territory"}
              label={"State/Province/Territory"}
              value={stateOfUs}
              isDropdown={true}
              asterick
            />
          </TouchableOpacity>

          {/* OTHER STATE */}
          {stateOfUs == "Other" ? (
            <CustomTextInput
              color={from == "athlete" ? Colors.black : Colors.darkBlue}
              placeholder={"Please Enter State"}
              onChangeText={(value) => {
                setOtherStateOfUs(value);
              }}
              value={otherStateOfUs}
            />
          ) : null}

          {/* CITY */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => actionSheetCityRef.current.show()}
            style={{ width: "100%" }}
          >
            <CustomSelector
              mainContainerStyle={{
                // color: from == "athlete" ? Colors.black : Colors.blue,
                flex: 1,
              }}
              role={from}
              placeholder={"City"}
              label={"City"}
              value={city}
              isDropdown={true}
              asterick
            />
          </TouchableOpacity>

          {city == "Other" && (
            <CustomTextInput
              color={from == "athlete" ? Colors.black : Colors.darkBlue}
              placeholder="Please Enter City"
              value={otherCity}
              onChangeText={(text) => setOtherCity(text)}
            />
          )}

          {/* ZIPCODE */}
          <AuthTextInput
            color={from == "athlete" ? Colors.black : Colors.darkBlue}
            maxlength={10}
            label="Zip Code"
            value={zipCode}
            onChangeText={(text) => setZipCode(text)}
            keyboardType={"numeric"}
            asterick
          />

          {from == "coach" ? (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => actionSheetCoachRef.current.show()}
              style={{ width: "100%" }}
            >
              <CustomSelector
                role={from}
                placeholder={"Coach / Staff "}
                label={"Coach / Staff "}
                value={coach}
                isDropdown={true}
                asterick
              />
            </TouchableOpacity>
          ) : null}
          {coach && (
            <CustomTextInput
              multi={true}
              color={from == "athlete" ? Colors.black : Colors.darkBlue}
              placeholder={
                coach == "Other"
                  ? "Enter Coach /Staff"
                  : `associated school/college or league teams`
              }
              asterick
              label={
                coach == "Other"
                  ? "Enter Coach /Staff"
                  : `Enter associated school/college or league teams`
              }
              onChangeText={(value) => {
                setOtherCoach(value);
              }}
              value={otherCoach}
            />
          )}
          {/* {coach === "Other" ? (
            <CustomTextInput
              placeholder={"Please Enter Coach Type"}
              onChangeText={(value) => {
                setOtherCoach(value);
              }}
              value={otherCoach}
            />
          ) : null} */}

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => actionSheetPositionRef.current.show()}
            style={{ width: "100%" }}
          >
            {/* <CustomSelector
              placeholder={"Position"}
              label={"Position"}
              value={position}
              isDropdown={true}
              asterick
            /> */}
          </TouchableOpacity>

          {/* <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => actionSheetPositionRef.current.show()}
            style={{ width: "100%" }}
          >
            <CustomSelector
              placeholder={"Position"}
              label={"Position"}
              value={position}
              isDropdown={true}
              asterick
            />
          </TouchableOpacity> */}

          <CustomButton
            title="Sign Up"
            onPress={() => SignUp({ navigation, })}
          />
        </View>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "400",
            color: Colors.white,
            marginVertical: 30,
          }}
        >
          Already have an account?{" "}
          <Text
            onPress={() => NavService.goBack()}
            style={{
              fontWeight: "900",
              color: Colors.white,
              textDecorationLine: "underline",
            }}
          >
            Login Now
          </Text>
        </Text>
      </View>
    </CustomBackground>
  );
};

export default Signup;

const ActionSheetComponent = ({
  title = "",
  dataset = [],
  onPress = () => { },
}) => {
  return (
    <View
      style={{
        backgroundColor: "rgba(241,241,241,0.9)",
        borderRadius: 10,
        marginBottom: 10,
        overflow: "hidden",
      }}
    >
      <View
        style={{
          borderBottomWidth: 1.5,
          borderBottomColor: "#ccc",
          paddingVertical: 10,
        }}
      >
        <Text
          style={{
            color: "rgb(0,88,200)",
            textAlign: "center",
            fontSize: 18,
            fontWeight: "500",
          }}
        >
          {title}
        </Text>
      </View>
      <ScrollView
        style={{ maxHeight: 200 }}
        showsVerticalScrollIndicator={false}
      >
        {dataset.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => onPress(item)}
              style={{
                paddingVertical: 12,
                alignItems: "center",
                borderBottomWidth: 1.5,
                borderBottomColor: "#ccc",
              }}
            >
              <Text style={{ color: "#000", fontSize: 16 }} numberOfLines={1}>
                {/* {item?.state_name?.length ? item?.state_name : item?.city_name} */}
                {item?.state_name?.length
                  ? item?.state_name
                  : item?.city_name
                    ? item?.city_name
                    : item?.name
                      ? item.name
                      : item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};
