import React from "react";
import { TableRow, TableCell, Avatar, Box, Typography } from "@mui/material";
import { TableUser } from "@/api/users/users.utils";
import { FavoriteButton } from "@/components/Atoms/Buttons/FavoriteButton";

interface IFavoriteRow {
  row: TableUser;
  onClick: (r: TableUser) => void;
}

export const FavoriteRow = ({ row, onClick }: IFavoriteRow) => (
  <TableRow
    key={row.id}
    sx={{
      cursor: "pointer",
      "&:hover": { backgroundColor: "transparent" },
      "&:last-child td, &:last-child th": { border: 0 },
    }}
    onClick={() => onClick(row)}
  >
    <TableCell component="th" scope="row">
      <Box display={"flex"} alignItems={"center"} gap="10px">
        <Avatar sx={{ width: "30px", height: "30px" }} src={row.picture}>
          {row.name ? row.name[0] : "T"}
        </Avatar>
        <Box>
          <Typography>{row.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {row.email}
          </Typography>
        </Box>
      </Box>
    </TableCell>
    <TableCell align="right">{row.cellphone}</TableCell>
    <TableCell align="right">{row.gender}</TableCell>
    <TableCell align="right">{row.country}</TableCell>
    <TableCell align="right">
      <Box>
        <FavoriteButton user={row} />
      </Box>
    </TableCell>
  </TableRow>
);
