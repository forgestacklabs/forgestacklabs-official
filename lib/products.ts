export type ProductRecord = { slug: string; name: string; naming: "final" | "working"; summary: string; audience?: string; status: "details-published" | "publication-pending"; corporatePath?: string };

export const products: ProductRecord[] = [
  { slug: "fuel-os", name: "Fuel OS", naming: "final", summary: "Operational software for fuel-station billing, inventory, shifts, reconciliation, credit, and reporting.", audience: "Fuel-station owners and operating teams", status: "details-published", corporatePath: "/products/fuel-os" },
  { slug: "arth", name: "ARTh", naming: "working", summary: "Product details are being prepared for publication.", status: "publication-pending" },
  { slug: "omni-doc-ai", name: "Omni Doc AI", naming: "working", summary: "Product details are being prepared for publication.", status: "publication-pending" },
  { slug: "pocketrun", name: "PocketRun", naming: "final", summary: "Expense tracking and shared trip finances for individuals, travel groups, and small teams.", audience: "Individuals, travel groups, and small teams", status: "details-published", corporatePath: "/products/pocketrun" },
];

export const siteResponsibilities = { corporate: "Company credibility, custom engineering services, and product discovery", productSites: "Product features, access, onboarding, commercial journeys, and support once verified" } as const;
