"use client";

import { ReactNode } from "react";
import { ServiceName } from "@/src/lib/booking";
import { useBooking } from "@/components/BookingModal";

type BookingButtonProps = {
  children: ReactNode;
  className: string;
  serviceName?: ServiceName;
};

export default function BookingButton({
  children,
  className,
  serviceName
}: BookingButtonProps) {
  const { openBooking } = useBooking();

  return (
    <button
      type="button"
      onClick={() => openBooking(serviceName)}
      className={className}
    >
      {children}
    </button>
  );
}
