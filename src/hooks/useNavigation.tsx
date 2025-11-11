import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

export function usePushNavigation() {
  const router = useRouter();
  const locale = useLocale();

  const pushNavigation = (url: string) => {
    router.push(`/${locale}${url}`);
  };

  return pushNavigation;
}
