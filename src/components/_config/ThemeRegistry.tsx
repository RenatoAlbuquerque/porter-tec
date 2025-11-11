"use client";

import { useContext } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider, CssBaseline, GlobalStyles } from "@mui/material";
import { lightTheme, darkTheme } from "@/theme";
import { SettingsContext } from "@/context/settingsContext";

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const { theme } = useContext(SettingsContext);
  const activeTheme = theme === "light" ? lightTheme : darkTheme;

  return (
    <AppRouterCacheProvider options={{ key: "css" }}>
      <ThemeProvider theme={activeTheme}>
        <CssBaseline />

        <GlobalStyles
          styles={(theme) => ({
            "::-webkit-scrollbar": {
              width: 8,
              height: 8,
            },
            "::-webkit-scrollbar-track": {
              background: theme.palette.background.default,
              borderRadius: 20,
            },
            "::-webkit-scrollbar-thumb": {
              background: theme.palette.mode === "dark" ? "#6B7A99" : "#9AA9CD",
              borderRadius: 20,
            },
            "::selection": {
              color: theme.palette.common.white,
              background: theme.palette.primary.main,
            },
            "::-moz-selection": {
              color: theme.palette.common.white,
              background: theme.palette.primary.main,
            },
          })}
        />

        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
