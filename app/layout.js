import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Test App",
  description: "heheheh",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"/>
      </head>
      
      <body className={inter.className + " bg-black "}>{children}</body>
    </html>
  );
}
