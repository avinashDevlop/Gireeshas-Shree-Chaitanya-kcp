'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

/* ─── Google Fonts + keyframes injected once ──────────────────────────────── */
const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=DM+Sans:wght@400;500;600;700&display=swap');

    .font-display { font-family: 'Cormorant Garamond', Georgia, serif; }
    .font-body    { font-family: 'DM Sans', sans-serif; }

    @keyframes float-slow {
      0%,100% { transform: translateY(0px)  rotate(0deg);  }
      50%      { transform: translateY(-18px) rotate(3deg); }
    }
    @keyframes float-med {
      0%,100% { transform: translateY(0px)  rotate(0deg);  }
      50%      { transform: translateY(-10px) rotate(-2deg);}
    }
    @keyframes shimmer {
      0%   { background-position: -200% center; }
      100% { background-position:  200% center; }
    }
    @keyframes glow-pulse {
      0%,100% { opacity:.5; transform:scale(1);    }
      50%      { opacity:.9; transform:scale(1.08); }
    }
    @keyframes slide-right {
      from { opacity:0; transform:translateX(-40px); }
      to   { opacity:1; transform:translateX(0);     }
    }
    @keyframes slide-left {
      from { opacity:0; transform:translateX(40px); }
      to   { opacity:1; transform:translateX(0);    }
    }
    @keyframes slide-up {
      from { opacity:0; transform:translateY(40px); }
      to   { opacity:1; transform:translateY(0);    }
    }
    @keyframes spin-slow { to { transform:rotate(360deg); } }
    @keyframes fade-up {
      from { opacity:0; transform:translateY(30px); }
      to   { opacity:1; transform:translateY(0);    }
    }

    .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
    .animate-float-med  { animation: float-med  4s ease-in-out infinite; }
    .animate-glow-pulse { animation: glow-pulse 3s ease-in-out infinite; }
    .animate-spin-slow  { animation: spin-slow 24s linear infinite; }

    .shimmer-text {
      background: linear-gradient(90deg,#f59e0b,#fcd34d,#f97316,#fcd34d,#f59e0b);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: shimmer 4s linear infinite;
    }

    .card-glass {
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.10);
      backdrop-filter: blur(12px);
      transition: all 0.35s cubic-bezier(0.34,1.56,0.64,1);
    }
    .card-glass:hover {
      background: rgba(255,255,255,0.10);
      border-color: rgba(251,191,36,0.35);
      transform: translateY(-5px) scale(1.03);
    }

    .stat-white {
      background: rgba(255,255,255,0.97);
      backdrop-filter: blur(20px);
      transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
    }
    .stat-white:hover {
      transform: translateY(-5px) scale(1.05);
      box-shadow: 0 24px 60px rgba(0,0,0,0.22);
    }

    .btn-glow {
      background: linear-gradient(135deg,#f59e0b,#f97316);
      transition: all .3s ease;
      position: relative;
      overflow: hidden;
    }
    .btn-glow:hover {
      transform: translateY(-2px);
      box-shadow: 0 14px 40px rgba(249,115,22,.50);
    }
    .btn-outline {
      border: 2px solid rgba(251,191,36,.45);
      transition: all .3s ease;
    }
    .btn-outline:hover {
      border-color:#fbbf24;
      background:rgba(251,191,36,.12);
      transform: translateY(-2px);
    }

    /* ── Responsive stat cards ── */
    .stat-card-tl {
      position: absolute;
      top: -20px;
      left: -24px;
    }
    .stat-card-tr {
      position: absolute;
      top: -20px;
      right: -24px;
    }
    .stat-card-br {
      position: absolute;
      bottom: -20px;
      right: -24px;
    }
    .ribbon-card {
      position: absolute;
      bottom: -20px;
      left: 16px;
      right: 128px;
    }

    /* Tablet: push stat cards inside image bounds */
    @media (max-width: 1024px) and (min-width: 640px) {
      .stat-card-tl { top: 12px; left: 12px; }
      .stat-card-tr { top: 12px; right: 12px; }
      .stat-card-br { bottom: 72px; right: 12px; }
      .ribbon-card  { bottom: 12px; left: 12px; right: 12px; }
    }

    /* Mobile: hide floating stat cards, show grid below image */
    @media (max-width: 639px) {
      .stat-card-tl,
      .stat-card-tr,
      .stat-card-br,
      .ribbon-card { display: none; }
    }
  `}</style>
)

/* ─── Animated counter ────────────────────────────────────────────────────── */
function Counter({ end, suffix = '' }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      let n = 0
      const step = Math.ceil(end / 55)
      const t = setInterval(() => { n = Math.min(n + step, end); setVal(n); if (n >= end) clearInterval(t) }, 22)
      obs.disconnect()
    }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [end])
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>
}

/* ─── Data ────────────────────────────────────────────────────────────────── */
const features = [
  { icon: '🎓', label: 'Academic Excellence', sub: 'Top-ranked curriculum',   grad: 'from-amber-400 to-orange-500'  },
  { icon: '🎨', label: 'Creative Arts',        sub: 'Music, Dance & Visual',  grad: 'from-rose-400  to-pink-600'    },
  { icon: '⚽', label: 'Sports & Athletics',   sub: 'Holistic development',   grad: 'from-emerald-400 to-teal-600'  },
  { icon: '🔬', label: 'STEM Programs',        sub: 'Science & Technology',   grad: 'from-sky-400   to-blue-600'    },
]

const stats = [
  { icon: '🎓', value: 1500, suffix: '+', label: 'Students',    grad: 'from-amber-400 to-orange-500' },
  { icon: '👩‍🏫', value: 80,   suffix: '+', label: 'Expert Staff', grad: 'from-sky-400   to-blue-600'   },
  { icon: '🏆', value: 30,   suffix: '+', label: 'Years Legacy', grad: 'from-emerald-400 to-teal-500' },
  { icon: '⭐', value: 98,   suffix: '%', label: 'Pass Rate',    grad: 'from-rose-400  to-pink-600'   },
]

/* ─── Mobile Stat Row (shown only on xs screens) ──────────────────────────── */
function MobileStatRow() {
  return (
    <div className="grid grid-cols-2 gap-3 mt-6 sm:hidden">
      {[
        { icon: '🏆', value: 30,   suffix: '+', label: 'Years Legacy', grad: 'from-amber-400 to-orange-500' },
        { icon: '🎓', value: 1500, suffix: '+', label: 'Students',     grad: 'from-sky-400   to-blue-600'   },
        { icon: '⭐', value: 98,   suffix: '%', label: 'Pass Rate',    grad: 'from-emerald-400 to-teal-600' },
        { icon: '👩‍🏫', value: 80,   suffix: '+', label: 'Expert Staff', grad: 'from-rose-400  to-pink-600'   },
      ].map(({ icon, value, suffix, label, grad }) => (
        <div
          key={label}
          className="stat-white rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3"
          style={{ border: '1px solid rgba(0,0,0,.06)' }}
        >
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${grad} flex items-center justify-center text-lg shadow shrink-0`}>
            {icon}
          </div>
          <div>
            <p className="text-xl font-extrabold text-slate-800 font-body leading-none">
              <Counter end={value} suffix={suffix} />
            </p>
            <p className="text-[10px] text-slate-500 font-semibold tracking-widest uppercase mt-0.5">{label}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ─── Component ───────────────────────────────────────────────────────────── */
export default function WelcomeSection() {
  const [ready, setReady] = useState(false)
  useEffect(() => { const t = setTimeout(() => setReady(true), 100); return () => clearTimeout(t) }, [])

  return (
    <>
      <FontLoader />

      {/* ════ HERO ══════════════════════════════════════════════════════════ */}
      <section
        className="font-body relative overflow-hidden min-h-screen flex items-center"
        style={{ background: 'linear-gradient(135deg,#060d1f 0%,#0c1e45 35%,#0e3060 65%,#091a38 100%)' }}
      >
        {/* ── ambient orbs ── */}
        <div className="absolute -top-32 -left-32 w-64 h-64 sm:w-[520px] sm:h-[520px] rounded-full pointer-events-none animate-glow-pulse"
          style={{ background: 'radial-gradient(circle,rgba(251,191,36,.20) 0%,transparent 70%)' }} />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 sm:w-[600px] sm:h-[600px] rounded-full pointer-events-none animate-glow-pulse"
          style={{ background: 'radial-gradient(circle,rgba(56,189,248,.14) 0%,transparent 70%)', animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] sm:w-[800px] sm:h-[400px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse,rgba(52,211,153,.06) 0%,transparent 70%)' }} />

        {/* ── dot grid ── */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }} />

        {/* ── gold top accent ── */}
        <div className="absolute top-0 left-0 w-full h-[3px]"
          style={{ background: 'linear-gradient(90deg,transparent 0%,#f59e0b 20%,#fcd34d 50%,#f97316 80%,transparent 100%)' }} />

        {/* ── floating shapes ── */}
        <div className="absolute top-20 right-[10%] w-10 h-10 sm:w-16 sm:h-16 rounded-2xl border border-amber-400/20 rotate-12 animate-float-slow pointer-events-none" />
        <div className="absolute bottom-28 left-[5%]  w-7 h-7 sm:w-10 sm:h-10 rounded-xl border border-sky-400/25 -rotate-12 animate-float-med pointer-events-none" />
        <div className="absolute top-1/3 left-[4%]   w-4  h-4  rounded-full bg-amber-400/20 animate-float-med pointer-events-none" style={{ animationDelay: '1s' }} />
        <div className="absolute top-2/3 right-[6%]  w-5  h-5  rounded-full border border-emerald-400/20 animate-float-slow pointer-events-none" style={{ animationDelay: '2s' }} />

        {/* ════ GRID ══════════════════════════════════════════════════════════ */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-16 sm:py-20 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">

            {/* ── LEFT CONTENT ── */}
            <div
              className="space-y-6 sm:space-y-8"
              style={{
                animation: ready
                  ? 'slide-right 0.9s cubic-bezier(0.16,1,0.3,1) both'
                  : 'none',
                opacity: 0,
              }}
            >
              {/* Badge */}
              <div
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full"
                style={{ background: 'rgba(251,191,36,.10)', border: '1px solid rgba(251,191,36,.28)' }}
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-70" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400" />
                </span>
                <span className="text-amber-300 text-[10px] sm:text-xs font-semibold tracking-[.15em] uppercase">
                  Kancharapalem · Visakhapatnam
                </span>
              </div>

              {/* Heading */}
              <div className="space-y-2">
                <p className="text-sky-400 font-semibold text-xs sm:text-sm tracking-[.2em] uppercase">Welcome to</p>
                <h1
                  className="font-display text-white leading-[1.1]"
                  style={{ fontSize: 'clamp(1.75rem,5vw,3.3rem)' }}
                >
                  Gireeshas Shree{' '}
                  <span className="shimmer-text font-display" style={{ fontSize: 'inherit' }}>
                    Chaitanya
                  </span>
                  <br />
                  <span style={{ fontStyle: 'italic', color: 'rgba(255,255,255,.80)', fontSize: '0.72em' }}>
                    English Medium School
                  </span>
                </h1>
              </div>

              {/* Ruler */}
              <div className="flex items-center gap-2">
                <div className="h-[3px] w-14 rounded-full" style={{ background: 'linear-gradient(90deg,#f59e0b,#f97316)' }} />
                <div className="h-[3px] w-8  rounded-full bg-sky-400/50" />
                <div className="h-[3px] w-4  rounded-full bg-emerald-400/40" />
              </div>

              {/* Copy */}
              <p className="text-slate-300 text-sm sm:text-[1.05rem] leading-[1.9] max-w-lg">
                A leading institution embracing an{' '}
                <span className="text-amber-300 font-semibold">innovative & progressive</span>{' '}
                tradition — committed to academic excellence, equity, diversity, and
                nurturing every child's unique potential.
              </p>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-lg">
                Exemplary curricular & co-curricular programs delivered by educators who are true
                professionals, shaping confident, compassionate leaders for tomorrow.
              </p>

              {/* Feature cards */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {features.map(({ icon, label, sub, grad }) => (
                  <div key={label} className="card-glass rounded-xl sm:rounded-2xl px-3 py-3 sm:px-4 sm:py-3.5 flex items-center gap-2 sm:gap-3 cursor-pointer">
                    <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-gradient-to-br ${grad} flex items-center justify-center text-lg sm:text-xl shrink-0 shadow-lg`}>
                      {icon}
                    </div>
                    <div>
                      <p className="text-white font-semibold text-xs sm:text-sm leading-tight">{label}</p>
                      <p className="text-slate-400 text-[10px] sm:text-xs mt-0.5">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex flex-col xs:flex-row flex-wrap gap-3 sm:gap-4 pt-1">
                <button className="btn-glow text-white font-bold text-xs sm:text-sm tracking-widest uppercase px-6 sm:px-8 py-3.5 sm:py-4 rounded-full shadow-xl w-full xs:w-auto">
                  Explore School →
                </button>
                <button className="btn-outline text-amber-300 font-bold text-xs sm:text-sm tracking-widest uppercase px-6 sm:px-8 py-3.5 sm:py-4 rounded-full w-full xs:w-auto">
                  Apply for Admission
                </button>
              </div>
            </div>

            {/* ── RIGHT IMAGE + STATS ── */}
            <div
              className="relative mt-8 lg:mt-0"
              style={{
                animation: ready
                  ? 'slide-left 0.9s .2s cubic-bezier(0.16,1,0.3,1) both'
                  : 'none',
                opacity: 0,
              }}
            >
              {/* Spinning dashed ring — hidden on small screens to avoid overflow */}
              <div className="hidden sm:block absolute inset-8 rounded-full border border-dashed border-amber-400/12 animate-spin-slow pointer-events-none" />

              {/* Glow behind image */}
              <div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at center,rgba(251,191,36,.18) 0%,transparent 65%)',
                  filter: 'blur(24px)',
                  transform: 'scale(1.1)',
                }}
              />

              {/* ── Image box ── */}
              {/* Extra top/bottom margin on sm so floating cards don't clip viewport */}
              <div className="sm:mt-8 sm:mb-8 lg:mt-0 lg:mb-0">
                <div
                  className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl"
                  style={{ border: '1px solid rgba(255,255,255,.10)', aspectRatio: '4/3' }}
                >
                  <div
                    className="w-full h-full flex flex-col items-center justify-center gap-3"
                    style={{ background: 'linear-gradient(135deg,#1a3a6c 0%,#0f4c8a 50%,#1a5c7a 100%)' }}
                  >
                    <Image src="/images/school4.webp" alt="Students" fill className="object-cover" priority />
                  </div>

                  {/* Bottom fade */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
                    style={{ background: 'linear-gradient(to top,rgba(6,13,31,.75),transparent)' }}
                  />
                </div>

                {/* ── Floating Stat cards (sm+) ── */}
                {/* top-left */}
                <div
                  className="stat-card-tl rounded-2xl px-4 py-3 shadow-2xl hidden sm:flex items-center gap-3 stat-white"
                  style={{ border: '1px solid rgba(0,0,0,.06)', zIndex: 10 }}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-xl sm:text-2xl shadow">🏆</div>
                  <div>
                    <p className="text-xl sm:text-2xl font-extrabold text-slate-800 font-body leading-none">
                      <Counter end={30} suffix="+" />
                    </p>
                    <p className="text-[10px] text-slate-500 font-semibold tracking-widest uppercase mt-0.5">Years Legacy</p>
                  </div>
                </div>

                {/* top-right */}
                <div
                  className="stat-card-tr rounded-2xl px-4 py-3 shadow-2xl hidden sm:flex items-center gap-3 stat-white"
                  style={{ border: '1px solid rgba(0,0,0,.06)', zIndex: 10 }}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-xl sm:text-2xl shadow">🎓</div>
                  <div>
                    <p className="text-xl sm:text-2xl font-extrabold text-slate-800 font-body leading-none">
                      <Counter end={1500} suffix="+" />
                    </p>
                    <p className="text-[10px] text-slate-500 font-semibold tracking-widest uppercase mt-0.5">Students</p>
                  </div>
                </div>

                {/* bottom-right */}
                <div
                  className="stat-card-br rounded-2xl px-4 py-3 shadow-2xl hidden sm:flex items-center gap-3 stat-white"
                  style={{ border: '1px solid rgba(0,0,0,.06)', zIndex: 10 }}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-xl sm:text-2xl shadow">⭐</div>
                  <div>
                    <p className="text-xl sm:text-2xl font-extrabold text-slate-800 font-body leading-none">
                      <Counter end={98} suffix="%" />
                    </p>
                    <p className="text-[10px] text-slate-500 font-semibold tracking-widest uppercase mt-0.5">Pass Rate</p>
                  </div>
                </div>

                {/* Philosophy ribbon */}
                <div
                  className="ribbon-card rounded-2xl px-4 py-3 hidden sm:flex items-center gap-3"
                  style={{
                    background: 'linear-gradient(135deg,rgba(12,30,69,.97),rgba(13,48,96,.97))',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(251,191,36,.28)',
                    zIndex: 10,
                  }}
                >
                  <span className="text-2xl">🕉️</span>
                  <p className="text-white/90 text-xs font-semibold leading-snug">
                    "Nurturing Minds,{' '}
                    <span className="text-amber-300">Shaping Futures"</span>
                  </p>
                </div>
              </div>

              {/* ── Mobile stat grid (xs only) ── */}
              <MobileStatRow />

              {/* ── Mobile philosophy ribbon ── */}
              <div
                className="sm:hidden mt-4 rounded-2xl px-4 py-3 flex items-center gap-3"
                style={{
                  background: 'linear-gradient(135deg,rgba(12,30,69,.97),rgba(13,48,96,.97))',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(251,191,36,.28)',
                }}
              >
                <span className="text-2xl">🕉️</span>
                <p className="text-white/90 text-xs font-semibold leading-snug">
                  "Nurturing Minds,{' '}
                  <span className="text-amber-300">Shaping Futures"</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 w-full pointer-events-none">
          <svg viewBox="0 0 1440 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 70 Q360 10 720 40 Q1080 70 1440 20 L1440 70 Z" fill="rgba(255,255,255,.03)" />
            <path d="M0 70 Q480 20 960 50 Q1200 65 1440 30 L1440 70 Z" fill="rgba(251,191,36,.04)" />
          </svg>
        </div>
      </section>

      {/* ════ STATS BANNER ══════════════════════════════════════════════════ */}
      <section
        className="font-body relative py-8 sm:py-10 px-4 sm:px-6 lg:px-16 overflow-hidden"
        style={{ background: 'linear-gradient(90deg,#d97706 0%,#ea580c 45%,#dc2626 100%)' }}
      >
        {/* shine sweep */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(105deg,transparent 30%,rgba(255,255,255,.22) 50%,transparent 70%)',
            animation: 'shimmer 3.5s linear infinite',
            backgroundSize: '200% 100%',
          }}
        />
        <div className="relative max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
          {stats.map(({ icon, value, suffix, label }) => (
            <div key={label} className="space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold text-white font-body drop-shadow-lg">
                {icon} <Counter end={value} suffix={suffix} />
              </p>
              <p className="text-white/75 font-semibold text-[10px] sm:text-xs tracking-[.18em] uppercase">{label}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}