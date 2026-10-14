import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const SECTIONS = ["services", "about", "portfolio", "contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();
  const suppressRef = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      if (window.scrollY < 200 && !suppressRef.current) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (location.pathname !== "/") return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (suppressRef.current) return;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-45% 0px -50% 0px",
      },
    );

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);

      if (el) {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  function goHome(e) {
    setMenuOpen(false);

    if (location.pathname === "/") {
      e.preventDefault();

      suppressRef.current = true;
      setActiveSection("");

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      setTimeout(() => {
        suppressRef.current = false;
      }, 900);
    }
  }

  const isHomeActive = location.pathname === "/" && activeSection === "";

  return (
    <header className={`site-nav ${scrolled ? "scrolled" : ""}`}>
      <nav className="wrap">
        {/* LOGO */}
        <NavLink to="/" className="logo logo-img-wrap" onClick={goHome}>
          <img src="/logo.png" alt="ARGAA" className="logo-img" />
        </NavLink>

        {/* DESKTOP NAVIGATION */}
        <div className="nav-right-group">
          <div className="navlinks">
            <a
              href="/"
              onClick={goHome}
              className={isHomeActive ? "active" : ""}
            >
              Home
            </a>

            {SECTIONS.map((id) => (
              <a
                key={id}
                href={`/#${id}`}
                className={activeSection === id ? "active" : ""}
              >
                {id === "portfolio"
                  ? "Portfolio"
                  : id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            ))}
          </div>

          {/* DESKTOP CALL BUTTON */}
          <a href="tel:+251935535758" className="btn-cta btn-call btn-call-top">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zm0 2c-3.3 0-8 1.5-8 4.5V21h16v-2.5c0-3-4.7-4.5-8-4.5z" />
            </svg>

            <span className="btn-call-text">CALL +251935535758</span>
          </a>
        </div>

        {/* MOBILE HAMBURGER / X */}
        <button
          type="button"
          className={`nav-hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="nav-mobile-panel">
          <a href="/" onClick={goHome} className={isHomeActive ? "active" : ""}>
            Home
          </a>

          {SECTIONS.map((id) => (
            <a
              key={id}
              href={`/#${id}`}
              onClick={() => setMenuOpen(false)}
              className={activeSection === id ? "active" : ""}
            >
              {id === "portfolio"
                ? "Portfolio"
                : id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          ))}

          {/* MOBILE CALL BUTTON */}
          <a
            href="tel:+251935535758"
            className="btn-cta btn-call"
            style={{
              justifyContent: "center",
              marginTop: 10,
            }}
          >
            CALL +251935535758
          </a>
        </div>
      )}
    </header>
  );
}
