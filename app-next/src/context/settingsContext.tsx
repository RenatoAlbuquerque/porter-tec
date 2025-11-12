"use client";
import { PaletteMode } from "@mui/material";
import { createContext, useEffect, useState, useCallback, useMemo, JSX } from "react";
import Cookies from "js-cookie";
import { useRouter, usePathname } from "@/i18n/navigation";

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
  children?: JSX.Element;
}

export const SettingsContext = createContext({} as SettingsContextType);

export function SettingsProvider({ children }: Props) {
  const [language, setLanguage] = useState<ILanguage>("en");
  const [theme, setTheme] = useState<PaletteMode | undefined>("light");
  const [files, setFiles] = useState<File[]>([]);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const savedLanguage = Cookies.get("NEXT_LOCALE") as ILanguage;
    if (savedLanguage) setLanguage(savedLanguage);

    const savedMode = Cookies.get("theme") as PaletteMode;
    if (savedMode) setTheme(savedMode);
  }, []);

  const toggleLanguage = useCallback(
    (lang: ILanguage) => {
      Cookies.set("NEXT_LOCALE", lang);
      setLanguage(lang);
      router.replace({ pathname }, { locale: lang });
    },
    [pathname, router],
  );

  const toggleTheme = useCallback((mode: PaletteMode) => {
    setTheme(mode);
    Cookies.set("theme", mode);
  }, []);

  const [displaySideBar, setDisplaySideBar] = useState(false);

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
    ],
  );

  return <SettingsContext.Provider value={contextValue}>{children}</SettingsContext.Provider>;
}
