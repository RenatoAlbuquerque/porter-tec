import { Header } from "@/components/Organisms/Header";
import Sidebar from "@/components/Organisms/Sidebar";
import { Box } from "@mui/material";
import React from "react";
import { GridCardInfo } from "./GridCardInfo";
import TableUsers from "@/components/Organisms/TableUsers";

export const HomePageComponente = () => {
  return (
    <Box width={"100vw"} display={"flex"} gap="10px">
      <Sidebar />
      <Box
        width="100%"
        bgcolor={"background.paper"}
        minHeight={"100%"}
        p="30px"
        overflow={"hidden"}
      >
        <Header />
        <GridCardInfo />
        <TableUsers />
      </Box>
    </Box>
  );
};
