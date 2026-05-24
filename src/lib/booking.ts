import { SERVICES } from "@/src/lib/config";

export type ServiceName = (typeof SERVICES)[number]["name"];

export type BookingRecord = {
  date: string;
  time: string;
  service: string;
  status?: string;
};

export type AvailabilitySlot = {
  time: string;
  label: string;
  endTime: string;
  available: boolean;
};

export const OPEN_HOUR = 9;
export const CLOSE_HOUR = 18;
export const SLOT_STEP_MINUTES = 60;
export const BOOKING_WINDOW_DAYS = 14;
export const BOOKED_STATUS = "Booked";

export function getService(serviceName: string) {
  return SERVICES.find((service) => service.name === serviceName);
}

export function getServiceNames() {
  return SERVICES.map((service) => service.name);
}

export function isServiceName(serviceName: string): serviceName is ServiceName {
  return SERVICES.some((service) => service.name === serviceName);
}

export function getDurationMinutes(serviceName: string) {
  return getService(serviceName)?.durationMinutes || 60;
}

export function minutesToTime(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

export function timeToMinutes(time: string) {
  const [hours, minutes] = time.split(":").map(Number);

  return hours * 60 + minutes;
}

export function formatSlotLabel(startTime: string, endTime: string) {
  return `${formatDisplayTime(startTime)} - ${formatDisplayTime(endTime)}`;
}

export function formatDisplayTime(time: string) {
  const [rawHours, rawMinutes] = time.split(":").map(Number);
  const suffix = rawHours >= 12 ? "PM" : "AM";
  const hours = rawHours % 12 || 12;

  return `${hours}:${String(rawMinutes).padStart(2, "0")} ${suffix}`;
}

export function getDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function parseDateKey(dateKey: string) {
  const [year, month, day] = dateKey.split("-").map(Number);

  return new Date(year, month - 1, day);
}

export function isSunday(dateKey: string) {
  return parseDateKey(dateKey).getDay() === 0;
}

export function isDateInBookingWindow(dateKey: string, today = new Date()) {
  const requested = parseDateKey(dateKey);
  const start = parseDateKey(getDateKey(today));
  const end = new Date(start);
  end.setDate(start.getDate() + BOOKING_WINDOW_DAYS - 1);

  return requested >= start && requested <= end;
}

export function getBookingDates(today = new Date()) {
  return Array.from({ length: BOOKING_WINDOW_DAYS }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() + index);

    const dateKey = getDateKey(date);

    return {
      date: dateKey,
      label: date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric"
      }),
      disabled: isSunday(dateKey)
    };
  });
}

export function rangesOverlap(
  firstStart: number,
  firstEnd: number,
  secondStart: number,
  secondEnd: number
) {
  return firstStart < secondEnd && secondStart < firstEnd;
}

export function getSlotsForService(
  serviceName: string,
  bookings: BookingRecord[] = []
): AvailabilitySlot[] {
  const duration = getDurationMinutes(serviceName);
  const openMinutes = OPEN_HOUR * 60;
  const closeMinutes = CLOSE_HOUR * 60;
  const latestStart = closeMinutes - duration;
  const slots: AvailabilitySlot[] = [];

  for (
    let start = openMinutes;
    start <= latestStart;
    start += SLOT_STEP_MINUTES
  ) {
    const end = start + duration;
    const time = minutesToTime(start);
    const endTime = minutesToTime(end);
    const available = !bookings.some((booking) => {
      if (booking.status && booking.status !== BOOKED_STATUS) {
        return false;
      }

      const bookingStart = timeToMinutes(booking.time);
      const bookingEnd = bookingStart + getDurationMinutes(booking.service);

      return rangesOverlap(start, end, bookingStart, bookingEnd);
    });

    slots.push({
      time,
      endTime,
      available,
      label: formatSlotLabel(time, endTime)
    });
  }

  return slots;
}

export function cleanPhone(phone: string) {
  return phone.replace(/[^\d+]/g, "");
}
