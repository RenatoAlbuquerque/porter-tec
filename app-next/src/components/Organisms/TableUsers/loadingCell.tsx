"use client";
import React from "react";
import { Box, LinearProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface LoadingCellProps {
  width?: string | number;
  height?: number;
  opacity?: number;
}

export const LoadingCell: React.FC<LoadingCellProps> = React.memo(
  ({ width = "80%", height = 6, opacity = 0.3 }) => {
    const { palette } = useTheme();

    return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 0.5,
        }}
      >
        <LinearProgress
          sx={{
            width,
            height,
            borderRadius: 2,
            opacity,
            "& .MuiLinearProgress-bar": {
              backgroundColor: palette.primary.main,
            },
          }}
          variant="indeterminate"
        />
      </Box>
    );
  },
);

LoadingCell.displayName = "LoadingCell";
