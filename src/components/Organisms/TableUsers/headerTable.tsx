import React from "react";
import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";

interface Props {
  title: string;
  onRefetch: () => void;
  loading: boolean;
  color: string;
}

export const TableHeader: React.FC<Props> = ({ title, onRefetch, loading, color }) => (
  <Box display="flex" justifyContent="space-between" alignItems="center">
    <Typography variant="h3" mb="20px">
      {title}
    </Typography>
    <Tooltip title="Recarregar">
      <IconButton
        disabled={loading}
        size="small"
        onClick={onRefetch}
        sx={{ border: `1px solid ${color}` }}
      >
        <ReplayIcon color="primary" fontSize="small" />
      </IconButton>
    </Tooltip>
  </Box>
);
