"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const SLIDES = [
  {
    image: "/images/school1.webp",
    tag: "Excellence in Education",
    headline: "Shaping",
    accent: "Tomorrow's",
    sub: "Leaders",
    body: "A place where curiosity ignites, potential is nurtured, and every student is empowered to achieve greatness.",
    cta: "Explore Our Programs",
    ctaSecondary: "Virtual Tour",
    color: "#1a4fd6",
    light: "#dce9ff",
  },
  {
    image: "/images/school2.webp",
    tag: "World-Class Facilities",
    headline: "Inspiring",
    accent: "Spaces",
    sub: "to Grow",
    body: "State-of-the-art labs, libraries, and sports complexes built to fuel every dimension of student life.",
    cta: "See Facilities",
    ctaSecondary: "Apply Now",
    color: "#0ea87e",
    light: "#d0f5eb",
  },
  {
    image: "/images/school3.webp",
    tag: "Award-Winning Faculty",
    headline: "Learning",
    accent: "Beyond",
    sub: "Boundaries",
    body: "Dedicated educators who go further — blending passion, innovation, and expertise to ignite every mind.",
    cta: "Meet Our Faculty",
    ctaSecondary: "Book a Visit",
    color: "#c2410c",
    light: "#ffe8db",
  },
  {
    image: "/images/school4.webp",
    tag: "Vibrant Community",
    headline: "Building",
    accent: "Bright",
    sub: "Futures",
    body: "From arts to athletics, from science fairs to cultural festivals — life at our school is rich and full.",
    cta: "Student Life",
    ctaSecondary: "Admissions",
    color: "#7c3aed",
    light: "#ede9fe",
  },
];

const DURATION = 5500;   // ms per slide
const FADE_MS  = 1100;   // cross-fade duration — long & peaceful

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev]       = useState(null);
  const [transitioning, setTransitioning] = useState(false);
  const [progress, setProgress]           = useState(0);

  const timerRef = useRef(null);
  const rafRef   = useRef(null);
  const startRef = useRef(null);

  /* ─── progress ticker ─── */
  const startProgress = () => {
    stopProgress();
    startRef.current = performance.now();
    const tick = (now) => {
      const p = Math.min((now - startRef.current) / DURATION, 1);
      setProgress(p);
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  const stopProgress = () => {
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
    setProgress(0);
    startRef.current = null;
  };

  /* ─── auto-advance ─── */
  useEffect(() => {
    if (transitioning) { stopProgress(); return; }
    startProgress();
    timerRef.current = setTimeout(() => goTo((current + 1) % SLIDES.length), DURATION);
    return () => { clearTimeout(timerRef.current); stopProgress(); };
  }, [current, transitioning]);

  /* ─── navigation ─── */
  const goTo = (idx) => {
    if (transitioning || idx === current) return;
    clearTimeout(timerRef.current);
    stopProgress();
    setPrev(current);
    setTransitioning(true);
    setCurrent(idx);
    setTimeout(() => { setPrev(null); setTransitioning(false); }, FADE_MS);
  };

  const next     = () => goTo((current + 1) % SLIDES.length);
  const prevSlide = () => goTo((current - 1 + SLIDES.length) % SLIDES.length);

  const slide = SLIDES[current];

  return (
    <section
      className="relative w-full overflow-hidden bg-[#08090a]"
      style={{ height: "100svh", minHeight: 560 }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500&display=swap');

        :root {
          --slide-color: ${slide.color};
          --slide-light: ${slide.light};
          --fade: ${FADE_MS}ms;
          --dur:  ${DURATION}ms;
        }

        .hero-font-display { font-family: 'Playfair Display', serif; }
        .hero-font-body    { font-family: 'DM Sans', sans-serif; }

        /* ══════════════════════════════════════════════
           BACKGROUND  — pure cross-dissolve + gentle drift
           ══════════════════════════════════════════════ */

        /* Incoming slide: fade in while drifting very slightly upward */
        @keyframes bgEnter {
          0%   { opacity: 0; transform: scale(1.04) translateY(6px);  }
          100% { opacity: 1; transform: scale(1.00) translateY(0px);  }
        }
        /* Outgoing slide: fade out while continuing the drift */
        @keyframes bgLeave {
          0%   { opacity: 1; transform: scale(1.00) translateY(0px);  }
          100% { opacity: 0; transform: scale(0.97) translateY(-8px); }
        }
        /* Idle pan on the active slide — calm horizontal drift */
        @keyframes idlePan {
          0%   { object-position: 30% center; }
          100% { object-position: 70% center; }
        }

        .bg-enter {
          animation: bgEnter var(--fade) cubic-bezier(0.45, 0, 0.20, 1.00) forwards;
        }
        .bg-leave {
          animation: bgLeave var(--fade) cubic-bezier(0.45, 0, 0.20, 1.00) forwards;
        }
        .bg-idle img {
          animation: idlePan var(--dur) linear forwards;
        }

        /* ══════════════════════════════════════════════
           CONTENT — staggered dissolve-up (very soft)
           ══════════════════════════════════════════════ */
        @keyframes contentIn {
          0%   { opacity: 0; transform: translateY(22px); filter: blur(4px); }
          60%  {             transform: translateY(0px);  filter: blur(0px); }
          100% { opacity: 1; transform: translateY(0px);  filter: blur(0px); }
        }

        .anim-tag  { animation: contentIn 0.9s cubic-bezier(0.22,1,0.36,1) 0.20s both; }
        .anim-h1a  { animation: contentIn 0.9s cubic-bezier(0.22,1,0.36,1) 0.35s both; }
        .anim-h1b  { animation: contentIn 0.9s cubic-bezier(0.22,1,0.36,1) 0.50s both; }
        .anim-h1c  { animation: contentIn 0.9s cubic-bezier(0.22,1,0.36,1) 0.62s both; }
        .anim-body { animation: contentIn 0.9s cubic-bezier(0.22,1,0.36,1) 0.75s both; }
        .anim-cta  { animation: contentIn 0.9s cubic-bezier(0.22,1,0.36,1) 0.88s both; }

        /* ══════════════════════════════════════════════
           COLOUR-WASH cross-fade between slides
           ══════════════════════════════════════════════ */
        @keyframes washIn  { from { opacity: 0; } to { opacity: 0.22; } }
        @keyframes washOut { from { opacity: 0.22; } to { opacity: 0; } }
        .wash-enter { animation: washIn  var(--fade) ease forwards; }
        .wash-leave { animation: washOut var(--fade) ease forwards; }

        /* ══════════════════════════════════════════════
           MISC UI
           ══════════════════════════════════════════════ */
        @keyframes pillGlow {
          0%,100% { box-shadow: 0 0 0   0   color-mix(in srgb, var(--slide-color) 40%, transparent); }
          50%     { box-shadow: 0 0 18px 4px color-mix(in srgb, var(--slide-color) 40%, transparent); }
        }
        .pill-glow { animation: pillGlow 2.8s ease-in-out infinite; }

        @keyframes shimmer {
          from { background-position:  200% center; }
          to   { background-position: -200% center; }
        }
        .progress-bar {
          background: linear-gradient(90deg, var(--slide-color), var(--slide-light), var(--slide-color));
          background-size: 200% auto;
          animation: shimmer 1.6s linear infinite;
        }

        @keyframes floatBadge {
          0%,100% { transform: translateY(0)    rotate(-2deg); }
          50%     { transform: translateY(-10px) rotate( 2deg); }
        }
        .float-badge { animation: floatBadge 4s ease-in-out infinite; }

        @keyframes scrollBounce {
          0%,100% { transform: translateY(0);  opacity: .7; }
          50%     { transform: translateY(8px); opacity: 1;  }
        }
        .scroll-hint { animation: scrollBounce 1.8s ease-in-out infinite; }

        .dot-active { background: var(--slide-color); transform: scale(1.35); }
        .dot-idle   { background: rgba(255,255,255,.35); }

        .arrow-btn { transition: background .3s, transform .25s; }
        .arrow-btn:hover { background: var(--slide-color) !important; transform: scale(1.08); }
        .arrow-btn:hover svg { stroke: #fff; }

        .cta-primary  { background: var(--slide-color); transition: filter .3s, transform .3s, box-shadow .3s; }
        .cta-primary:hover  { filter: brightness(1.15); transform: translateY(-2px); box-shadow: 0 8px 28px color-mix(in srgb, var(--slide-color) 50%, transparent); }
        .cta-secondary { transition: background .3s, transform .3s; }
        .cta-secondary:hover { background: rgba(255,255,255,.14); transform: translateY(-2px); }

        .thumb-active { outline: 2px solid var(--slide-color); outline-offset: 2px; opacity: 1 !important; }
        .thumb-idle   { opacity: .42; }
        .thumb-idle:hover { opacity: .7 !important; }

        /* smooth colour transition on accent text */
        .accent-text {
          transition: color var(--fade) ease;
        }

        /* Logo animation */
        .logo-fade-in {
          animation: logoFadeIn 0.8s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        @keyframes logoFadeIn {
          0% { opacity: 0; transform: translateY(-10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ════════════════════════════════════════
          LOGO - Top Right (Desktop Only)
          ════════════════════════════════════════ */}
      <div className="absolute top-6 right-6 z-30 hidden md:block">
        <div className="logo-fade-in relative w-32 h-16">
          <Image
            src="/images/logo.png"
            alt="School Logo"
            fill
            className="object-contain"
            priority
            sizes="(max-width: 768px) 0px, 128px"
          />
        </div>
      </div>

      {/* ════════════════════════════════════════
          BACKGROUND LAYERS
          ════════════════════════════════════════ */}
      {SLIDES.map((s, i) => {
        const isActive = i === current;
        const isPrev   = i === prev;
        if (!isActive && !isPrev) return null;

        return (
          <div
            key={i}
            className={`absolute inset-0 ${isActive ? "bg-enter" : "bg-leave"} ${isActive && !transitioning ? "bg-idle" : ""}`}
            style={{ zIndex: isActive ? 2 : 1 }}
          >
            {/* photo */}
            <div className="absolute inset-0">
              <Image
                src={s.image}
                alt={s.headline}
                fill
                priority={i === 0}
                className="object-cover"
                sizes="100vw"
              />
            </div>

            {/* dark gradient */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(110deg, rgba(0,0,0,.82) 0%, rgba(0,0,0,.46) 55%, rgba(0,0,0,.20) 100%)",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to top, rgba(0,0,0,.70) 0%, transparent 48%)",
              }}
            />

            {/* colour wash — each slide carries its own so they cross-fade */}
            <div
              className={`absolute inset-0 ${isActive ? "wash-enter" : "wash-leave"}`}
              style={{
                background: `radial-gradient(ellipse at 80% 40%, ${s.color} 0%, transparent 65%)`,
              }}
            />
          </div>
        );
      })}

      {/* ════════════════════════════════════════
          MAIN CONTENT  — re-keyed so animations replay
          ════════════════════════════════════════ */}
      <div className="relative z-10 flex h-full items-center lg:items-start lg:pt-5 px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32">
        <div className="max-w-2xl w-full" key={current}>

          {/* tag pill */}
          <span
            className="anim-tag pill-glow inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase mb-6 hero-font-body"
            style={{
              background: "color-mix(in srgb, var(--slide-color) 18%, transparent)",
              border: "1px solid color-mix(in srgb, var(--slide-color) 55%, transparent)",
              color: "var(--slide-light)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--slide-color)" }} />
            {slide.tag}
          </span>

          {/* headline - REDUCED SIZES FOR DESKTOP */}
          <h1 className="hero-font-display leading-none text-white">
            <span className="anim-h1a block text-5xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-7xl font-black">
              {slide.headline}
            </span>
            <span
              className="anim-h1b block text-5xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-7xl font-black"
              style={{
                backgroundImage: `linear-gradient(135deg, var(--slide-color), var(--slide-light))`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {slide.accent}
            </span>
            <span className="anim-h1c block text-5xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-7xl font-black">
              {slide.sub}
            </span>
          </h1>

          {/* body */}
          <p className="anim-body hero-font-body mt-5 mb-8 text-sm sm:text-base md:text-lg text-white/70 leading-relaxed max-w-lg">
            {slide.body}
          </p>

          {/* CTAs */}
          <div className="anim-cta flex flex-wrap gap-3">
            <button className="cta-primary hero-font-body inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg">
              {slide.cta}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <button className="cta-secondary hero-font-body inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/8 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm">
              {slide.ctaSecondary}
            </button>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════
          SLIDE COUNTER (right edge)
          ════════════════════════════════════════ */}
      <div className="absolute top-1/2 -translate-y-1/2 right-5 sm:right-8 z-20 flex flex-col items-center gap-3">
        <span className="hero-font-display text-white/80 text-xs font-bold">0{current + 1}</span>
        <div className="w-px h-12 bg-white/20 relative overflow-hidden rounded-full">
          <div
            className="absolute top-0 left-0 w-full bg-white/80 rounded-full transition-none"
            style={{ height: `${progress * 100}%` }}
          />
        </div>
        <span className="hero-font-display text-white/30 text-xs">0{SLIDES.length}</span>
      </div>

      {/* ════════════════════════════════════════
          BOTTOM BAR
          ════════════════════════════════════════ */}
      <div className="absolute bottom-0 left-0 right-0 z-20 px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32 pb-8 pt-4">

        {/* shimmer progress bar */}
        <div className="w-full h-[2px] bg-white/10 rounded-full mb-6 overflow-hidden">
          <div
            className="progress-bar h-full rounded-full"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        <div className="flex items-center justify-between gap-4">

          {/* dot nav */}
          <div className="flex items-center gap-2">
            {SLIDES.map((s, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`rounded-full transition-all duration-500 ${
                  i === current ? "dot-active w-7 h-2" : "dot-idle w-2 h-2 hover:scale-125"
                }`}
              />
            ))}
          </div>

          {/* thumbnail strip */}
          <div className="hidden sm:flex items-center gap-2">
            {SLIDES.map((s, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Slide ${i + 1}`}
                className={`relative overflow-hidden rounded-lg transition-all duration-500 ${
                  i === current ? "thumb-active" : "thumb-idle"
                }`}
                style={{ width: i === current ? 72 : 48, height: 40 }}
              >
                <Image src={s.image} alt={s.headline} fill className="object-cover" sizes="80px" />
              </button>
            ))}
          </div>

          {/* arrow buttons */}
          <div className="flex gap-2">
            <button
              onClick={prevSlide}
              className="arrow-btn flex items-center justify-center rounded-full border border-white/20 bg-white/8 backdrop-blur-sm text-white"
              style={{ width: 44, height: 44 }}
              aria-label="Previous slide"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={next}
              className="arrow-btn flex items-center justify-center rounded-full border border-white/20 bg-white/8 backdrop-blur-sm text-white"
              style={{ width: 44, height: 44 }}
              aria-label="Next slide"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════
          SCROLL HINT
          ════════════════════════════════════════ */}
      <div className="scroll-hint absolute bottom-28 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-1 text-white/40">
        <span className="hero-font-body text-[10px] tracking-widest uppercase">Scroll</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}