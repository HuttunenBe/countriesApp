"use client";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavourites } from "../../lib/features/favourites/favouritesSlice";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import FavouriteButton from "@/components/FavouriteButton";

const FavouritesPage = () => {
  const { user, loading: authLoading } = useAuth();
  const dispatch = useDispatch();
  const favourites = useSelector((state) => state.favourites.favourites);
  const loading = useSelector((state) => state.favourites.loading);
  const router = useRouter();

  console.log("Favourites: ", favourites);

  useEffect(() => {
    if (user) {
      dispatch(fetchFavourites());
    }
  }, [user, dispatch]);

  if (authLoading || loading) {
    return <CircularProgress />;
  }

  if (!user) {
    return <div>Please login to see your favourites</div>;
  }

  const handleCountryClick = (countryName) => {
    const slug = countryName.toLowerCase().replace(/\s+/g, "-");
    router.push(`/countries/${encodeURIComponent(slug)}`);
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", p: 3 }}>
      <h2>Your favorite countries</h2>
      {favourites.length === 0 ? (
        <Typography variant="h4">No favourites found</Typography>
      ) : (
        <Grid container spacing={2}>
          {favourites.map((favourite) => {
            const country = favourite.country_data;
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={favourite.id}>
                <Card>
                  <CardActionArea
                    onClick={() => handleCountryClick(country.name.common)}
                  >
                    <CardContent
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        width={100}
                        height={60}
                        style={{ objectFit: "cover", borderRadius: "4px" }}
                        src={country.flags.svg}
                        alt={country.name.common}
                      />
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 900, fontSize: 18, mt: 1 }}
                      >
                        {country.name.common}
                      </Typography>
                      <Typography variant="h6" sx={{}}>
                        Capital: {country.capital?.[0] || "N/A"}
                      </Typography>{" "}
                    </CardContent>
                  </CardActionArea>
                  <FavouriteButton country={country} />
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
};

export default FavouritesPage;
