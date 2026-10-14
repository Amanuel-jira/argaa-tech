import { useEffect, useState } from "react";
import { api } from "../api.js";

const BACKEND_ORIGIN = (
  import.meta.env.VITE_API_URL || "http://localhost:4000/api"
).replace(/\/api$/, "");
function resolveImage(url) {
  if (!url) return null;
  return url.startsWith("http") ? url : `${BACKEND_ORIGIN}${url}`;
}

export default function Work() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [start, setStart] = useState(0);
  const [visible, setVisible] = useState(3);

  useEffect(() => {
    api
      .getProjects()
      .then(setProjects)
      .catch(() => setError("Could not load projects right now."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    function updateVisible() {
      if (window.innerWidth < 700) setVisible(1);
      else if (window.innerWidth < 1050) setVisible(2);
      else setVisible(3);
    }
    updateVisible();
    window.addEventListener("resize", updateVisible);
    return () => window.removeEventListener("resize", updateVisible);
  }, []);

  const maxStart = Math.max(0, projects.length - visible);

  function goTo(i) {
    setStart(Math.max(0, Math.min(i, maxStart)));
  }

  return (
    <section
      style={{
        background: "#ffffff",
        paddingTop: 90,
        paddingBottom: 90,
        borderBottom: "1px solid #e5e2db",
      }}
    >
      <div className="wrap" style={{ textAlign: "center", marginBottom: 50 }}>
        <h2 className="section-title display" style={{ color: "#171522" }}>
          Portfolio
        </h2>
        <p
          style={{
            color: "#6b6f7d",
            marginTop: 14,
            maxWidth: 480,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          A few of the products we've helped bring to life, real clients, real
          launches.
        </p>
      </div>

      <div className="wrap">
        {loading && (
          <p className="mono" style={{ color: "#6b6f7d" }}>
            Loading projects...
          </p>
        )}
        {error && (
          <p className="mono" style={{ color: "#e0554f" }}>
            {error}
          </p>
        )}
        {!loading && !error && projects.length === 0 && (
          <p style={{ color: "#6b6f7d", textAlign: "center" }}>
            No projects added yet, add your first from the admin panel.
          </p>
        )}

        {projects.length > 0 && (
          <>
            <div className="pf-carousel-viewport">
              <div
                className="pf-carousel-track"
                style={{
                  transform: `translateX(calc(-${start} * (var(--pf-card-w) + var(--pf-gap))))`,
                }}
              >
                {projects.map((p) => (
                  <a
                    key={p.id}
                    className="pf-card"
                    href={p.project_url || "#"}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="pf-card-image">
                      {p.image_url ? (
                        <img src={resolveImage(p.image_url)} alt={p.title} />
                      ) : (
                        <div className="pf-card-fallback display">
                          {p.title}
                        </div>
                      )}
                    </div>
                    <div className="pf-card-overlay">
                      {p.title && <span className="pf-badge">{p.title}</span>}
                      {p.category && (
                        <div className="pf-overlay-title display">
                          {p.category}
                        </div>
                      )}
                      {p.description && (
                        <div className="pf-overlay-desc">{p.description}</div>
                      )}
                      {p.project_url && (
                        <span className="pf-badge pf-badge-link">
                          {p.project_url.replace(/^https?:\/\//, "")}
                        </span>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {projects.length > visible && (
              <div className="portfolio-nav">
                <button onClick={() => goTo(start - 1)} aria-label="Previous">
                  ‹
                </button>
                <div className="portfolio-dots">
                  {projects.map((_, i) => (
                    <button
                      key={i}
                      className={`portfolio-dot ${i === start ? "active" : ""}`}
                      onClick={() => goTo(i)}
                      aria-label={`Go to project ${i + 1}`}
                    />
                  ))}
                </div>
                <button onClick={() => goTo(start + 1)} aria-label="Next">
                  ›
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
