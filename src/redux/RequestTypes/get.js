import axios from "axios";
import Toast from "react-native-toast-message";
import { Common } from "../../config";
import { store } from "../index";

let state = store.getState()?.reducer;
let user_authentication = state?.user?.authentication;
axios.defaults.baseURL = Common.baseURL;
axios.defaults.timeout = Common.defaultTimeout;

function storeUpdate() {
  state = store.getState()?.reducer;
  user_authentication = state?.user?.authentication;
  console.log(user_authentication,'=user_authentication');
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${user_authentication}`;
}

function dispatch(action) {
  store.dispatch(action);
}

export default async function getApi(
  endpoint,
  // headers=true,
  successToast = true,
  loaderStart = true,
  showError = true,
  defaultError = true,
  token = true
) {
  if (token) {
    storeUpdate();
  }
  if (loaderStart) {
    dispatch({ type: "LOADER_START" });
  }
  try {
    const response = await axios.get(endpoint);
    dispatch({ type: "LOADER_STOP" });
    {
      successToast
        ? Toast.show({
            text1: response.data.message,
            type: "success",
            visibilityTime: 5000,
          })
        : null;
    }
    return response.data;
  } catch (e) {
    dispatch({ type: "LOADER_STOP" });
    if (
      e.message.includes("timeout of ") &&
      e.message.includes("ms exceeded")
    ) {
      Toast.show({
        text1: "Can't connect to server",
        textStyle: { textAlign: "center" },
        type: "error",
        visibilityTime: 5000,
      });
    } else if (e?.response?.status == 401) {
      dispatch({ type: "LOGOUT" });
      return;
    } else if (e.response?.data?.message && showError) {
      Toast.show({
        text1: e.response.data.message,
        textStyle: { textAlign: "center" },
        type: "error",
        visibilityTime: 5000,
      });
    } else if (e.response?.data?.error?.message && showError) {
      Toast.show({
        text1: e.response.data.error.message,
        textStyle: { textAlign: "center" },
        type: "error",
        visibilityTime: 5000,
      });
    } else if (defaultError) {
      Toast.show({
        text1: e.message,
        textStyle: { textAlign: "center" },
        type: "error",
        visibilityTime: 5000,
      });
    }
    return null;
  }
}
