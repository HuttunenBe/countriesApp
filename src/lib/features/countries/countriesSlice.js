import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const api =
  "https://restcountries.com/v3.1/all?fields=name,flags,population,currencies,capital,languages,region,subregion,area,timezones";

// Enhanced initial state
const initialState = {
  countries: [],
  selectedCountry: null, // NEW: For single country data
  loading: false, // NEW: Loading state
  error: null, // NEW: Error handling
};

// Existing fetchCountries thunk
export const fetchCountries = createAsyncThunk(
  "countries/countries",
  async () => {
    const response = await axios.get(api);
    return response.data;
  }
);

// OPTIMIZED: Helper function to find country by name from existing data
export const selectCountryByName = (state, countryName) => {
  return state.countries.countries.find(
    (country) =>
      country.name.common.toLowerCase() === countryName.toLowerCase() ||
      country.name.official.toLowerCase() === countryName.toLowerCase()
  );
};

export const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    // NEW: Set selected country from existing data
    setSelectedCountry: (state, action) => {
      state.selectedCountry = action.payload;
      state.error = null;
    },
    // Clear selected country when navigating away
    clearSelectedCountry: (state) => {
      state.selectedCountry = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Countries list handlers with loading states
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.countries = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export actions
export const { setSelectedCountry, clearSelectedCountry } =
  countriesSlice.actions;
export default countriesSlice.reducer;