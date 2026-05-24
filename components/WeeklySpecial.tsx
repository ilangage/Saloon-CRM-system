import BookingButton from "@/components/BookingButton";
import { WEEKLY_SPECIAL } from "@/src/lib/config";

export default function WeeklySpecial() {
  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8" aria-labelledby="weekly-special">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-charcoal shadow-premium">
        <div className="grid gap-6 px-6 py-8 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-center lg:px-10">
          <div>
            <h2 id="weekly-special" className="text-2xl font-bold text-white sm:text-3xl">
              {WEEKLY_SPECIAL.title}
            </h2>

            <p className="mt-3 text-lg text-white/80">
              Featured service:{" "}
              <span className="font-semibold text-blush">
                {WEEKLY_SPECIAL.featuredService}
              </span>
            </p>

            <p className="mt-2 text-sm font-medium text-white/70">
              {WEEKLY_SPECIAL.validityText}
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center lg:justify-end">
            <div className="rounded-2xl bg-gold px-6 py-4 text-center">
              <p className="text-3xl font-black text-charcoal">
                {WEEKLY_SPECIAL.discount}
              </p>
            </div>

            <BookingButton
              serviceName={WEEKLY_SPECIAL.featuredService}
              className="inline-flex justify-center rounded-full bg-white px-6 py-3 text-sm font-bold text-wine transition hover:bg-cream focus:outline-none focus:ring-4 focus:ring-white/30"
            >
              Book Special
            </BookingButton>
          </div>
        </div>
      </div>
    </section>
  );
}
