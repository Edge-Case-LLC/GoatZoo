import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  Dimensions,
  StyleSheet,
  Linking,
} from "react-native";
import { Colors } from "../../../config";
import CustomBackground from "../../../components/CustomBackground";
import Icons from "../../../assets/Icons";
import SocialSignin from "../../../components/SocialSignin";
import { ApplicationLogsHistory } from "../../../redux/APIs";
import PolicyModal from "../../../components/Modal/PolicyModal";
// import SocialSignin from '../../../components/SocialSignin';

const { width } = Dimensions.get("window");

const PreLogin = ({ navigation, route }) => {
  const [agreementModal, setAgreementModal] = useState(false);
  const [isTermsAgreementAccepted, setIsTermsAgreementAccepted] =
    useState(false);
  const [policyError, setPolicyError] = useState(false);
  const [agreementError, setAgreementError] = useState(false);
  const [isPolicyAccepted, setIsPolicyAccepted] = useState(false);
  const [loginType, setLoginType] = useState("");

  const onModalClose = () => {
    setAgreementModal(false);
  };
  const { from } = route.params;
  console.log(from, "ferommmm");
  const methods = [
    {
      name: "Email",
      icon: Icons.email,
      onPress: () => {
        setAgreementModal(true);
        setLoginType("Email");
      },
      // navigation.navigate("Login", { from }),
      color: Colors.orange,
    },
    // {
    //   name: "Facebook",
    //   icon: Icons.facebook,
    //   color: Colors.blue,
    //   // onPress: SocialSignin.Facebook,
    // },
    {
      name: "Google",
      icon: Icons.google,
      color: Colors.google,
      // onPress: () => SocialSignin.Google(from),
      onPress: () => {
        setAgreementModal(true);
        setLoginType("Google");
      },
    },
    {
      name: "Apple",
      icon: Icons.apple,
      color: Colors.black,
      // onPress: () => SocialSignin.Apple(from),
      onPress: () => {
        setAgreementModal(true);
        setLoginType("Apple");
      },
    },
  ];
  const submit = async (linkType) => {
    if (linkType == "termsCondition") {
      navigation.navigate("TermsConditions");
    } else if (linkType == "privacyPolicy") {
      navigation.navigate("PrivacyPolicy");
    }
    // const url = "https://www.google.com";
    // const supported = Linking.canOpenURL(url);
    // if (supported) {
    //   Linking.openURL(url);
    // }
  };

  useEffect(() => {
    ApplicationLogsHistory(`Pre Login`);
    return () => {
      setAgreementModal(false);
      setIsTermsAgreementAccepted(false);
      setPolicyError(false);
      setAgreementError(false);
      setIsPolicyAccepted(false);
    };
  }, []);

  return (
    <CustomBackground back>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          width: "100%",
        }}
      >
        <Text style={styles.txt}>Pre-Login</Text>
        <View
          style={{
            marginTop: 20,
            alignItems: "center",
            flex: 1,
            width: "100%",
          }}
        >
          {methods.map((method, i) => {
            const { color, name, icon, onPress } = method;
            if (Platform.OS !== "ios" && name === "Apple") return null;
            return (
              <TouchableOpacity
                onPress={onPress}
                key={i}
                activeOpacity={0.8}
                style={{
                  backgroundColor: color,
                  borderRadius: 10,
                  width: width - 60,
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 7,
                  height: 50,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={icon}
                  style={{
                    marginRight: 20,
                    width: 20,
                    height: 20,
                    resizeMode: "contain",
                    tintColor: name === "Apple" ? Colors.white : Colors.white,
                    position: "absolute",
                    left: width / 8,
                  }}
                />

                <Text
                  style={{
                    fontWeight: "500",
                    fontSize: 16,
                    color: name === "Apple" ? Colors.white : Colors.white,
                    position: "absolute",
                    left: width / 4,
                  }}
                >
                  Login With {name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <Text style={{ color: Colors.white, fontSize: 15, fontWeight: "600" }}>
          By signing up, you agree to our
        </Text>
        <View style={{ flexDirection: "row", marginBottom: "10%" }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              submit("termsCondition");
            }}
          >
            <Text
              style={{
                color: Colors.darkBlue,
                fontSize: 15,
                fontWeight: "800",
                textDecorationLine: "underline",
              }}
            >
              Terms & Conditions
            </Text>
          </TouchableOpacity>
          <Text
            style={{ color: Colors.white, fontSize: 15, fontWeight: "600" }}
          >
            {""} and {""}
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => submit("privacyPolicy")}
          >
            <Text
              style={{
                color: Colors.darkBlue,
                fontSize: 15,
                fontWeight: "800",
                textDecorationLine: "underline",
              }}
            >
              {" "}
              Privacy Policy
            </Text>
          </TouchableOpacity>
        </View>
        <PolicyModal
          agreementModal={agreementModal}
          setAgreementModal={setAgreementModal}
          isTermsAgreementAccepted={isTermsAgreementAccepted}
          setIsTermsAgreementAccepted={setIsTermsAgreementAccepted}
          policyError={policyError}
          setPolicyError={setPolicyError}
          isPolicyAccepted={isPolicyAccepted}
          setIsPolicyAccepted={setIsPolicyAccepted}
          agreementError={agreementError}
          setAgreementError={setAgreementError}
          onModalClose={() => {
            onModalClose();
          }}
          loginHandler={() => {
            loginType == "Email"
              ? navigation.navigate("Login", { from })
              : loginType == "Google"
              ? SocialSignin.Google(from)
              : loginType == " Apple"
              ? SocialSignin.Apple(from)
              : null;
          }}
        />
      </View>
    </CustomBackground>
  );
};

export default PreLogin;

const styles = StyleSheet.create({
  txt: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: "700",
  },
});

{
  /* <Modal isVisible={agreementModal} style={{flex: 1}}>
          <View
            style={{
              backgroundColor: 'white',
              overflow: 'hidden',
              borderRadius: 15,
            }}>
            <View style={{backgroundColor: Colors.button}}>
              <Text
                style={{
                  color: 'white',
                  // fontFamily: Fonts.bold,
                  margin: 15,
                  alignSelf: 'center',
                  fontSize: 18,
                }}>
                AGREEMENT
              </Text>
            </View>
            <View style={{padding: 30}}>
              <Text
                style={{
                  marginBottom: 5,
                  // fontFamily: Fonts.regular,
                }}>
                I have read and agreed with
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 10,
                }}>
                <TouchableOpacity
                  onPress={() => this.setState({terms: !terms})}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 20,
                    width: 20,
                    borderRadius: 3,
                    borderWidth: 1,
                    borderColor: terms ? Colors.border : 'grey',
                  }}>
                  {terms ? (
                    <Image
                      source={require('../../assets/Icons/check.png')}
                      style={{
                        tintColor: Colors.primary,
                        width: 13,
                        height: 13,
                        resizeMode: 'contain',
                      }}
                    />
                  ) : null}
                </TouchableOpacity>
                <Text
                  onPress={() => {
                    this.setState({agreementModal: false});
                    this.props.navigation.navigate('TermsConditionsAuth', {
                      goBack: 'PreLogin',
                    });
                  }}
                  style={{
                    marginLeft: 20,
                    // fontFamily: Fonts.regular,
                  }}>
                  Terms and Conditions
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => this.setState({policy: !policy})}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 20,
                    width: 20,
                    borderRadius: 3,
                    borderWidth: 1,
                    borderColor: policy ? Colors.border : 'grey',
                  }}>
                  {policy ? (
                    <Image
                      source={require('../../assets/Icons/check.png')}
                      style={{
                        tintColor: Colors.primary,
                        width: 13,
                        height: 13,
                        resizeMode: 'contain',
                      }}
                    />
                  ) : null}
                </TouchableOpacity>
                <Text
                  onPress={() => {
                    this.setState({agreementModal: false});
                    this.props.navigation.navigate('PrivacyPolicyAuth', {
                      goBack: 'PreLogin',
                    });
                  }}
                  style={{
                    marginLeft: 20,
                    // fontFamily: Fonts.regular,
                  }}>
                  Privacy Policy
                </Text>
              </View>
            </View>
            <View
              style={{flexDirection: 'row', width: '100%', marginBottom: -1}}>
              <TouchableOpacity
                onPress={() => {
                  if (terms && policy) {
                    this.setState({agreementModal: false});
                    if (navigator.length)
                      this.props.navigation.navigate(navigator);
                  } else {
                    Toast.show({
                      text1:
                        'Please accept our Terms & Conditions and Privacy Policy',
                      type: 'error',
                      visibilityTime: 3000,
                    });
                  }
                }}
                style={{
                  backgroundColor: Colors.button,
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 60,
                  width: '50%',
                }}>
                <Text style={{color: 'white', fontSize: 16, fontWeight: '700'}}>
                  Accept
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({agreementModal: false});
                }}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 60,
                  width: '50%',
                }}>
                <Text style={{fontSize: 16}}>Reject</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal> */
}
