"use client";
import { fetchCountries } from "@/lib/features/countries/countriesSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, Typography, Box } from "@mui/material";


const Countries = () => {
  const countries = useSelector((state) => state.countries.countries);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  console.log("countries", countries);

  return (
    <Box display="flex" flexWrap="wrap" padding="2rem">
      {countries.map((country) => (
        <Card
          key={country.name}
          style={{
            margin: "10px",
            padding: "10px",
            width: 250,
            lineHeight: 1.5,
          }}
        >
          <CardContent>
            <Typography variant="h2" style={{ fontSize: "29px", fontWeight: 900 }}>
              {country.name.common}
            </Typography>
            <Typography >{country.population}</Typography>
            <Typography >
              {country.currencies
                ? Object.values(country.currencies).map(
                    (country) => country.name
                  )
                : ""}
            </Typography>

            <Typography>
              <img
                src={country.flags?.svg}
                alt={country.flag?.alt}
                style={{ height: "auto", width: 100, marginTop: 20 }}
              />
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default Countries;
