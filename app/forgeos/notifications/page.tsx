"use client";

import type { NotificationRecord } from "@/lib/forgeosData";
import { useForgeOS } from "@/components/forgeos/ForgeOSShell";
import {
  NotificationRow,
  PageHeading,
  SectionLoading,
  panelClass,
  readJson,
} from "@/components/forgeos/ui";
import { useApiData } from "@/components/forgeos/useApiData";

export default function NotificationsPage() {
  const { notify } = useForgeOS();
  const { data: notifications, setData, loading } = useApiData<NotificationRecord[]>(
    "/api/forgeos/notifications",
    [],
    10000
  );

  async function markAllRead() {
    const response = await fetch("/api/forgeos/notifications", {
      method: "PATCH",
    });
    const body = await readJson(response);

    if (!response.ok) {
      return notify(body.error || "Unable to update notifications.");
    }

    setData([]);
    notify("Notifications marked as read successfully.");
  }

  const hasNotifications = notifications.length > 0;

  return (
    <>
      <PageHeading
        title="Notifications"
        description="Unread updates addressed to your account or role."
      />

      <section className={panelClass}>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-[#121212]/10 pb-4">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-medium">Unread</h3>
            <span className="rounded-full border border-[#121212]/10 px-2.5 py-0.5 text-xs font-semibold text-[#121212]/60">
              {notifications.length}
            </span>
          </div>

          <button
            onClick={markAllRead}
            disabled={!hasNotifications}
            className="rounded-lg border border-[#121212]/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Mark all read
          </button>
        </div>

        {loading ? (
          <SectionLoading label="Loading notifications" />
        ) : hasNotifications ? (
          <ul className="divide-y divide-[#121212]/10">
            {notifications.map((item) => (
              <li key={item.id} className="py-3.5 first:pt-0 last:pb-0">
                <NotificationRow item={item} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center gap-1 py-10 text-center">
            <p className="text-sm text-[#121212]/50">No notifications.</p>
            <p className="text-xs text-[#121212]/35">
              You&apos;re all caught up.
            </p>
          </div>
        )}
      </section>
    </>
  );
}