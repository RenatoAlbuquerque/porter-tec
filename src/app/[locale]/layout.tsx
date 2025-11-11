import type { Metadata } from "next";
import "./globals.css";
import { Lexend } from "next/font/google";
import { ContextProviders } from "@/context";
import ThemeRegistry from "@/components/_config/ThemeRegistry";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import React from "react";
import { Slide, ToastContainer } from "react-toastify";

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Porter Dash",
};

export default async function RootLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} className={lexend.variable}>
      <body>
        <NextIntlClientProvider locale={locale}>
          <ContextProviders>
            <ThemeRegistry>
              <ToastContainer
                autoClose={3000}
                hideProgressBar
                closeOnClick
                draggable
                pauseOnHover
                transition={Slide}
                theme={"colored"}
              />
              {children}
            </ThemeRegistry>
          </ContextProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
