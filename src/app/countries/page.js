"use client";

import { fetchCountries } from "@/lib/features/countries/countriesSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Card, CardContent, Typography, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { CardActionArea } from "@mui/material";

const Countries = () => {
  const countries = useSelector((state) => state.countries.countries);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleCountryClick = (countryName) => {
    const slug = countryName.toLowerCase().replace(/\s+/g, "-");
    router.push(`/countries/${encodeURIComponent(slug)}`);
  };

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  console.log("countries", countries);

  return (
    <Box display="flex" flexWrap="wrap" padding="2rem">
      {countries.map((country) => (
        <Card
          key={country.cca3 || country.ccn3 || country.name.common}
          style={{
            backgroundColor: "lightBlue",
            margin: "10px",
            padding: "10px",
            width: 250,
            lineHeight: 1.5,
          }}
        >
          {" "}
          <CardActionArea
            onClick={() => handleCountryClick(country.name.common)}
          >
            <CardContent></CardContent>

            <CardContent>
              <Typography
                variant="h2"
                style={{ fontSize: "29px", fontWeight: 900 }}
              >
                {country.name.common}
              </Typography>

              <Typography> Population: {country.population}</Typography>

              <Typography>
                {country.currencies
                  ? Object.values(country.currencies).map(
                      (country) => country.name
                    )
                  : ""}
              </Typography>

              <Typography style={{ marginTop: 4 }}>
                Region: {country.region}
              </Typography>

              <Typography>
                <img
                  src={country.flags?.svg}
                  alt={country.flag?.alt}
                  style={{ height: "auto", width: 100, marginTop: 20 }}
                />
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
};

export default Countries;
