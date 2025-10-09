"use client";
import {
  clearSelectedCountry,
  fetchCountries,
  setSelectedCountry,
} from "@/lib/features/countries/countriesSlice";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const CountryPage = () => {
  const { slug } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const { selectedCountry, loading, error, countries } = useSelector(
    (state) => state.countries
  );

  console.log("Countries from single page", countries);

  useEffect(() => {
    if (countries.length === 0) {
      dispatch(fetchCountries());
    }
  });

  const [weatherData, setWeatherData] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState(null);

  const fetchWeatherData = async (capital) => {
    if (!capital) return;

    setWeatherLoading(true);
    setWeatherError(null);

    try {
      const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERAPI;
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          capital
        )}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) throw new Error("Weather data not available");

      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setWeatherError(err.message);
    } finally {
      setWeatherLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCountry?.capital?.[0]) {
      fetchWeatherData(selectedCountry.capital[0]);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (slug && countries.length > 0) {
      const countryName = decodeURIComponent(slug.replace(/-/g, " "));
      const foundCountry = countries.find(
        (country) =>
          country.name.common.toLowerCase() === countryName.toLowerCase() ||
          country.name.official.toLowerCase() === countryName.toLowerCase()
      );

      if (foundCountry) {
        dispatch(setSelectedCountry(foundCountry));
      } else {
        dispatch(clearSelectedCountry());
      }
    }

    return () => {
      dispatch(clearSelectedCountry());
    };
  }, [slug, countries, dispatch]);

  const handleBack = () => {
    router.push("/countries");
  };

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

  

  const getCurrencies = (country) => {
    if (!country.currencies) return "N/A";
    return Object.values(country.currencies)
      .map((currency) => `${currency.name} (${currency.symbol})`)
      .join(", ");
  };

  const getLanguages = (country) => {
    if (!country.languages) return "N/A";
    return Object.values(country.languages).join(", ");
  };

  const formatPopulation = (population) => {
    return new Intl.NumberFormat().format(population);
  };
  return (
    <Box sx={{ maxWidth: 1400, mx: "auto", p: 3 }}>
      <Button
        variant="outlined"
        onClick={handleBack}
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3 }}
      >
        Back to Countries
      </Button>
      <Box
  display="flex"
  alignItems="center"
  justifyContent="center"
  m="0 auto"   // shorthand for margin: 0 auto
>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
              <Image
                width={300}
                height={200}
                src={selectedCountry.flags?.svg || selectedCountry.flags?.png}
                alt={`Flag of ${selectedCountry.name?.common}`}
                style={{ borderRadius: "8px", border: "1px solid #ddd", objectFit: "cover" }}
              />
              <Typography variant="h3">{selectedCountry.name?.common}</Typography>

              {selectedCountry?.capital?.[0] && (
                <Card sx={{ width: "100%", mt: 2 }}>
                  <CardContent>
                    <Typography variant="h5">Weather in {selectedCountry.capital[0]}</Typography>
                    <Divider sx={{ mb: 2 }} />
                    {weatherLoading && (
                      <Box display="flex" justifyContent="center" alignItems="center" minHeight="150px">
                        <Typography>Loading weather data...</Typography>
                      </Box>
                    )}
                    {weatherError && (
                      <Box display="flex" justifyContent="center" alignItems="center" minHeight="150px">
                        <Typography color="error">{weatherError}</Typography>
                      </Box>
                    )}
                    {weatherData && !weatherLoading && (
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Box display="flex" flexDirection="column" alignItems="center">
                            <Image
                              width={80}
                              height={80}
                              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                              alt={weatherData.weather[0].description}
                            />
                            <Typography variant="h3">{Math.round(weatherData.main.temp)}°C</Typography>
                            <Typography color="text.secondary">{weatherData.weather[0].main}</Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    )}
                  </CardContent>
                </Card>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ width: "100%", p: 2 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Country Details
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="subtitle1" fontWeight="bold">Population</Typography>
                <Typography>{formatPopulation(selectedCountry.population)}</Typography>

                <Typography variant="subtitle1" fontWeight="bold">Currencies</Typography>
                <Typography>{getCurrencies(selectedCountry)}</Typography>

                <Typography variant="subtitle1" fontWeight="bold">Capital</Typography>
                <Typography>{selectedCountry.capital?.join(", ") || "N/A"}</Typography>

                <Typography variant="subtitle1" fontWeight="bold">Region</Typography>
                <Typography>{selectedCountry.region || "N/A"}</Typography>

                <Typography variant="subtitle1" fontWeight="bold">Area</Typography>
                <Typography>{selectedCountry.area || "N/A"} km²</Typography>

                <Typography variant="subtitle1" fontWeight="bold">Timezones</Typography>
                <Typography>{selectedCountry.timezones?.join(", ") || "N/A"}</Typography>

                <Typography variant="subtitle1" fontWeight="bold">Languages</Typography>
                <Box sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {getLanguages(selectedCountry).split(", ").map((lang, i) => (
                    <Chip key={i} label={lang} size="small" variant="outlined" />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ width: "100%", height: 500, position: "relative", borderRadius: 2, overflow: "hidden" }}>
              <iframe
                title="Google Map"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  selectedCountry.capital?.[0] || selectedCountry.name.common
                )}&output=embed`}
                allowFullScreen
                loading="lazy"
              ></iframe>

         
              <Box
          
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box></Box>
  );
};

export default CountryPage;