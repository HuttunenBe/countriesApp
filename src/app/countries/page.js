"use client";

import { fetchCountries } from "@/lib/features/countries/countriesSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { CardActionArea } from "@mui/material";
import Loading from "@/components/Loading";

const Countries = () => {
  const countries = useSelector((state) => state.countries.countries);
  const dispatch = useDispatch();
  const router = useRouter();

  const [visibleCountries, setVisibleCountries] = useState(12);
  const [searchCountry, setSearchCountry] = useState("");
  const [sortCountries, setSortCountries] = useState("");
  const [regionSort, setRegionSort] = useState("All");

  const loading = countries.length === 0;

  useEffect(() => {
    if (countries.length === 0) {
      dispatch(fetchCountries());
    }
  }, [dispatch, countries.length]);

  const showMore = () => setVisibleCountries((prev) => prev + 12);
  const showLess = () => setVisibleCountries((prev) => (prev - 12));

  if (loading) return <Loading message="Fetching countries..." />;


  let filteredCountries = countries
    .filter((country) =>
      country.name.common.toLowerCase().startsWith(searchCountry.toLowerCase())
    )
    .filter((country) => regionSort === "All" || country.region === regionSort);


  const sortedCountries = [...filteredCountries];
  if (sortCountries === "nameAsc") {
    sortedCountries.sort((a, b) => a.name.common.localeCompare(b.name.common));
  } else if (sortCountries === "nameDesc") {
    sortedCountries.sort((a, b) => b.name.common.localeCompare(a.name.common));
  } else if (sortCountries === "popAsc") {
    sortedCountries.sort((a, b) => a.population - b.population);
  } else if (sortCountries === "popDesc") {
    sortedCountries.sort((a, b) => b.population - a.population);
  }

  const regions = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"];

  const handleCountryClick = (countryName) => {
    const slug = countryName.toLowerCase().replace(/\s+/g, "-");
    router.push(`/countries/${encodeURIComponent(slug)}`);
  };

  const getCurrencies = (country) => {
    if (!country.currencies) return "N/A";
    return Object.values(country.currencies)
      .map((currency) => `${currency.name} (${currency.symbol})`)
      .join(", ");
  };

  return (
    
    <Box padding="2rem"> <Box mb={4} textAlign="center" maxWidth={700} mx="auto">
    <Typography variant="h5" gutterBottom>
      🌎 Explore the World!
    </Typography>
    <Typography variant="body1" color="textSecondary">
      Welcome to World Explorer! Discover countries from every continent, learn about their capitals, population, regions, and flags. 
      Use the search, sort, and filter tools below to find exactly what you are looking for and start your global adventure today.
    </Typography>
  </Box>
    <Box
  marginBottom="1rem"
  display="flex"
  gap="0.5rem"
  flexWrap="wrap"
  justifyContent="center"
  alignItems="center"
  mx="auto" 
>
  
        <input
          type="text"
          placeholder="Search country by name"
          value={searchCountry}
          onChange={(e) => setSearchCountry(e.target.value)}
          style={{ padding: "0.5rem", width: "200px" }}
        />

        <select
          value={sortCountries}
          onChange={(e) => setSortCountries(e.target.value)}
          style={{ padding: "0.5rem" }}
        >
          <option value="">Sort by</option>
          <option value="nameAsc">Name ↑</option>
          <option value="nameDesc">Name ↓</option>
          <option value="popAsc">Population ↑</option>
          <option value="popDesc">Population ↓</option>
        </select>

        <select
          value={regionSort}
          onChange={(e) => setRegionSort(e.target.value)}
          style={{ padding: "0.5rem" }}
        >
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </Box>

      <Box display="flex"
  flexWrap="wrap"
  justifyContent="center"
  alignItems="center"
  mx="auto" >
        {sortedCountries.slice(0, visibleCountries).map((country) => (
          <Card
            key={country.cca3 || country.ccn3 || country.name.common}
            style={{
              margin: 10,
              padding: 20,
              width: 250
            }}
          >
            <CardActionArea
              onClick={() => handleCountryClick(country.name.common)}
            >
              <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 900, fontSize:18}}>{country.name.common}</Typography>
                <Typography>Capital: {country.capital?.[0] || "N/A"}</Typography>  <Typography variant="body1">
                  {country && getCurrencies(country)}
                </Typography>
                <Typography>Population: {country.population}</Typography>
                <Typography>Region: {country.region}</Typography>
                {country.flags?.svg && (
                  <img
                    src={country.flags.svg}
                    alt="flag"
                    style={{ width: 100, marginTop: 20 }}
                  />
                )}<p>Click for more info</p>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>

      <Box marginTop="1rem"    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: 10
    }}>
        {visibleCountries < sortedCountries.length && (
         <Button
    onClick={showMore}
    variant="contained"
 
  >
    Show More
  </Button>
        )}
        {visibleCountries > 13 && (
          <Button onClick={showLess} variant="contained">
            Show Less
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Countries;
