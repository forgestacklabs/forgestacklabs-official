// ─── Services Page Data ────────────────────────────────────────────────────
// Single source of truth for /services and /services/[slug].
// Edit copy here — components should not hardcode content.

export type Service = {
  slug: string;
  num: string;
  title: string;
  shortCopy: string;   // used on the /services grid card
  longCopy: string;    // used on /services/[slug] hero
  features: string[];  // used on /services/[slug] detail list
};

export const services: Service[] = [
  {
    slug: "custom-software-development",
    num: "01",
    title: "Custom Software Development",
    shortCopy:
      "End-to-end software built around how your business actually operates, not the other way around.",
    longCopy:
      "We design and build bespoke software systems that map to your operating model instead of forcing you into someone else's workflow — from internal tools to customer-facing platforms.",
    features: [
      "Requirements & systems discovery",
      "Custom architecture, not templated boilerplate",
      "Owned codebase, no vendor lock-in",
      "Built to scale past MVP",
    ],
  },
  {
    slug: "enterprise-software",
    num: "02",
    title: "Enterprise Software",
    shortCopy:
      "Reliable, auditable systems for organizations where downtime and data integrity are non-negotiable.",
    longCopy:
      "For larger organizations we build internal platforms and operational systems engineered for reliability, access control, and long-term maintainability — not throwaway prototypes.",
    features: [
      "Role-based access & audit trails",
      "Integration with existing enterprise systems",
      "High-availability architecture",
      "Long-term support agreements",
    ],
  },
  {
    slug: "web-application-development",
    num: "03",
    title: "Web Application Development",
    shortCopy:
      "Fast, modern web platforms — from marketing sites to full SaaS products — built on Next.js and React.",
    longCopy:
      "We build performant, SEO-ready web applications on modern frameworks, from customer dashboards to full multi-tenant SaaS products, with the same engineering bar we hold our own products to.",
    features: [
      "Next.js / React engineering",
      "Performance & Core Web Vitals baked in",
      "Multi-tenant SaaS architecture",
      "Design systems, not one-off UI",
    ],
  },
  {
    slug: "mobile-app-development",
    num: "04",
    title: "Mobile App Development",
    shortCopy:
      "Cross-platform Flutter apps engineered for real-world conditions, including offline-first environments.",
    longCopy:
      "Our mobile team ships production Flutter applications for field and consumer use cases alike, including offline-first architectures for environments with unreliable connectivity.",
    features: [
      "Flutter — single codebase, native feel",
      "Offline-first & local-sync architecture",
      "Play Store / App Store deployment",
      "Field-operations-grade reliability",
    ],
  },
  {
    slug: "ai-solutions-automation",
    num: "05",
    title: "AI Solutions & Automation",
    shortCopy:
      "Practical AI integration and workflow automation — applied where it removes real operational friction.",
    longCopy:
      "We integrate AI where it earns its place: automating manual workflows, adding intelligence to existing products, and building AI-enabled tooling that measurably reduces operational load.",
    features: [
      "Workflow & process automation",
      "LLM-integrated product features",
      "Internal tooling for ops efficiency",
      "Applied, not experimental — shipped to production",
    ],
  },
  {
    slug: "product-engineering",
    num: "06",
    title: "Product Engineering",
    shortCopy:
      "Product-thinking-led engineering for teams building something new — informed by building our own products.",
    longCopy:
      "Because we build and operate our own SaaS products, we bring product judgment, not just implementation — helping partners make the build decisions that matter before writing code.",
    features: [
      "Product strategy & scoping",
      "Architecture decisions made with product context",
      "Iterative delivery, not big-bang releases",
      "Built by a team that ships its own products",
    ],
  },
  {
    slug: "api-system-integration",
    num: "07",
    title: "API & System Integration",
    shortCopy:
      "Connecting the systems you already run — payments, ERPs, third-party platforms — into one coherent stack.",
    longCopy:
      "We design and build APIs and integration layers that connect disparate systems — payment gateways, ERPs, CRMs, third-party platforms — into a single reliable source of truth.",
    features: [
      "REST / API design & development",
      "Third-party & legacy system integration",
      "Data pipelines between systems",
      "Documented, maintainable interfaces",
    ],
  },
];

export const whyForgestack = [
  {
    title: "Product-First Engineering",
    copy: "We build and operate our own SaaS products in production. Every client engagement is led by people who carry the operational consequences of their own code, not just delivery deadlines.",
  },
  {
    title: "Long-Term Partnership",
    copy: "We engage as an extension of your team, not a project vendor that disappears after handoff. Architecture decisions are made for the system you'll be running in three years, not just the demo.",
  },
  {
    title: "AI-Enabled Delivery",
    copy: "We use AI-assisted engineering workflows to move faster without cutting corners on architecture, testing, or code ownership — the same standard we hold our own products to.",
  },
];

export const deliveryProcess = [
  { phase: "01", title: "Discovery", copy: "Understanding the problem, constraints, and business context before any technical decision is made." },
  { phase: "02", title: "Strategy", copy: "Defining scope, architecture direction, and delivery plan aligned to your timeline and budget." },
  { phase: "03", title: "Design", copy: "System design and UI/UX work that maps to real workflows, not generic templates." },
  { phase: "04", title: "Development", copy: "Iterative engineering with regular checkpoints, built on production-grade architecture from day one." },
  { phase: "05", title: "QA", copy: "Structured testing across functionality, performance, and edge cases before anything ships." },
  { phase: "06", title: "Deployment", copy: "Production rollout with monitoring and rollback plans in place, not a one-way door." },
  { phase: "07", title: "Support", copy: "Ongoing maintenance, monitoring, and iteration — we stay engaged after launch." },
] as const;

export const industries = [
  { title: "Manufacturing", copy: "Operational and inventory systems built for shop-floor realities." },
  { title: "Logistics", copy: "Tracking, dispatch, and expense platforms for distributed field operations." },
  { title: "Healthcare", copy: "Reliable, access-controlled systems where data integrity is critical." },
  { title: "SaaS", copy: "Product engineering for teams building and scaling their own platforms." },
  { title: "Retail", copy: "Point-of-sale, inventory, and multi-location management systems." },
  { title: "Business Services", copy: "Internal tooling and automation that removes manual operational overhead." },
];

export const techStack = [
  "Next.js",
  "React",
  "Node.js",
  "TypeScript",
  "PostgreSQL",
  "Flutter",
  "Docker",
  "AWS",
  "Vercel",
];

// NOTE: pulled from existing product areas — replace with public-facing case
// study copy if any of these are under NDA or you want different framing.
export const caseStudies = [
  {
    title: "Fuel OS — Fuel Station Management SaaS",
    tag: "Product · Node.js, PostgreSQL, Flutter",
    copy: "A multi-tenant, offline-first POS and management platform for fuel retail — digital-twin tank tracking, offline-first field operations, and hard-enforced B2B credit controls.",
  },
  {
    title: "ForgeOS — Internal Operations Dashboard",
    tag: "Internal Product · Next.js",
    copy: "A multi-module internal operations platform used to run day-to-day business operations across the company.",
  },
  {
    title: "Project Ledger — Expense & Revenue Tracking",
    tag: "Client Partnership · Web, Desktop, Mobile",
    copy: "A cross-platform expense and revenue tracking SaaS built for a logistics client, spanning web, desktop, and mobile.",
  },
];

export const engagementModels = [
  {
    title: "Fixed Price",
    copy: "Defined scope, defined budget, defined timeline. Best fit for well-specified projects with a clear deliverable.",
  },
  {
    title: "Dedicated Team",
    copy: "An embedded team working as an extension of yours, billed on an ongoing basis. Best fit for evolving roadmaps and long-term product work.",
  },
  {
    title: "Product Partnership",
    copy: "We take on product-level ownership alongside your team — architecture, roadmap input, and delivery — for ventures we're genuinely invested in.",
  },
];

// Sourced from ForgeStack_Labs_SEO_FAQs_Service_Page.docx — real, approved copy.
// relatedSlug (optional) maps a question's topic to its matching service in
// `services` above, so /services can surface an internal link — see the
// "Related Services" strip in ServicesPageClient.tsx.
export const servicesAnswers: { question: string; answer: string; relatedSlug?: string | string[]; relatedFaq?: string }[] = [
  {
    question: "What custom software development services does ForgeStack Labs provide?",
    relatedFaq: "Why should I choose a product engineering company instead of a traditional software agency?",
    answer:
      "ForgeStack Labs designs, develops, and supports custom software tailored to unique business requirements. Our capabilities include enterprise software, SaaS platforms, AI-powered applications, web applications, mobile applications, API development, workflow automation, and system integration. Rather than offering one-size-fits-all solutions, we engineer software that aligns with business goals, scales with growth, and integrates seamlessly with existing operations.",
    relatedSlug: "custom-software-development",
  },
  {
    question: "Why should I choose a product engineering company instead of a traditional software agency?",
    relatedFaq: "Why choose ForgeStack Labs for enterprise software development?",
    answer:
      "A product engineering company focuses on long-term product success rather than only project delivery. At ForgeStack Labs, we apply product thinking, user-centric design, scalable architecture, and continuous improvement practices to every engagement. This approach helps businesses build software that remains valuable as requirements evolve.",
    relatedSlug: "product-engineering",
  },
  {
    question: "Does ForgeStack Labs build both its own products and client solutions?",
    relatedFaq: "Why should I choose a product engineering company instead of a traditional software agency?",
    answer:
      "Yes. We build proprietary software products while partnering with organizations to develop custom software. Our experience building internal products helps us apply proven engineering standards, modern architecture, and product management practices to client engagements.",
  },
  {
    question: "Which industries does ForgeStack Labs build software for?",
    relatedFaq: "Do you work with international clients?",
    answer:
      "We primarily serve manufacturing, logistics, healthcare, retail, business services, and technology organizations. We also work with businesses undergoing digital transformation or requiring custom internal platforms.",
  },
  {
    question: "Can ForgeStack Labs develop enterprise web and mobile applications?",
    relatedFaq: "Can you develop cross-platform mobile apps for iOS and Android?",
    answer:
      "Yes. We develop secure web applications, cross-platform mobile applications, and cloud-based business systems designed for performance, scalability, and long-term maintainability.",
    relatedSlug: ["web-application-development", "mobile-app-development"],
  },
  {
    question: "Can you modernize legacy software and existing business systems?",
    relatedFaq: "Can you take over and improve software built by a previous team?",
    answer:
      "Yes. We modernize legacy applications by improving architecture, migrating to modern technology stacks, integrating APIs, enhancing security, and improving user experience while minimizing disruption.",
    relatedSlug: "enterprise-software",
  },
  {
    question: "How do you use AI during software development?",
    relatedFaq: "Do you build AI-powered business applications?",
    answer:
      "We use AI responsibly to accelerate research, prototyping, testing, documentation, and development workflows. Engineering decisions, architecture, security, and quality assurance remain under the supervision of experienced software professionals.",
    relatedSlug: "ai-solutions-automation",
  },
  {
    question: "What technologies does ForgeStack Labs specialize in?",
    relatedFaq: "How do you design software architecture for scale?",
    answer:
      "Our primary technologies include Next.js, React, Node.js, TypeScript, Flutter, PostgreSQL, Docker, cloud infrastructure, REST APIs, and modern SaaS architectures.",
  },
  {
    question: "What is your software development process?",
    relatedFaq: "How do you ensure software quality?",
    answer:
      "Our process includes discovery, business analysis, solution architecture, UX planning, iterative development, quality assurance, deployment, and post-launch support. Clients receive regular updates and milestone reviews throughout the engagement.",
  },
  {
    question: "Do you work with international clients?",
    relatedFaq: "What engagement models do you offer?",
    answer:
      "Yes. ForgeStack Labs partners with organizations globally using structured communication, collaborative planning, secure development practices, and flexible engagement models suited to distributed teams.",
  },
  {
    question: "Who owns the intellectual property after project completion?",
    relatedFaq: "What engagement models do you offer?",
    answer:
      "Unless otherwise agreed in the contract, the client owns the intellectual property for the custom software developed specifically for their project after agreed deliverables and payments are completed.",
  },
  {
    question: "What engagement models do you offer?",
    relatedFaq: "How long does it take to build a custom SaaS platform?",
    answer:
      "We offer fixed-price projects, milestone-based delivery, dedicated engineering teams, and long-term product engineering partnerships depending on project scope and business objectives.",
  },
  {
    question: "How do you ensure software quality?",
    relatedFaq: "What is your software development process?",
    answer:
      "We follow engineering best practices including code reviews, testing, version control, documentation, and continuous quality assurance to deliver reliable, maintainable software.",
  },
  {
    question: "Why choose ForgeStack Labs for enterprise software development?",
    relatedFaq: "What custom software development services does ForgeStack Labs provide?",
    answer:
      "ForgeStack Labs combines product strategy with engineering excellence. Because we actively build our own products, we understand how to create scalable, maintainable, commercially viable software that delivers measurable business value.",
    relatedSlug: "enterprise-software",
  },
  {
    question: "How can I start a project with ForgeStack Labs?",
    relatedFaq: "What engagement models do you offer?",
    answer:
      "Contact us through our website to schedule a discovery call. We'll understand your business goals, recommend an appropriate technical approach, define the scope, and prepare a tailored proposal.",
  },
  {
    question: "Can you integrate ERP, CRM, and third-party APIs with our existing systems?",
    relatedFaq: "Can you build API-first or headless systems for our platform?",
    answer:
      "Yes. We connect your software to the tools your business already runs on — ERP, CRM, payment gateways, analytics, and third-party APIs — so data flows automatically instead of being re-keyed between systems. We handle authentication, rate limits, error handling, and data mapping, and we design integrations to stay stable as those external services change. The result is a connected operating environment where your platforms exchange information reliably and your team stops maintaining manual workarounds.",
    relatedSlug: "api-system-integration",
  },
  {
    question: "Do you build AI-powered business applications?",
    relatedFaq: "How do you use AI during software development?",
    answer:
      "Yes. We build applications that use AI where it delivers measurable value — document processing, intelligent search, forecasting, classification, and workflow automation. Rather than adding AI for its own sake, we start from the business outcome, then select the right approach and keep engineering, security, and quality under experienced human supervision. The result is software that automates real work while remaining reliable, explainable, and maintainable.",
    relatedSlug: "ai-solutions-automation",
  },
  {
    question: "How long does it take to build a custom SaaS platform?",
    relatedFaq: "What is your software development process?",
    answer:
      "It depends on scope, but most SaaS platforms move from discovery to a usable first release in a few months, with functionality expanding in iterations after that. We prioritize a focused initial version that solves the core problem, then build outward based on real usage. Throughout, you receive milestone reviews and working software rather than long silent phases — so timelines stay predictable and you see progress continuously.",
    relatedSlug: ["product-engineering", "custom-software-development"],
  },
  {
    question: "Can you develop cross-platform mobile apps for iOS and Android?",
    relatedFaq: "Is UI/UX design included in your development process?",
    answer:
      "Yes. We build cross-platform mobile applications that run on both iOS and Android from a single, maintainable codebase, which reduces cost and keeps features consistent across devices. Our mobile work covers offline-first behavior, secure data handling, performance, and app-store deployment. Whether it's a customer-facing app or an internal field tool, we design for real-world conditions like poor connectivity and long-term maintainability.",
    relatedSlug: "mobile-app-development",
  },
  {
    question: "Can you build custom dashboards and internal operational tools?",
    relatedFaq: "How do you design software architecture for scale?",
    answer:
      "Yes. We build internal dashboards and operational tools that give teams a clear, real-time view of the metrics and workflows that matter to them. Instead of forcing your operations into off-the-shelf software, we model the tool around how your business actually runs — roles, permissions, data sources, and daily tasks. The outcome is faster decisions, less manual reporting, and a single place your team can trust for operational visibility.",
    relatedSlug: "custom-software-development",
  },
  {
    question: "How do you design software architecture for scale?",
    relatedFaq: "Do you handle cloud infrastructure, deployment, and DevOps?",
    answer:
      "We design architecture around how your system will grow, not just how it launches. That means clear service boundaries, sensible data models, caching and queuing where they matter, and infrastructure that scales with demand. We make deliberate trade-offs early — between speed, cost, and complexity — so the system stays maintainable as usage increases. The goal is software that handles growth predictably instead of requiring a costly rebuild later.",
    relatedSlug: ["enterprise-software", "product-engineering"],
  },
  {
    question: "Do you handle cloud infrastructure, deployment, and DevOps?",
    relatedFaq: "How do you ensure software quality?",
    answer:
      "Yes. We set up and manage the cloud infrastructure your software runs on — deployment pipelines, environments, monitoring, backups, and security configuration. Automated CI/CD means changes ship reliably and repeatably, and monitoring means issues are caught early. Whether you're launching a new platform or stabilizing an existing one, we make deployment a dependable, low-risk part of the process rather than a manual scramble.",
    relatedSlug: "enterprise-software",
  },
  {
    question: "Is UI/UX design included in your development process?",
    relatedFaq: "What is your software development process?",
    answer:
      "Yes. User experience is part of engineering, not a separate afterthought. We design interfaces around the people who actually use the software — their goals, workflows, and constraints — so the product is intuitive and reduces training overhead. Good UX also protects your investment: software people find easy to use gets adopted, while poorly designed tools get abandoned regardless of how capable they are underneath.",
    relatedSlug: "product-engineering",
  },
  {
    question: "Can you build API-first or headless systems for our platform?",
    relatedFaq: "Can you integrate ERP, CRM, and third-party APIs with our existing systems?",
    answer:
      "Yes. We build API-first and headless systems where a well-designed backend exposes clean, documented APIs that any front-end, mobile app, or partner system can consume. This decouples your data and business logic from any single interface, making it easier to add new channels later, integrate partners, and evolve the product without rebuilding the core. It's an architecture that keeps your platform flexible as requirements grow.",
    relatedSlug: "api-system-integration",
  },
  {
    question: "Can you take over and improve software built by a previous team?",
    relatedFaq: "Can you modernize legacy software and existing business systems?",
    answer:
      "Yes. We regularly take over existing codebases — auditing the architecture, stabilizing critical issues, documenting how the system works, and then improving it incrementally. We start by understanding what's there before changing anything, so we protect what works and reduce risk. Whether the previous team is unavailable or the project stalled, we can restore momentum and bring the software up to a maintainable, reliable standard.",
    relatedSlug: ["custom-software-development", "enterprise-software"],
  },
  {
    question: "Custom software vs. off-the-shelf software — which is right for my business?",
    answer:
      "Off-the-shelf software is faster to adopt and cheaper upfront, but you adapt your operations to its limits and share the same capabilities as competitors. Custom software costs more initially but is built around your exact workflows, integrates with your existing systems, and scales as you grow — with no per-seat licensing or vendor lock-in. The right choice depends on how central the process is to your business: commodity tasks suit off-the-shelf tools, while your core differentiators are usually worth building custom. We help you make that call honestly, not sell you a build you don't need.",
    relatedSlug: "custom-software-development",
    relatedFaq: "What custom software development services does ForgeStack Labs provide?",
  },
  {
    question: "SaaS product vs. a custom internal platform — what's the difference?",
    answer:
      "A SaaS product is built to be sold to many customers, with multi-tenancy, subscriptions, and self-service onboarding. A custom internal platform is built for one organization's operations, optimized for your specific teams and processes rather than a broad market. The engineering differs: SaaS prioritizes scalability, billing, and tenant isolation; internal platforms prioritize deep workflow fit and integration. We build both — and help you decide which model matches your goal, whether that's launching a product or streamlining operations.",
    relatedSlug: "product-engineering",
    relatedFaq: "How long does it take to build a custom SaaS platform?",
  },
  {
    question: "Should we hire an in-house team or partner with an engineering company?",
    answer:
      "An in-house team gives you full-time ownership but takes months to recruit and carries fixed overhead. An engineering partner like ForgeStack Labs gives you an experienced team immediately, with proven processes and no hiring risk — useful for launching faster or filling capability gaps. Many companies combine both: a partner builds and stabilizes the product, then hands off to an in-house team. We structure engagements to support that transition rather than lock you in.",
    relatedSlug: "product-engineering",
    relatedFaq: "What engagement models do you offer?",
  },
];