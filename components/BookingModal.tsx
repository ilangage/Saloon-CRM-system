"use client";

import {
  createContext,
  FormEvent,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import { SERVICES, getWhatsAppLink } from "@/src/lib/config";
import {
  AvailabilitySlot,
  ServiceName,
  cleanPhone,
  formatDisplayTime,
  getBookingDates
} from "@/src/lib/booking";

type BookingContextValue = {
  openBooking: (serviceName?: ServiceName) => void;
};

type SubmitState =
  | { status: "idle"; message: string }
  | { status: "loading"; message: string }
  | { status: "error"; message: string }
  | { status: "success"; message: string };

type BookingSummary = {
  date: string;
  time: string;
  service: string;
  name: string;
  phone: string;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function useBooking() {
  const context = useContext(BookingContext);

  if (!context) {
    throw new Error("useBooking must be used inside BookingProvider");
  }

  return context;
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const dates = useMemo(() => getBookingDates(), []);
  const firstAvailableDate =
    dates.find((date) => !date.disabled)?.date || dates[0]?.date || "";
  const [isOpen, setIsOpen] = useState(false);
  const [service, setService] = useState<ServiceName>(SERVICES[0].name);
  const [date, setDate] = useState(firstAvailableDate);
  const [time, setTime] = useState("");
  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);
  const [availabilityMessage, setAvailabilityMessage] = useState("");
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>({
    status: "idle",
    message: ""
  });
  const [summary, setSummary] = useState<BookingSummary | null>(null);

  function openBooking(serviceName?: ServiceName) {
    if (serviceName) {
      setService(serviceName);
    }

    setIsOpen(true);
    setSubmitState({ status: "idle", message: "" });
    setSummary(null);
  }

  function closeBooking() {
    setIsOpen(false);
  }

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeBooking();
      }
    }

    document.addEventListener("keydown", onKeyDown);

    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !date || !service) {
      return;
    }

    const controller = new AbortController();

    async function loadAvailability() {
      setIsLoadingSlots(true);
      setAvailabilityMessage("");
      setTime("");

      try {
        const params = new URLSearchParams({ date, service });
        const response = await fetch(`/api/availability?${params.toString()}`, {
          signal: controller.signal
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Could not load available times.");
        }

        setSlots(data.slots || []);

        if (data.setupRequired) {
          setAvailabilityMessage(
            "Google Sheets is not connected yet. Times are shown as open until setup is complete."
          );
        }
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        setSlots([]);
        setAvailabilityMessage(
          error instanceof Error
            ? error.message
            : "Could not load available times."
        );
      } finally {
        if (!controller.signal.aborted) {
          setIsLoadingSlots(false);
        }
      }
    }

    loadAvailability();

    return () => controller.abort();
  }, [date, isOpen, service]);

  async function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!service || !date || !time || !name.trim() || !phone.trim()) {
      setSubmitState({
        status: "error",
        message: "Please complete every booking field."
      });
      return;
    }

    setSubmitState({
      status: "loading",
      message: "Saving your appointment..."
    });

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          service,
          date,
          time,
          name: name.trim(),
          phone: cleanPhone(phone)
        })
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not save your appointment.");
      }

      setSummary({
        service,
        date,
        time,
        name: name.trim(),
        phone: cleanPhone(phone)
      });
      setSubmitState({
        status: "success",
        message: "Appointment saved. We will see you soon."
      });
    } catch (error) {
      setSubmitState({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Could not save your appointment."
      });
    }
  }

  return (
    <BookingContext.Provider value={{ openBooking }}>
      {children}

      {isOpen ? (
        <div
          className="fixed inset-0 z-[80] overflow-y-auto bg-charcoal/70 px-4 py-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-title"
        >
          <div className="mx-auto max-w-3xl rounded-[1.5rem] bg-white shadow-premium">
            <div className="flex items-start justify-between gap-4 border-b border-wine/10 px-5 py-4 sm:px-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
                  Fur Naills
                </p>
                <h2 id="booking-title" className="mt-1 text-2xl font-black text-wine">
                  Book Appointment
                </h2>
              </div>

              <button
                type="button"
                onClick={closeBooking}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-wine/15 text-xl font-bold text-wine transition hover:bg-cream"
                aria-label="Close booking form"
              >
                x
              </button>
            </div>

            <form onSubmit={submitBooking} className="grid gap-6 p-5 sm:p-6">
              <div>
                <label className="text-sm font-bold text-charcoal" htmlFor="booking-service">
                  Service
                </label>
                <select
                  id="booking-service"
                  value={service}
                  onChange={(event) =>
                    setService(event.target.value as ServiceName)
                  }
                  className="mt-2 w-full rounded-2xl border border-wine/15 bg-cream px-4 py-3 text-base font-semibold text-charcoal outline-none focus:border-wine focus:ring-4 focus:ring-rose/20"
                >
                  {SERVICES.map((item) => (
                    <option key={item.name} value={item.name}>
                      {item.name} ({item.duration})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <p className="text-sm font-bold text-charcoal">Date</p>
                <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {dates.map((item) => (
                    <button
                      key={item.date}
                      type="button"
                      onClick={() => setDate(item.date)}
                      disabled={item.disabled}
                      className={`rounded-2xl border px-3 py-3 text-sm font-bold transition ${
                        date === item.date
                          ? "border-wine bg-wine text-white"
                          : "border-wine/15 bg-white text-wine hover:bg-cream"
                      } disabled:cursor-not-allowed disabled:border-charcoal/10 disabled:bg-charcoal/5 disabled:text-charcoal/35`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-bold text-charcoal">Time</p>
                {isLoadingSlots ? (
                  <p className="mt-3 rounded-2xl bg-cream px-4 py-3 text-sm font-semibold text-charcoal/70">
                    Loading available times...
                  </p>
                ) : (
                  <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {slots.map((slot) => (
                      <button
                        key={slot.time}
                        type="button"
                        onClick={() => setTime(slot.time)}
                        disabled={!slot.available}
                        className={`rounded-2xl border px-3 py-3 text-sm font-bold transition ${
                          time === slot.time
                            ? "border-wine bg-wine text-white"
                            : "border-wine/15 bg-white text-wine hover:bg-cream"
                        } disabled:cursor-not-allowed disabled:border-charcoal/10 disabled:bg-charcoal/5 disabled:text-charcoal/35`}
                      >
                        {slot.label}
                      </button>
                    ))}
                  </div>
                )}

                {availabilityMessage ? (
                  <p className="mt-3 rounded-2xl bg-gold/15 px-4 py-3 text-sm font-semibold text-wine">
                    {availabilityMessage}
                  </p>
                ) : null}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-bold text-charcoal" htmlFor="booking-name">
                    Name
                  </label>
                  <input
                    id="booking-name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-wine/15 px-4 py-3 text-base text-charcoal outline-none focus:border-wine focus:ring-4 focus:ring-rose/20"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-charcoal" htmlFor="booking-phone">
                    Phone number
                  </label>
                  <input
                    id="booking-phone"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-wine/15 px-4 py-3 text-base text-charcoal outline-none focus:border-wine focus:ring-4 focus:ring-rose/20"
                    inputMode="tel"
                    placeholder="076 944 2644"
                  />
                </div>
              </div>

              {submitState.message ? (
                <p
                  className={`rounded-2xl px-4 py-3 text-sm font-bold ${
                    submitState.status === "success"
                      ? "bg-green-50 text-green-700"
                      : submitState.status === "error"
                        ? "bg-red-50 text-red-700"
                        : "bg-cream text-wine"
                  }`}
                >
                  {submitState.message}
                </p>
              ) : null}

              {summary ? (
                <div className="rounded-2xl bg-cream p-4 text-sm font-semibold text-charcoal/80">
                  <p>
                    {summary.service} on {summary.date} at{" "}
                    {formatDisplayTime(summary.time)}
                  </p>
                  <p className="mt-1">
                    {summary.name} - {summary.phone}
                  </p>
                </div>
              ) : null}

              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="submit"
                  disabled={submitState.status === "loading"}
                  className="inline-flex justify-center rounded-full bg-wine px-6 py-3 text-sm font-bold text-white transition hover:bg-charcoal disabled:cursor-wait disabled:opacity-70"
                >
                  Confirm Booking
                </button>

                <a
                  href={getWhatsAppLink(
                    `Hi, I would like to book ${service} on ${date}${
                      time ? ` at ${formatDisplayTime(time)}` : ""
                    }.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex justify-center rounded-full border border-wine/15 px-6 py-3 text-sm font-bold text-wine transition hover:bg-cream"
                >
                  WhatsApp fallback
                </a>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </BookingContext.Provider>
  );
}
