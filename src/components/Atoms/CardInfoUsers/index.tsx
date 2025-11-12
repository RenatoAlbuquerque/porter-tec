"use client";
import React from "react";
import { Box, IconButton, Typography, useTheme, LinearProgress } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useTranslations } from "next-intl";

type CardInfoUsersProps = {
  label: string;
  value?: string | number;
  icon: React.ReactNode;
  iconBgColor?: string;
  isLoading: boolean;
  isError: boolean;
};

export const CardInfoUsers: React.FC<CardInfoUsersProps> = ({
  label,
  value,
  icon,
  iconBgColor = "#cb3cff1a",
  isLoading,
  isError,
}) => {
  const {
    palette: { divider, text, background, error },
  } = useTheme();
  const translateCardInfo = useTranslations("Components.Atoms.CardInfoUsers");

  const renderValues = () => {
    if (isLoading) {
      return (
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2 }}>
          <LinearProgress sx={{ height: "8px" }} />
          <LinearProgress />
        </Box>
      );
    }

    if (isError) {
      return (
        <Box display="flex" flexDirection="column">
          <Typography variant="body2" color={error.main} display="flex" alignItems="center" gap={1}>
            <ErrorOutlineIcon fontSize="small" />
            {translateCardInfo("ErrorLoading")}
          </Typography>
        </Box>
      );
    }

    return (
      <Box>
        <Typography variant="h5" textTransform="none">
          {label}
        </Typography>
        <Typography variant="body2" textTransform="none" color={text.secondary}>
          {value}
        </Typography>
      </Box>
    );
  };

  return (
    <Box
      border={`1px solid ${isError ? error.main : divider}`}
      width="100%"
      p="20px"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      gap="10px"
      bgcolor={background.default}
      borderRadius="10px"
    >
      <Box display="flex" alignItems="center" gap="20px" width="100%">
        <IconButton
          sx={{
            bgcolor: iconBgColor,
            width: 40,
            height: 40,
          }}
        >
          {icon}
        </IconButton>
        {renderValues()}
      </Box>
    </Box>
  );
};
