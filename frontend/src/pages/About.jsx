export default function About() {
  return (
    <section
      style={{
        background: "#123d38",
        paddingTop: 90,
        paddingBottom: 90,
        borderBottom: "1px solid #0e2f2b",
      }}
    >
      <div className="wrap" style={{ textAlign: "center", marginBottom: 60 }}>
        <p
          className="about-eyebrow-italic"
          style={{ textAlign: "center", color: "#ffffff" }}
        >
          Who we are
        </p>
        <h2
          className="section-title display"
          style={{ color: "#ffffff", textAlign: "center" }}
        >
          About Us
        </h2>
      </div>

      <div className="wrap about-grid-3col">
        <div className="about-hex-outer">
          <div className="about-hex-inner">
            <div className="about-hex-logo">
              {/* <span className="bracket">&lt;</span>HARO
              <span className="bracket">/&gt;</span> */}
              <img src="/logo.png" alt="ARGAA" className="logo-img2" />
            </div>
          </div>
        </div>

        <div className="about-story" style={{ color: "#ffffff" }}>
          <p style={{ marginBottom: 22 }}>
            The name Argaa means "the one who sees" and that's really the whole
            philosophy behind this company. Before we write a single line of
            code, we take the time to actually see what you're trying to build:
            the problem, the people using it, and what success looks like six
            months from now.
          </p>
          <p style={{ marginBottom: 22 }}>
            We're a software development company building websites, mobile apps,
            and custom digital tools for startups and growing businesses across
            Ethiopia and beyond. Good software isn't just functional it should
            feel obvious to use, load fast, and hold up as your business scales.
            That's the standard we build to on every project, no exceptions.
          </p>
          <p>
            We stay involved past launch, too. Planning, design, development,
            integrations, deployment — and then real support afterward, not a
            handoff and a goodbye. If something breaks or your needs change,
            you're talking to the same people who built it, not a ticket queue.
          </p>
        </div>

        <div className="about-info-list">
          <div
            className="about-info-item"
            style={{
              color: "#ffffff",
              borderBottomColor: "rgba(255,255,255,0.2)",
            }}
          >
            <span className="about-info-label" style={{ color: "#ffffff" }}>
              Direct number:
            </span>{" "}
            +251935535758 / +251994130335
          </div>
          <div
            className="about-info-item"
            style={{
              color: "#ffffff",
              borderBottomColor: "rgba(255,255,255,0.2)",
            }}
          >
            <span className="about-info-label" style={{ color: "#ffffff" }}>
              Email:
            </span>{" "}
            amanuel7jira@yahoo.com
          </div>
          <div
            className="about-info-item"
            style={{
              color: "#ffffff",
              borderBottomColor: "rgba(255,255,255,0.2)",
            }}
          >
            <span className="about-info-label" style={{ color: "#ffffff" }}>
              Head office:
            </span>{" "}
            Addis Ababa, Ethiopia
          </div>

          <div
            className="about-info-item"
            style={{
              color: "#ffffff",
              borderBottomColor: "rgba(255,255,255,0.2)",
            }}
          >
            <span className="about-info-label" style={{ color: "#ffffff" }}>
              WhatsApp:
            </span>{" "}
            +251935535758
          </div>

          <div
            className="about-info-item"
            style={{
              color: "#ffffff",
              borderBottomColor: "rgba(255,255,255,0.2)",
            }}
          >
            <span className="about-info-label" style={{ color: "#ffffff" }}>
              Telegram:
            </span>{" "}
            @argaatech
          </div>
        </div>
      </div>
    </section>
  );
}
