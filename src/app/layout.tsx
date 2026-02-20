import React from "react";
import MyApp from "./app";
import NextTopLoader from 'nextjs-toploader';
import "./global.css";
import { CustomizerContextProvider } from "./context/customizerContext";
import { QueryProvider } from "./providers/query-provider";
import { AuthProvider } from "../contexts/AuthContext";


export const metadata = {
  title: "RecliQ Backoffice",
  description: "Admin dashboard for managing the Recliq recycling ecosystem",
  icons: {
    icon: '/images/logos/app-icon-v2-color.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <NextTopLoader color="#2E8B57" />
        <QueryProvider>
          <CustomizerContextProvider>
            <AuthProvider>
              <MyApp>{children}</MyApp>
            </AuthProvider>
          </CustomizerContextProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
