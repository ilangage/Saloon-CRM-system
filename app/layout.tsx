import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fur Naills Beauty Salon | Booking in Ekala",
  description:
    "Book nail art, facial and rebonding appointments at Fur Naills Beauty Salon, Ekala, OREX City.",
  openGraph: {
    title: "Fur Naills Beauty Salon",
    description:
      "Premium salon booking website for nail art, facial and rebonding in Ekala.",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
