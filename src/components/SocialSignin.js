// npm i @react-native-google-signin/google-signin react-native-fbsdk-next @invertase/react-native-apple-authentication
// npm i @react-native-firebase/app @react-native-firebase/auth

import Toast from "react-native-toast-message";
import Auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
// import {AccessToken, LoginManager, Settings} from 'react-native-fbsdk-next';
import { appleAuth } from "@invertase/react-native-apple-authentication";
import { socialSignin } from "../redux/APIs";

GoogleSignin.configure({
  webClientId:
    // "206909306840-jntinbo6c7uc5ami5cleq4tfl28knjrn.apps.googleusercontent.com",
    "206909306840-jntinbo6c7uc5ami5cleq4tfl28knjrn.apps.googleusercontent.com",
});

// Settings.setAppID('1101411500700897');

const Google = async (role) => {
  console.log(role, "roleee");
  try {
    const userInfo = await GoogleSignin.signIn();
    const googleCredential = Auth.GoogleAuthProvider.credential(
      userInfo.idToken
    );
    const userAuth = await Auth().signInWithCredential(googleCredential);
    // const access_token = await (await userAuth?.user?.getIdToken()).toString();
    const { uid, email, displayName } = userAuth?.user;
    await socialSignin(uid, "google", email, role, displayName);
  } catch (error) {
    console.log(error, "'err");
  }
};

const Facebook = () => {
  // LoginManager.logInWithPermissions(['public_profile'])
  //   .then(async login => {
  //     if (login.isCancelled) {
  //     } else {
  //       try {
  //         const fbAuth = await AccessToken.getCurrentAccessToken();
  //         const fbCredential = Auth.FacebookAuthProvider.credential(
  //           fbAuth.accessToken,
  //         );
  //         const userAuth = await Auth().signInWithCredential(fbCredential);
  //         await socialSignin(userAuth, 'facebook');
  //       } catch (error) {
  //         console.log(error);
  //         Toast.show({
  //           text1: 'Unable to sign in with Facebook',
  //           type: 'error',
  //           visibilityTime: 3000,
  //         });
  //       }
  //     }
  //   })
  //   .catch(error => console.log(error));
};

const Apple = async (role) => {
  try {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });
    const { identityToken, nonce } = appleAuthRequestResponse;
    const appleCredential = Auth?.AppleAuthProvider?.credential(
      identityToken,
      nonce
    );
    const userAuth = await Auth()?.signInWithCredential(appleCredential);
    const { uid } = userAuth?.user;
    const user_credential = userAuth?.user?._user?.providerData;
    await socialSignin(
      uid,
      "apple",
      user_credential[0]?.email,
      role,
      user_credential[0]?.displayName
    );
  } catch (error) {
    console.log("error", error);
    Toast.show({
      text1: "Unable to sign in with Apple",
      type: "error",
      visibilityTime: 3000,
    });
  }
};

export default { Google, Apple, Facebook };
