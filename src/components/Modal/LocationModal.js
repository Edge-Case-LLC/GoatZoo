import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { createRef, useState } from "react";
import { Colors } from "../../config";
import CustomTextInput from "../CustomTextInput";
import ActionSheet from "react-native-actions-sheet";
import CustomSelector from "../../components/TextWithActionSheet";
import CustomButton from "../../components/CustomButton";
import states from "../../assets/Data/states";
import cities from "../../assets/Data/cities";
import Toast from "react-native-toast-message";
const { width } = Dimensions.get("window");

const LocationModal = ({ setModalVisible, setFilter }) => {
  const [zipCode, setZipCode] = useState();
  const [city, setCity] = useState();
  const [State, setState] = useState();
  const [game, setGame] = useState();
  const [position, setPosition] = useState();
  const [newCities, setNewCities] = useState(cities[`American Samao`]);
  const [country, setCountry] = useState();

  const GameArray = [
    {
      type: "Football",
    },

    { type: `Basketball` },
    { type: `Baseball` },
    { type: `Soccer` },
    { type: `Hockey` },
    { type: `Softball` },
    { type: `Tennis` },
    { type: `Golf` },
    { type: `Boxing` },
    { type: `UFC/martial arts` },
    {
      type: `Track and Field`,
    },
    { type: `Gymnastics` },
    { type: `Volleyball` },
    { type: `Lacrosse` },
    { type: `Wrestling` },
    {
      type: `Winter sports`,
    },
    {
      type: `Extreme sport`,
    },
    { type: `Equestrian` },
    { type: `Water sports` },
    { type: `Motor sports` },
    { type: `Rodeo sports` },
    {
      type: `Other not listed above`,
    },
  ];
  const StateArray = [
    {
      type: "State A",
    },
    {
      type: "State B",
    },
  ];
  const PositionArray = [
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
  const countries = [{ type: `USA` }];

  const actionSheetGameRef = createRef();
  const actionSheetPositionRef = createRef();
  const actionStateRef = createRef();
  const actionSheetStateRef = createRef();
  const actionSheetCityRef = createRef();
  const actionSheetCountryRef = createRef();

  const params = {
    state: State,
    city: city,
    zipCode: zipCode,
    sportsType: game,
    country: country,
  };
  const UpdateFilter = () => {
    if (!State && !country && !city && !zipCode && !game) {
      setModalVisible(false);
    } else {
      setModalVisible(false);
      setFilter(params);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.modalView}>
        <ActionSheet
          ref={actionSheetGameRef}
          containerStyle={{ backgroundColor: "transparent" }}
        >
          <View style={{ padding: 10, paddingBottom: 20 }}>
            <ActionSheetCommponent
              title="Game"
              dataset={GameArray}
              onPress={async (item) => {
                actionSheetGameRef.current.hide();
                setGame(item.type);
              }}
            />
            <TouchableOpacity
              onPress={() => actionSheetGameRef.current.hide()}
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

        {/* Country  */}
        <ActionSheet
          ref={actionSheetCountryRef}
          containerStyle={{ backgroundColor: "transparent" }}
        >
          <View style={{ padding: 10, paddingBottom: 20 }}>
            <ActionSheetCommponent
              title={"Select Country"}
              dataset={countries}
              onPress={async (item) => {
                actionSheetCountryRef.current.hide();
                setCountry(item?.type);
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

        {/* STATE SHEET */}
        <ActionSheet
          ref={actionSheetStateRef}
          containerStyle={{ backgroundColor: "transparent" }}
        >
          <View style={{ padding: 10, paddingBottom: 20 }}>
            <ActionSheetCommponent
              title={"Select State"}
              dataset={states}
              onPress={async (item) => {
                actionSheetStateRef.current.hide();
                setState(item);
                setNewCities(cities[`${item}`]);
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

        <ActionSheet
          ref={actionSheetCityRef}
          containerStyle={{ backgroundColor: "transparent" }}
        >
          <View style={{ padding: 10, paddingBottom: 20 }}>
            <ActionSheetCommponent
              title={"Select City"}
              dataset={newCities}
              onPress={async (item) => {
                actionSheetCityRef.current.hide();
                setCity(item);
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

        <ActionSheet
          ref={actionSheetPositionRef}
          containerStyle={{ backgroundColor: "transparent" }}
        >
          <View style={{ padding: 10, paddingBottom: 20 }}>
            <ActionSheetCommponent
              title="Position"
              dataset={PositionArray}
              onPress={async (item) => {
                actionSheetPositionRef.current.hide();
                setPosition(item.type);
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

        <Text style={styles.title}>Set Location</Text>

        {/* ZIP CODE */}
        <CustomTextInput
          maxLength={7}
          setWidth
          placeholder={"Enter Zip Code"}
          onChangeText={(value) => {
            setZipCode(value);
          }}
          value={zipCode}
          keyboardType={"default"}
        />
        {/* Country */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => actionSheetCountryRef.current.show()}
          style={{ width: "100%", marginTop: 20 }}
        >
          <CustomSelector
            setWidth
            placeholder={"Select by Country"}
            value={country}
            isDropdown
          />
        </TouchableOpacity>

        {/* STATE */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => actionSheetStateRef.current.show()}
          style={{ width: "100%", marginTop: 20 }}
        >
          <CustomSelector
            setWidth
            placeholder={"Select by  State"}
            value={State}
            isDropdown
          />
        </TouchableOpacity>

        {/* CITY */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => actionSheetCityRef.current.show()}
          style={{ width: "100%", marginTop: 20 }}
        >
          <CustomSelector
            setWidth
            placeholder={"Select by City"}
            value={city}
            isDropdown
          />
        </TouchableOpacity>

        <Text style={styles.title}>Set Location</Text>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => actionSheetGameRef.current.show()}
          style={{ width: "100%", marginTop: 20 }}
        >
          <CustomSelector
            setWidth
            placeholder={"Select Sports"}
            value={game}
            isDropdown
          />
        </TouchableOpacity>
        <CustomButton
          title="Update Filter"
          onPress={() => {
            UpdateFilter();
          }}
          buttonStyle={{
            width: width * 0.8,
          }}
        />
      </View>
    </View>
  );
};

export default LocationModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    width: "100%",
    borderRadius: 12,
    backgroundColor: Colors.white,
    padding: 20,
  },
  title: {
    color: Colors.orange,
    fontSize: 18,
    textDecorationLine: "underline",
    fontWeight: "600",
    marginTop: 20,
  },
});

const ActionSheetCommponent = ({
  title = "",
  dataset = [],
  onPress = () => {},
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
                  : item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};
