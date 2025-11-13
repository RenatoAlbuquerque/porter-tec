// src/main.tsx (ou index.tsx)
import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import "./i18n";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./service/queryClient";
import { SettingsProvider } from "./context/settingsContext";
import ThemeRegistry from "./components/_config/ThemeRegistry";
import { apolloClient } from "./lib/apollo";
import { ApolloProvider } from "@apollo/client";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <QueryClientProvider client={queryClient}>
        <SettingsProvider>
          <ThemeRegistry>
            <App />
          </ThemeRegistry>
        </SettingsProvider>
      </QueryClientProvider>
    </ApolloProvider>
  </React.StrictMode>
);
