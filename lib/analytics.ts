export type AnalyticsEvent = "cta_click" | "product_cta" | "service_cta" | "enquiry_start" | "enquiry_success";

export function trackEvent(event: AnalyticsEvent, context: Record<string, string> = {}) {
  if (typeof window === "undefined") return;
  const payload = { event, ...context };
  const target = window as typeof window & { dataLayer?: Array<Record<string, string>> };
  target.dataLayer = target.dataLayer || [];
  target.dataLayer.push(payload);
  window.dispatchEvent(new CustomEvent("forgestack:analytics", { detail: payload }));
}
