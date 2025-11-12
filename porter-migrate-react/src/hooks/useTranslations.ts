// src/hooks/useTranslations.ts
import { useTranslation } from "react-i18next";
import type { TOptions } from "i18next";

export function useTranslations(namespace?: string) {
  const { t } = useTranslation();

  if (!namespace) return t;

  return (key: string, options?: TOptions) =>
    t(`${namespace}.${key}`, options);
}
