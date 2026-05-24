import {
  LOCATION_TEXT,
  SALON_NAME,
  WORKING_HOURS,
  getWhatsAppLink
} from "@/src/lib/config";

export default function Footer() {
  return (
    <footer className="bg-charcoal px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
        <div>
          <p className="text-xl font-bold">{SALON_NAME}</p>
          <p className="mt-3 text-sm leading-6 text-white/65">
            Premium beauty salon booking in {LOCATION_TEXT}.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white/50">
            Hours
          </h2>
          <p className="mt-3 text-sm text-white/75">
            {WORKING_HOURS.days}
            <br />
            {WORKING_HOURS.time}
            <br />
            {WORKING_HOURS.closed}
          </p>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white/50">
            Contact
          </h2>
          <p className="mt-3 text-sm text-white/75">{LOCATION_TEXT}</p>

          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-bold text-wine transition hover:bg-cream focus:outline-none focus:ring-4 focus:ring-white/30"
          >
            WhatsApp
          </a>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-sm text-white/45">
        © {new Date().getFullYear()} {SALON_NAME}. All rights reserved.
      </div>
    </footer>
  );
}
