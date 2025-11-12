import { useLocale } from "next-intl";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export function useDayjsFormatter() {
  const locale = useLocale();

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

  return { formatDate, formatDateTime };
}
