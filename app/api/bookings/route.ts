import { NextResponse } from "next/server";
import {
  cleanPhone,
  isDateInBookingWindow,
  isServiceName,
  isSunday
} from "@/src/lib/booking";

type BookingPayload = {
  date?: string;
  time?: string;
  service?: string;
  name?: string;
  phone?: string;
};

type AppsScriptBookingResponse = {
  ok?: boolean;
  code?: string;
  message?: string;
};

export async function POST(request: Request) {
  const payload = (await request.json()) as BookingPayload;
  const date = payload.date?.trim() || "";
  const time = payload.time?.trim() || "";
  const service = payload.service?.trim() || "";
  const name = payload.name?.trim() || "";
  const phone = cleanPhone(payload.phone?.trim() || "");

  if (!date || !time || !isServiceName(service) || !name || !phone) {
    return NextResponse.json(
      { error: "Please complete every booking field." },
      { status: 400 }
    );
  }

  if (!isDateInBookingWindow(date) || isSunday(date)) {
    return NextResponse.json(
      { error: "Please choose an available appointment date." },
      { status: 400 }
    );
  }

  const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;

  if (!scriptUrl) {
    return NextResponse.json(
      {
        error:
          "Google Sheets booking is not connected yet. Add GOOGLE_APPS_SCRIPT_URL in .env.local."
      },
      { status: 503 }
    );
  }

  const response = await fetch(scriptUrl, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    body: JSON.stringify({
      date,
      time,
      service,
      name,
      phone
    })
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Could not save your appointment. Please try WhatsApp." },
      { status: 502 }
    );
  }

  const data = (await response.json()) as AppsScriptBookingResponse;

  if (!data.ok) {
    const isSlotTaken = data.code === "SLOT_TAKEN";

    return NextResponse.json(
      {
        error: isSlotTaken
          ? "Sorry, this time was just booked. Please choose another time."
          : data.message || "Could not save your appointment. Please try again."
      },
      { status: isSlotTaken ? 409 : 400 }
    );
  }

  return NextResponse.json({
    ok: true,
    booking: {
      date,
      time,
      service,
      name,
      phone
    }
  });
}
