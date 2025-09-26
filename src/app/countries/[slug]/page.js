"use client"; // This tells Next.js that this component should be rendered on the client side (not server-side).

// Import Redux actions for managing countries state
import {
  clearSelectedCountry, // Action to clear the currently selected country
  fetchCountries, // Action to fetch all countries from the API
  setSelectedCountry, // Action to set a selected country in the state
} from "@/lib/features/countries/countriesSlice";

// Import an icon from Material-UI
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// Import Material-UI components for UI
import {
  Box, // A simple container component for layout
  Button, // Button component
  Card, // Card container for grouping content
  CardContent, // The content section of a Card
  Chip, // Small component for tags, like languages
  Divider, // Horizontal divider line
  Grid, // Layout component for responsive grids
  Paper, // Paper component with elevation/shadow
  Typography, // For text with different sizes/variants
} from "@mui/material";

// Next.js component for optimized images
import Image from "next/image";

// Hooks from Next.js for routing and params
import { useParams, useRouter } from "next/navigation";

// React hooks for state management and lifecycle
import { useEffect, useState } from "react";

// Redux hooks to dispatch actions and select state
import { useDispatch, useSelector } from "react-redux";

// Main functional component for the country page
const CountryPage = () => {
  const { slug } = useParams(); // Get the country slug from the URL
  const router = useRouter(); // Get Next.js router object for navigation
  const dispatch = useDispatch(); // Get Redux dispatch function

  // Access the Redux store's countries slice
  const { selectedCountry, loading, error, countries } = useSelector(
    (state) => state.countries
  );

  console.log("Countries from single page", countries); // Debugging: log countries to console

  // Fetch all countries if the list is empty
  useEffect(() => {
    if (countries.length === 0) {
      dispatch(fetchCountries()); // Dispatch action to fetch countries
    }
  });

  // Local state for weather information
  const [weatherData, setWeatherData] = useState(null); // Stores weather info
  const [weatherLoading, setWeatherLoading] = useState(false); // Loading state for weather
  const [weatherError, setWeatherError] = useState(null); // Error state for weather

  // Function to fetch weather data from OpenWeather API
  const fetchWeatherData = async (capital) => {
    if (!capital) return; // Exit if capital is not defined

    setWeatherLoading(true); // Set loading to true before API call
    setWeatherError(null); // Reset any previous error

    try {
      const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERAPI; // Get API key from environment
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          capital
        )}&appid=${API_KEY}&units=metric` // API URL with capital city and metric units
      );

      if (!response.ok) throw new Error("Weather data not available"); // Throw error if response fails

      const data = await response.json(); // Parse JSON response
      setWeatherData(data); // Save weather data in state
    } catch (err) {
      setWeatherError(err.message); // Save error message in state
    } finally {
      setWeatherLoading(false); // Stop loading regardless of success/failure
    }
  };

  // Fetch weather whenever selectedCountry changes
  useEffect(() => {
    if (selectedCountry?.capital?.[0]) { // Check if country has a capital
      fetchWeatherData(selectedCountry.capital[0]); // Fetch weather for the capital
    }
  }, [selectedCountry]);

  // Set selected country based on URL slug
  useEffect(() => {
    if (slug && countries.length > 0) {
      const countryName = decodeURIComponent(slug.replace(/-/g, " ")); // Convert slug to readable name
      const foundCountry = countries.find(
        (country) =>
          country.name.common.toLowerCase() === countryName.toLowerCase() ||
          country.name.official.toLowerCase() === countryName.toLowerCase()
      ); // Find the country object that matches the slug

      if (foundCountry) {
        dispatch(setSelectedCountry(foundCountry)); // Save found country in Redux state
      } else {
        dispatch(clearSelectedCountry()); // Clear if not found
      }
    }

    return () => {
      dispatch(clearSelectedCountry()); // Cleanup: clear selected country on unmount
    };
  }, [slug, countries, dispatch]);

  // Function to navigate back to countries list
  const handleBack = () => {
    router.push("/countries"); // Redirect to /countries page
  };

  // Show loading if data is still being fetched
  if (loading || countries.length === 0) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <Typography variant="h6">Loading countries data...</Typography>
      </Box>
    );
  }

  // Show error if something went wrong fetching countries
  if (error) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
        gap={2}
      >
        <Typography variant="h6" color="error">
          Error loading country: {error}
        </Typography>
        <Button
          variant="contained"
          onClick={handleBack}
          startIcon={<ArrowBackIcon />}
        >
          Back to Countries
        </Button>
      </Box>
    );
  }

  // Show message if selected country is not found
  if (!selectedCountry) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
        gap={2}
      >
        <Typography variant="h6">Country not found</Typography>
        <Button
          variant="contained"
          onClick={handleBack}
          startIcon={<ArrowBackIcon />}
        >
          Back to Countries
        </Button>
      </Box>
    );
  }

  // Helper function to get currency string
  const getCurrencies = (country) => {
    if (!country.currencies) return "N/A"; // Return N/A if no currencies
    return Object.values(country.currencies)
      .map((currency) => `${currency.name} (${currency.symbol})`) // Format each currency
      .join(", "); // Join multiple currencies with comma
  };

  // Helper function to get languages string
  const getLanguages = (country) => {
    if (!country.languages) return "N/A"; // Return N/A if no languages
    return Object.values(country.languages).join(", "); // Join multiple languages with comma
  };

  // Helper function to format population numbers
  const formatPopulation = (population) => {
    return new Intl.NumberFormat().format(population); // e.g., 1000000 => 1,000,000
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", p: 3 }}>
      {/* Back Button */}
      <Button
        variant="outlined"
        onClick={handleBack}
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3 }}
      >
        Back to Countries
      </Button>

      <Paper elevation={3} sx={{ p: 4 }}>
        <Grid container spacing={4}>
          {/* Flag and Basic Info */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  gap={3}
                >
                  <Image
                    width={300}
                    height={200}
                    style={{
                      objectFit: "cover",
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                    }}
                    src={
                      selectedCountry.flags?.svg || selectedCountry.flags?.png
                    } // Display SVG flag if available, fallback to PNG
                    alt={`Flag of ${selectedCountry.name?.common}`} // Accessibility text
                    priority // High priority image for faster load
                  />
                  <Box textAlign="center">
                    <Typography variant="h3" component="h1" gutterBottom>
                      {selectedCountry.name?.common} {/* Country name */}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Detailed Information */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Country Details
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <Box display="flex" flexDirection="column" gap={2}>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Population
                    </Typography>
                    <Typography variant="body1">
                      {formatPopulation(selectedCountry.population)}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Capital
                    </Typography>
                    <Typography variant="body1">
                      {selectedCountry.capital?.join(", ") || "N/A"}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Languages
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      {getLanguages(selectedCountry)
                        .split(", ")
                        .map((language, index) => (
                          <Chip
                            key={index} // Each language gets a unique key
                            label={language} // Show language text
                            variant="outlined"
                            size="small"
                            sx={{ mr: 1, mb: 1 }}
                          />
                        ))}
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* ✅ Weather Section */}
        {selectedCountry?.capital?.[0] && (
          <Grid container spacing={4} sx={{ mt: 2 }}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Weather in {selectedCountry.capital[0]}
                  </Typography>
                  <Divider sx={{ mb: 2 }} />

                  {/* Loading state for weather */}
                  {weatherLoading && (
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      minHeight="200px"
                    >
                      <Typography variant="body1">
                        Loading weather data...
                      </Typography>
                    </Box>
                  )}

                  {/* Error state for weather */}
                  {weatherError && (
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      minHeight="200px"
                    >
                      <Typography variant="body1" color="error">
                        {weatherError}
                      </Typography>
                    </Box>
                  )}

                  {/* Weather data display */}
                  {weatherData && !weatherLoading && (
                    <Grid container spacing={3}>
                      {/* Current Weather */}
                      <Grid item xs={12} md={6}>
                        <Box
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                          gap={2}
                        >
                          <Box display="flex" alignItems="center" gap={2}>
                            <Image
                              width={80}
                              height={80}
                              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} // Weather icon
                              alt={weatherData.weather[0].description} // Alt text for accessibility
                            />
                            <Box>
                              <Typography variant="h3" component="div">
                                {Math.round(weatherData.main.temp)}°C
                              </Typography>
                              <Typography variant="h6" color="text.secondary">
                                {weatherData.weather[0].main}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Grid>

                      {/* Weather Details */}
                      <Grid item xs={12} md={6}>
                        <Box display="flex" flexDirection="column" gap={1.5}>
                          <Box display="flex" justifyContent="space-between">
                            <Typography variant="body1" fontWeight="bold">
                              Humidity:
                            </Typography>
                            <Typography variant="body1">
                              {weatherData.main.humidity}%
                            </Typography>
                          </Box>
                          <Box display="flex" justifyContent="space-between">
                            <Typography variant="body1" fontWeight="bold">
                              Wind Speed:
                            </Typography>
                            <Typography variant="body1">
                              {weatherData.wind.speed} m/s
                            </Typography>
                          </Box>
                          <Box display="flex" justifyContent="space-between">
                            <Typography variant="body1" fontWeight="bold">
                              Feels like:
                            </Typography>
                            <Typography variant="body1">
                              {Math.round(weatherData.main.feels_like)}°C
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </Paper>
    </Box>
  );
};

export default CountryPage; // Export the component to use in other parts of the app
