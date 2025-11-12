import React from "react";
import { Box, Avatar } from "@mui/material";

interface Props {
  src: string;
  name: string;
}

export const UserAvatarCell: React.FC<Props> = ({ src, name }) => (
  <Box height="100%" width="100%" display="flex" alignItems="center" justifyContent="flex-start">
    <Avatar src={src} alt={name} sx={{ width: 36, height: 36 }} />
  </Box>
);
