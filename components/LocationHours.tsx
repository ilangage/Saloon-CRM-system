import {
  GOOGLE_MAP_URL,
  LOCATION_TEXT,
  WORKING_HOURS,
  getWhatsAppLink
} from "@/src/lib/config";

export default function LocationHours() {
  return (
    <section className="px-4 py-14 sm:px-6 lg:px-8" aria-labelledby="location-title">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
        <div className="rounded-[2rem] bg-white p-8 shadow-lg shadow-wine/10 ring-1 ring-wine/5">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-rose">
            Visit Us
          </p>

          <h2 id="location-title" className="mt-3 text-3xl font-bold text-charcoal">
            Location and hours
          </h2>

          <div className="mt-8 space-y-5 text-charcoal/75">
            <div>
              <h3 className="font-bold text-charcoal">Location</h3>
              <p>{LOCATION_TEXT}</p>
            </div>

            <div>
              <h3 className="font-bold text-charcoal">Opening hours</h3>
              <p>
                {WORKING_HOURS.days}, {WORKING_HOURS.time}
              </p>
              <p>{WORKING_HOURS.closed}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={GOOGLE_MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex justify-center rounded-full bg-wine px-6 py-3 text-sm font-bold text-white transition hover:bg-charcoal focus:outline-none focus:ring-4 focus:ring-rose/30"
            >
              Open Google Map
            </a>

            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex justify-center rounded-full border border-wine/15 bg-white px-6 py-3 text-sm font-bold text-wine transition hover:bg-cream focus:outline-none focus:ring-4 focus:ring-rose/30"
            >
              Chat to Book
            </a>
          </div>
        </div>

        <div className="rounded-[2rem] bg-gradient-to-br from-wine to-charcoal p-8 text-white shadow-premium">
          <h3 className="text-2xl font-bold">Before you visit</h3>

          <p className="mt-4 leading-8 text-white/75">
            Please book before arriving so the salon can reserve your time. For
            rebonding appointments, message us first if you need timing advice.
          </p>

          <div className="mt-8 rounded-2xl bg-white/10 p-5 ring-1 ring-white/15">
            <p className="text-sm font-semibold text-white/70">
              Booking fallback
            </p>
            <p className="mt-2 text-lg font-bold">
              If the Google Form is not available, use WhatsApp to book directly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
