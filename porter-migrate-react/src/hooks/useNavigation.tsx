import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function usePushNavigation() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const pushNavigation = (url: string) => {
    const locale = i18n.language;
    navigate(`/${locale}${url}`);
  };

  return pushNavigation;
}
