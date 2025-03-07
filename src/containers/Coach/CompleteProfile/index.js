import React, { Component, createRef, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  BackHandler,
  StyleSheet,
} from "react-native";
import { useDispatch } from "react-redux";
import { Colors, NavService } from "../../../config";
import CustomBackground from "../../../components/CustomBackground";
import CustomTextInput from "../../../components/CustomTextInput";
import CustomButton from "../../../components/CustomButton";
import Icons from "../../../assets/Icons";
import ActionSheet from "react-native-actions-sheet";
import CustomSelector from "../../../components/TextWithActionSheet";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DocumentPicker from "react-native-document-picker";
import { SAVE_USER } from "../../../redux/actions";
import moment from "moment";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { ApplicationLogsHistory, Profile } from "../../../redux/APIs";
import RNExitApp from "react-native-exit-app";
import CustomActionSheet from "../../../components/CustomActionSheet";

const Gender_state = [
  {
    state_name: "Male",
  },
  {
    state_name: "Female",
  },
  {
    state_name: "Other",
  },
];
const SportType = [
  { state_name: `Archery` },
  { state_name: `Boxing` },
  { state_name: `Boat Racing` },
  { state_name: `Body Building` },
  { state_name: `Bmx Racing` },
  { state_name: `Car Racing` },
  { state_name: `Cheer Leading` },
  { state_name: `Equestrian` },
  { state_name: `Extreme Sports` },
  { state_name: `Gymnastics` },
  { state_name: `Indoor Sports` },
  { state_name: `Ice Hockey` },
  { state_name: `Motor Sports` },
  { state_name: `Mountain Climbing` },
  { state_name: `Outdoor Sports` },
  { state_name: `Rafting` },
  { state_name: `Rock Climbing` },
  { state_name: `Sailing` },
  { state_name: `Shooting` },
  { state_name: `Skate Boarding` },
  { state_name: `Sky Diving` },
  { state_name: `Surfing` },
  { state_name: `Track & Field` },
  { state_name: `Winter Sports` },
  { state_name: `Water Sports` },
  { state_name: `Water Skiing` },
  { state_name: `Wrestling` },
  { state_name: `Water Polo` },
  { state_name: `Other not listed above` },
];
const TrackAndFieldType = [
  { state_name: "Hign Jump" },
  { state_name: "Long Distance Race" },
  { state_name: "Long Jump" },
  { state_name: "Pole Vault" },
  { state_name: "Relay Race" },
  { state_name: "Shot Put" },
  { state_name: "SPRINT" },
];
const OutdoorType = [
  { state_name: `Archery` },
  { state_name: `Acrobatic` },
  { state_name: `Basketball` },
  { state_name: `Baseball` },
  { state_name: `Bowling` },
  { state_name: `Cycling` },
  { state_name: `Golf` },
  { state_name: `Fishing` },
  { state_name: `Football` },
  { state_name: `Field Hockey` },
  // { state_name: `Indianapolis` },
  { state_name: `Lacrosse` },
  { state_name: `Rugby` },
  { state_name: `Soccer` },
  { state_name: `Softball` },
  { state_name: `Tennis` },
  { state_name: `Weightlifting` },
  { state_name: `Ultimate Frisbee` },
  { state_name: `Other not listed above` },
];
const IndoorType = [
  { state_name: `Basketball` },
  { state_name: `Boxing` },
  { state_name: `Gymnastics` },
  // { state_name: `Handball` },
  { state_name: `Martial Arts` },
  { state_name: `Table Tennis` },
  { state_name: `Volleyball` },
];
const WaterSportType = [
  { state_name: `Diving` },
  { state_name: `Kayaking` },
  { state_name: `Swimming` },
  { state_name: `Surfing` },
  { state_name: `Sailing` },
  { state_name: `Rowing` },
  { state_name: `Water Polo` },
  { state_name: `Wakeboarding` },
];

const AcrobaticType = [
  { state_name: `Cheerleading` },
  { state_name: `Other not listed above` },
];

const BasketBallPosition = [
  { state_name: `Point Guard` },
  { state_name: `Shooting Guard` },
  { state_name: `Small Forward` },
  { state_name: `Power Forward` },
  { state_name: `Other not listed above` },
];
const MotorSport = [
  { state_name: `Drag Racing` },
  { state_name: `FORMULA 1` },
  { state_name: `Monster Truck` },
  { state_name: `Motocross` },
  { state_name: `Nascar` },
  { state_name: `Other not listed above` },
];
const BoxingType = [
  { state_name: `UFC/Martial arts` },
  { state_name: `Other not listed above` },
];
const BoxingWeightType = [
  { state_name: `light weight` },
  { state_name: `middle weight` },
  { state_name: `Other not listed above` },
];
const WrestlingType = [
  { state_name: `Sumo Wrestling` },
  { state_name: `Professional Wrestling` },
  { state_name: `Other not listed above` },
];
const WinterSportsType = [
  { state_name: `Bobsledding` },
  { state_name: `Curling` },
  { state_name: `Figure Ice Skating` },
  { state_name: `Ice Climbing` },
  { state_name: `Ice Hockey` },
  { state_name: `Ice Skating` },
  { state_name: `Luge` },
  { state_name: `Water Polo` },
  { state_name: `Surfing` },
  { state_name: `Snowboarding` },
  { state_name: `Skiing` },
  { state_name: `Other not listed above` },
];
const ExtremeSportstype = [
  { state_name: `Skate Boarding` },
  { state_name: `Other not listed above` },
];

const Racism = [
  { state_name: `American Indian or Alaska Native (Not Hispanic or Latino)` },
  { state_name: `Asian (Not Hispanic or Latino)` },
  { state_name: `Black or African American (Not Hispanic or Latino)` },
  { state_name: `Hispanic or Latino` },
  { state_name: `I choose not to self-identify at this time` },
  {
    state_name: `Native Hawaiian or Other Pacific islander (Not Hispanic or Latino)`,
  },
  { state_name: `Other not listed above` },
  { state_name: `Two or More Races (Not Hispanic or Latino)` },
  { state_name: `White (Not Hispanic or Latino)` },
];
const UFCAndMartialArtsWeightType = [
  { state_name: `Atomweight (105 lb, 47.6 kg) -  female only` },
  { state_name: `Bantamweight (135 lb, 61.2 kg)` },
  { state_name: `Bridgermweight (200 - 224 lb, 90.7 - 101.6 kg)` },
  { state_name: `Cruisermweight (175 - 200 lb, 79.4 - 90.7 kg)` },
  { state_name: `Flyweight (125 lb, 56.7 kg)` },
  { state_name: `Featherweight (145 lb, 65.8 kg)` },
  { state_name: `Heavyweight (265 lb, 120.2 kg)` },
  { state_name: `Lightweight (155 lb, 70.3 kg)` },
  { state_name: `Light Heavyweight (205 lb, 93.0 kg)` },
  { state_name: `Light Flyweight (105 - 108 lb, 47.6 - 49 kg)` },
  { state_name: `Light Middleweight (147 - 154 lb, 66.7 - 69.9 kg)` },
  { state_name: `Light Welterweight (135 - 140 lb, 61.2 - 63.5 kg)` },
  { state_name: `Middleweight (185 lb, 83.9 kg)` },
  { state_name: `Welterweight (170 lb, 77.1 kg)` },
  { state_name: `Stramweight (115 lb, 52.2 kg) - female only` },
  { state_name: `Super Bantaweight (118 - 122 lb, 53.5 - 55.3 kg)` },
  { state_name: `Super Featherweight (126 - 130 lb, 57.2 - 59 kg)` },
  { state_name: `Super Flyweight (112 - 115 lb, 50.8 - 52.2 kg)` },
  { state_name: `Super Middleweight (147 - 154 lb, 66.7 - 69.9 kg)` },
];
const WeightType = [
  { state_name: "50-59lbs" },
  { state_name: "60-69lbs" },
  { state_name: "70-79lbs" },
  { state_name: "80-89lbs" },
  { state_name: "90-99lbs" },
  { state_name: "100-109lbs" },
  { state_name: "110-119lbs" },
  { state_name: "120-129lbs" },
  { state_name: "130-139lbs" },
  { state_name: "140-149lbs" },
  { state_name: "150-159lbs" },
  { state_name: "160-169lbs" },
  { state_name: "170-179lbs" },
  { state_name: "180-189lbs" },
  { state_name: "190-199lbs" },
  { state_name: "200-209lbs" },
  { state_name: "210-219lbs" },
  { state_name: "220-229lbs" },
  { state_name: "240-249lbs" },
  { state_name: "250-259lbs" },
  { state_name: "260-269lbs" },
  { state_name: "270-279lbs" },
  { state_name: "280-289lbs" },
  { state_name: "290-299lbs" },
  { state_name: "300-309lbs"},
  { state_name: "310-319lbs" },
  { state_name: "320-329lbs" },
  { state_name: "330-339lbs" },
  { state_name: "340-349lbs" },
  { state_name: "350-359lbs" },
  { state_name: "360-369lbs" },
  { state_name: "370-379lbs" },
  { state_name: "380-389lbs" },
  { state_name: "390-399lbs" },
  { state_name: "400-409lbs" },
  { state_name: "410-419lbs" },
  { state_name: "420-429lbs" },
  { state_name: "430-439lbs" },
  { state_name: "440-449lbs" },
  { state_name: "450-459lbs" },
  { state_name: "460-469lbs" },
  { state_name: "470-479lbs" },
  { state_name: "480-489lbs" },
  { state_name: "490-499lbs" },
  { state_name: "500-509lbs" },
  { state_name: "510-519lbs" },
  { state_name: "520-529lbs" },
  { state_name: "530-539lbs" },
  { state_name: "540-549lbs" },
  { state_name: "550-559lbs" },
  { state_name: "560-569lbs" },
  { state_name: "570-579lbs" },
  { state_name: "580-589lbs" },
  { state_name: "590-599lbs" },
  { state_name: "600-609lbs" },
  { state_name: "620-629lbs" },
  { state_name: "630-639lbs" },
  { state_name: "640-649lbs" },
  { state_name: "650-659lbs" },
  { state_name: "660-669lbs" },
  { state_name: "670-679lbs" },
  { state_name: "680-689lbs" },
  { state_name: "690-699lbs" },
  { state_name: "700-709lbs" },
  { state_name: "710-719lbs" },
  { state_name: "720-729lbs" },
  { state_name: "730-739lbs" },
  { state_name:  "740-749lbs" },
  { state_name: `Other` },
];
const HeightType = [
  { state_name: `4'0 (ft in)` },
  { state_name: `4'1 (ft in)` },
  { state_name: `4'2 (ft in)` },
  { state_name: `4'3 (ft in)` },
  { state_name: `4'4 (ft in)` },
  { state_name: `4'5 (ft in)` },
  { state_name: `4'6 (ft in)` },
  { state_name: `4'7 (ft in)` },
  { state_name: `4'8 (ft in)` },
  { state_name: `4'9 (ft in)` },
  { state_name: `4'10 (ft in)` },
  { state_name: `4'11 (ft in)` },
  { state_name: `5'0 (ft in)` },
  { state_name: `5'1 (ft in)` },
  { state_name: `5'2 (ft in)` },
  { state_name: `5'3 (ft in)` },
  { state_name: `5'4 (ft in)` },
  { state_name: `5'5 (ft in)` },
  { state_name: `5'6 (ft in)` },
  { state_name: `5'7 (ft in)` },
  { state_name: `5'8 (ft in)` },
  { state_name: `5'9 (ft in)` },
  { state_name: `5'10 (ft in)` },
  { state_name: `5'11 (ft in)` },
  { state_name: `6;0 (ft in)` },
  { state_name: `6;1 (ft in)` },
  { state_name: `6;2 (ft in)` },
  { state_name: `6;3 (ft in)` },
  { state_name: `6;4 (ft in)` },
  { state_name: `6;5 (ft in)` },
  { state_name: `6;6 (ft in)` },
  { state_name: `6;7 (ft in)` },
  { state_name: `6;8 (ft in)` },
  { state_name: `6;9 (ft in)` },
  { state_name: `6;10 (ft in)` },
  { state_name: `6;11 (ft in)` },
  { state_name: `7;0 (ft in)` },
  { state_name: `7;1 (ft in)` },
  { state_name: `7;2 (ft in)` },
  { state_name: `7;3 (ft in)` },
  { state_name: `7;4 (ft in)` },
  { state_name: `7;5 (ft in)` },
  { state_name: `7;6 (ft in)` },
  { state_name: `7;7 (ft in)` },
  { state_name: `7;8 (ft in)` },
  { state_name: `7;9 (ft in)` },
  { state_name: `7;10 (ft in)` },
  { state_name: `7;11 (ft in)` },
  { state_name: `8;0 (ft in)` },
  { state_name: `Other` },
];

const HockeyType = [
  {
    type: "Field",
  },
  {
    type: "Ice",
  },
];
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
    state_name: "Other",
  },
];


const CompleteProfile = ({ navigation, route }) => {
  const { auth, role, from } = route.params;
  console.log(role, "auth, role, from");

  const [age, setAge] = useState("");
  const [coachSport, setCoachSport] = useState("");
  const [coachExperience, setCoachExperience] = useState("");
  const [bio, setBio] = useState("");
  const [gender, setGender] = useState("");

  const [sportType, setSportType] = useState("");
  const [height, setHeight] = useState("");
  const [otherHeight, setOtherheight] = useState("");

  const [weight, setWeight] = useState("");
  const [otherWeight, setOtherWeight] = useState("");

  const [racism, setRacism] = useState("");
  const [otherRacism, setOtherRacism] = useState("");

  const [subSportTitle, setSubSportTitle] = useState("");
  const [childSportTitle, setChildSportTitle] = useState("");

  // Other state
  const [otherSport, setOtherSport] = useState("");
  const [otherSubSportType, setotherSubSportType] = useState("");
  const [otherChildSportType, setOtherChildSportType] = useState("");

  const actionSheetGenderRef = createRef();

  const actionSheetRacismRef = createRef();
  const actionSheetHeightRef = createRef();
  const actionSheetWeightRef = createRef();

  const actionSheetSportsTypeRef = createRef();
  const SubSportTypes = createRef();
  const childSubType = createRef();

  const completeProfileHandler = async () => {
    console.log("racism", racism, "racism");
    console.log("subSportTitle", subSportTitle, "subSportTitle");
    // return;
    await Profile(
      "",
      gender,
      age,
      sportType,
      otherSport,
      auth,
      bio,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      racism,
      otherRacism,
      null,
      null,
      null,
      height,
      otherHeight,
      weight,
      otherWeight,
      subSportTitle,
      childSportTitle,
      otherSubSportType,
      otherChildSportType,
      role,
      coachExperience
    );
  };

  //BACK HANDLER
  // function handleBackButtonClick() {
  //   RNExitApp.exitApp();
  //   return true;
  // }
  function handleBackButtonClick() {
    NavService.navigate("PreLogin", { from: role });
    return true;
  }

  useEffect(() => {
    const focusListener = navigation.addListener("focus", () => {
      ApplicationLogsHistory("Complete Profile");
    });

    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      focusListener();
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, [navigation]);

  return (
    <CustomBackground
      back
      title={"Complete Profile"}
      onBack={() => NavService.navigate("PreLogin", { from: role })}
    >
      {/* GENDER */}
      <ActionSheet
        ref={actionSheetGenderRef}
        containerStyle={{ backgroundColor: "transparent" }}
      >
        <View style={styles.actionSheetContainer}>
          <ActionSheetComponent
            title="Select a Gender"
            dataset={Gender_state}
            onPress={async (item) => {
              actionSheetGenderRef.current.hide();
              setGender(item.state_name);
            }}
          />
          <TouchableOpacity
            onPress={() => actionSheetGenderRef.current.hide()}
            style={styles.btn}
          >
            <Text style={styles.text}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ActionSheet>

      {/* RACISM */}
      <ActionSheet
        ref={actionSheetRacismRef}
        containerStyle={{ backgroundColor: "transparent" }}
      >
        <View style={styles.actionSheetContainer}>
          <ActionSheetComponent
            title={"Select Race"}
            dataset={Racism}
            onPress={async (item) => {
              actionSheetRacismRef.current.hide();
              setRacism(item?.state_name);
            }}
          />
          <TouchableOpacity
            onPress={() => actionSheetRacismRef.current.hide()}
            style={styles.btn}
          >
            <Text style={styles.text}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ActionSheet>

      {/* Grand Parent Sheet SPORTS  */}
      <ActionSheet
        ref={actionSheetSportsTypeRef}
        containerStyle={{ backgroundColor: "transparent" }}
      >
        <View style={styles.actionSheetContainer}>
          <ActionSheetComponent
            title="Types of sport"
            dataset={SportType}
            onPress={async (item) => {
              actionSheetSportsTypeRef.current.hide();
              setSportType(item.state_name);
              setSubSportTitle("");
              setChildSportTitle("");
            }}
          />
          <TouchableOpacity
            onPress={() => actionSheetSportsTypeRef.current.hide()}
            style={styles.btn}
          >
            <Text style={styles.text}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ActionSheet>

      {/* Parent Sport Sheet TYPE */}
      <ActionSheet
        ref={SubSportTypes}
        containerStyle={{ backgroundColor: "transparent" }}
      >
        <View style={styles.actionSheetContainer}>
          <ActionSheetComponent
            title="Sport type"
            dataset={
              sportType == `Outdoor Sports`
                ? OutdoorType
                : sportType == `Indoor Sports`
                  ? IndoorType
                  : sportType == `Water Sports`
                    ? WaterSportType
                    : sportType == `Motor Sports`
                      ? MotorSport
                      : sportType == `Boxing`
                        ? BoxingType
                        : sportType == `Winter Sports`
                          ? WinterSportsType
                          : sportType == `Extreme Sports`
                            ? ExtremeSportstype
                            : sportType == `Wrestling`
                              ? WrestlingType
                              : sportType == `Track & Field`
                                ? TrackAndFieldType
                                : null
            }
            onPress={async (item) => {
              SubSportTypes.current.hide();
              setSubSportTitle(item.state_name);
              setChildSportTitle("");
            }}
          />
          <TouchableOpacity
            onPress={() => SubSportTypes.current.hide()}
            style={styles.btn}
          >
            <Text style={styles.text}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ActionSheet>

      {/* Child Sport Sheet */}
      <ActionSheet
        ref={childSubType}
        containerStyle={{ backgroundColor: "transparent" }}
      >
        <View style={styles.actionSheetContainer}>
          <ActionSheetComponent
            title={`Select Types`}
            dataset={
              subSportTitle == `Basketball`
                ? BasketBallPosition
                : subSportTitle == `Acrobatic`
                  ? AcrobaticType
                  : subSportTitle == `UFC/Martial arts`
                    ? UFCAndMartialArtsWeightType
                    : // BoxingWeightType
                    null
            }
            onPress={async (item) => {
              childSubType.current.hide();
              setChildSportTitle(item.state_name);
            }}
          />
          <TouchableOpacity
            onPress={() => childSubType.current.hide()}
            style={styles.btn}
          >
            <Text style={styles.text}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ActionSheet>

      {/* Height */}
      <ActionSheet
        ref={actionSheetHeightRef}
        containerStyle={{ backgroundColor: "transparent" }}
      >
        <View style={styles.actionSheetContainer}>
          <ActionSheetComponent
            title="Height"
            dataset={HeightType}
            onPress={async (item) => {
              actionSheetHeightRef.current.hide();
              setHeight(item.state_name);
            }}
          />
          <TouchableOpacity
            onPress={() => actionSheetHeightRef.current.hide()}
            style={styles.btn}
          >
            <Text style={styles.text}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ActionSheet>

      {/* Weight */}
      <ActionSheet
        ref={actionSheetWeightRef}
        containerStyle={{ backgroundColor: "transparent" }}
      >
        <View style={styles.actionSheetContainer}>
          <ActionSheetComponent
            title="Weight"
            dataset={WeightType}
            onPress={async (item) => {
              actionSheetWeightRef.current.hide();
              setWeight(item.state_name);
            }}
          />
          <TouchableOpacity
            onPress={() => actionSheetWeightRef.current.hide()}
            style={styles.btn}
          >
            <Text style={styles.text}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ActionSheet>

      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{
          alignItems: "center",
          flexGrow: 1,
        }}
      >
        <View style={styles.mainButtonContainer}>
          {/* AGE */}
          <CustomTextInput
            maxLength={3}
            placeholder={"Age"}
            label={"Age"}
            color={role == "athlete" ? Colors.black : Colors.darkBlue}
            onChangeText={(value) => setAge(value)}
            value={age}
            keyboardType={"numeric"}
            asterick
          />

          {/* GENDER */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => actionSheetGenderRef.current.show()}
            style={{ width: "100%" }}
          >
            <CustomSelector
              role={role}
              placeholder={"Gender"}
              label={"Gender"}
              value={gender}
              isDropdown={true}
              asterick
            />
          </TouchableOpacity>

          {/* RACISM */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => actionSheetRacismRef.current.show()}
            style={{ width: "100%" }}
          >
            <CustomSelector
              role={role}
              placeholder={"Race"}
              label={"Race & Ethnicity"}
              value={racism}
              isDropdown={true}
              asterick
            />
          </TouchableOpacity>

          {racism == "Other not listed above" ? (
            <CustomTextInput
              color={Colors.blue}
              placeholder={"Enter Other Race"}
              label={"Please Enter Other Race"}
              onChangeText={(value) => {
                setOtherRacism(value);
              }}
              asterick
              value={otherRacism}
            />
          ) : null}

          {/* Grand butttonSPORT TYPE */}
          {role !== "coach" && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => actionSheetSportsTypeRef?.current?.show()}
              style={{ width: "100%" }}
            >
              <CustomSelector
                role={role}
                placeholder={"Please Select Sport"}
                label={"Enter Sport"}
                value={sportType}
                isDropdown={true}
                asterick
              />
            </TouchableOpacity>
          )}

          {/* Other Grand Button Sport Input */}

          {role !== "coach" && sportType == "Other not listed above" ? (
            <CustomTextInput
              color={Colors.blue}
              placeholder={"Please Enter Other Sport"}
              label={"Please Enter Other Sport"}
              onChangeText={(value) => {
                setOtherSport(value);
              }}
              asterick
              value={otherSport}
            />
          ) : null}

          {/* {parent Button} */}
          {role !== "coach" &&
            sportType &&
            sportType !== "Other not listed above" &&
            (sportType == `Outdoor Sports` ||
              sportType == `Indoor Sports` ||
              sportType == `Water Sports` ||
              sportType == `Motor Sports` ||
              sportType == `Boxing` ||
              sportType == `Winter Sports` ||
              sportType == `Extreme Sports` ||
              sportType == `Wrestling`) && (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => SubSportTypes?.current?.show()}
                style={{ width: "100%" }}
              >
                <CustomSelector
                  role={role}
                  placeholder={
                    sportType == `Outdoor Sports`
                      ? `Select Outdoor sport`
                      : sportType == `Indoor Sports`
                        ? `Select Indoor sport`
                        : sportType == `Water Sports`
                          ? `Select Water sport`
                          : sportType == `Motor Sports`
                            ? `Select Motor sport`
                            : sportType == `Boxing`
                              ? `Select Boxing sport`
                              : sportType == `Winter Sports`
                                ? `Select Winter sport`
                                : sportType == `Extreme Sports`
                                  ? `Select Extreme sport`
                                  : sportType == `Wrestling`
                                    ? `Select Wrestling sport`
                                    : null
                  }
                  label={
                    sportType == `Outdoor Sports`
                      ? `Select Outdoor sport`
                      : sportType == `Indoor Sports`
                        ? `Select Indoor sport`
                        : sportType == `Water Sports`
                          ? `Select Water sport`
                          : sportType == `Motor Sports`
                            ? `Select Motor sport`
                            : sportType == `Boxing`
                              ? `Select Boxing sport`
                              : sportType == `Winter Sports`
                                ? `Select Winter sport`
                                : sportType == `Extreme Sports`
                                  ? `Select Extreme sport`
                                  : sportType == `Wrestling`
                                    ? `Select Wrestling sport`
                                    : null
                  }
                  value={subSportTitle}
                  isDropdown={true}
                  asterick
                />
              </TouchableOpacity>
            )}

          {subSportTitle == "Other not listed above" ? (
            <CustomTextInput
              color={Colors.blue}
              placeholder={"Please Enter Other Sport"}
              label={"Please Enter Other Sport"}
              onChangeText={(value) => {
                setotherSubSportType(value);
              }}
              asterick
              value={otherSubSportType}
            />
          ) : null}

          {/* Child button */}
          {(subSportTitle == "Basketball" ||
            subSportTitle == "Acrobatic" ||
            subSportTitle == "UFC/Martial arts") && (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => childSubType?.current?.show()}
                style={{ width: "100%" }}
              >
                <CustomSelector
                  role={role}
                  placeholder={
                    subSportTitle == `Basketball`
                      ? `select basketball position `
                      : subSportTitle == `Acrobatic`
                        ? `Select Acrobatic`
                        : subSportTitle == `UFC/Martial arts`
                          ? `Select UFC/Martial arts`
                          : null
                  }
                  label={
                    subSportTitle == `Basketball`
                      ? `select basketball position`
                      : subSportTitle == `Acrobatic`
                        ? `Select Acrobatic`
                        : subSportTitle == `UFC/Martial arts`
                          ? `Select UFC/Martial arts`
                          : null
                  }
                  value={childSportTitle}
                  isDropdown={true}
                  asterick
                />
              </TouchableOpacity>
            )}

          {childSportTitle == "Other not listed above" ? (
            <CustomTextInput
              placeholder={"Please Enter Other Sport"}
              color={Colors.blue}
              label={"Please Enter Other Sport"}
              onChangeText={(value) => {
                setOtherChildSportType(value);
              }}
              asterick
              value={otherChildSportType}
            />
          ) : null}

          {/* Height */}
          {role !== "coach" && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => actionSheetHeightRef.current.show()}
              style={{ width: "100%" }}
            >
              <CustomSelector
                role={role}
                placeholder={"Height"}
                label={"Height"}
                value={height}
                isDropdown={true}
                asterick
              />
            </TouchableOpacity>
          )}

          {height == "Other" ? (
            <CustomTextInput
              placeholder={"Please Enter Height"}
              color={Colors.blue}
              label={"Please Enter Height"}
              onChangeText={(value) => {
                setOtherheight(value);
              }}
              asterick
              value={otherHeight}
            />
          ) : null}

          {/* Weight */}
          {role !== "coach" && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => actionSheetWeightRef.current.show()}
              style={{ width: "100%" }}
            >
              <CustomSelector
                role={role}
                placeholder={"Weight"}
                label={"Weight"}
                value={weight}
                isDropdown={true}
                asterick
              />
            </TouchableOpacity>
          )}

          {weight == "Other" ? (
            <CustomTextInput
              color={Colors.blue}
              placeholder={"Please Enter Weight"}
              label={"Please Enter Weight"}
              onChangeText={(value) => {
                setOtherWeight(value);
              }}
              asterick
              value={otherWeight}
            />
          ) : null}

          {role == "coach" && (
            <>
              <CustomTextInput
                maxLength={35}
                placeholder={"Please enter sport"}
                label={"What sport do you coach?"}
                color={role == "athlete" ? Colors.black : Colors.darkBlue}
                onChangeText={(value) => setSportType(value)}
                value={sportType}
                asterick
              />
              <CustomTextInput
                maxLength={3}
                placeholder={"Please enter experience"}
                label={"Do you have any experience?"}
                color={role == "athlete" ? Colors.black : Colors.darkBlue}
                onChangeText={(value) => setCoachExperience(value)}
                value={coachExperience}
                keyboardType={"numeric"}
                asterick
              />
            </>
          )}
          {/* BIO */}
          <CustomTextInput
            color={role == "athlete" ? Colors.black : Colors.darkBlue}
            maxLength={250}
            placeholder={"Bio (not more than 250 words)"}
            label={"Bio (not more than 250 words)"}
            onChangeText={(value) => {
              setBio(value);
              console.log(value?.length);
            }}
            value={bio}
            multi={true}
          />

          <CustomButton
            title={"Done"}
            onPress={() => completeProfileHandler()}
            buttonStyle={{ marginBottom: "6%" }}
          />
        </View>
      </ScrollView>
    </CustomBackground>
  );
};

export default CompleteProfile;

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
              onPress={() => onPress(item)}
              style={{
                paddingVertical: 12,
                alignItems: "center",
                borderBottomWidth: 1.5,
                borderBottomColor: "#ccc",
              }}
            >
              <Text style={{ color: "#000", fontSize: 16 }} numberOfLines={1}>
                {item?.state_name?.length
                  ? item?.state_name
                  : item?.city_name
                    ? item?.city_name
                    : item?.type}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainButtonContainer: {
    alignItems: "center",
    flex: 1,
    paddingHorizontal: 40,
  },
  actionSheetContainer: { padding: 10, paddingBottom: 20 },
  btn: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  text: {
    color: "rgb(0,88,200)",
    fontSize: 18,
    fontWeight: "600",
  },
});
