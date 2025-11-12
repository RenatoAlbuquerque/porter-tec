import { Box, Grid, LinearProgress, Typography, useTheme } from "@mui/material";
import React from "react";

interface IRowLabelValue {
  value?: string;
  label: string;
  icon: React.ReactNode;
  first?: boolean;
  isLoading: boolean;
}

export const RowLabelValue = ({ value, label, icon, first, isLoading }: IRowLabelValue) => {
  const {
    palette: { secondary },
  } = useTheme();

  return (
    <Grid
      container
      size={12}
      borderBottom={`2px solid ${secondary.dark}`}
      pb="20px"
      spacing={1}
      pt={first ? "0px" : "20px"}
    >
      <Grid size={{ xs: 12, sm: 3 }} display={"flex"} alignItems={"center"} gap="10px">
        {icon}
        <Typography variant="body1">{label}</Typography>
      </Grid>
      <Grid size={{ xs: 12, sm: 9 }}>
        <Box
          width={"100%"}
          border={`2px solid ${secondary.dark}`}
          display={"flex"}
          justifyContent={"flex-start"}
          alignItems={"center"}
          p="14px"
          borderRadius={"10px"}
        >
          {isLoading ? (
            <Box width={"100%"} height={"22px"} display={"flex"} alignItems={"center"}>
              <Box width={"100%"} height={6}>
                <LinearProgress />
              </Box>
            </Box>
          ) : (
            <Typography variant="h5">{value}</Typography>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};
