"use client";
import { useAuth } from "@/app/context/AuthContext";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import React, { useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  addFavourite,
  removeFavourite,
} from "../lib/features/favourites/favouritesSlice";

const FavouriteButton = React.memo(({ country }) => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const isFavourite = useSelector(
    (state) =>
      state.favourites.favourites.some(
        (f) => f.country_name === country?.name?.common
      ),
    shallowEqual
  );

  const loading = useSelector((state) => state.favourites.loading);

  const toggleFavourite = useCallback(
    (e) => {
      e.stopPropagation();
      if (!user || !country?.name?.common) return;

      if (isFavourite) {
        dispatch(removeFavourite(country.name.common));
      } else {
        dispatch(addFavourite(country));
      }
    },
    [dispatch, user, isFavourite, country]
  );

  if (!user) return null;

  return (
    <Tooltip
      title={isFavourite ? "Remove from favourites" : "Add to favourites"}
    >
      <IconButton
        onClick={toggleFavourite}
        disabled={loading}
        color={isFavourite ? "error" : "primary"}
      >
        {isFavourite ? <Favorite /> : <FavoriteBorder />}
      </IconButton>
    </Tooltip>
  );
});

export default FavouriteButton;
