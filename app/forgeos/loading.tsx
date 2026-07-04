export default function ForgeOSLoading() {
  return (
    <div className="flex min-h-64 items-center justify-center" role="status" aria-label="Loading section">
      <span className="h-9 w-9 animate-spin rounded-full border-2 border-[#121212]/15 border-t-[#121212]" />
    </div>
  );
}
