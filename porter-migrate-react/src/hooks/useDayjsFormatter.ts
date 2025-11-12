import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export function useDayjsFormatter() {
  const { i18n } = useTranslation();
  const locale = i18n.language;

  const dateFormat = locale === "en" ? "MM/DD/YYYY" : "DD/MM/YYYY";
  const dateTimeFormat = locale === "en" ? "MM/DD/YYYY HH:mm" : "DD/MM/YYYY HH:mm";

  const formatDate = (value?: string | Date | null) => {
    if (!value) return "-";
    return dayjs.utc(value).format(dateFormat);
  };

  const formatDateTime = (value?: string | Date | null) => {
    if (!value) return "-";
    return dayjs.utc(value).format(dateTimeFormat);
  };

  return { formatDate, formatDateTime, locale };
}
