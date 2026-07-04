"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { readJson } from "@/components/forgeos/ui";

export function useApiData<T>(url: string, initial: T, intervalMs?: number, enabled = true) {
  const [data, setData] = useState<T>(initial);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(enabled);
  const [refreshing, setRefreshing] = useState(false);
  const hasLoadedRef = useRef(false);

  const reload = useCallback(async () => {
    if (hasLoadedRef.current) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    try {
      const response = await fetch(url);
      const body = await readJson(response);
      if (!response.ok) throw new Error(body.error || "Unable to load data.");
      setData(body[Object.keys(body)[0]] as T);
      setError("");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Unable to load data.");
    } finally {
      hasLoadedRef.current = true;
      setLoading(false);
      setRefreshing(false);
    }
  }, [url]);

  useEffect(() => {
    if (!enabled) return;
    reload();
    if (!intervalMs) return;
    const interval = window.setInterval(reload, intervalMs);
    return () => window.clearInterval(interval);
  }, [enabled, intervalMs, reload]);

  return { data, setData, error, loading, refreshing, reload };
}