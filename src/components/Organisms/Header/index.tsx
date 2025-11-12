import React, { useContext } from "react";
import Box from "@mui/material/Box";
import { LanguageSelector } from "@/components/Atoms/LanguageSelector";
import UserMenu from "@/components/Molecules/UserMenu";
import { SettingsContext } from "@/context/settingsContext";
import PorterLogo from "@/assets/logo/porterLogoSmall.svg";
import Image from "next/image";
import { IconButton, useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export const Header = () => {
  const { displaySideBar, setDisplaySideBar } = useContext(SettingsContext);
  const {
    palette: { primary },
  } = useTheme();
  const handleMobileToggle = () => {
    setDisplaySideBar(!displaySideBar);
  };
  return (
    <>
      <Box display={{ xs: "flex", sm: "none" }} justifyContent={"center"} mb="20px">
        <Image src={PorterLogo} alt="Logo Porter" />
      </Box>
      <IconButton
        sx={{ position: "fixed", top: 0, marginLeft: "-12px", display: { xs: "flex", sm: "none" } }}
        onClick={handleMobileToggle}
        size="large"
        aria-label="abrir menu"
      >
        <MenuIcon htmlColor={primary.contrastText} />
      </IconButton>
      <Box
        width="100%"
        display="flex"
        justifyContent={{ xs: "center", sm: "flex-end" }}
        alignItems="center"
        gap="8px"
      >
        <LanguageSelector />
        <UserMenu displayName="User Teste" />
      </Box>
    </>
  );
};
