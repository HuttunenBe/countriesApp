// Import configureStore from Redux Toolkit
// configureStore simplifies store creation and automatically adds useful middleware
import { configureStore } from "@reduxjs/toolkit";

// Import the reducer for the countries slice
// This reducer handles all actions related to the 'countries' state
import countriesReducer from "./features/countries/countriesSlice";

// Function to create the Redux store
export const makeStore = () => {
  return configureStore({
    // Object containing all reducers in the store
    // Each key will become a slice of the global Redux state
    reducer: {
      countries: countriesReducer, // The 'countries' slice is managed by countriesReducer
    },
  });
};
