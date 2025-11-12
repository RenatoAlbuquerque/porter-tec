"use client";

import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { GridRenderCellParams } from "@mui/x-data-grid";
import useFavorites from "@/hooks/useFavorites";
import { TableUser } from "@/api/users/users.utils";
import { useTranslations } from "next-intl";

interface Props {
  user: GridRenderCellParams<TableUser>;
}

export const FavoriteButton: React.FC<Props> = ({ user }) => {
  const currentUser = user.row as TableUser;
  const { isFavorite, toggleFavorite } = useFavorites();
  const translateButtonFavorites = useTranslations("Components.Atoms.Buttons.FavoriteButton");
  const favorited = isFavorite(currentUser.id);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(currentUser);
  };

  return (
    <Tooltip
      title={
        favorited ? translateButtonFavorites("RemoveFavs") : translateButtonFavorites("AddFavs")
      }
    >
      <IconButton size="small" onClick={handleClick}>
        {favorited ? (
          <StarIcon fontSize="medium" color="warning" />
        ) : (
          <StarBorderIcon fontSize="medium" color="warning" />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default FavoriteButton;
