// Import functions from Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from "@reduxjs/toolkit";

// Import Axios for HTTP requests
import axios from "axios";

// Initial state for the slice
const initialState = {
    countries: [] // Stores fetched countries
};

// API endpoint to fetch countries data
const api = "https://restcountries.com/v3.1/all?fields=name,flags,population,currencies";

// Async thunk to fetch countries from the API
export const fetchCountries = createAsyncThunk(
    "countries/countries", // Action type prefix
    async () => {
        const response = await axios.get(api); // Make GET request
        console.log("response", response.status); // Log HTTP status
        console.log(response.data); // Log data for debugging
        return response.data; // Returned data becomes payload in fulfilled action
    }
);

// Create the countries slice
const countriesSlice = createSlice({
    name: "countries",        // Slice name
    initialState,             // Initial state defined above
    reducers: {},             // No synchronous reducers yet
    extraReducers: (builder) => {
        // Handle async thunk actions
        builder.addCase(fetchCountries.fulfilled, (state, action) => {
            // Update state with fetched countries when thunk is fulfilled
            state.countries = action.payload;
        });
    }
});

// Export the reducer to be used in the Redux store
export default countriesSlice.reducer;
