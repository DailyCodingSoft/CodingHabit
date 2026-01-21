
import "../styles/globals.css";
import {Open_Sans} from "next/font/google";

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-main",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={openSans.variable}>
      <body className="h-full m-0">
        <p className="absolute right-0 text-(--light-text-color) text-xs">v0.0.1</p>
        {children}
      </body>
    </html>
  );
}
