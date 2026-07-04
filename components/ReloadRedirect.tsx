"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

const refreshSafePrefixes = ["/admin", "/forgeos", "/verify"];

export default function ReloadRedirect() {
  const router = useRouter();
  const pathname = usePathname();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const isRefreshSafeRoute = refreshSafePrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
    if (isRefreshSafeRoute) return;

    const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    const isReload = navigation?.type === "reload";

    if (isReload && pathname !== "/") {
      router.replace("/");
    }
  }, [pathname, router]);

  return null;
}