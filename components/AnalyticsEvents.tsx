"use client";
import { useEffect } from "react";
import { trackEvent, type AnalyticsEvent } from "@/lib/analytics";

export default function AnalyticsEvents() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-analytics]") : null;
      if (!target) return;
      trackEvent(target.dataset.analytics as AnalyticsEvent, { context: target.dataset.analyticsContext || "unspecified" });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
