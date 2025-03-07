import { NavService } from "../../config";
import Toast from "react-native-toast-message";
import { store } from "../index";
import postApi from "../RequestTypes/post";
import getApi from "../RequestTypes/get";
import * as EmailValidator from "email-validator";
import { Keyboard, Platform } from "react-native";
import { SAVE_USER } from "../actions";
import { getFCMToken } from "../../components/Notification";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import axios from "axios";
// import putApi from "../RequestTypes/put";

let passwordRegex =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()-+=^.]).{8,16}$/;
var passwordValidator = require("password-validator");
var schema = new passwordValidator();
schema.is().min(8).is().max(100);

function dispatch(action) {
  store.dispatch(action);
}
export function loaderStart() {
  dispatch({ type: "LOADER_START" });
}
export function loaderStop() {
  dispatch({ type: "LOADER_STOP" });
}
// Common APIs

export async function socialSignin(access_token, type, email, role, name) {
  const fcmToken = await getFCMToken();
  const params = {
    user_social_token: access_token,
    user_social_type: type,
    user_device_type: Platform.OS,
    user_device_token: fcmToken ? fcmToken : "fcmToken",
    email,
    role: role,
    name: name,
  };
  const data = await postApi("social-login", params);
  if (data?.status == 1 && data?.data?.is_complete == 1) {
    dispatch({ type: "SAVE_USER", payload: data?.data });
    Toast.show({
      text1: data.message,
      type: "success",
      visibilityTime: 5000,
    });
  } else if (data?.status == 1 && data?.data?.is_complete == 0) {
    NavService?.navigate("CompleteProfile", {
      user_id: data?.data?._id,
      auth: data?.data?.authentication,
      role: role,
    });
  }
}

export const login = async (email, password, role) => {
  const fcmToken = await getFCMToken();
  if (!email)
    return Toast.show({
      text1: "Email address is required",
      type: "error",
      visibilityTime: 3000,
    });
  if (!EmailValidator.validate(email))
    return Toast.show({
      text1: "Please enter valid email address.",
      type: "error",
      visibilityTime: 3000,
    });
  if (!password)
    return Toast.show({
      text1: "Password is required",
      type: "error",
      visibilityTime: 3000,
    });
  if (password.length < 8)
    return Toast.show({
      type: "error",
      text1: "Password should be 8 characters long",
      visibilityTime: 3000,
    });
  const params = {
    email: email.toLowerCase(),
    password,
    role,
    user_device_type: Platform?.OS,
    user_device_token: fcmToken ? fcmToken : "fcmToken",
  };
  const data = await postApi("sign-in", params);
  if (
    data?.status == 1 &&
    data?.data?.is_verified === 1 &&
    data?.data?.is_complete == 1
  ) {
    dispatch({ type: "SAVE_USER", payload: data?.data });
  } else if (data?.status == 1 && data?.data?.is_verified == 0) {
    Toast.show({
      text1: data?.message,
      textStyle: { textAlign: "center" },
      type: "error",
      visibilityTime: 5000,
    });
    NavService.navigate("OTP", {
      user_id: data?.data?._id,
      role: role,
      signup: true,
    });
  } else if (data?.status == 1 && data?.data?.is_complete == 0) {
    Toast.show({
      text1: "First Complete your Profile",
      textStyle: { textAlign: "center" },
      type: "error",
      visibilityTime: 5000,
    });
    NavService.navigate("CompleteProfile", {
      user_id: data?.data?._id,
      auth: data?.data?.authentication,
      role: role,
    });
  }
};

export const signUP = async (
  fullName,
  email,
  password,
  confirmPassword,
  role,
  country,
  city,
  stateOfUs,
  zipCode,
  couchType,
  otherCouchType,
  // position,
  navigation,
  otherCountry,
  otherCity,
  otherStateOfUs
) => {
  console.log(otherCountry, "otherCountryotherCountry");
  console.log(otherCity, "otherCity");
  console.log(otherStateOfUs, "otherStateOfUs");

  console.log(couchType, "==coachType");
  console.log(otherCouchType, "=otherCouchType");
  const fcmToken = await getFCMToken();
  if (!fullName) {
    return Toast.show({
      text1: "Please enter full name",
      type: "error",
      visibilityTime: 3000,
    });
  } else if (!email) {
    return Toast.show({
      text1: "Please enter email address",
      type: "error",
      visibilityTime: 3000,
    });
  } else if (!EmailValidator.validate(email))
    return Toast.show({
      text1: "Please enter valid email address.",
      type: "error",
      visibilityTime: 3000,
    });
  else if (!password)
    return Toast.show({
      text1: "Please enter password",
      type: "error",
      visibilityTime: 3000,
    });
  else if (!password.match(passwordRegex))
    return Toast.show({
      type: "error",
      text1: "Password should be 8 characters long ",
      text2: "Contain uppercase,lowercase,numeric and special character",
      visibilityTime: 3000,
    });
  else if (!confirmPassword)
    return Toast.show({
      text1: "Please enter confirm password",
      type: "error",
      visibilityTime: 3000,
    });
  else if (password !== confirmPassword)
    return Toast.show({
      text1: "Password does not match",
      type: "error",
      visibilityTime: 3000,
    });
  else if (!country)
    return Toast.show({
      type: "error",
      text1: "Please Enter Country",
      visibilityTime: 3000,
    });
  else if (country == "Other" && !otherCountry)
    return Toast.show({
      type: "error",
      text1: "Please Enter Country",
      visibilityTime: 3000,
    });
  else if (!stateOfUs)
    return Toast.show({
      type: "error",
      text1: "Please Select State",
      visibilityTime: 3000,
    });
  else if (stateOfUs == "Other" && !otherStateOfUs)
    return Toast.show({
      type: "error",
      text1: "Please Enter State",
      visibilityTime: 3000,
    });
  else if (!city)
    return Toast.show({
      type: "error",
      text1: "Please Enter City",
      visibilityTime: 3000,
    });
  else if (city == "Other" && !otherCity)
    return Toast.show({
      type: "error",
      text1: "Please Enter City",
      visibilityTime: 3000,
    });
  else if (!zipCode)
    return Toast.show({
      type: "error",
      text1: "Please Enter ZipCode",
      visibilityTime: 3000,
    });
  else if (role == "coach" && (!couchType || !otherCouchType))
    return Toast.show({
      type: "error",
      text1:
        couchType == "Other"
          ? "Enter Coach /Staff"
          : `Enter associated school/college or league teams`,
      visibilityTime: 3000,
    });
  // else if (!position)
  //   return Toast.show({
  //     type: "error",
  //     text1: "Please Select Position",
  //     visibilityTime: 3000,
  //   });
  else {
    const params = {
      email: email.toLowerCase(),
      name: fullName,
      password: password,
      confirm_password: confirmPassword,
      role: role,
      zipCode: zipCode,
      city: city == "Other" ? otherCity : city,
      country: country == "Other" ? otherCountry : country,
      state: stateOfUs == "Other" ? otherStateOfUs : stateOfUs,
      specialization: otherCouchType ? otherCouchType : couchType,
      // position: position,
      user_device_type: Platform?.OS,
      user_device_token: fcmToken ? fcmToken : "fcmToken",
    };
    console.log(params, "paramsparams");
    const data = await postApi("sign-up", params);
    if (data?.status == 1) {
      navigation.replace("OTP", {
        user_id: data?.userId,
        role: role,
        signup: true,
      });
    }
  }
};

export const VerifyOtp = async (otp, id, role, signup) => {
  const params = {
    otp: otp,
    id,
    role,
  };
  const data = await postApi("verify-user", params);
  if (data?.status == 1) {
    Toast.show({
      text1: data.message,
      type: "success",
      visibilityTime: 3000,
    });
    {
      signup !== undefined
        ? NavService.navigate("CompleteProfile", {
            user_id: data?.user?._id,
            auth: data?.user?.authentication,
            role: role,
          })
        : NavService.navigate("ResetPassword", {
            user_id: data?.user?._id,
            role: role,
          });
    }
  }
};

export const Profile = async (
  fullName,
  gender,
  age,
  sportType,
  otherSport,
  auth,
  bio,
  country,
  city,
  stateOfUs,
  zipCode,
  coachType,
  otherCoach,
  imageUri,
  mime,
  profile,
  portfolioData,
  certificateData,
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
  role,
  coachExperience
) => {
  if (!age) {
    return Toast.show({
      text1: "Age is required",
      type: "error",
      visibilityTime: 3000,
    });
  } else if (!gender) {
    return Toast.show({
      text1: "Gender is required",
      type: "error",
      visibilityTime: 3000,
    });
  } else if (racism == "") {
    return Toast.show({
      text1: "Race is required",
      type: "error",
      visibilityTime: 3000,
    });
  } else if (racism == "Other not listed above" && !otherRacism) {
    return Toast.show({
      text1: "Race is required",
      type: "error",
      visibilityTime: 3000,
    });
  } else if (country == "Other" && !otherCountry && role !== "coach") {
    return Toast.show({
      text1: "Country is required",
      type: "error",
      visibilityTime: 3000,
    });
  } else if (stateOfUs == "Other" && !otherStateOfUs && role !== "coach") {
    return Toast.show({
      text1: "State is required",
      type: "error",
      visibilityTime: 3000,
    });
  } else if (city == "Other" && !otherCity && role !== "coach") {
    return Toast.show({
      text1: "City is required",
      type: "error",
      visibilityTime: 3000,
    });
  }
  //  else if (sportType == "Hockey" && !hockeyType) {
  //   return Toast.show({
  //     text1: "Hockey Type is required",
  //     type: "error",
  //     visibilityTime: 3000,
  //   });
  // }
  // else if (sportType == "Boxing" && !classWeight) {
  //   return Toast.show({
  //     text1: "Weight class is required",
  //     type: "error",
  //     visibilityTime: 3000,
  //   });
  // }
  else if (!coachExperience && role == "coach") {
    return Toast.show({
      text1: "Please enter experience",
      type: "error",
      visibilityTime: 3000,
    });
  } else if (!sportType && role !== "coach") {
    return Toast.show({
      text1: "Sport Type is required",
      type: "error",
      visibilityTime: 3000,
    });
  } else if (
    sportType == "Other not listed above" &&
    !otherSport &&
    role !== "coach"
  ) {
    return Toast.show({
      text1: "Other Type is required",
      type: "error",
      visibilityTime: 3000,
    });
  } else if (
    subSportTitle == "" &&
    sportType !== "Other not listed above" &&
    (sportType == `Outdoor Sports` ||
      sportType == `Indoor Sports` ||
      sportType == `Water Sports` ||
      sportType == `Motor Sports` ||
      sportType == `Boxing` ||
      sportType == `Winter Sports` ||
      sportType == `Extreme Sports` ||
      sportType == `Wrestling`) &&
    role !== "coach"
  ) {
    return Toast.show({
      text1: `${sportType} Type is required `,
      type: "error",
      visibilityTime: 3000,
    });
  } else if (
    subSportTitle == "Other not listed above" &&
    !otherSubSportType &&
    role !== "coach"
  ) {
    return Toast.show({
      text1: `Other ${sportType} Type is required `,
      type: "error",
      visibilityTime: 3000,
    });
  } else if (
    (subSportTitle == "Basketball" ||
      subSportTitle == "Acrobatic" ||
      subSportTitle == "UFC/Martial arts") &&
    !childSportTitle &&
    sportType !== "Other not listed above" &&
    role !== "coach"
  ) {
    return Toast.show({
      text1: `${subSportTitle} Type is required `,
      type: "error",
      visibilityTime: 3000,
    });
  } else if (
    childSportTitle == "Other not listed " &&
    !otherChildSportType &&
    role !== "coach"
  ) {
    return Toast.show({
      text1: `${subSportTitle} Type is required `,
      type: "error",
      visibilityTime: 3000,
    });
  } else if (!height && role !== "coach") {
    return Toast.show({
      text1: "Height is required",
      type: "error",
      visibilityTime: 3000,
    });
  } else if (height == "Other" && !otherHeight.trim() && role !== "coach") {
    return Toast.show({
      text1: "Other Type is required",
      type: "error",
      visibilityTime: 3000,
    });
  } else if (!weight && role !== "coach") {
    return Toast.show({
      text1: "Weight is required",
      type: "error",
      visibilityTime: 3000,
    });
  } else if (weight == "Other" && !otherWeight.trim() && role !== "coach") {
    return Toast.show({
      text1: "Other Type is required",
      type: "error",
      visibilityTime: 3000,
    });
  } else {
    const profileData = new FormData();
    if (fullName) {
      profileData.append("name", fullName);
    }
    profileData.append("gender", gender);
    profileData.append("racism", racism);
    profileData.append("age", age);
    profileData.append("sportsType", otherSport ? otherSport : sportType);
    {
      subSportTitle
        ? profileData.append(
            "subType1",
            otherSubSportType ? otherSubSportType : subSportTitle
          )
        : profileData.append("subType1", "");
    }
    {
      childSportTitle
        ? profileData.append(
            "subType2",
            otherChildSportType ? otherChildSportType : childSportTitle
          )
        : profileData.append("subType2", "");
    }
    profileData.append("height", otherHeight ? otherHeight : height);
    profileData.append("weight", otherWeight ? otherWeight : weight);
    if (role == "coach") {
      profileData.append("experience", coachExperience);
    }
    // if (position) {
    //   profileData.append("position", position);
    // }
    if (country) {
      // profileData.append("country", otherCountry ? otherCountry : country);
      profileData.append(
        "country",
        country == "Other" ? otherCountry : country
      );
    }
    if (city) {
      profileData.append("city", city == "Other" ? otherCity : city);
    }
    if (stateOfUs) {
      profileData.append(
        "state",
        stateOfUs == "Other" ? otherStateOfUs : stateOfUs
      );
    }
    if (zipCode) {
      profileData.append("zipCode", zipCode);
    }
    // if (classWeight) {
    //   profileData.append("classWeight", classWeight);
    // }
    // if (hockeyType) {
    //   profileData.append("hockeyType", hockeyType);
    // }
    profileData.append("bio", bio);
    if (otherCoach || coachType) {
      profileData.append("specialization", otherCoach ? otherCoach : coachType);
    }
    if (imageUri?.length) {
      profileData.append("image", {
        uri: imageUri,
        type: mime,
        name: `post${Date.now()}${imageUri}.${mime?.slice(
          mime.lastIndexOf("/") + 1
        )}`,
      });
    }
    if (portfolioData?.length > 0) {
      let prevPortfolios = [];
      portfolioData.map((item) => {
        if (!item?.name && item?.includes("upload")) {
          prevPortfolios.push(item);
        } else {
          profileData.append("portfolio", item);
        }
      });
      profileData.append("prevPortfolio", JSON.stringify(prevPortfolios));
    } else {
      profileData.append("prevPortfolio", JSON.stringify([]));
    }
    if (certificateData?.length > 0) {
      let prevCertificates = [];
      certificateData.map((item) => {
        if (!item?.name && item?.includes("upload")) {
          prevCertificates.push(item);
        } else {
          profileData.append("certificate", item);
        }
      });
      profileData.append("prevCertificate", JSON.stringify(prevCertificates));
    } else {
      profileData.append("prevCertificate", JSON.stringify([]));
    }
    console.log("profileData", profileData, "profileData");
    const data = await postApi(
      "update-profile",
      profileData,
      true,
      true,
      auth,
      true
    );
    if (data?.status == 1) {
      profile
        ? Toast.show({
            text1: "Profile Updated Successfully",
            textStyle: { textAlign: "center" },
            type: "error",
            visibilityTime: 3000,
          })
        : Toast.show({
            text1: "Profile Completed",
            textStyle: { textAlign: "center" },
            type: "error",
            visibilityTime: 3000,
          });
      dispatch({ type: "SAVE_USER", payload: data?.user });
      NavService.goBack();
    }
  }
};
export const forgetPassword = async (email, role) => {
  if (!email)
    return Toast.show({
      text1: "Email is required",
      type: "error",
      visibilityTime: 3000,
    });
  else if (!EmailValidator.validate(email))
    return Toast.show({
      text1: "Email not valid",
      type: "error",
      visibilityTime: 3000,
    });
  else {
    const params = {
      email: email?.toLowerCase(),
      role,
    };
    const data = await postApi("forget-password", params, false);
    if (data?.status == 1) {
      NavService.navigate("OTP", { user_id: data?.userId, role: role });
    }
  }
};

export const ResendOtp = async (id, role) => {
  const params = {
    id,
    role,
  };
  const data = await postApi("resend-code", params);
  if (data?.status == 1) {
    Toast.show({
      text1: "We have resend  OTP verification code at your email address",
      type: "success",
      visibilityTime: 3000,
    });
  }
};

export const ResetPass = async (id, password, confirm_password, role) => {
  if (!password) {
    return Toast.show({
      text1: "New Password is requried",
      type: "error",
      visibilityTime: 3000,
    });
  } else if (!password.match(passwordRegex)) {
    return Toast.show({
      type: "error",
      text1: "Password should be 8 characters long ",
      text2: "Contain uppercase,lowercase,numeric and special character",
      visibilityTime: 3000,
    });
  }
  if (!confirm_password)
    return Toast.show({
      text1: "Confirm Password is required",
      type: "error",
      visibilityTime: 3000,
    });
  if (password !== confirm_password)
    return Toast.show({
      text1: "New Password and Confirm Password must be same.",
      type: "error",
      visibilityTime: 3000,
    });
  else {
    const params = {
      id,
      password,
      confirm_password,
      role,
    };

    const data = await postApi("reset-password", params);
    if (data?.status == 1) {
      NavService.navigate("Login", { role });
    }
  }
};

export const Logout = async () => {
  const isSignedIn = await GoogleSignin.isSignedIn();
  if (isSignedIn) await GoogleSignin.signOut();
  const data = await getApi("log-out");
  if (data?.status == 1) {
    dispatch({ type: "LOGOUT" });
  }
};

export const ChangePass = async (
  password,
  confirm_password,
  new_password,
  role
) => {
  if (!password)
    return Toast.show({
      text1: "Exisiting Password is required",
      type: "error",
      visibilityTime: 3000,
    });
  else if (password.length < 8)
    return Toast.show({
      type: "error",
      text1: "Password should be 8 characters long",
      visibilityTime: 3000,
    });
  else if (!new_password)
    return Toast.show({
      text1: "New Password is required",
      type: "error",
      visibilityTime: 3000,
    });
  else if (password == new_password)
    return Toast.show({
      text1: "Current Password and New Password must not be same.",
      type: "error",
      visibilityTime: 3000,
    });
  else if (!new_password.match(passwordRegex))
    return Toast.show({
      type: "error",
      text1: "Password should be 8 characters long",
      text2: "Contain uppercase,lowercase,numeric and special character",
      visibilityTime: 3000,
    });
  else if (!confirm_password)
    return Toast.show({
      text1: "Confirm Password is required",
      type: "error",
      visibilityTime: 3000,
    });
  else if (new_password !== confirm_password)
    return Toast.show({
      text1: "Password and confirm password must be same",
      type: "error",
      visibilityTime: 3000,
    });
  else {
    const params = {
      password: password,
      confirm_password: new_password,
      new_password: new_password,
      role: role,
    };
    const data = await postApi("update-password", params);
    if (data?.status == 1) {
      NavService.navigate("Home");
    }
  }
};
export const getProfile = async () => {
  const data = await getApi("get-profile", false, true, false, false);
  if (data?.status == 1) {
    return data;
  }
};

export const CreatePost = async (
  image,
  mime,
  text,
  media,
  videoMime,
  checkIsForm
) => {
  const profileData = new FormData();
  profileData.append("is_forum_post", checkIsForm ? 1 : 0);
  if (text) {
    profileData.append("postText", text);
  }
  if (media) {
    profileData.append("postVideo", {
      uri: media,
      type: videoMime,
      name: `post${Date.now()}${media}.${videoMime?.slice(
        videoMime.lastIndexOf("/") + 1
      )}`,
    });
  }
  if (image?.length) {
    profileData.append("postImage", {
      uri: image,
      type: mime,
      name: `post${Date.now()}${image}.${mime?.slice(
        mime.lastIndexOf("/") + 1
      )}`,
    });
  }
  const data = await postApi(
    "create-post",
    profileData,
    true,
    true,
    false,
    true
  );
  if (data?.status == 1) {
    NavService.navigate("Home");
    Toast.show({
      text1: "Post Created Successfully",
      type: "success",
      visibilityTime: 3000,
    });
    return data;
  }
};

export const getPost = async (obj) => {
  let data;
  if (obj) {
    data = await getApi(
      `get-all-posts?state=${obj.state}&city=${obj.city}&country=${obj.country}&sportType=${obj.sportType}`,
      false,
      true,
      false,
      false
    );
  } else {
    data = await getApi("get-all-posts", false, true, false, false);
  }
  if (data?.status == 1) {
    return data?.posts;
  } else {
    return [];
  }
};
export const getPostForCoachCorner = async () => {
  const data = await getApi("get-coach-corner", false, true, false, false);
  if (data?.status == 1) {
    return data?.data;
  } else {
    return [];
  }
};
export const getPostSavedInLocker = async () => {
  const data = await getApi("list-of-locked-posts", false, true, false, false);
  if (data?.status == 1) {
    return data;
  }
};

export const LikePost = async (id) => {
  const data = await getApi(`like-post/${id}`, false, false, false, false);
  return data;
};
export const saveCurrentPostToMyLocker = async (id, showDots) => {
  const data = await getApi(`lock-post/${id}`, showDots ? false : true);
  return data;
};

export const fetchComments = async (post_id) => {
  const data = await getApi(
    `get-comments/${post_id}`,
    false,
    true,
    false,
    false
  );
  if (data?.status == 1) {
    return data;
  }
};
export const commentOnPost = async (post_id, payload) => {
  const data = await postApi(`add-comment/${post_id}`, payload, false);
  if (data?.status == 1) {
    return data;
  }
};

export const getlikeList = async (id) => {
  const data = await getApi(
    `get-likes-on-post/${id}`,
    false,
    true,
    false,
    false
  );
  if (data?.status == 1) {
    return data?.users;
  }
};

export const getOtherUser = async (id) => {
  const data = await getApi(
    `get-other-user-profile/${id}`,
    false,
    true,
    false,
    false,
    true
  );
  if (data?.status == 1) {
    return data;
  }
};

export const PostCreateCoachCorner = async (
  image,
  mime,
  text,
  media,
  videoMime,
  dropDownSelectionValues
) => {
  const payload = new FormData();
  if (text) {
    payload.append("text", text);
  }
  if (media?.length) {
    payload.append("cornerVideo", {
      uri: media,
      type: videoMime,
      name: `post${Date.now()}.${videoMime?.slice(
        videoMime.lastIndexOf("/") + 1
      )}`,
    });
  }
  if (image?.length) {
    payload.append("cornerImage", {
      uri: image,
      type: mime,
      name: `post${Date.now()}.${mime?.slice(mime.lastIndexOf("/") + 1)}`,
    });
  }
  if (dropDownSelectionValues) {
    payload.append("type", dropDownSelectionValues);
  }
  const data = await postApi(
    "create-coach-corner",
    payload,
    true,
    true,
    false,
    true
  );
  if (data?.status == 1) {
    NavService.goBack();
    Toast.show({
      text1: "Tip Created Successfully",
      type: "success",
      visibilityTime: 3000,
    });
    return data;
  }
};

export const PostFollowUnfollow = async (id) => {
  const data = await getApi(`/follow-user/${id}`, false, true, false, false);
  if (data?.status == 1) {
    return data;
  }
};

export const SendChatImage = async (image, mime) => {
  const payload = new FormData();
  if (image?.length) {
    payload.append("sendImage", {
      uri: image,
      type: mime,
      name: `post${Date.now()}.${mime?.slice(mime.lastIndexOf("/") + 1)}`,
    });
  }
  const data = await postApi("send-image", payload, false, true, true, true);
  if (data?.status == 1) {
    return data;
  }
};
export const SendChatVideo = async (video, mime) => {
  const payload = new FormData();
  if (video?.length) {
    payload.append("chatVideo", {
      uri: video,
      type: mime,
      name: `post${Date.now()}.${mime?.slice(mime.lastIndexOf("/") + 1)}`,
    });
  }
  const data = await postApi("v1/fanclubs/uploads", payload, false, true, false, true);
  if (data?.status == 1) {
    return data;
  }
};

export const getFollowingList = async (id) => {
  const data = await getApi(`get-following/${id}`, false, true, false, false);
  if (data?.status == 1) {
    return data?.following;
  }
};

export const getFollowersList = async (id) => {
  const data = await getApi(`get-followers/${id}`, false, true, false, false);
  if (data?.status == 1) {
    return data?.followers;
  }
};

export const getChatList = async () => {
  const data = await getApi("chat-list", false, true, false, false);
  if (data?.status == 1) {
    return data?.data;
  }
};

export const DeleteAccount = async () => {
  loaderStart();
  const response = await axios.delete(
    `https://host2.appsstaging.com:3067/api/delete-account`
  );
  loaderStop();
  if (response?.data?.status == 1) {
    dispatch({ type: "LOGOUT" });
    return Toast.show({
      text1: "Account Deleted Succesfully",
      type: "success",
      visibilityTime: 3000,
    });
  }
};

export const getSearchList = async (text, type) => {
  console.log(text, type, "===check");
  const data = await getApi(
    `search-post?text=${text}&type=${type}`,
    false,
    true,
    false,
    false
  );
  console.log(data, "==dataa");
  return data;
};

// export const saveSearchRecord = async (text, type) => {
//   const getSearchData = await getApi(
//     `search-record?name=${String(text).toLowerCase()}&type=${type}`,
//     false,
//     true,
//     false,
//     false
//   );
//   return getSearchData;
// };

export const getNotifications = async () => {
  const data = await getApi(`get-notification`, false, true, false, false);
  return data;
};

export const getNotificationKey = async () => {
  const data = await getApi(`toggle-notification`, false, true, false, false);
  dispatch({ type: "SAVE_USER", payload: data?.data });
  return data;
};

export const DeleteUserPost = async (id) => {
  loaderStart();
  const response = await axios.delete(
    `https://host2.appsstaging.com:3067/api/delete-post/${id}`
  );
  loaderStop();
  if (response?.data?.status == 1) {
    return Toast.show({
      text1: "Post Deleted Succesfully",
      type: "success",
      visibilityTime: 3000,
    });
  }
  return response?.data;
};

export const EditUserPost = async (image, mime, text, media, videoMime, id) => {
  const profileData = new FormData();
  if (text) {
    profileData.append("postText", text);
  }
  if (videoMime !== "") {
    profileData.append("postVideo", {
      uri: media,
      type: videoMime,
      name: `post${Date.now()}${media}.${videoMime?.slice(
        videoMime.lastIndexOf("/") + 1
      )}`,
    });
  }
  if (mime !== "") {
    profileData.append("postImage", {
      uri: image,
      type: mime,
      name: `post${Date.now()}${image}.${mime?.slice(
        mime.lastIndexOf("/") + 1
      )}`,
    });
  }
  const data = await postApi(
    `edit-post/${id}`,
    profileData,
    true,
    true,
    false,
    true
  );
  if (data?.status == 1) {
    NavService.navigate("Home");
    Toast.show({
      text1: "Post Edited Successfully",
      type: "success",
      visibilityTime: 3000,
    });
    return data;
  }
};

export const getCountries = async () => {
  const data = await getApi("list-of-countires", false, false, false, false);

  if (data?.status == 1) {
    return data?.data;
  }
};

export const getStates = async (id) => {
  const data = await getApi(`list-of-state/${id}`, false, true, false, false);
  if (data?.status == 1) {
    return data?.data;
  } else {
    return [];
  }
};

export const getCities = async (id) => {
  const data = await getApi(`list-of-city/${id}`, false, true, false, false);
  if (data?.status == 1) {
    return data?.data;
  }
};

export const getUsers = async () => {
  const data = await getApi(`unfollowed-users`, false, true, false, false);
  if (data?.status == 1) {
    return data?.following;
  }
};
export const getForumUsers = async () => {
  const data = await getApi(`get-forum-users`, false, true, false, false);
  if (data?.status == 1) {
    return data?.data;
  }
};

export const SearchHistory = async () => {
  const data = await getApi(`get-search-record`, false, true, false, false);
  console.log(data?.data, "==data search");
  if (data?.status == 1) {
    return data?.data;
  } else {
    return [];
  }
};

export const ApplicationLogsHistory = async (route) => {
  const data = await getApi(
    `add-navigation/${route}`,
    false,
    true,
    false,
    false
  );
  if (data?.status == 1) {
    return data?.data;
  }
};

export const awardsAndTrophyToggle = async () => {
  const data = await getApi(`set-privacy`, false, true, false, false);
  dispatch({ type: "SAVE_USER", payload: data?.data });
  return data;
};

export const InviteForChat = async (id, type) => {
  console.log("typetype", type);
  const data = await getApi(
    `accept-message-request?type=${type}&id=${id}`,
    false,
    true,
    false,
    false
  );
  console.log(data?.type, "====typwww");
  if (data?.status == 1) {
    if (data?.type == "accept") {
      NavService.navigate("ChatList");
    } else {
      NavService.goBack();
    }
    return data;
  }
};

export const MessageRequestList = async () => {
  const data = await getApi(`message-request-list`, false, true, false, false);
  console.log(data, "===MessageRequestList");
  if (data?.status == 1) {
    return data?.data;
  }
};
export const requestChat = async (id) => {
  console.log("issssss", id);
  loaderStart();
  const response = await getApi(`message-request/${id}`);
  console.log("responseresponse", response);
  loaderStop();
  return response?.data;
};
// 'delete-search/:id'

export const DeleteSearchHistory = async (id) => {
  loaderStart();
  const response = await axios.delete(
    `https://host2.appsstaging.com:3067/api/delete-search/${id}`
  );
  console.log("responseresponse", response);
  loaderStop();
  return response?.data;
};

export const SendGoatnotes = async (
  sender_id,
  receiver_id,
  post_id,
  message
) => {
  const params = {
    sender_id,
    receiver_id,
    post_id,
    message,
  };

  console.log(params, "paramss");
  const data = await postApi("send-notes", params);
  console.log(data, "datadata");

  if (data?.status == 1) {
    // NavService.navigate("Chat House");
    Toast.show({
      text1: "Goat Note Sent Successfully",
      type: "success",
      visibilityTime: 3000,
    });
    return data;
  }
};
export const getForumPost = async (filterBy) => {
  let data = await getApi(
    `get-forum-posts?filter=${filterBy}`,
    false,
    true,
    false,
    false
  );
  console.log("data", data, "data");
  if (data?.status == 1) {
    return data?.posts;
  } else {
    return [];
  }
};

export const getAllFanClub = async () => {
  try {
    const res = await getApi("v1/fanclubs", false, true, false, true);
    console.log("Response_get: ", res.data[9]);
    return res.data;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const createFanClub = async (body, responseCb = () => "") => {
  console.log("BODY_CREATE_FANCLUB: ", body);
  try {
    const data = await postApi("v1/fanclubs", body);
    console.log("CREATE_FAN_CLUB", data);
    responseCb();
  } catch (error) {
    console.log("ERROR: ", error);
  }
};

export const joinFanClub = async (fanClubId, responseCb = () => "") => {
  try {
    const res = await getApi(
      `v1/fanclubs/join/${fanClubId}`,
      true,
      true,
      true,
      true
    );
    console.log("Response: ", res);
    responseCb();
    return res.data;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const getFanClubRequest = async () => {
  try {
    const res = await getApi("v1/fanclubs/requests/", true, true, true, true);
    console.log("Response Request FanCLub: ", res);
    return res.data;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const handleFanClubRequest = async (
  fanClubId,
  userId,
  body,
  responseCb = () => ""
) => {
  try {
    const res = await postApi(
      `v1/fanclubs/action/${fanClubId}?user_id=${userId}`,
      {
        approve: body,
      },
    );
    responseCb();
  } catch (error) {
    console.log("Error Handling Request: ", error);
  }
};
