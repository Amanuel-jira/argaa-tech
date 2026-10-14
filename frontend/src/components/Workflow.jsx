function StepIcon({ n }) {
  const common = {
    width: 32,
    height: 32,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#4d8bff",
    strokeWidth: 1.6,
  };
  const icons = {
    1: <path d="M6 3h9l3 3v15H6z M15 3v3h3" />,
    2: <path d="M4 20l6-14 4 8 6-11" />,
    3: <path d="M4 4h16v12H4z M8 20h8 M12 16v4" />,
    4: <path d="M14 3l7 7-9 9-7 1 1-7z" />,
    5: (
      <circle cx="11" cy="11" r="7">
        <animate />
      </circle>
    ),
    6: <path d="M6 19a4 4 0 010-8 5 5 0 019.5-2A4.5 4.5 0 0118 19H6z" />,
    7: (
      <path d="M17 2l4 4-4 4M7 22l-4-4 4-4M3 6h13a4 4 0 014 4M21 18H8a4 4 0 01-4-4" />
    ),
    8: <path d="M17 3l4 4-11 11H6v-4z" />,
  };
  return (
    <svg {...common}>
      {icons[n]}
      {n === 5 && <path d="M11 8v3l2 2" />}
    </svg>
  );
}


const STEPS = [
  {
    t: "Understand Your Business",
    d: "We learn about your business, goals, challenges, customers, and the way your team works so we can build the right solution.",
  },
  {
    t: "Plan the Solution",
    d: "We define the features, technology, timeline, and project roadmap, turning your ideas into a clear plan before development begins.",
  },
  {
    t: "Design the Experience",
    d: "We create intuitive UX/UI designs and interactive prototypes so you can see and experience how the product will work before it is built.",
  },
  {
    t: "Build the Product",
    d: "We develop your website, app, AI solution, or business system with clean, scalable code and a strong foundation for future growth.",
  },
  {
    t: "Test & Refine",
    d: "We thoroughly test the product across features, devices, and real-world scenarios, fixing issues and refining the experience before launch.",
  },
  {
    t: "Launch & Deploy",
    d: "We deploy your product to the live environment, configure the infrastructure, and make sure everything is running smoothly and securely.",
  },
  {
    t: "Support & Improve",
    d: "After launch, we provide ongoing maintenance, security updates, improvements, and technical support as your business continues to grow.",
  },
  {
    t: "Train & Handover",
    d: "We guide your team through the system, provide the necessary documentation, and make sure you are confident managing your new product.",
  },
];



export default function Workflow() {
  return (
    <section
      style={{ background: "#0b1633", paddingTop: 90, paddingBottom: 90 }}
    >
      <div className="wrap" style={{ textAlign: "center", marginBottom: 50 }}>
        <h2 className="section-title display" style={{ color: "#ffffff" }}>
          Workflow
        </h2>
        <p
          style={{
            color: "rgba(255,255,255,0.65)",
            marginTop: 14,
            maxWidth: 480,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          The same eight steps, every time so nothing gets missed and you
          always know what's next.
        </p>
      </div>
      <div className="wrap workflow-grid">
        {STEPS.map((s, i) => (
          <div key={s.t} className="workflow-card">
            <div className="workflow-icon-wrap">
              <StepIcon n={i + 1} />
            </div>
            <div className="display workflow-card-title">
              {i + 1}. {s.t}
            </div>
            <div className="workflow-card-desc">{s.d}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
