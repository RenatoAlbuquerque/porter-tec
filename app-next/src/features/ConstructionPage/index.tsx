"use client";
import React from "react";
import { Box, Button, Typography, Paper } from "@mui/material";
import ConstructionOutlinedIcon from "@mui/icons-material/ConstructionOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export const UnderConstructionPage = () => {
  const router = useRouter();
  const t = useTranslations("Features.UnderConstructionPage");

  const handleGoBack = () => {
    router.back();
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
      sx={{ textAlign: "center" }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 6,
          borderRadius: 4,
          maxWidth: 480,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
        }}
      >
        <ConstructionOutlinedIcon sx={{ fontSize: 60, color: "warning.main" }} />

        <Typography variant="h4" fontWeight="bold">
          {t("title")}
        </Typography>

        <Typography variant="body1" color="text.secondary">
          {t("description")}
        </Typography>

        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          color="primary"
          onClick={handleGoBack}
          sx={{ mt: 2 }}
        >
          {t("backButton")}
        </Button>
      </Paper>
    </Box>
  );
};
