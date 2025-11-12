// src/components/ThemeRegistry.tsx
import React, { useContext } from "react";
import { ThemeProvider, CssBaseline, GlobalStyles } from "@mui/material";
import { lightTheme, darkTheme } from "../../theme";
import { SettingsContext } from "../../context/settingsContext";

interface ThemeRegistryProps {
  children: React.ReactNode;
}

export default function ThemeRegistry({ children }: ThemeRegistryProps) {
  const { theme } = useContext(SettingsContext);
  const activeTheme = theme === "light" ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={activeTheme}>
      <CssBaseline />
      <GlobalStyles
        styles={(themeParam) => ({
          "::-webkit-scrollbar": { width: 8, height: 8 },
          "::-webkit-scrollbar-track": {
            background: themeParam.palette.background.default,
            borderRadius: 20,
          },
          "::-webkit-scrollbar-thumb": {
            background: themeParam.palette.mode === "dark" ? "#6B7A99" : "#9AA9CD",
            borderRadius: 20,
          },
          "::selection": {
            color: themeParam.palette.common.white,
            background: themeParam.palette.primary.main,
          },
        })}
      />
      {children}
    </ThemeProvider>
  );
}
