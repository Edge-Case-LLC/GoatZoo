import React, { createRef, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
} from "react-native";
import {
  Image as ImageCompressor,
  Video as VideoCompressor,
} from "react-native-compressor";
import ActionSheet from "react-native-actions-sheet";
import { useSelector } from "react-redux";
import { Colors } from "../../../config";
import CustomTextInput from "../../../components/CustomTextInput";
import CustomButton from "../../../components/CustomButton";
import Icons from "../../../assets/Icons";
import CustomSelector from "../../../components/TextWithActionSheet";
import AppBackground from "../../../components/AppBackground";
import ProfileImage from "../../../components/ProfileImage";
import Common from "../../../config/Common";
import CustomImagePicker from "../../../components/CustomImagePicker";
import cities from "../../../assets/Data/cities";
import states from "../../../assets/Data/states";
import {
  Profile,
  getCities,
  getCountries,
  getStates,
  ApplicationLogsHistory,
} from "../../../redux/APIs";
import Images from "../../../assets/Images";
import CustomNewImagePicker from "../../../components/CustomNewImagePicker";
import MultipleFilePicker from "../../../components/MultipleFilePicker";
import DocumentExtensionIcon from "../../../components/documentExtensionIcon";

const genderArray = [
  {
    type: "Female",
  },
  {
    type: "Male",
  },
  {
    type: "Other",
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
  { state_name: `Other not listed ` },
];
const BasketBallPosition = [
  { state_name: `Point Guard` },
  { state_name: `Shooting Guard` },
  { state_name: `Small Forward` },
  { state_name: `Power Forward` },
  { state_name: `Other not listed ` },
];
const MotorSport = [
  { state_name: `Drag Racing` },
  { state_name: `FORMULA 1` },
  { state_name: `Monster Truck` },
  { state_name: `Motocross` },
  { state_name: `Nascar` },
  { state_name: `Other not listed ` },
];
const BoxingType = [
  { state_name: `UFC/Martial arts` },
  { state_name: `Other not listed ` },
];
const BoxingWeightType = [
  { state_name: `light weight` },
  { state_name: `middle weight` },
  { state_name: `Other not listed ` },
];
const WrestlingType = [
  { state_name: `Sumo Wrestling` },
  { state_name: `Professional Wrestling` },
  { state_name: `Other not listed ` },
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
  { state_name: `Other not listed ` },
];

const CoachType = [
  {
    type: "Coach",
  },
  {
    type: "Scout",
  },
  {
    type: "Trainer",
  },
  {
    type: "Other",
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
const HockeyType = [
  {
    type: "Field",
  },
  {
    type: "Ice",
  },
];
const Racism = [
  { state_name: `I choose not to self-identify at this time` },
  { state_name: `Hispanic or latino` },
  { state_name: `White (Not Hispanic or Latino)` },
  { state_name: `Black or African American (Not Hispanic or Latino)` },
  {
    state_name: `Native Hawaiian or Other Pacific islander (Not Hispanic or Latino)`,
  },
  { state_name: `Asian (Not hispanic or Latino)` },
  { state_name: `American Indian or Alaska Native (Not Hispanic or Latino)` },
  { state_name: `Two or More Races (Not Hispanic or Latino)` },
  { state_name: `Other not listed ` },
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

const EditProfile = ({ route, navigation }) => {
  const user = useSelector(({ reducer: { user } }) => user);
  const userData = route?.params?.profile;
  useEffect(() => {
    const focusListener = navigation.addListener("focus", () => {
      ApplicationLogsHistory("PROFILE");
    });
    GetCountries();
    return () => {
      focusListener();
    };
  }, [navigation]);

  const [newCities, setNewCities] = useState(cities[`American Samao`]);
  const [customCityState, setCustomCityState] = useState(false);
  const [customCity, setCustomCity] = useState(false);
  const [imageUri, setImageUri] = useState("");
  const [mime, setMime] = useState("");
  const [name, setName] = useState(userData?.user?.name);
  const [bio, setBio] = useState(
    userData?.user?.bio !== "undefined" ? userData?.user?.bio : ""
  );
  const [gender, setGender] = useState(userData?.user?.gender);
  const [age, setAge] = useState(userData?.user?.age);
  const [coachType, setCoachType] = useState(userData?.user?.specialization);
  const [position, setPosition] = useState(
    userData?.user?.position !== "" ? userData?.user?.position : ""
  );

  const [otherCoach, setOtherCoach] = useState("");
  const [classWeight, setClassWeight] = useState(
    userData?.user?.sportsType == "Boxing" && userData?.user?.classWeight !== ""
      ? userData?.user?.classWeight
      : ""
  );

  const [city, setCity] = useState(
    userData?.user?.city !== "" ? userData?.user?.city : ""
  );
  const [zipCode, setZipCode] = useState(
    userData?.user?.zipCode !== "" ? userData?.user?.zipCode : ""
  );
  const [country, setCountry] = useState(
    userData?.user?.country !== ""
      ? userData?.user?.country
      : // : citiesList[[0]?.name]
        ""
  );
  const [otherCity, setOtherCity] = useState("");
  const [otherCountry, setOtherCountry] = useState("");
  const [otherStateOfUs, setOtherStateOfUs] = useState("");
  const [stateOfUs, setStateOfUs] = useState(
    userData?.user?.state !== "" ? userData?.user?.state : ""
  );
  const [portfolioAssets, setPortfolioAssets] = useState(
    userData?.portfolio[0]?.portfolio?.length
      ? userData?.portfolio[0]?.portfolio
      : []
  );
  const [certificateAssets, setCertificateAssets] = useState(
    userData?.certificate[0]?.certificate?.length
      ? userData?.certificate[0]?.certificate
      : []
  );
  const [citiesList, setCitiesList] = useState([]);
  const [statesList, setStatesList] = useState([]);
  const [countriesList, setCountriesList] = useState([]);
  const [hockeyType, setHockeyType] = useState(
    userData?.user?.sportsType == "Hockey" && userData?.user?.hockeyType !== ""
      ? userData?.user?.hockeyType
      : ""
  );
  const [racism, setRacism] = useState(
    userData?.user?.racism !== "" ? userData?.user?.racism : ""
  );
  const [otherRacism, setOtherRacism] = useState();

  const [height, setHeight] = useState(
    userData?.user?.height !== "" ? userData?.user?.height : ""
  );
  const [weight, setWeight] = useState(
    userData?.user?.weight !== "" ? userData?.user?.weight : ""
  );
  const [otherHeight, setOtherheight] = useState("");
  const [otherWeight, setOtherWeight] = useState("");

  const [sportType, setSportType] = useState(userData?.user?.sportsType);
  const [otherSport, setOtherSport] = useState("");

  const [subSportTitle, setSubSportTitle] = useState(userData?.user?.subType1);
  const [childSportTitle, setChildSportTitle] = useState(
    userData?.user?.subType2
  );
  const [otherSubSportType, setotherSubSportType] = useState("");
  const [otherChildSportType, setOtherChildSportType] = useState("");

  const [coachExperience, setCoachExperience] = useState(
    String(userData?.user?.experience)
  );

  const SubSportTypes = createRef();
  const childSubType = createRef();

  const actionSheetGenderRef = createRef();
  const actionSheetSportsTypeRef = createRef();
  const actionSheetCoachRef = createRef();
  const actionSheetStateRef = createRef();
  const actionSheetPositionRef = createRef();
  const actionSheetCountryRef = createRef();
  const actionSheetCityRef = createRef();
  const actionSheetHockeyType = createRef();
  const actionSheetRacismRef = createRef();
  const actionSheetHeightRef = createRef();
  const actionSheetWeightRef = createRef();
  console.log("userData", userData, "userData");
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
  const WeightType = [
    { state_name: `50 lbs` },
    { state_name: `100 lbs` },
    { state_name: `150 lbs` },
    { state_name: `200 lbs` },
    { state_name: `250 lbs` },
    { state_name: `300 lbs` },
    { state_name: `350 lbs` },
    { state_name: `400 lbs` },
    { state_name: `450 lbs` },
    { state_name: `500 lbs` },
    { state_name: `Other` },
  ];

  const UpdateProfile = async () => {
    await Profile(
      name,
      gender,
      age,
      sportType,
      otherSport,
      userData?.authentication,
      bio,
      // classWeight,

      // position,
      country,
      city,
      stateOfUs,
      zipCode,
      coachType,
      otherCoach,
      imageUri,
      mime,
      "profile",
      portfolioAssets,
      certificateAssets,

      // hockeyType,
      racism,
      otherRacism,

      otherCity,
      otherStateOfUs,
      otherCountry,

      height,
      otherHeight,
      weight,
      otherWeight,

      subSportTitle,
      childSportTitle,
      otherSubSportType,
      otherChildSportType,
      userData?.user?.role,
      coachExperience
    );
  };

  const GetCountries = async () => {
    const countries = await getCountries();
    countries.push({ name: "Other" });
    setCountriesList(countries);
  };
  const GetStates = async (id) => {
    const states = await getStates(id);
    console.log(states, "states");
    states.push({ name: "Other" });
    setStatesList(states);
  };
  const GetCities = async (id) => {
    const cities = await getCities(id);
    // cities.push({ name: "Other" });
    setCitiesList(cities);
  };
  // useEffect(() => {
  //   GetCountries();
  // }, []);

  // PORTFOLIO View
  const RenderList = ({ item, from }) => {
    const portfolio = item;
    const extension = String(portfolio)?.split(".")?.pop();
    return (
      <View style={[styles.wrapper]}>
        {item?.type?.includes("image") ||
        extension == "jpg" ||
        extension == "jpeg" ||
        extension == "png" ? (
          <Image
            resizeMode="cover"
            style={styles.backgroundForGalleryAsset}
            source={
              item?.type?.includes("image")
                ? { uri: item?.uri }
                : { uri: `${Common?.assetURL}${item}` }
            }
          />
        ) : item?.type?.includes("video") || extension == "mp4" ? (
          <>
            <TouchableOpacity>
              <Image
                resizeMode="cover"
                style={[
                  styles.backgroundForGalleryAsset,
                  {
                    opacity: 0.8,
                  },
                ]}
                source={Images?.background}
              />
              <Image
                style={{
                  position: "absolute",
                  width: 25,
                  height: 25,
                  justifyContent: "center",
                  position: "absolute",
                  top: "35%",
                  left: "35%",
                }}
                source={Icons?.play}
              />
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity>
            <Image
              resizeMode="cover"
              style={[
                styles.backgroundForGalleryAsset,
                {
                  opacity: 0.8,
                },
              ]}
              source={Images?.background}
            />
            <DocumentExtensionIcon
              extension={extension}
              IconSize={30}
              styles={styles.icon}
            />
          </TouchableOpacity>
        )}
        <View
          style={{
            position: "absolute",
            zIndex: 1000,
            right: 3,
            top: 0.7,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              if (from == "portfolio") {
                removeSelectedAssetFromPortfolio(item ? item : item?.uri);
              } else {
                removeSelectedAssetFromCertificates(item ? item : item?.uri);
              }
            }}
            style={{
              backgroundColor: "red",
              borderRadius: 100,
              width: 22,
              height: 22,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 12,
              }}
            >
              X
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const updatePortfolioFromGallery = async (path, mime, type) => {
    let multipleImages = [];
    const remainingSlots = 15 - portfolioAssets?.length;
    const selectedImages = path.slice(0, remainingSlots);
    if (Array.isArray(path)) {
      const arr = selectedImages?.map(async (item) => {
        let result;
        if (type == "video") {
          result = await VideoCompressor.compress(item.path, {
            compressionMethod: "auto",
          });
          let videoObject = {
            uri: result,
            name: `video${Date.now()}.${item?.mime.slice(
              item?.mime.lastIndexOf("/") + 1
            )}`,
            type: item?.mime,
          };
          multipleImages.push(videoObject);
        } else {
          result = await ImageCompressor.compress(item.path, {
            maxHeight: 400,
            maxWidth: 400,
            quality: 1,
          });
          let imageObject = {
            uri: result,
            name: `image${Date.now()}.${item?.mime.slice(
              item?.mime.lastIndexOf("/") + 1
            )}`,
            type: item?.mime,
          };
          multipleImages.push(imageObject);
        }
      });
      await Promise.all(arr);
      const mergeImagesWithExistingGalleryAssets = [
        ...portfolioAssets,
        ...multipleImages,
      ];
      setPortfolioAssets(mergeImagesWithExistingGalleryAssets);
    } else {
      const getExistingGalleryAssets = [...portfolioAssets];
      const assetObject = {
        uri: path,
        name:
          type == "video"
            ? `video${Date.now()}.${mime.slice(mime.lastIndexOf("/") + 1)}`
            : `image${Date.now()}.${mime.slice(mime.lastIndexOf("/") + 1)}`,
        type: mime,
      };
      getExistingGalleryAssets.push(assetObject);
      setPortfolioAssets(getExistingGalleryAssets);
    }
  };
  const removeSelectedAssetFromPortfolio = (asset) => {
    const assetsWithoutTheCurrentAsset = portfolioAssets.filter((item) => {
      return item ? item !== asset : item.uri !== asset;
    });
    setPortfolioAssets(assetsWithoutTheCurrentAsset);
  };
  const updateCertificateFromGallery = async (path, mime, type) => {
    let multipleImages = [];
    if (Array.isArray(path)) {
      const arr = path?.map(async (item) => {
        let result;
        if (type == "document") {
          let documentObject = {
            uri: item?.uri,
            name: `document${Date.now()}.${item?.type.slice(
              item?.type.lastIndexOf("/") + 1
            )}`,
            type: item?.type,
          };
          multipleImages.push(documentObject);
        } else {
          result = await ImageCompressor.compress(item.path, {
            maxHeight: 400,
            maxWidth: 400,
            quality: 1,
          });
          let imageObject = {
            uri: result,
            name: `image${Date.now()}.${item?.mime.slice(
              item?.mime.lastIndexOf("/") + 1
            )}`,
            type: item?.mime,
          };
          multipleImages.push(imageObject);
        }
      });
      await Promise.all(arr);
      const mergeImagesAndDocumentWithExistingGalleryAssets = [
        ...certificateAssets,
        ...multipleImages,
      ];
      setCertificateAssets(mergeImagesAndDocumentWithExistingGalleryAssets);
    } else {
      const getExistingCertificateyAssets = [...certificateAssets];
      const assetObject = {
        uri: path,
        name:
          type == "document"
            ? `document${Date.now()}.${mime.slice(mime.lastIndexOf("/") + 1)}`
            : `image${Date.now()}.${mime.slice(mime.lastIndexOf("/") + 1)}`,
        type: mime,
      };
      getExistingCertificateyAssets.push(assetObject);
      setCertificateAssets(getExistingCertificateyAssets);
    }
  };
  const removeSelectedAssetFromCertificates = (asset) => {
    const assetsWithoutTheCurrentAsset = certificateAssets.filter((item) => {
      return item ? item !== asset : item.uri !== asset;
    });
    setCertificateAssets(assetsWithoutTheCurrentAsset);
  };
  return (
    <AppBackground
      title={"PROFILE"}
      back
      profile={false}
      isCoach={user && user?.role == "athlete" ? false : true}
    >
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{
          alignItems: "center",
          paddingBottom: 30,
          flexGrow: 1,
        }}
      >
        {/* Height */}
        <ActionSheet
          ref={actionSheetHeightRef}
          containerStyle={{ backgroundColor: "transparent" }}
        >
          <View style={{ padding: 10, paddingBottom: 20 }}>
            <ActionSheetCommponent
              title="Height"
              dataset={HeightType}
              onPress={async (item) => {
                actionSheetHeightRef.current.hide();
                setHeight(item.state_name);
              }}
            />
            <TouchableOpacity
              onPress={() => actionSheetHeightRef.current.hide()}
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

        {/* Weight */}
        <ActionSheet
          ref={actionSheetWeightRef}
          containerStyle={{ backgroundColor: "transparent" }}
        >
          <View style={{ padding: 10, paddingBottom: 20 }}>
            <ActionSheetCommponent
              title="Weight"
              dataset={WeightType}
              onPress={async (item) => {
                actionSheetWeightRef.current.hide();
                setWeight(item.state_name);
              }}
            />
            <TouchableOpacity
              onPress={() => actionSheetWeightRef.current.hide()}
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

        {/* GENDER */}
        <ActionSheet
          ref={actionSheetGenderRef}
          containerStyle={{ backgroundColor: "transparent" }}
        >
          <View style={{ padding: 10, paddingBottom: 20 }}>
            <ActionSheetCommponent
              title={"Select a Gender"}
              dataset={genderArray}
              onPress={async (item) => {
                actionSheetGenderRef.current.hide();
                setGender(item.type);
              }}
            />
            <TouchableOpacity
              onPress={() => actionSheetGenderRef.current.hide()}
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

        {/* COUNTRY */}
        <ActionSheet
          ref={actionSheetCountryRef}
          containerStyle={{ backgroundColor: "transparent" }}
        >
          <View style={{ padding: 10, paddingBottom: 20 }}>
            <ActionSheetCommponent
              title={"Select Country"}
              dataset={countriesList}
              onPress={async (item) => {
                actionSheetCountryRef.current.hide();
                setCountry(item?.name);
                GetStates(item?.id);
                setStateOfUs("");
                setCity("");
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
            <ActionSheetCommponent
              title={"Select City"}
              dataset={citiesList}
              onPress={async (item) => {
                actionSheetCityRef.current.hide();
                setCity(item?.name);
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

        {/* position */}
        {/* <ActionSheet
          ref={actionSheetPositionRef}
          containerStyle={{ backgroundColor: "transparent" }}
        >
          <View style={{ padding: 10, paddingBottom: 20 }}>
            <ActionSheetCommponent
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
        </ActionSheet> */}

        {/* CoachType */}
        <ActionSheet
          ref={actionSheetCoachRef}
          containerStyle={{ backgroundColor: "transparent" }}
        >
          <View style={{ padding: 10, paddingBottom: 20 }}>
            <ActionSheetCommponent
              title={"Select Coach / Staff Type"}
              dataset={CoachType}
              onPress={async (item) => {
                actionSheetCoachRef.current.hide();
                setCoachType(item.type);
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

        {/* {State of US} */}
        <ActionSheet
          ref={actionSheetStateRef}
          containerStyle={{ backgroundColor: "transparent" }}
        >
          <View style={{ padding: 10, paddingBottom: 20 }}>
            <ActionSheetCommponent
              title={"Select State/Provence/Territory"}
              dataset={statesList}
              onPress={async (item) => {
                actionSheetStateRef.current.hide();
                setStateOfUs(item?.name);
                setCity("");
                GetCities(item?.id);
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

        {/* Hockey Type */}
        <ActionSheet
          ref={actionSheetHockeyType}
          containerStyle={{ backgroundColor: "transparent" }}
        >
          <View style={{ padding: 10, paddingBottom: 20 }}>
            <ActionSheetCommponent
              title={"Select Hockey Type"}
              dataset={HockeyType}
              onPress={async (item) => {
                actionSheetHockeyType.current.hide();
                setHockeyType(item?.type);
              }}
            />
            <TouchableOpacity
              onPress={() => actionSheetHockeyType.current.hide()}
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

        {/* RACISM */}
        <ActionSheet
          ref={actionSheetRacismRef}
          containerStyle={{ backgroundColor: "transparent" }}
        >
          <View style={styles.actionSheetContainer}>
            <ActionSheetCommponent
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
            <ActionSheetCommponent
              title="Sport type"
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
            <ActionSheetCommponent
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
                console.log(item, "==item");
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
            <ActionSheetCommponent
              title={`Select Types`}
              dataset={
                subSportTitle == `Basketball`
                  ? BasketBallPosition
                  : subSportTitle == `Acrobatic`
                  ? AcrobaticType
                  : subSportTitle == `UFC/Martial arts`
                  ? BoxingWeightType
                  : null
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

        <View
          style={{
            alignItems: "center",
            flex: 1,
            paddingHorizontal: 40,
          }}
        >
          {/* IMAGE VIEW */}
          <View>
            <View
              style={{
                width: 135,
                height: 135,
                borderRadius: 100,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 2,
                borderColor: Colors.darkBlue,
                marginTop: 20,
              }}
            >
              <ProfileImage
                size={125}
                imageUri={
                  imageUri !== ""
                    ? imageUri
                    : userData?.user?.image?.length
                    ? `${Common?.assetURL}${userData?.user?.image}`
                    : imageUri
                }
                name={user?.name ? user?.name : "user"}
              />
            </View>
            <View
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                backgroundColor: Colors.orange,
                height: 40,
                width: 40,
                borderRadius: 30,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 2,
                borderColor: Colors.white,
              }}
            >
              <CustomImagePicker
                onImageChange={(imgPath, mime) => {
                  setImageUri(imgPath);
                  setMime(mime);
                }}
              >
                <Image
                  style={{
                    resizeMode: "contain",
                    height: 18,
                    width: 18,
                    tintColor: Colors.white,
                  }}
                  source={Icons.edit}
                />
              </CustomImagePicker>
            </View>
          </View>

          {/* FULL NAME */}
          <CustomTextInput
            maxLength={30}
            placeholder={"Full Name"}
            onChangeText={(value) => {
              setName(value);
            }}
            value={name}
            asterick
            label={"Name"}
            labelStyles={{
              color:
                user?.role == "athlete"
                  ? Colors.black
                  : user?.role == "coach"
                  ? Colors.white
                  : Colors.white,
            }}
          />

          {/* GENDER */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => actionSheetGenderRef.current.show()}
            style={{ width: "100%" }}
          >
            <CustomSelector
              placeholder={"Select Gender"}
              value={gender}
              isDropdown
              asterick
              label={"Gender"}
              labelStyles={{
                color:
                  user?.role == "athlete"
                    ? Colors.black
                    : user?.role == "coach"
                    ? Colors.white
                    : Colors.white,
              }}
            />
          </TouchableOpacity>

          {/* RACISM
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => actionSheetRacismRef.current.show()}
            style={{ width: "100%" }}
          >
            <CustomSelector
              placeholder={"Race"}
              value={racism}
              isDropdown
              // asterick
            />
          </TouchableOpacity> */}

          {/* AGE */}
          <CustomTextInput
            maxLength={3}
            placeholder={"Age"}
            onChangeText={(value) => {
              setAge(value);
            }}
            value={age}
            keyboardType={"numeric"}
            asterick
            label={"Age"}
            labelStyles={{
              color:
                user?.role == "athlete"
                  ? Colors.black
                  : user?.role == "coach"
                  ? Colors.white
                  : Colors.white,
            }}
          />

          {/* COUNTRY */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              actionSheetCountryRef.current.show();
            }}
            style={{ width: "100%" }}
          >
            <CustomSelector
              placeholder={"Country"}
              value={country}
              isDropdown
              asterick
              label={"Country"}
              labelStyles={{
                color:
                  user?.role == "athlete"
                    ? Colors.black
                    : user?.role == "coach"
                    ? Colors.white
                    : Colors.white,
              }}
            />
          </TouchableOpacity>

          {country == "Other" ? (
            <CustomTextInput
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
              placeholder={"State/Provence/Territory"}
              value={stateOfUs}
              isDropdown
              asterick
              label={"State"}
              labelStyles={{
                color:
                  user?.role == "athlete"
                    ? Colors.black
                    : user?.role == "coach"
                    ? Colors.white
                    : Colors.white,
              }}
            />
          </TouchableOpacity>
          {stateOfUs == "Other" && (
            <CustomTextInput
              placeholder="State Name"
              value={otherStateOfUs}
              onChangeText={(text) => setOtherStateOfUs(text)}
            />
          )}

          {/* CITY */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => actionSheetCityRef.current.show()}
            style={{ width: "100%" }}
          >
            <CustomSelector
              placeholder={"City"}
              value={city}
              isDropdown
              asterick
              label={"City"}
              labelStyles={{
                color:
                  user?.role == "athlete"
                    ? Colors.black
                    : user?.role == "coach"
                    ? Colors.white
                    : Colors.white,
              }}
            />
          </TouchableOpacity>

          {city == "Other" && (
            <CustomTextInput
              placeholder="City Name"
              value={otherCity}
              onChangeText={(text) => setOtherCity(text)}
            />
          )}

          {/* )} */}

          {/* ZIP CODE */}
          <CustomTextInput
            maxLength={10}
            placeholder="Zip Code"
            value={zipCode}
            onChangeText={(text) => setZipCode(text)}
            keyboardType={"numeric"}
            asterick
            label={"Zip Code"}
            labelStyles={{
              color:
                user?.role == "athlete"
                  ? Colors.black
                  : user?.role == "coach"
                  ? Colors.white
                  : Colors.white,
            }}
          />

          {/* RACISM */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => actionSheetRacismRef.current.show()}
            style={{ width: "100%" }}
          >
            <CustomSelector
              placeholder={"Race"}
              label={"Race"}
              value={racism}
              isDropdown
              asterick
              labelStyles={{
                color:
                  user?.role == "athlete"
                    ? Colors.black
                    : user?.role == "coach"
                    ? Colors.white
                    : Colors.white,
              }}
            />
          </TouchableOpacity>

          {userData?.user?.role !== "coach" && racism == "Other not listed " ? (
            <CustomTextInput
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
          {userData?.user?.role !== "coach" && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => actionSheetSportsTypeRef?.current?.show()}
              style={{ width: "100%" }}
            >
              <CustomSelector
                placeholder={"Please Select Sport"}
                label={"Enter Sport"}
                value={sportType}
                isDropdown
                asterick
                labelStyles={{
                  color:
                    user?.role == "athlete"
                      ? Colors.black
                      : user?.role == "coach"
                      ? Colors.white
                      : Colors.white,
                }}
              />
            </TouchableOpacity>
          )}

          {/* Other Grand Button Sport Input */}

          {userData?.user?.role !== "coach" &&
          sportType == "Other not listed " ? (
            <CustomTextInput
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
          {userData?.user?.role !== "coach" &&
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
                  role={user?.role}
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
                  isDropdown
                  asterick
                  labelStyles={{
                    color:
                      user?.role == "athlete"
                        ? Colors.black
                        : user?.role == "coach"
                        ? Colors.white
                        : Colors.white,
                  }}
                />
              </TouchableOpacity>
            )}

          {userData?.user?.role !== "coach" &&
          subSportTitle == "Other not listed " ? (
            <CustomTextInput
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
          {userData?.user?.role !== "coach" &&
            (subSportTitle == "Basketball" ||
              subSportTitle == "Acrobatic" ||
              subSportTitle == "UFC/Martial arts") && (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => childSubType?.current?.show()}
                style={{ width: "100%" }}
              >
                <CustomSelector
                  role={user?.role}
                  placeholder={
                    subSportTitle == `Basketball`
                      ? `Select Basketball `
                      : subSportTitle == `Acrobatic`
                      ? `Select Acrobatic`
                      : subSportTitle == `UFC/Martial arts`
                      ? `Select UFC/Martial arts`
                      : null
                  }
                  label={
                    subSportTitle == `Basketball`
                      ? `Select Basketball `
                      : subSportTitle == `Acrobatic`
                      ? `Select Acrobatic`
                      : subSportTitle == `UFC/Martial arts`
                      ? `Select UFC/Martial arts`
                      : null
                  }
                  value={childSportTitle}
                  isDropdown
                  asterick
                />
              </TouchableOpacity>
            )}

          {userData?.user?.role !== "coach" &&
          childSportTitle == "Other not listed " ? (
            <CustomTextInput
              placeholder={"Please Enter Other Sport"}
              label={"Please Enter Other Sport"}
              onChangeText={(value) => {
                setOtherChildSportType(value);
              }}
              asterick
              value={otherChildSportType}
            />
          ) : null}

          {/* SPORTS TYPE */}
          {/* <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => actionSheetSportsTypeRef.current.show()}
            style={{ width: "100%" }}
          >
            <CustomSelector
              placeholder={"Sport"}
              value={sportType}
              isDropdown
              // asterick
            />
          </TouchableOpacity> */}

          {/* {sportType === "Other not listed " ? (
            <>
              <CustomTextInput
                placeholder={"Please enter Sport"}
                onChangeText={(value) => {
                  setOtherSport(value);
                }}
                value={otherSport}
              />
            </>
          ) : null} */}

          {/* WEIGHT */}
          {/* {sportType === "Boxing" ? (
            <>
              <CustomTextInput
                maxLength={3}
                placeholder={"Please enter weight class (KG)"}
                onChangeText={(value) => {
                  setClassWeight(value);
                }}
                value={classWeight}
                keyboardType={"numeric"}
                // asterick
              />
            </>
          ) : null} */}

          {/* HOCKEY TYPE */}
          {/* {sportType === "Hockey" ? (
            <>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => actionSheetHockeyType.current.show()}
                style={{ width: "100%" }}
              >
                <CustomSelector
                  placeholder={"Hockey Type"}
                  value={hockeyType}
                  isDropdown
                  // asterick
                />
              </TouchableOpacity>
            </>
          ) : null} */}

          {/* POSITION */}
          {/* {user && user?.role == "athlete" ? (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => actionSheetPositionRef.current.show()}
              style={{ width: "100%" }}
            >
              <CustomSelector
                placeholder={"Position"}
                value={position}
                isDropdown
              />
            </TouchableOpacity>
          ) : null} */}

          {/* COACH TYPE */}
          {user && user?.role == "coach" ? (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => actionSheetCoachRef.current.show()}
              style={{ width: "100%" }}
            >
              <CustomSelector
                placeholder={"Coach / Staff Type"}
                value={coachType}
                isDropdown
              />
            </TouchableOpacity>
          ) : null}

          {coachType === "Other" ? (
            <CustomTextInput
              placeholder={"Please Enter Coach Type"}
              onChangeText={(value) => {
                setOtherCoach(value);
              }}
              value={otherCoach}
            />
          ) : null}

          {/* Height */}
          {userData?.user?.role !== "coach" && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => actionSheetHeightRef.current.show()}
              style={{ width: "100%" }}
            >
              <CustomSelector
                placeholder={"Height"}
                label={"Height"}
                value={height}
                isDropdown
                asterick
                labelStyles={{
                  color:
                    user?.role == "athlete"
                      ? Colors.black
                      : user?.role == "coach"
                      ? Colors.white
                      : Colors.white,
                }}
              />
            </TouchableOpacity>
          )}

          {userData?.user?.role !== "coach" && height == "Other" ? (
            <CustomTextInput
              placeholder={"Please Enter Height"}
              label={"Please Enter Height"}
              onChangeText={(value) => {
                setOtherheight(value);
              }}
              asterick
              value={otherHeight}
            />
          ) : null}

          {userData?.user?.role == "coach" && (
            <>
              <CustomTextInput
                maxLength={35}
                placeholder={"Please enter sport"}
                label={"What sport do you coach?"}
                color={
                  userData?.user?.role == "athlete"
                    ? Colors.black
                    : Colors.darkBlue
                }
                onChangeText={(value) => setSportType(value)}
                value={sportType}
                asterick
              />
              <CustomTextInput
                maxLength={3}
                placeholder={"Please enter experience"}
                label={"Do you have any experience?"}
                color={
                  userData?.user?.role == "athlete"
                    ? Colors.black
                    : Colors.darkBlue
                }
                onChangeText={(value) => setCoachExperience(value)}
                value={coachExperience}
                keyboardType={"numeric"}
                asterick
              />
            </>
          )}

          {/* Weight */}
          {userData?.user?.role !== "coach" && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => actionSheetWeightRef.current.show()}
              style={{ width: "100%" }}
            >
              <CustomSelector
                placeholder={"Weight"}
                label={"Weight"}
                value={weight}
                isDropdown
                asterick
                labelStyles={{
                  color:
                    user?.role == "athlete"
                      ? Colors.black
                      : user?.role == "coach"
                      ? Colors.white
                      : Colors.white,
                }}
              />
            </TouchableOpacity>
          )}

          {userData?.user?.role !== "coach" && weight == "Other" ? (
            <CustomTextInput
              placeholder={"Please Enter Weight"}
              label={"Please Enter Weight"}
              onChangeText={(value) => {
                setOtherWeight(value);
              }}
              asterick
              value={otherWeight}
            />
          ) : null}

          {/* BIO */}
          <CustomTextInput
            multi={true}
            maxLength={250}
            placeholder={"Bio (not more than 250 words)"}
            onChangeText={(value) => {
              setBio(value);
            }}
            value={bio}
          />

          {/* PORTFOLIO SECTION */}
          <View
            style={{ alignSelf: "flex-start", marginLeft: 8, width: "100%" }}
          >
            <Text
              style={{
                color: userData?.role == "coach" ? Colors.white : Colors?.black,
                fontSize: 20,
                fontWeight: "600",
                textDecorationLine: "underline",
                marginVertical: 20,
              }}
            >
              Portfolio
            </Text>
            <FlatList
              ListFooterComponent={() => {
                return (
                  <TouchableOpacity
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 10,
                      marginVertical: 10,
                      marginHorizontal: 5,
                      backgroundColor:
                        user?.role == "athlete"
                          ? Colors.darkBlue
                          : user?.role == "coach"
                          ? Colors.orange
                          : Colors.orange,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CustomNewImagePicker
                      disable={
                        portfolioAssets?.length >= 15
                          ? true
                          : userData?.user?.role == "athlete"
                          ? true
                          : false
                      }
                      isMultiple={true}
                      onImageChange={(path, mime, type) => {
                        updatePortfolioFromGallery(path, mime, type);
                      }}
                      style={{ justifyContent: "flex-end" }}
                    >
                      <View
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: 10,
                          marginVertical: 10,
                          marginHorizontal: 5,
                          backgroundColor:
                            user?.role == "athlete"
                              ? Colors.darkBlue
                              : user?.role == "coach"
                              ? Colors.orange
                              : Colors.orange,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Image
                          style={{
                            width: 22,
                            height: 22,
                            justifyContent: "center",
                            tintColor: Colors.white,
                          }}
                          source={Icons.plus}
                        />
                      </View>
                    </CustomNewImagePicker>
                  </TouchableOpacity>
                );
              }}
              showsHorizontalScrollIndicator={false}
              horizontal
              contentContainerStyle={{
                height: 100,
              }}
              data={portfolioAssets}
              renderItem={({ item }) => (
                <RenderList item={item} from={"portfolio"} />
              )}
            />
          </View>

          {/* Certificate SECTION */}
          <View
            style={{ alignSelf: "flex-start", marginLeft: 8, width: "100%" }}
          >
            <Text
              style={{
                color: userData?.role == "coach" ? Colors.white : Colors?.black,
                fontSize: 20,
                fontWeight: "600",
                textDecorationLine: "underline",
                marginVertical: 20,
              }}
            >
              Awards & Trophies
            </Text>
            <FlatList
              ListFooterComponent={() => {
                return (
                  <TouchableOpacity
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 10,
                      marginVertical: 10,
                      marginHorizontal: 5,
                      backgroundColor:
                        user?.role == "athlete"
                          ? Colors.darkBlue
                          : user?.role == "coach"
                          ? Colors.orange
                          : Colors.orange,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <MultipleFilePicker
                      disable={userData?.user?.role == "athlete" ? true : false}
                      isMultiple={true}
                      onImageChange={(path, mime, type) => {
                        updateCertificateFromGallery(path, mime, type);
                      }}
                    >
                      <View
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: 10,
                          marginVertical: 10,
                          marginHorizontal: 5,
                          backgroundColor:
                            user?.role == "athlete"
                              ? Colors.darkBlue
                              : user?.role == "coach"
                              ? Colors.orange
                              : Colors.orange,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Image
                          style={{
                            width: 22,
                            height: 22,
                            justifyContent: "center",
                            tintColor: Colors.white,
                          }}
                          source={Icons.plus}
                        />
                      </View>
                    </MultipleFilePicker>
                  </TouchableOpacity>
                );
              }}
              showsHorizontalScrollIndicator={false}
              style={{}}
              horizontal
              contentContainerStyle={{
                // flexGrow: 1,
                height: 100,
                // width: "100%",
              }}
              keyExtractor={(item, index) => index.toString()}
              data={certificateAssets}
              renderItem={({ item }) => (
                <RenderList item={item} from={"certificates"} />
              )}
            />
          </View>
          <CustomButton
            title={"UPDATE"}
            onPress={() => {
              UpdateProfile();
            }}
            buttonStyle={{
              marginTop: 20,
            }}
          />
        </View>
      </ScrollView>
    </AppBackground>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  wrapper: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 5,
    position: "relative",
  },
  backgroundForGalleryAsset: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  icon: {
    position: "absolute",
    top: 30,
    left: 30,
  },
  asterick: {
    textAlign: "left",
    marginRight: "auto",
    marginLeft: 10,
    alignSelf: "flex-end",
    height: 15,
    justifyContent: "flex-end",
    marginTop: 10,
  },
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

const ActionSheetCommponent = ({
  title = "",
  dataset = [],
  onPress = () => {},
}) => {
  console.log(title, "titllee");
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
        {dataset?.map((item, index) => {
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
                  : item?.type
                  ? item?.type
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
