import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer, createTransform } from "redux-persist";

import thunk from "redux-thunk";
import AsyncStorage from "@react-native-async-storage/async-storage";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import { stringify, parse } from "flatted";
import allReducers from "../reducers/index";

const transformCircular = createTransform(
  (inboundState, key) => stringify(inboundState),
  (outboundState, key) => parse(outboundState)
);

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
  timeout: null,
  transforms: [transformCircular],
  blacklist: ["loader", "socket"],
};

const persistedReducer = persistReducer(persistConfig, allReducers);
export const store = createStore(persistedReducer, {}, applyMiddleware(thunk));

export const persistor = persistStore(store);
