import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { ApiActions } from "@/utils";
import { AppThunk } from "@/lib/store";
import { endLoading, startLoading } from "../global";
import axios, { AxiosError } from "axios";
import { errorPopup } from "@/app/components/common";
import { getLocations } from "./locationApi";
import { ICompanyLocation } from "@/utils/types";

export interface ILocationSlice {
  locations: Array<ICompanyLocation>;
}

const initialState: ILocationSlice = {
  locations: [],
};
const apiKey = "AIzaSyD5dzUNlXR1b7oFj523utB_eZymWX3X0wY";

export const locationSlice = createSlice({
  name: "Location",
  initialState,
  reducers: {
    setLocations: (state, action: PayloadAction<Array<ICompanyLocation>>) => {
      state.locations = action.payload;
    },
  },
  selectors: {
    allLocations: (store) => store.locations,
  },
});

export const { allLocations } = locationSlice.selectors;
export const { setLocations } = locationSlice.actions;
export default locationSlice.reducer;

export const _getLocations = (): AppThunk => (dispatch) => {
  dispatch(startLoading({ key: ApiActions.GET_LOCATIONS }));
  getLocations()
    .then((response) => {
      dispatch(setLocations(response?.data));
      dispatch(endLoading({ key: ApiActions.GET_LOCATIONS }));
    })
    .catch((err) => {
      const error = err as AxiosError;
      dispatch(endLoading({ key: ApiActions.GET_LOCATIONS }));
      errorPopup(error.message);
    });
};

export const fetchAddressDetailsFromAddress = async (address: any) => {
  const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

  try {
    const response = await axios.get(geocodingUrl);

    if (response.data.status === "OK") {
      // Extract the first result's address components
      const addressComponents = response.data.results[0].address_components;

      // Initialize variables to store the required address details
      let streetNumber = null;
      let locality = null;
      let city = null;
      let state = null;
      let zipCode = null;

      // Loop through the address components to extract relevant details
      addressComponents.forEach((component: any) => {
        if (component.types.includes("street_number")) {
          streetNumber = component.long_name; // Get the street number
        }
        if (component.types.includes("route")) {
          locality = component.long_name; // Get the locality (street name)
        }
        if (component.types.includes("locality")) {
          city = component.long_name; // Get the city
        }
        if (component.types.includes("administrative_area_level_1")) {
          state = component.long_name; // Get the state
        }
        if (component.types.includes("postal_code")) {
          zipCode = component.long_name;
        }
      });

      return { streetNumber, locality, city, state, zipCode };
    } else {
      throw new Error("Error fetching address details.");
    }
  } catch (error: any) {
    throw new Error("Error fetching address details: " + error.message);
  }
};
