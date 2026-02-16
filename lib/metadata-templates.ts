
import { Metadata } from "next";

const BASE_URL = "https://forgestacklabs.com";

// ============================================
// HOMEPAGE
// ============================================
export const homepageMetadata: Metadata = {
  title: "Fuel Station Management Software | ForgeStack Labs",
  description:
    "ForgeStack Labs builds operational SaaS for fuel stations and logistics businesses. Daily ops, accounting, reconciliation & automation.",
  keywords: [
    "fuel station management software India",
    "petrol pump accounting software",
    "petrol pump daily operations software",
    "fuel station automation platform",
    "ForgeStack Labs",
    "operational software",
  ],
  alternates: { canonical: `${BASE_URL}/` },
  openGraph: {
    title: "Operational Software Systems for Fuel & Logistics Businesses",
    description:
      "We are building a next-generation Fuel Station Management SaaS while partnering with select operational businesses to digitize their systems.",
    url: BASE_URL,
    siteName: "ForgeStack Labs",
    images: [{ url: "/og-homepage.png", width: 1200, height: 630, alt: "ForgeStack Labs — Fuel Station SaaS" }],
    type: "website",
  },
};

// ============================================
// ABOUT PAGE
// ============================================
export const aboutMetadata: Metadata = {
  title: "About ForgeStack Labs | Operational Software Builders",
  description:
    "ForgeStack Labs builds operational SaaS and digital systems for fuel stations, logistics companies, and industrial businesses. Founded to solve real operational problems.",
  keywords: [
    "about ForgeStack Labs",
    "operational software company India",
    "fuel station software builders",
    "ForgeStack Labs",
  ],
  alternates: { canonical: `${BASE_URL}/about` },
  openGraph: {
    title: "About ForgeStack Labs | Operational Software Builders",
    description:
      "We build fuel station SaaS and operational software for traditional industries. Not a generic agency — product engineers who execute serious systems.",
    url: `${BASE_URL}/about`,
    images: [{ url: "/og-about.png", width: 1200, height: 630 }],
    type: "website",
  },
};

// ============================================
// SERVICES PAGE
// ============================================
export const servicesMetadata: Metadata = {
  title: "Services | ForgeStack Labs — Operational Software",
  description:
    "ForgeStack Labs offers fuel station SaaS, custom operations software, internal dashboards, logistics automation, and industrial web development.",
  keywords: [
    "custom operations management software",
    "business process automation software",
    "internal dashboard development",
    "logistics workflow automation",
    "industrial business website development",
    "ForgeStack Labs services",
  ],
  alternates: { canonical: `${BASE_URL}/services` },
  openGraph: {
    title: "Our Services | ForgeStack Labs",
    description:
      "Fuel station SaaS, custom operational software, logistics automation, and industrial web systems.",
    url: `${BASE_URL}/services`,
    images: [{ url: "/og-services.png", width: 1200, height: 630 }],
    type: "website",
  },
};

// ============================================
// CONTACT PAGE
// ============================================
export const contactMetadata: Metadata = {
  title: "Contact ForgeStack Labs | Book a Strategy Call",
  description:
    "Ready to digitize your operations? Get in touch with ForgeStack Labs to explore our fuel station SaaS or discuss a custom software partnership.",
  keywords: [
    "contact ForgeStack Labs",
    "book strategy call",
    "fuel station software inquiry",
    "operational software partnership",
  ],
  alternates: { canonical: `${BASE_URL}/contact` },
  openGraph: {
    title: "Contact ForgeStack Labs | Book a Strategy Call",
    description: "Ready to digitize your operations? Reach out to ForgeStack Labs today.",
    url: `${BASE_URL}/contact`,
    images: [{ url: "/og-contact.png", width: 1200, height: 630 }],
    type: "website",
  },
};

// ============================================
// CAREERS PAGE
// ============================================
export const careersMetadata: Metadata = {
  title: "Careers at ForgeStack Labs | Build Operational SaaS",
  description:
    "Join ForgeStack Labs. We're building operational SaaS for fuel stations and logistics. Opportunities for engineers, designers, and product thinkers.",
  keywords: [
    "ForgeStack Labs careers",
    "SaaS startup jobs India",
    "software engineer jobs",
    "fuel station software company jobs",
  ],
  alternates: { canonical: `${BASE_URL}/careers` },
  openGraph: {
    title: "Careers at ForgeStack Labs",
    description: "Build real operational software. Join the ForgeStack Labs team.",
    url: `${BASE_URL}/careers`,
    images: [{ url: "/og-careers.png", width: 1200, height: 630 }],
    type: "website",
  },
};

// ============================================
// PORTFOLIO / WORK PAGE
// ============================================
export const portfolioMetadata: Metadata = {
  title: "Our Work | ForgeStack Labs — Case Studies & Projects",
  description:
    "See how ForgeStack Labs has helped operational businesses digitize their systems — logistics platforms, internal dashboards, and fuel station tools.",
  keywords: [
    "ForgeStack Labs portfolio",
    "operational software case studies",
    "logistics digital transformation project",
    "industrial software projects",
  ],
  alternates: { canonical: `${BASE_URL}/work` },
  openGraph: {
    title: "Our Work | ForgeStack Labs",
    description: "Operational software projects built with precision engineering.",
    url: `${BASE_URL}/work`,
    images: [{ url: "/og-work.png", width: 1200, height: 630 }],
    type: "website",
  },
};

// ============================================
// BLOG POST (dynamic)
// ============================================
export const blogPostMetadata = (post: {
  title: string;
  excerpt: string;
  author: string;
  publishedDate: string;
  tags: string[];
  slug: string;
}): Metadata => ({
  title: `${post.title} | ForgeStack Labs`,
  description: post.excerpt,
  keywords: [...post.tags, "ForgeStack Labs", "fuel station software", "operational SaaS"],
  authors: [{ name: post.author }],
  alternates: { canonical: `${BASE_URL}/blog/${post.slug}` },
  openGraph: {
    title: post.title,
    description: post.excerpt,
    url: `${BASE_URL}/blog/${post.slug}`,
    type: "article",
    publishedTime: post.publishedDate,
    authors: [post.author],
    images: [{ url: "/og-blog.png", width: 1200, height: 630 }],
  },
});

// ============================================
// NEW SEO LANDING PAGES
// ============================================

export const fuelStationSaaSMetadata: Metadata = {
  title: "Fuel Station Management Software India | ForgeStack",
  description:
    "Manage your petrol pump with ForgeStack's SaaS — daily ops, shift tracking, accounting, reconciliation & compliance. Built for India's fuel industry.",
  keywords: [
    "fuel station management software India",
    "petrol pump accounting software",
    "petrol pump shift management",
    "fuel inventory tracking software",
    "fuel station SaaS India",
  ],
  alternates: { canonical: `${BASE_URL}/fuel-station-management-software-india` },
  openGraph: {
    title: "Fuel Station Management Software India | ForgeStack Labs",
    description:
      "Purpose-built SaaS for petrol pump daily operations, accounting, reconciliation, and automation.",
    url: `${BASE_URL}/fuel-station-management-software-india`,
    images: [{ url: "/og-fuel-station.png", width: 1200, height: 630 }],
    type: "website",
  },
};

export const petrolPumpAccountingMetadata: Metadata = {
  title: "Petrol Pump Accounting Software | ForgeStack Labs",
  description:
    "Automate petrol pump accounting with ForgeStack. Cash, credit, UPI reconciliation — daily reports, shift logs, and zero-error accounting for fuel stations.",
  keywords: [
    "petrol pump accounting software",
    "fuel station daily accounting",
    "petrol pump reconciliation system",
    "fuel station cash management software",
    "petrol pump billing software India",
  ],
  alternates: { canonical: `${BASE_URL}/petrol-pump-accounting-software` },
  openGraph: {
    title: "Petrol Pump Accounting Software | ForgeStack Labs",
    description: "Zero-error daily accounting and reconciliation for fuel stations.",
    url: `${BASE_URL}/petrol-pump-accounting-software`,
    images: [{ url: "/og-accounting.png", width: 1200, height: 630 }],
    type: "website",
  },
};

export const logisticsMetadata: Metadata = {
  title: "Logistics Digital Transformation | ForgeStack Labs",
  description:
    "ForgeStack helps logistics companies digitize operations — custom workflow systems, fleet dashboards, and automation platforms. Strategic partnerships only.",
  keywords: [
    "digital transformation for logistics companies",
    "logistics workflow automation India",
    "logistics operations software",
    "custom logistics management system",
    "fleet management dashboard development",
  ],
  alternates: { canonical: `${BASE_URL}/logistics-digital-transformation` },
  openGraph: {
    title: "Logistics Digital Transformation | ForgeStack Labs",
    description: "Custom workflow systems and automation platforms for logistics businesses.",
    url: `${BASE_URL}/logistics-digital-transformation`,
    images: [{ url: "/og-logistics.png", width: 1200, height: 630 }],
    type: "website",
  },
};

export const customOpsSoftwareMetadata: Metadata = {
  title: "Custom Operations Management Software | ForgeStack",
  description:
    "ForgeStack builds custom operations management software for industrial and logistics businesses — dashboards, workflow automation, and process digitization.",
  keywords: [
    "custom operations management software",
    "business process automation software",
    "internal dashboard development",
    "operational software for industrial businesses",
    "enterprise workflow automation India",
  ],
  alternates: { canonical: `${BASE_URL}/custom-operations-management-software` },
  openGraph: {
    title: "Custom Operations Management Software | ForgeStack Labs",
    description: "Dashboards, workflow automation, and process digitization for operational businesses.",
    url: `${BASE_URL}/custom-operations-management-software`,
    images: [{ url: "/og-ops-software.png", width: 1200, height: 630 }],
    type: "website",
  },
};

export const industrialWebsiteMetadata: Metadata = {
  title: "Industrial Business Website Development | ForgeStack",
  description:
    "High-performance websites for logistics, industrial, and operational businesses. Built by ForgeStack Labs — conversion-focused, fast, and SEO-optimized.",
  keywords: [
    "industrial business website development",
    "logistics company website design India",
    "B2B industrial website development",
    "high-performance website for manufacturing",
    "operational business website",
  ],
  alternates: { canonical: `${BASE_URL}/industrial-business-website-development` },
  openGraph: {
    title: "Industrial Business Website Development | ForgeStack Labs",
    description: "Conversion-focused, fast, SEO-optimized websites for industrial and logistics businesses.",
    url: `${BASE_URL}/industrial-business-website-development`,
    images: [{ url: "/og-industrial.png", width: 1200, height: 630 }],
    type: "website",
  },
};

// ============================================
// SCHEMA MARKUP (inject via <script> in layout)
// ============================================

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ForgeStack Labs",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  description:
    "Operational software builders for fuel stations and logistics businesses. Building a next-generation Fuel Station Management SaaS.",
  sameAs: ["https://linkedin.com/company/forgestacklabs"],
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is fuel station management software?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Fuel station management software helps petrol pump owners track daily sales, manage shifts, reconcile cash and digital payments, monitor inventory, and generate compliance reports — all in one system.",
      },
    },
    {
      "@type": "Question",
      name: "How can petrol pumps automate daily accounting?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "With ForgeStack's SaaS, petrol pumps can automatically reconcile nozzle-wise sales, cash collections, UPI payments, and credit transactions — generating accurate daily reports without manual entry.",
      },
    },
    {
      "@type": "Question",
      name: "How can logistics companies digitize their operations?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ForgeStack partners with logistics companies to build custom workflow automation systems, fleet dashboards, and operational platforms tailored to their specific business processes.",
      },
    },
    {
      "@type": "Question",
      name: "What is business process automation software?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Business process automation software replaces manual, repetitive tasks with digital workflows — reducing errors, saving time, and giving management real-time visibility into operations.",
      },
    },
  ],
};

export const jobPostingSchema = {
  "@context": "https://schema.org",
  "@type": "JobPosting",
  title: "Software Engineer — Operational SaaS",
  description:
    "Join ForgeStack Labs to build fuel station management SaaS and operational software for traditional industries.",
  hiringOrganization: {
    "@type": "Organization",
    name: "ForgeStack Labs",
    sameAs: BASE_URL,
  },
  jobLocation: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Remote",
      addressCountry: "IN",
    },
  },
  employmentType: "FULL_TIME",
};