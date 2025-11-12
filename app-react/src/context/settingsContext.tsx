import type { PaletteMode } from "@mui/material";
import {
  createContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import Cookies from "js-cookie";
import i18n from "../i18n";

type ILanguage = "en" | "pt";

interface SettingsContextType {
  displaySideBar: boolean;
  setDisplaySideBar: (arg: boolean) => void;
  theme: PaletteMode | undefined;
  toggleTheme: (arg: PaletteMode) => void;
  language: ILanguage;
  toggleLanguage: (arg: ILanguage) => void;
  files: File[];
  setFiles: (files: File[]) => void;
}

interface Props {
  children?: React.ReactNode;
}

/* eslint-disable react-refresh/only-export-components */
export const SettingsContext = createContext({} as SettingsContextType);

function getInitialLanguage(): ILanguage {
  try {
    if (typeof globalThis === "undefined") return (i18n.language as ILanguage) ?? "en";
    return (Cookies.get("language") || i18n.language) as ILanguage;
  } catch {
    return (i18n.language as ILanguage) ?? "en";
  }
}

function getInitialTheme(): PaletteMode | undefined {
  try {
    if (typeof globalThis === "undefined") return "light";
    return (Cookies.get("theme") as PaletteMode) || "light";
  } catch {
    return "light";
  }
}

export function SettingsProvider({ children }: Props) {
  const [language, setLanguage] = useState<ILanguage>(getInitialLanguage);
  const [theme, setTheme] = useState<PaletteMode | undefined>(getInitialTheme);
  const [files, setFiles] = useState<File[]>([]);
  const [displaySideBar, setDisplaySideBar] = useState(false);

  useEffect(() => {
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [language]);

  useEffect(() => {
    if (typeof document !== "undefined" && theme) {
      document.documentElement.dataset.theme = theme;
    }
  }, [theme]);


  const toggleLanguage = useCallback((lang: ILanguage) => {
    setLanguage(lang);
    try {
      Cookies.set("language", lang);
    } catch {
      // ignore cookie errors
    }
    i18n.changeLanguage(lang);
  }, []);

  const toggleTheme = useCallback((mode: PaletteMode) => {
    setTheme(mode);
    try {
      Cookies.set("theme", mode);
    } catch {
      // ignore cookie errors
    }
  }, []);

  const contextValue = useMemo<SettingsContextType>(
    () => ({
      theme,
      toggleTheme,
      language,
      toggleLanguage,
      displaySideBar,
      setDisplaySideBar,
      files,
      setFiles,
    }),
    [
      theme,
      toggleTheme,
      language,
      toggleLanguage,
      displaySideBar,
      setDisplaySideBar,
      files,
      setFiles,
    ]
  );

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  );
}
