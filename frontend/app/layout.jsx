import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Metadata removed (TypeScript-only feature)
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <Navbar />
        <div style={{ paddingTop: '72px' }}>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
