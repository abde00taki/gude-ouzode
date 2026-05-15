import { WHATSAPP_NUMBER } from "../config";

/**
 * Opens WhatsApp with a URL-encoded prefilled message (no backend).
 * @param {string} message
 */
export function openWhatsAppPrefilled(message) {
  const params = new URLSearchParams({ text: message });
  const url = `https://wa.me/${WHATSAPP_NUMBER}?${params.toString()}`;
  window.open(url, "_blank", "noopener,noreferrer");
}
