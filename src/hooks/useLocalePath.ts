import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";

export const useLocalePath = () => {
  const pathname = usePathname();
  const locale = useLocale();

  if (pathname.startsWith(`/${locale}`)) {
    return pathname.replace(`/${locale}`, "") || "/";
  }

  return pathname;
};
