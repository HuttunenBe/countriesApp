"use client";

import { useAuth } from "./context/AuthContext";
import {
  Container,
  Box,
  Typography,
  Paper,
  Button,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { fetchCountries } from "@/lib/features/countries/countriesSlice";
import Loading from "@/components/Loading";

export default function Home() {
  const theme = useTheme();
  const { user } = useAuth();
  const router = useRouter();
  const dispatch = useDispatch();
  const carouselRef = useRef(null);

  const countries = useSelector((state) => state.countries.countries);
  const loading = countries.length === 0;

  const [searchCountry, setSearchCountry] = useState("");

  useEffect(() => {
    if (countries.length === 0) {
      dispatch(fetchCountries());
    }
  }, [dispatch, countries.length]);

  if (loading) return <Loading message="Fetching countries..." />;

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().startsWith(searchCountry.toLowerCase())
  );

  const totalPopulation = countries.reduce(
    (sum, country) => sum + country.population,
    0
  );

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  const arrowStyle = {
    position: "absolute",
    top: "50%",
    zIndex: 10,
    transform: "translateY(-50%)",
    bgcolor: "white",
    borderRadius: "50%",
    boxShadow: 3,
    width: 40,
    height: 40,
    minWidth: 0,
    "&:hover": {
      bgcolor: "primary.main",
      color: "white",
    },
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        py: 8,
        gap: 3,
      }}
    >
      <Typography variant="h3" component="h1" color="primary" fontWeight="bold">
        🌎 Welcome to World Explorer!
      </Typography>

      <Typography
        variant="body1"
        color="textSecondary"
        sx={{ maxWidth: 600, mb: 2 }}
      >
        Discover the countries of the world with ease! From their flags and
        capitals to population, region, and more. This app makes exploring
        global information simple and engaging. 🌍 👥
      </Typography>

      <Box sx={{ display: "flex", gap: 2, padding: 0, margin: 0 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push("/countries")}
        >
          Explore Countries
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push("/profile")}
        >
          My Profile
        </Button>
      </Box>

      <Box sx={{ mt: 1, display: "flex", justifyContent: "center" }}>
        <input
          type="text"
          placeholder="Search country by name..."
          value={searchCountry}
          onChange={(e) => setSearchCountry(e.target.value)}
          style={{
            padding: "0.5rem",
            width: "250px",
            borderRadius: "4px",
            border: `2px solid ${
              theme.palette.mode === "dark" ? "#555" : "#ccc"
            }`,
            backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
            color: theme.palette.mode === "dark" ? "#fff" : "#000",
          }}
        />
      </Box>

      <Box
        component="img"
        src="https://images.pexels.com/photos/8828421/pexels-photo-8828421.jpeg"
        alt="World map globe"
        sx={{ width: "50%", display: "block", borderRadius: 2 }}
      />

      <Box sx={{ display: "flex", gap: 4, mt: 3 }}>
        <Paper sx={{ p: 2, minWidth: 120 }}>
          <Typography variant="h6">Total Countries</Typography>
          <Typography variant="h5">{countries.length}</Typography>
        </Paper>
        <Paper sx={{ p: 2, minWidth: 120 }}>
          <Typography variant="h6">Total Population</Typography>
          <Typography variant="h5">
            {totalPopulation.toLocaleString()}
          </Typography>
        </Paper>
      </Box>

      <Box sx={{ position: "relative", width: "100vw", mt: 3 }}>
        <Button onClick={scrollLeft} sx={{ ...arrowStyle, left: 10 }}>
          &larr;
        </Button>

        <Box
          ref={carouselRef}
          sx={{
            display: "flex",
            overflowX: "auto",
            gap: 2,
            py: 2,
            scrollBehavior: "smooth",
            "&::-webkit-scrollbar": { display: "none" },
            width: "100%",
          }}
        >
          {filteredCountries.slice(0, 20).map((c) => {
            const slug = c.name.common.toLowerCase().replace(/\s+/g, "-");
            return (
              <Paper
                key={c.cca3 || c.name.common}
                sx={{
                  minWidth: 120,
                  p: 1,
                  textAlign: "center",
                  cursor: "pointer",
                }}
                onClick={() =>
                  router.push(`/countries/${encodeURIComponent(slug)}`)
                }
              >
                <Box
                  component="img"
                  src={c.flags?.svg || c.flags?.png}
                  alt={c.name.common}
                  sx={{ width: "100%", height: 60, objectFit: "cover", mb: 1 }}
                />
                <Typography variant="body2" fontWeight="bold">
                  {c.name.common}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Capital: {c.capital?.[0] || "N/A"}
                  <p>Click for more info</p>
                </Typography>
              </Paper>
            );
          })}
        </Box>
        <Button onClick={scrollRight} sx={{ ...arrowStyle, right: 10 }}>
          &rarr;
        </Button>
      </Box>
    </Container>
  );
}
