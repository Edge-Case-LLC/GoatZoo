import React, { Component } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  Dimensions,
  Platform,
  StyleSheet,
  BackHandler,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { connect } from "react-redux";
import appIcons from "../../../assets/Icons";
import appImages from "../../../assets/Images";
import AppBackground from "../../../components/AppBackground";
import CustomButton from "../../../components/CustomButton";
import { Colors, size } from "../../../config";
import { ApplicationLogsHistory } from "../../../redux/APIs";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
class Subscription extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  Data = [
    {
      title: "Basic Pass",
      desciption:
        "\u29bf Access to Video \n\n\u29bf 3 picture uploads per month \n\n\u29bf 3 video uploads per month",
      price: "Free",
    },
    {
      title: "Next Pass",
      desciption:
        "\u29bf Access to Video \n\n\u29bf 10 picture uploads per month \n\n\u29bf 20 video uploads per month \n\n\u29bf Coach/Staff Etc \n\n\u29bf Chat Room \n\n\u29bf Access to my Locker.",
      price: "$3.99 per mo. or $39.99 annually.",
    },
    {
      title: "Star Pass",
      desciption:
        "\u29bf Access to all features \n\n\u29bf Unlimited uploads per month",
      price: "$5.99 per mo. or $59.99 annually.",
    },
  ];

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener("focus", () => {
      ApplicationLogsHistory("Subscription");
    });

    // BackHandler.addEventListener(
    //   "hardwareBackPress",
    //   this.handleBackButtonClick
    // );
  }

  componentWillUnmount() {
    this.focusListener();
    // BackHandler.removeEventListener(
    //   "hardwareBackPress",
    //   this.handleBackButtonClick
    // );
  }
  render() {
    const carouselRef = React.createRef(null);
    const user = this?.props?.user;
    const renderItem = (item) => {
      const data = item?.item;
      return (
        <View style={styles.mainView}>
          <View style={styles.mainCont}>
            <View style={styles.subscriptionBgImg}>
              <View style={styles.TopTextView}>
                <Text
                  style={[
                    styles.packageHeading,
                    {
                      color:
                        item.index == 0
                          ? Colors.orange
                          : item.index == 1
                          ? Colors.darkBlue
                          : Colors.darkGreen,
                    },
                  ]}
                >
                  {data?.title}
                </Text>
                <Text style={styles.desciption}>{data?.desciption}</Text>
              </View>
              <ImageBackground
                imageStyle={{ marginBottomLeftRadius: 100 }}
                style={styles.priceBg}
                source={
                  item.index == 0
                    ? appImages.subscription
                    : item.index == 1
                    ? appImages.subscriptionBlue
                    : appImages.subscriptionGreen
                }
              >
                <Text style={styles.priceHeading}>{data?.price}</Text>
                {/* <Text style={styles.priceHeading}>{"Year"}</Text> */}
              </ImageBackground>
            </View>
          </View>
          <CustomButton
            title="Subscribe"
            buttonStyle={[
              styles.buyBtn,
              {
                backgroundColor:
                  item.index == 0
                    ? Colors.orange
                    : item.index == 1
                    ? Colors.darkBlue
                    : Colors.darkGreen,
              },
            ]}
            textStyle={styles.btnTitle}
          />
        </View>
      );
    };
    const ListFooterComponent = () => {
      return (
        <CustomButton
          title="Subscribe"
          buttonStyle={styles.buyBtn}
          textStyle={styles.btnTitle}
        />
      );
    };

    return (
      <AppBackground
        whiteBg
        title={"Subscription"}
        back
        notification={false}
        marginHorizontal={false}
        isCoach={user && user?.role == "athlete" ? false : true}
      >
        <View style={styles.container}>
          <Carousel
            ref={carouselRef}
            sliderWidth={screenWidth}
            sliderHeight={screenWidth}
            itemWidth={screenWidth - 60}
            data={this.Data}
            renderItem={(item) => renderItem(item)}
            // ListFooterComponent={<ListFooterComponent />}
            hasParallaxImages={true}
          />
        </View>
      </AppBackground>
    );
  }
}

function mapStateToProps({ reducer: { user } }) {
  return {
    user,
  };
}
const actions = { ApplicationLogsHistory };
export default connect(mapStateToProps, actions)(Subscription);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "center",
    alignItems: "center",
    width: "100%",
  },
  mainView: {
    width: "100%",
    alignSelf: "center",
    overflow: "hidden",
  },
  mainCont: {
    ...Shadows.shadow5,
    width: Platform.OS == "android" ? screenWidth - 120 : screenWidth - 110,
    height: "80%",
    backgroundColor: Colors.white,
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 20,
    marginTop: 50,
    overflow: "hidden",
  },
  packageHeading: {
    color: Colors.DarkGrey,
    fontSize: size.h2,
    fontWeight: "500",
  },
  subscriptionBgImg: {
    width: "100%",
    alignItems: "center",
    paddingTop: 40,
    flex: 1,
  },
  TopTextView: {
    marginHorizontal: 20,
    alignItems: "center",
  },
  desciption: {
    fontSize: size.normal,
    textAlign: "justify",
    textTransform: "capitalize",
    marginVertical: 25,
    fontWeight: "400",
    color: Colors.black,
  },
  priceHeading: {
    color: Colors.white,
    fontSize: size.large,
    textAlign: "center",
    fontWeight: "700",
    marginTop: 5,
  },
  cardView: {
    width: "40%",
    flexDirection: "row",
    top: 150,
    paddingHorizontal: screenWidth / 10,
    paddingVertical: 12,
    alignSelf: "center",
  },
  priceBg: {
    width: "100%",
    height: 220,
    marginTop: "auto",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  btnTitle: {
    color: Colors.white,
    fontSize: size.xxlarge,
    fontWeight: "700",
  },
  textView: {
    position: "absolute",
    bottom: 50,
    zIndex: 1,
  },
  buyBtn: {
    width: "95%",
    alignSelf: "center",
  },
});
