import { getWhatsAppLink } from "@/src/lib/config";

export default function WhatsAppFloatingButton() {
  return (
    <a
      href={getWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-white shadow-2xl transition hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300"
    >
      <span className="text-xl font-black" aria-hidden="true">W</span>
    </a>
  );
}
