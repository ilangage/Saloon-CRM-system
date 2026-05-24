export const SALON_NAME = "Fur Naills Beauty Salon";

export const LOCATION_TEXT = "Ekala, OREX City";

export const GOOGLE_MAP_URL = "https://share.google/zJ59RC8LvwPtJFFET";

export const WHATSAPP_NUMBER = "0769442644";

export const WORKING_HOURS = {
  days: "Monday–Saturday",
  time: "9:00 AM – 6:00 PM",
  closed: "Closed Sunday"
};

export const WEEKLY_SPECIAL = {
  title: "This Week’s Special",
  featuredService: "Nail Art",
  discount: "20% OFF",
  validityText: "Valid Monday–Saturday"
};

export const SERVICES = [
  {
    name: "Nail Art",
    duration: "60 min",
    durationMinutes: 60,
    description:
      "Clean, stylish nail art for everyday beauty, events and special days.",
    image: "/nails 1 .avif"
  },
  {
    name: "Facial",
    duration: "60 min",
    durationMinutes: 60,
    description:
      "Relaxing facial care to refresh your skin and give a clean glow.",
    image: "/facial.avif"
  },
  {
    name: "Rebonding",
    duration: "180 min",
    durationMinutes: 180,
    description:
      "Smooth, neat and long-lasting hair rebonding with careful salon service.",
    image: "/rebonding .avif"
  }
];

export const GALLERY_IMAGES = [
  {
    src: "/nail 2 .avif",
    alt: "Nail art design"
  },
  {
    src: "/gaa.avif",
    alt: "Facial treatment"
  },
  {
    src: "/rebond.avif",
    alt: "Hair rebonding service"
  },
  {
    src: "/main .avif",
    alt: "Fur Naills Beauty Salon"
  }
];

export function getWhatsAppLink(message?: string) {
  const cleanedNumber = WHATSAPP_NUMBER.replace(/^0/, "94").replace(/\D/g, "");

  const defaultMessage =
    message ||
    `Hi ${SALON_NAME}, I would like to book an appointment.`;

  return `https://wa.me/${cleanedNumber}?text=${encodeURIComponent(
    defaultMessage
  )}`;
}
