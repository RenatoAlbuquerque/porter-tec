import React from "react";
import { TableHead, TableRow, TableCell, Box } from "@mui/material";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import WcOutlinedIcon from "@mui/icons-material/WcOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import HotelClassOutlinedIcon from "@mui/icons-material/HotelClassOutlined";

interface ITableHeaderProps {
  translate: (k: string) => string;
}

export const TableHeader = ({ translate }: ITableHeaderProps) => (
  <TableHead>
    <TableRow>
      <TableCell>
        <Box display={"flex"} justifyContent={"flex-start"} alignItems={"center"} gap="10px">
          <AccountBoxOutlinedIcon fontSize="small" />
          {translate("header.name")}
        </Box>
      </TableCell>
      <TableCell align="left">
        <Box
          display={"flex"}
          justifyContent={"flex-start"}
          alignItems={"center"}
          gap="10px"
          minWidth={100}
        >
          <PhoneIphoneOutlinedIcon fontSize="small" />
          {translate("header.phone")}
        </Box>
      </TableCell>
      <TableCell align="right">
        <Box display={"flex"} justifyContent={"flex-start"} alignItems={"center"} gap="10px">
          <WcOutlinedIcon fontSize="small" />
          {translate("header.gender")}
        </Box>
      </TableCell>
      <TableCell align="right">
        <Box display={"flex"} justifyContent={"flex-start"} alignItems={"center"} gap="10px">
          <LanguageOutlinedIcon fontSize="small" />
          {translate("header.country")}
        </Box>
      </TableCell>
      <TableCell align="right">
        <Box display={"flex"} justifyContent={"flex-end"} alignItems={"center"} gap="10px">
          <HotelClassOutlinedIcon fontSize="small" />
          {translate("header.favorite")}
        </Box>
      </TableCell>
    </TableRow>
  </TableHead>
);
