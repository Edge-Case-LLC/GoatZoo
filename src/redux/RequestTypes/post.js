import axios from "axios";
import Toast from "react-native-toast-message";
import { Common, NavService } from "../../config";
import { store } from "../index";

let state = store.getState()?.reducer;
let user_authentication = state?.user?.authentication;
axios.defaults.baseURL = Common.baseURL;
axios.defaults.timeout = Common.defaultTimeout;
// axios.defaults.timeout = 1;

function storeUpdate(token) {
  state = store.getState()?.reducer;
  user_authentication = token ? token : state?.user?.authentication;
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${user_authentication}`;
}

function dispatch(action) {
  store.dispatch(action);
}

export default async function postApi(
  endpoint,
  params = null,
  sucessToast = true,
  startLoader = true,
  token,
  formData = false
) {
  if (token) {
    storeUpdate(token);
  }
  if (startLoader) {
    dispatch({ type: "LOADER_START" });
  }
  try {
    const response = await axios.post(endpoint, params, {
      headers: {
        "Content-Type": formData ? "multipart/form-data" : "application/json",
        accept: "application/json",
      },
    });
    dispatch({ type: "LOADER_STOP" });
    {
      sucessToast
        ? Toast.show({
            text1: response.data.message,
            type: "success",
            visibilityTime: 3000,
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
        visibilityTime: 3000,
      });
    } else if (e?.response?.status == 401) {
      dispatch({ type: "LOGOUT" });
      return;
    } else if (e.response.data.message) {
      Toast.show({
        text1: e.response.data.message,
        textStyle: { textAlign: "center" },
        type: "error",
        visibilityTime: 3000,
      });
    } else if (e.response?.data?.error?.message) {
      Toast.show({
        text1: e.response.data.error.message,
        textStyle: { textAlign: "center" },
        type: "error",
        visibilityTime: 3000,
      });
    } else {
      Toast.show({
        text1: e.message,
        textStyle: { textAlign: "center" },
        type: "error",
        visibilityTime: 3000,
      });
    }
    return null;
  }
}
