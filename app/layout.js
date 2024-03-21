import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/Navbar";
import NavBarAdmin from "@/components/NavbarAdmin";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "QuickServe",
  description: "La solución para tu menú moderno",
};

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
