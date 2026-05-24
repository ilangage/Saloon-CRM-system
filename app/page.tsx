import FAQ from "@/components/FAQ";
import { BookingProvider } from "@/components/BookingModal";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import LocationHours from "@/components/LocationHours";
import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import WeeklySpecial from "@/components/WeeklySpecial";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";

export default function HomePage() {
  return (
    <BookingProvider>
      <main>
        <Navbar />
        <Hero />
        <WeeklySpecial />
        <Services />
        <Gallery />
        <LocationHours />
        <FAQ />
        <Footer />
        <WhatsAppFloatingButton />
      </main>
    </BookingProvider>
  );
}
