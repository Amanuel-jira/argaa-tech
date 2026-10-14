
function Icon({ type }) {
  const common = {
    width: 34,
    height: 34,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#2f6fed",
    strokeWidth: 1.6,
  };

  switch (type) {
    case "web":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="14" rx="1.5" />
          <path d="M3 8h18" />
          <circle cx="6" cy="6" r="0.6" fill="#2f6fed" />
        </svg>
      );

    case "app":
      return (
        <svg {...common}>
          <rect x="7" y="2" width="10" height="20" rx="2" />
          <path d="M11 19h2" />
        </svg>
      );

    case "design":
      return (
        <svg {...common}>
          <path d="M12 2l3 6 6 1-4.5 4 1 6L12 16l-5.5 3 1-6L3 9l6-1z" />
        </svg>
      );

    case "backend":
      return (
        <svg {...common}>
          <rect x="4" y="3" width="16" height="6" rx="1.2" />
          <rect x="4" y="15" width="16" height="6" rx="1.2" />
          <circle cx="7.5" cy="6" r="0.6" fill="#2f6fed" />
          <circle cx="7.5" cy="18" r="0.6" fill="#2f6fed" />
        </svg>
      );

    case "ai":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M19.1 4.9l-2.8 2.8M7.7 16.3l-2.8 2.8" />
        </svg>
      );

    case "erp":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18M9 9v12M15 9v12" />
          <path
            d="M6 6h0M12 6h0M18 6h0"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </svg>
      );

    case "crm":
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="3" />
          <path d="M3.5 20c.5-3.3 2.3-5 5.5-5s5 1.7 5.5 5" />
          <circle cx="17" cy="9" r="2.2" />
          <path d="M16 14c2.5.2 4 1.7 4.5 4" />
        </svg>
      );

    case "inventory":
      return (
        <svg {...common}>
          <path d="M4 7l8-4 8 4-8 4-8-4z" />
          <path d="M4 7v10l8 4 8-4V7" />
          <path d="M12 11v10M8 5l8 4" />
        </svg>
      );

    case "ecommerce":
      return (
        <svg {...common}>
          <path d="M3 4h2l2.2 12.2a2 2 0 0 0 2 1.8h8.6a2 2 0 0 0 2-1.6L21 8H6" />
          <circle cx="9" cy="21" r="1" />
          <circle cx="18" cy="21" r="1" />
        </svg>
      );

    case "education":
      return (
        <svg {...common}>
          <path d="M22 10L12 5 2 10l10 5 10-5z" />
          <path d="M6 12v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" />
        </svg>
      );

    case "booking":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="17" rx="2" />
          <path d="M7 2v4M17 2v4M3 9h18" />
          <path d="M8 13h3M8 17h3M14 13h3M14 17h3" />
        </svg>
      );

    case "data":
      return (
        <svg {...common}>
          <rect x="4" y="3" width="6" height="18" rx="1" />
          <rect x="14" y="3" width="6" height="18" rx="1" />
          <path
            d="M7 7h0M7 11h0M7 15h0M17 7h0M17 11h0M17 15h0"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </svg>
      );

    case "automation":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
          <path d="M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" />
        </svg>
      );

    case "support":
      return (
        <svg {...common}>
          <path d="M3 11a9 9 0 0 1 18 0" />
          <path d="M21 12v4a2 2 0 0 1-2 2h-1" />
          <rect x="3" y="11" width="4" height="6" rx="1" />
          <rect x="17" y="11" width="4" height="6" rx="1" />
        </svg>
      );

    case "strategy":
      return (
        <svg {...common}>
          <path d="M4 20V10M12 20V4M20 20v-7" />
        </svg>
      );

    default:
      return null;
  }
}

const SERVICES = [
  {
    icon: "web",
    t: "AI Powered Web Development",
    d: "Marketing sites, dashboards, and web platforms built fast, responsive, and easy to extend from landing page to full application.",
  },
  {
    icon: "app",
    t: "iOS & Android App Development",
    d: "Native-feel iOS and Android apps from a single codebase, connected to real backends and ready for the app stores.",
  },
  {
    icon: "design",
    t: "Product Design",
    d: "Interface design and UX strategy grounded in how people actually use software, from wireframes to production-ready UI.",
  },
  {
    icon: "backend",
    t: "Backend & APIs",
    d: "Databases, authentication, integrations, and APIs that power the product without becoming a maintenance headache.",
  },
  {
    icon: "ai",
    t: "AI Features",
    d: "AI chatbots, document-aware assistants, automation, and intelligent features built into your products and business workflows.",
  },
  {
    icon: "erp",
    t: "ERP & Business Management Systems",
    d: "Custom systems that connect sales, inventory, purchasing, accounting, employees, customers, and daily operations in one platform.",
  },
  {
    icon: "crm",
    t: "CRM Systems",
    d: "Customer management platforms that help businesses organize leads, contacts, sales pipelines, communication, and customer relationships.",
  },
  {
    icon: "inventory",
    t: "Inventory & POS Systems",
    d: "Custom inventory and point-of-sale systems for tracking products, sales, stock levels, suppliers, and business performance.",
  },
  {
    icon: "ecommerce",
    t: "E-Commerce Platforms",
    d: "Comprehensive online store builds tailored to your business, offering seamless shopping, payments, order management, and scalable checkout.",
  },
  {
    icon: "education",
    t: "School & Learning Management Systems",
    d: "Custom platforms for managing students, teachers, courses, attendance, grades, assignments, payments, and learning content in one place.",
  },
  {
    icon: "booking",
    t: "Booking & Appointment Systems",
    d: "Online booking platforms that let customers schedule appointments while businesses manage availability, services, staff, and bookings.",
  },
  {
    icon: "data",
    t: "Data & Infrastructure",
    d: "Efficient, secure infrastructure optimized for scalability, performance, and the growing data needs of your business.",
  },
  {
    icon: "automation",
    t: "Business Automation",
    d: "Automate repetitive tasks, notifications, approvals, reports, and workflows to save time and reduce manual work.",
  },
  {
    icon: "support",
    t: "Support & Maintenance",
    d: "Ongoing fixes, monitoring, security updates, and improvements after launch, so you are never left alone with a codebase.",
  },
  {
    icon: "strategy",
    t: "Digital Strategy Consulting",
    d: "Guidance on technology, software architecture, AI, and digital transformation to help your business reach its goals with confidence.",
  },
];

export default function Services() {
  return (
    <section
      style={{
        background: "#ffffff",
        paddingTop: 90,
        paddingBottom: 90,
        borderBottom: "1px solid #e5e2db",
      }}
    >
      <div
        className="wrap"
        style={{
          textAlign: "center",
          marginBottom: 50,
        }}
      >
        <h2
          className="section-title display"
          style={{ color: "#171522" }}
        >
          Services
        </h2>

        <p
          style={{
            color: "#6b6f7d",
            marginTop: 14,
            maxWidth: 520,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          From websites and apps to complete business systems, we build the
          technology your business needs to grow.
        </p>
      </div>

      <div className="wrap svc-grid">
        {SERVICES.map((s) => (
          <div key={s.t} className="svc-card">
            <Icon type={s.icon} />

            <div
              className="display svc-card-title"
              style={{ marginTop: 16 }}
            >
              {s.t}
            </div>

            <div className="svc-card-desc">
              {s.d}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

