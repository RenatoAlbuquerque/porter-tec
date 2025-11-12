import React from "react";
import { Box, LinearProgress } from "@mui/material";

export const SkeletonTableUsers = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={1}
      px={3}
      pt={1}
      width="100%"
      border="1px solid #fff"
      borderRadius="10px"
      maxHeight={584}
    >
      {Array.from({ length: 12 }).map((_, i) => (
        <Box
          key={i}
          sx={{
            height: "6px",
            width: "100%",
            borderBottom: "1px solid #fff",
            py: "20px",
          }}
        >
          <LinearProgress />
        </Box>
      ))}
    </Box>
  );
};
