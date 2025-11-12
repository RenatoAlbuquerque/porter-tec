import { Header } from "@/components/Organisms/Header";
import Sidebar from "@/components/Organisms/Sidebar";
import { Box } from "@mui/material";
import React from "react";

interface ITemplateSidebarHeaderComponent {
  children: React.ReactNode;
}

export const TemplateSidebarHeaderComponent = ({ children }: ITemplateSidebarHeaderComponent) => {
  return (
    <Box width={"100vw"} display={"flex"} gap="10px">
      <Sidebar />
      <Box
        width="100%"
        bgcolor={"background.paper"}
        minHeight={"100%"}
        p={{ xs: "10px 20px 10px 10px", sm: "30px" }}
        overflow={"hidden"}
      >
        <Header />
        {children}
      </Box>
    </Box>
  );
};
