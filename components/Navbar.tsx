import BookingButton from "@/components/BookingButton";
import { SALON_NAME } from "@/src/lib/config";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/70 bg-cream/90 backdrop-blur-xl">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <a
          href="#"
          className="group flex min-w-0 items-center gap-3 text-wine"
          aria-label={SALON_NAME}
        >
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-gold bg-wine text-lg font-black text-gold shadow-lg shadow-wine/20">
            FN
          </span>
          <span className="min-w-0">
            <span className="block text-xl font-black leading-none tracking-tight sm:text-2xl">
              Fur Naills
            </span>
            <span className="mt-1 block text-sm font-extrabold uppercase leading-none tracking-[0.18em] text-gold sm:text-base">
              Beauty Salon
            </span>
          </span>
        </a>

        <BookingButton
          className="rounded-full bg-wine px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-wine/20 transition hover:bg-charcoal focus:outline-none focus:ring-4 focus:ring-rose/30"
        >
          Book Appointment
        </BookingButton>
      </nav>
    </header>
  );
}
