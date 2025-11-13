import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const useLocalePath = () => {
  const location = useLocation();
  const { i18n } = useTranslation();
  const locale = i18n.language;
  const pathname = location.pathname;

  if (pathname.startsWith(`/${locale}`)) {
    return pathname.replace(`/${locale}`, "") || "/";
  }

  return pathname;
};
