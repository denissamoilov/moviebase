import type { Metadata } from "next";
import "./globals.css";
import { mukta } from "@/shared/utils";
import Provider from "./provider";

export const metadata: Metadata = {
  title: "Movies Database",
  description: "Movies Database",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${mukta.className} antialiased text-md`}>
        <Provider>
          <div className="max-w-screen-xl mx-auto">{children}</div>
        </Provider>
      </body>
    </html>
  );
}
