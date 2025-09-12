import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    countries: []
};

const api = "https://restcountries.com/v3.1/all?fields=name,flags,population,currencies";



export const fetchCountries = createAsyncThunk ("countries/countries", async () => {
    const response = await axios.get(api);
    console.log("reponse", response.status)
    return response.data
    
})


export const countriesSlice = createSlice({
    name: "countries",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCountries.fulfilled, (state, action) => {
            state.countries = action.payload;
        });
    }
});




export default countriesSlice.reducer;
