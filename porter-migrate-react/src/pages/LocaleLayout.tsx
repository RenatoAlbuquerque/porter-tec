import { useEffect } from "react";
import { Outlet, useParams, useNavigate } from "react-router-dom";
import i18n from "../i18n";

const supported = ["en", "pt"];
const defaultLocale = "en";

export default function LocaleLayout() {
  const { locale } = useParams<{ locale?: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!locale || !supported.includes(locale)) {
      navigate(`/${defaultLocale}`, { replace: true });
      return;
    }

    if (i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
  }, [locale, navigate]);

  return (
    <main >
      <Outlet />
    </main>
  );
}
