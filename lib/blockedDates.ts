import type { BlockedDateRange } from "./forgeosData";

export function isDateBlocked(date: string, ranges: BlockedDateRange[]): BlockedDateRange | null {
  if (!date) return null;
  return ranges.find((range) => date >= range.startDate && date <= range.endDate) || null;
}