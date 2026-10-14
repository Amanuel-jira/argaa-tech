
import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

const SLIDES = [
  {
    eyebrow: "Digital Products",
    title: ["We build", "digital products", "that move business forward."],
    desc: "From websites and mobile apps to powerful business systems, we turn ideas and business challenges into reliable digital products.",
    cta: { text: "Start a Project", to: "/#contact" },
    image: "/illustrations/devices.png",
    filterClass: "",
    glow:
      "radial-gradient(circle, rgba(80,140,255,0.38), transparent 70%)",
  },

  {
    eyebrow: "Web & App Development",
    title: ["One idea.", "Built for", "every screen."],
    desc: "Fast, responsive websites and modern mobile apps designed to give your customers a seamless experience wherever they are.",
    cta: { text: "View Our Services", to: "/#services" },
    image: "/illustrations/programming.png",
    filterClass: "",
    glow:
      "radial-gradient(circle, rgba(80,140,255,0.38), transparent 70%)",
  },

  {
    eyebrow: "AI & Automation",
    title: ["Make your", "business", "smarter."],
    desc: "Add AI, intelligent assistants, and automation to your workflows so your team can spend less time on repetitive work and more time growing.",
    cta: { text: "Explore AI Solutions", to: "/#services" },
    image: "/illustrations/robot-head.png",
    filterClass: "",
    glow:
      "radial-gradient(circle, rgba(80,140,255,0.38), transparent 70%)",
  },

  {
    eyebrow: "Business Systems",
    title: ["Everything your", "business needs.", "One connected system."],
    desc: "Custom ERP, CRM, inventory, POS, booking, and management systems built around the way your business actually works.",
    cta: { text: "Build Your System", to: "/#contact" },
    image: "/illustrations/cyborg.png",
    filterClass: "",
    glow:
      "radial-gradient(circle, rgba(80,140,255,0.38), transparent 70%)",
  },
];

const INTERVAL = 5500;

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [textVisible, setTextVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % SLIDES.length);
    }, INTERVAL);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setTextVisible(false);

    const timer = setTimeout(() => {
      setTextVisible(true);
    }, 450);

    return () => clearTimeout(timer);
  }, [index]);

  const slide = SLIDES[index];

  return (
    <section className="hero-slider">
      {/* Progress bar */}
      <div className="hero-slider-progress" key={`progress-${index}`}>
        <span style={{ animationDuration: `${INTERVAL}ms` }} />
      </div>

      {/* Background / illustration */}
      <div key={`bg-${index}`} className="hero-slider-bg">
        <div className="hero-slider-glow" style={{ background: slide.glow }} />

        <img
          src={slide.image}
          alt=""
          className={`hero-graphic ${slide.filterClass}`}
        />
      </div>

      {/* Hero content */}
      <div className="wrap hero-slider-inner">
        <div
          key={`text-${index}`}
          className={`hero-slider-text ${textVisible ? "text-in" : "text-out"}`}
        >
          <h1 className="page-title display">
            {slide.title.map((line, i) => (
              <span key={i} style={{ display: "block" }}>
                {line}
              </span>
            ))}
          </h1>

          <p className="page-sub">{slide.desc}</p>

          <div
            style={{
              display: "flex",
              gap: 16,
              marginTop: 36,
              flexWrap: "wrap",
            }}
          >
            <a href={slide.cta.to} className="btn-primary">
              {slide.cta.text} →
            </a>

            {/* <Link to="/#services" className="btn-secondary">
              Explore Services
            </Link> */}
          </div>
        </div>
      </div>

      {/* Slide controls */}
      <div className="hero-slider-dots">
        {SLIDES.map((slideItem, i) => (
          <button
            key={i}
            className={`hero-dot ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
            aria-label={`Go to ${slideItem.eyebrow}`}
            aria-current={i === index ? "true" : undefined}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-indicator">
        <span className="hero-scroll-mouse" />
        <span className="mono">SCROLL DOWN</span>
      </div>
    </section>
  );
}

