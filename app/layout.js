import Navbar from "@/src/components/navbar";
import FirstUserModal from "@/src/components/FirstUserModal";
import { Montserrat } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata = {
  title: "Meki-Cin - Streaming Drakor China",
  description:
    "Tempat streaming drakor china gratis. Nonton drama china subtitle indonesia terbaru dan terpopuler.",
  keywords: ["drakor china", "drama china", "drachin", "streaming drama", "nonton drakor", "meki-cin", "ahmad rizal"],
  authors: [{ name: "Ahmad Rizal", url: "https://meki-cin.rpnza.my.id" }],
  creator: "Ahmad Rizal",
  publisher: "Meki-Cin",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Meki-Cin - Streaming Drakor China",
    description:
      "Tempat streaming drakor china gratis. Nonton drama china subtitle indonesia terbaru dan terpopuler.",
    url: "https://meki-cin.rpnza.my.id",
    siteName: "Meki-Cin",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "Meki-Cin Logo",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meki-Cin - Streaming Drakor China",
    description:
      "Tempat streaming drakor china gratis",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png", // Explicitly supports apple-touch-icon
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/logo.png",
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body
        className={`${montserrat.className} font-sans antialiased bg-slate-950 text-gray-100`}
      >
        <NextTopLoader
          color="#db2777"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #db2777, 0 0 5px #db2777"
        />
        <FirstUserModal />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
