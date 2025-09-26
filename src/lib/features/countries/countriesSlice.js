import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; 
// Import helper functions from Redux Toolkit to create slices and async thunks

import axios from "axios"; 
// Import axios to make HTTP requests

const api =
  "https://restcountries.com/v3.1/all?fields=name,flags,population,currencies,capital,languages,region,subregion,area,timezones"; 
// API endpoint to fetch country data, selecting only specific fields

// Enhanced initial state
const initialState = {
  countries: [], // Array to store the list of all countries
  selectedCountry: null, // Stores a single country object when user selects a country
  loading: false, // Tracks if API call is in progress
  error: null, // Stores any error message from API call
};

// Existing fetchCountries thunk
export const fetchCountries = createAsyncThunk(
  "countries/countries", // Unique action type for this thunk
  async () => { // Async function that makes the API call
    const response = await axios.get(api); // Make GET request to fetch countries
    return response.data; // Return the data to Redux, used in fulfilled state
  }
);

// OPTIMIZED: Helper function to find country by name from existing data
export const selectCountryByName = (state, countryName) => {
  // Search through the countries array in state to find a country matching the name
  return state.countries.countries.find(
    (country) =>
      country.name.common.toLowerCase() === countryName.toLowerCase() || // Match common name
      country.name.official.toLowerCase() === countryName.toLowerCase() // Match official name
  );
};

export const countriesSlice = createSlice({
  name: "countries", // Name of the slice
  initialState, // Set initial state defined earlier
  reducers: {
    // NEW: Set selected country from existing data
    setSelectedCountry: (state, action) => {
      state.selectedCountry = action.payload; // Store selected country in state
      state.error = null; // Clear any previous errors
    },
    // Clear selected country when navigating away
    clearSelectedCountry: (state) => {
      state.selectedCountry = null; // Reset selected country
      state.error = null; // Clear errors
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle API call pending state
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true; // Set loading to true while fetching
        state.error = null; // Clear previous errors
      })
      // Handle successful API response
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.countries = action.payload; // Store fetched countries in state
        state.loading = false; // Stop loading
        state.error = null; // Ensure no error is set
      })
      // Handle API errors
      .addCase(fetchCountries.rejected, (state, action) => {
        state.loading = false; // Stop loading
        state.error = action.error.message; // Store error message
      });
  },
});

// Export actions
export const { setSelectedCountry, clearSelectedCountry } =
  countriesSlice.actions;
export default countriesSlice.reducer;
