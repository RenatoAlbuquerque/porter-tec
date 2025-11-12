import React from "react";
import { Box, Paper, Typography } from "@mui/material";

interface IEmptyStateProps {
  translate: (k: string) => string;
}

export const EmptyState = ({ translate }: IEmptyStateProps) => (
  <Box>
    <Typography variant="h3" pb="30px">
      {translate("title")}
    </Typography>
    <Paper sx={{ p: 4, textAlign: "center" }}>
      <Typography variant="h6">{translate("emptyHeading")}</Typography>
      <Typography color="text.secondary" sx={{ mt: 1, mb: 2 }}>
        {translate("emptyDescription")}
      </Typography>
    </Paper>
  </Box>
);
