import BookingButton from "@/components/BookingButton";
import Image from "next/image";
import { getWhatsAppLink, SERVICES } from "@/src/lib/config";

export default function Services() {
  return (
    <section id="services" className="px-4 py-14 sm:px-6 lg:px-8" aria-labelledby="services-title">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-rose">
            Services
          </p>

          <h2 id="services-title" className="mt-3 text-3xl font-bold text-charcoal sm:text-4xl">
            Choose your salon service
          </h2>

          <p className="mt-4 text-charcoal/70">
            Start with these popular services. More services can be added later
            from the config file without changing the section design.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {SERVICES.map((service) => (
            <article
              key={service.name}
              className="overflow-hidden rounded-[1.75rem] bg-white shadow-lg shadow-wine/10 ring-1 ring-wine/5"
            >
              <Image
                src={service.image}
                alt={`${service.name} service`}
                width={700}
                height={520}
                className="aspect-[4/3] w-full object-cover"
              />

              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-bold text-charcoal">
                    {service.name}
                  </h3>

                  <span className="rounded-full bg-cream px-3 py-1 text-xs font-bold text-wine">
                    {service.duration}
                  </span>
                </div>

                <p className="mt-3 min-h-20 text-sm leading-6 text-charcoal/70">
                  {service.description}
                </p>

                <div className="mt-6 grid gap-3">
                  <BookingButton
                    serviceName={service.name}
                    className="inline-flex justify-center rounded-full bg-wine px-5 py-3 text-sm font-bold text-white transition hover:bg-charcoal focus:outline-none focus:ring-4 focus:ring-rose/30"
                  >
                    Book this service
                  </BookingButton>

                  <a
                    href={getWhatsAppLink(
                      `Hi, I’d like to book ${service.name}.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex justify-center rounded-full border border-wine/15 px-5 py-3 text-sm font-bold text-wine transition hover:bg-cream focus:outline-none focus:ring-4 focus:ring-rose/30"
                  >
                    Ask on WhatsApp
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
