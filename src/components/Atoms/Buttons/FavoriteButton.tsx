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
  user?: GridRenderCellParams<TableUser> | TableUser | null;
  disabled?: boolean;
}

export const FavoriteButton: React.FC<Props> = ({ user, disabled = false }) => {
  const translateFavoriteBtn = useTranslations("Components.Atoms.Buttons.FavoriteButton");
  const { isFavorite, toggleFavorite } = useFavorites();

  const currentUser: TableUser | null =
    (user as GridRenderCellParams<TableUser>)?.row ?? (user as TableUser) ?? null;

  if (!currentUser) {
    return (
      <Tooltip title={translateFavoriteBtn("NoUser") ?? ""}>
        <span>
          <IconButton size="small" disabled>
            <StarBorderIcon fontSize="medium" />
          </IconButton>
        </span>
      </Tooltip>
    );
  }

  const userId = currentUser.id;
  const favorited = isFavorite(userId);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(currentUser);
  };

  return (
    <Tooltip
      title={favorited ? translateFavoriteBtn("RemoveFavs") : translateFavoriteBtn("AddFavs")}
    >
      <span>
        <IconButton
          size="small"
          onClick={handleClick}
          disabled={disabled}
          aria-label={
            favorited ? translateFavoriteBtn("RemoveFavs") : translateFavoriteBtn("AddFavs")
          }
        >
          {favorited ? (
            <StarIcon fontSize="medium" color="warning" />
          ) : (
            <StarBorderIcon fontSize="medium" color="warning" />
          )}
        </IconButton>
      </span>
    </Tooltip>
  );
};
