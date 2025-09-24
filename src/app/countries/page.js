// Mark this component as a client-side component in Next.js
"use client";

// Import the async thunk to fetch countries from Redux slice
import { fetchCountries } from "@/lib/features/countries/countriesSlice";

// Import React hooks
import { useEffect } from "react";

// Import Redux hooks for state and dispatch
import { useDispatch, useSelector } from "react-redux";

// Import Material-UI components for styling
import { Card, CardContent, Typography, Box } from "@mui/material";

const Countries = () => {
  // Access the 'countries' array from Redux state
  const countries = useSelector((state) => state.countries.countries);

  // Get dispatch function to trigger Redux actions
  const dispatch = useDispatch();

  // useEffect runs once on mount to fetch countries from API
  useEffect(() => {
    dispatch(fetchCountries()); // Dispatch the async thunk action
  }, [dispatch]); // Dependency ensures effect runs once

  // Log countries array for debugging
  console.log("countries", countries);

  return (
    // Box container for layout, using flex and wrapping items
    <Box display="flex" flexWrap="wrap" padding="2rem">
      {countries.map((country) => (
        // Each country is displayed as a Material-UI Card
        <Card
          key={country.name} // Unique key for React rendering
          style={{
            margin: "10px",
            padding: "10px",
            width: 250,
            lineHeight: 1.5,
          }}
        >
          <CardContent>
            {/* Country name */}
            <Typography variant="h2" style={{ fontSize: "29px", fontWeight: 900 }}>
              {country.name.common}
            </Typography>

            {/* Country population */}
            <Typography>{country.population}</Typography>

            {/* Country currencies */}
            <Typography>
              {country.currencies
                ? Object.values(country.currencies).map((country) => country.name)
                : ""}
            </Typography>

            {/* Country flag */}
            <Typography>
              <img
                src={country.flags?.svg} // Flag image URL
                alt={country.flag?.alt}  // Alt text for accessibility
                style={{ height: "auto", width: 100, marginTop: 20 }}
              />
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

// Export Countries component for use in routes or other components
export default Countries;
