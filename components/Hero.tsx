import BookingButton from "@/components/BookingButton";
import Image from "next/image";
import {
  getWhatsAppLink,
  LOCATION_TEXT,
  WORKING_HOURS
} from "@/src/lib/config";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-cream via-white to-blush/40">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">
        <div>
          <p className="mb-4 inline-flex rounded-full border border-rose/30 bg-white px-4 py-2 text-sm font-medium text-wine shadow-sm">
            Premium salon care in {LOCATION_TEXT}
          </p>

          <h1 className="max-w-xl text-4xl font-bold tracking-tight text-charcoal sm:text-5xl lg:text-6xl">
            Beautiful nails, confident you.
          </h1>

          <p className="mt-5 max-w-xl text-base leading-8 text-charcoal/75 sm:text-lg">
            Quick appointment booking for nails, facial and rebonding. Open{" "}
            {WORKING_HOURS.days}, {WORKING_HOURS.time}. {WORKING_HOURS.closed}.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <BookingButton
              className="inline-flex items-center justify-center rounded-full bg-wine px-7 py-3.5 text-sm font-bold text-white shadow-premium transition hover:bg-charcoal focus:outline-none focus:ring-4 focus:ring-rose/30"
            >
              Book Appointment
            </BookingButton>

            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-wine/20 bg-white px-7 py-3.5 text-sm font-bold text-wine shadow-sm transition hover:border-wine hover:bg-cream focus:outline-none focus:ring-4 focus:ring-rose/30"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-[2.5rem] bg-rose/20 blur-3xl" />
          <Image
            src="/main .avif"
            alt="Fur Naills Beauty Salon"
            width={900}
            height={1100}
            priority
            className="relative aspect-[4/5] w-full rounded-[2rem] object-cover shadow-premium"
          />
        </div>
      </div>
    </section>
  );
}
