import { NextResponse } from "next/server";
import {
  BookingRecord,
  getSlotsForService,
  isDateInBookingWindow,
  isServiceName,
  isSunday
} from "@/src/lib/booking";

type AppsScriptAvailabilityResponse = {
  bookings?: BookingRecord[];
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date") || "";
  const service = searchParams.get("service") || "";

  if (!date || !isServiceName(service)) {
    return NextResponse.json(
      { error: "Missing or invalid date/service." },
      { status: 400 }
    );
  }

  if (!isDateInBookingWindow(date) || isSunday(date)) {
    return NextResponse.json({
      slots: [],
      setupRequired: false
    });
  }

  const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;

  if (!scriptUrl) {
    return NextResponse.json({
      slots: getSlotsForService(service),
      setupRequired: true
    });
  }

  const url = new URL(scriptUrl);
  url.searchParams.set("action", "availability");
  url.searchParams.set("date", date);

  const response = await fetch(url, { cache: "no-store" });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Could not load appointment availability." },
      { status: 502 }
    );
  }

  const data = (await response.json()) as AppsScriptAvailabilityResponse;

  return NextResponse.json({
    slots: getSlotsForService(service, data.bookings || []),
    setupRequired: false
  });
}
