import { useEffect, useRef, useState } from "react";

function IndustryIcon({ type }) {
  const common = {
    width: 30,
    height: 30,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#ffffff",
    strokeWidth: 1.6,
  };
  const icons = {
    education: (
      <path d="M22 10L12 5 2 10l10 5 10-5zM6 12v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" />
    ),
    ecommerce: (
      <path d="M6 6h15l-1.5 9h-12z M6 6L5 3H2 M9 20a1 1 0 100-2 1 1 0 000 2zM17 20a1 1 0 100-2 1 1 0 000 2z" />
    ),
    healthcare: (
      <path d="M12 21s-7-4.35-9.5-9A5.5 5.5 0 0112 6a5.5 5.5 0 019.5 6c-2.5 4.65-9.5 9-9.5 9z M12 8v6M9 11h6" />
    ),
    finance: <path d="M12 2v20M8 5h6.5a2.5 2.5 0 010 5H8a2.5 2.5 0 000 5h7" />,
    travel: <path d="M3 11l18-7-7 18-2-8-8-2z" />,
    enterprise: <path d="M3 21h18M6 21V8l6-4 6 4v13M9 21v-6h6v6" />,
    manufacturing: <path d="M2 20h20M4 20V10l4-2v4l4-2v4l4-2v4l4-2v6" />,
    realestate: <path d="M3 10l9-7 9 7M5 9v11h14V9M9 20v-6h6v6" />,
  };
  return <svg {...common}>{icons[type]}</svg>;
}

const INDUSTRIES = [
  {
    icon: "education",
    t: "Education",
    d: "Learning Management Systems, student information systems, virtual classrooms, and e-learning platforms.",
  },
  {
    icon: "ecommerce",
    t: "Retail (E-Commerce)",
    d: "E-commerce platforms, inventory management software, and customer relationship management systems.",
  },
  {
    icon: "healthcare",
    t: "Health Care",
    d: "Electronic Health Record systems, telemedicine platforms, and health data analytics tools.",
  },
  {
    icon: "finance",
    t: "Finance & Banking",
    d: "Mobile banking solutions, payment processing systems, and fraud detection software.",
  },
  {
    icon: "travel",
    t: "Travel & Transportation",
    d: "Booking and reservation systems, ride-sharing platforms, logistics, and supply chain solutions.",
  },
  {
    icon: "enterprise",
    t: "Enterprise Software",
    d: "ERP systems, customer relationship management software, and internal project management tools.",
  },
  {
    icon: "manufacturing",
    t: "Manufacturing & Supply Chain",
    d: "Manufacturing execution systems, quality control software, and warehouse management systems.",
  },
  {
    icon: "realestate",
    t: "Real Estate",
    d: "Property listing platforms, virtual tour integrations, and client management dashboards.",
  },
];

const VISIBLE = 4;
const INTERVAL = 3200;
const ANIM_MS = 650;

export default function Industries() {
  const [offset, setOffset] = useState(0);
  const [shifted, setShifted] = useState(false);
  const [instant, setInstant] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const tick = setInterval(() => {
      setShifted(true);
      timeoutRef.current = setTimeout(() => {
        setInstant(true);
        setOffset((o) => (o + 1) % INDUSTRIES.length);
        setShifted(false);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setInstant(false));
        });
      }, ANIM_MS);
    }, INTERVAL);
    return () => {
      clearInterval(tick);
      clearTimeout(timeoutRef.current);
    };
  }, []);

  const window = Array.from(
    { length: VISIBLE + 1 },
    (_, i) => INDUSTRIES[(offset + i) % INDUSTRIES.length],
  );

  return (
    <section
      style={{ background: "#eaf1ff", paddingTop: 90, paddingBottom: 90 }}
    >
      <div className="wrap" style={{ textAlign: "center", marginBottom: 50 }}>
        <h2 className="section-title display" style={{ color: "#171522" }}>
          Industries
        </h2>
        <p
          style={{
            color: "#5b6478",
            marginTop: 14,
            maxWidth: 480,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Different industries, different problems here's where we've built
          solutions that held up.
        </p>
      </div>
      <div className="wrap">
        <div className="industries-viewport">
          <div
            className="industries-track"
            style={{
              transform: shifted
                ? "translateX(calc(-1 * (var(--ind-card-w) + var(--ind-gap))))"
                : "translateX(0)",
              transition: instant ? "none" : `transform ${ANIM_MS}ms ease`,
            }}
          >
            {window.map((ind, i) => (
              <div key={`${offset}-${i}`} className="industry-card">
                <IndustryIcon type={ind.icon} />
                <div className="display industry-card-title">{ind.t}</div>
                <div className="industry-card-desc">{ind.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
