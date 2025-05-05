import {
  combineSlices,
  configureStore,
  type Action,
  type ThunkAction,
} from "@reduxjs/toolkit";
import { floodApiSlice } from "./features/flood/flood.Rtk";
// import { authSlice } from "./features/auth";

import { globalSlice } from "./features/global";
import { jobSlice } from "./features/job";
import { companySlice } from "./features/companies";
import { appointmentSlice } from "./features/appointments";
import { userSlice } from "./features/users";
import { locationSlice } from "./features/location";
import { InventoriesSlice } from "./features/inventory";

// `combineSlices` automatically combines the reducers using
// their `reducerPath`s, therefore we no longer need to call `combineReducers`.
const rootReducer = combineSlices(
  floodApiSlice,
  // authSlice,
  globalSlice,
  companySlice,
  appointmentSlice,
  jobSlice,
  userSlice,
  locationSlice,
  InventoriesSlice
);
// Infer the `RootState` type from the root reducer
export type RootState = ReturnType<typeof rootReducer>;

// `makeStore` encapsulates the store configuration to allow
// creating unique store instances, which is particularly important for
// server-side rendering (SSR) scenarios. In SSR, separate store instances
// are needed for each request to prevent cross-request state pollution.
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(floodApiSlice.middleware),
  });

// Infer the return type of `makeStore`
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
