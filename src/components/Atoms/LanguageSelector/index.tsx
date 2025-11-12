"use client";
import React, { useContext, useMemo, useCallback } from "react";
import { Box, Button, Menu, MenuItem, Typography, useTheme } from "@mui/material";
import Image, { type StaticImageData } from "next/image";
import GTranslateOutlinedIcon from "@mui/icons-material/GTranslateOutlined";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CheckIcon from "@mui/icons-material/Check";
import { SettingsContext } from "@/context/settingsContext";
import FlagBrazil from "@/assets/nations/br.png";
import FlagEua from "@/assets/nations/eua.png";
import { useTranslations } from "next-intl";

type LangOption = {
  code: "pt" | "en";
  label: string;
  flag: string | StaticImageData;
};

type FlagRendererProps = {
  flag: string | StaticImageData;
  size?: number;
  alt?: string;
};

const FlagRenderer = ({ flag, size = 20, alt = "" }: FlagRendererProps) => {
  const height = Math.round(size * 0.7);
  if (typeof flag === "string") {
    return (
      <Typography component="span" sx={{ fontSize: size, lineHeight: 1 }}>
        {flag}
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        width: size,
        height,
        position: "relative",
        display: "inline-block",
        overflow: "hidden",
        borderRadius: "4px",
      }}
      aria-hidden={false}
    >
      <Image src={flag} alt={alt} width={size} height={height} style={{ objectFit: "cover" }} />
    </Box>
  );
};

const LanguageSelectorComponent: React.FC = () => {
  const {
    palette: { secondary, background },
  } = useTheme();
  const { language: currentLangFromContext, toggleLanguage } = useContext(SettingsContext);
  const t = useTranslations("Components.Atoms.LanguageSelector");

  const LANGS = useMemo<LangOption[]>(
    () => [
      { code: "pt", label: t("PtBr"), flag: FlagBrazil },
      { code: "en", label: t("EnUs"), flag: FlagEua },
    ],
    [t],
  );

  const current = useMemo(
    () => LANGS.find((l) => l.code === currentLangFromContext) ?? LANGS[0],
    [LANGS, currentLangFromContext],
  );

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget),
    [],
  );
  const handleClose = useCallback(() => setAnchorEl(null), []);

  const handleSelect = useCallback(
    (langCode: LangOption["code"]) => {
      if (langCode !== currentLangFromContext) {
        toggleLanguage(langCode);
      }
      handleClose();
    },
    [currentLangFromContext, toggleLanguage, handleClose],
  );

  const menuPaperSx = useMemo(
    () => ({
      elevation: 3,
      mt: 1,
      borderRadius: 2,
      "& .MuiMenuItem-root": {
        py: 0.5,
        fontSize: 14,
        "&:hover": {
          bgcolor: background.default,
        },
      },
      border: `1px solid ${secondary.light}`,
    }),
    [background.default, secondary.light],
  );

  return (
    <Box display="flex" alignItems="center" justifyContent="flex-end">
      <Button
        onClick={handleClick}
        endIcon={
          <ArrowDropDownIcon
            sx={{
              transition: "transform 0.18s",
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
        }
        sx={{
          height: "38px",
          display: "flex",
          border: `1px solid ${secondary.light}`,
          textTransform: "none",
          px: 1,
          color: "text.primary",
          minWidth: "auto",
          alignItems: "center",
          gap: "4px",
        }}
        aria-controls={open ? "language-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <GTranslateOutlinedIcon fontSize="small" />
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <FlagRenderer flag={current.flag} size={22} alt={current.label} />
        </Box>
      </Button>

      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{ sx: menuPaperSx }}
      >
        {LANGS.map((lang) => {
          const selected = lang.code === currentLangFromContext;
          return (
            <MenuItem
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              sx={{
                display: "flex",
                gap: 1,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <FlagRenderer flag={lang.flag} size={22} alt={lang.label} />
                <Box sx={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
                  <Typography variant="body2" fontWeight={600}>
                    {lang.label.split(" (")[0]}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {lang.code.toUpperCase()}
                  </Typography>
                </Box>
              </Box>
              {selected && <CheckIcon fontSize="small" color="primary" />}
            </MenuItem>
          );
        })}
      </Menu>
    </Box>
  );
};

// memo para evitar re-renders se props/context não mudarem
export const LanguageSelector = React.memo(LanguageSelectorComponent);
export default LanguageSelector;
