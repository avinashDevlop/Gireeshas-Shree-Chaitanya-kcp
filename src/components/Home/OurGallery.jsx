'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'

/* ─── Styles ──────────────────────────────────────────────────────────────── */
const GalleryStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=DM+Sans:wght@400;500;600;700&display=swap');

    .font-display { font-family: 'Cormorant Garamond', Georgia, serif; }
    .font-body    { font-family: 'DM Sans', sans-serif; }

    @keyframes shimmer-gold {
      0%   { background-position: -200% center; }
      100% { background-position:  200% center; }
    }
    @keyframes lightbox-in {
      from { opacity:0; transform:scale(0.93) translateY(16px); }
      to   { opacity:1; transform:scale(1)    translateY(0);    }
    }
    @keyframes fade-cards {
      from { opacity:0; transform:translateY(18px); }
      to   { opacity:1; transform:translateY(0);    }
    }

    .shimmer-gold {
      background: linear-gradient(90deg,#f59e0b,#fcd34d,#f97316,#fcd34d,#f59e0b);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: shimmer-gold 4s linear infinite;
    }

    /* ── Filter tabs ── */
    .tab-pill {
      font-family: 'DM Sans', sans-serif;
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      padding: 0.5rem 1.2rem;
      border-radius: 999px;
      cursor: pointer;
      white-space: nowrap;
      border: 1.5px solid rgba(255,255,255,0.10);
      color: rgba(255,255,255,0.50);
      background: rgba(255,255,255,0.04);
      transition: all 0.25s cubic-bezier(0.34,1.56,0.64,1);
    }
    .tab-pill:hover {
      border-color: rgba(251,191,36,0.45);
      color: #fcd34d;
      background: rgba(251,191,36,0.07);
      transform: translateY(-2px);
    }
    .tab-pill.active {
      background: linear-gradient(135deg,#f59e0b,#f97316);
      border-color: transparent;
      color: #fff;
      box-shadow: 0 6px 22px rgba(249,115,22,0.40);
      transform: translateY(-2px);
    }

    /* ── Gallery card ── */
    .gal-card {
      position: relative;
      overflow: hidden;
      border-radius: 14px;
      cursor: pointer;
      border: 1px solid rgba(255,255,255,0.07);
      background: #0c1e45;
    }

    /* Dark overlay on hover */
    .gal-card::after {
      content: '';
      position: absolute; inset: 0;
      background: linear-gradient(180deg, transparent 35%, rgba(4,10,28,0.88) 100%);
      opacity: 0;
      transition: opacity 0.35s ease;
      z-index: 2;
    }
    .gal-card:hover::after { opacity: 1; }

    /* Image zoom on hover */
    .gal-card .gal-img {
      transition: transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94) !important;
    }
    .gal-card:hover .gal-img {
      transform: scale(1.07) !important;
    }

    /* Caption */
    .gal-card .caption {
      position: absolute; bottom: 0; left: 0; right: 0;
      padding: 0.9rem 1rem;
      z-index: 4;
      opacity: 0; transform: translateY(10px);
      transition: all 0.35s ease;
    }
    .gal-card:hover .caption { opacity: 1; transform: translateY(0); }

    /* Zoom icon */
    .gal-card .zoom-btn {
      position: absolute; top: 10px; right: 10px; z-index: 5;
      width: 34px; height: 34px; border-radius: 50%;
      background: rgba(255,255,255,0.14);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255,255,255,0.18);
      display: flex; align-items: center; justify-content: center;
      opacity: 0; transform: scale(0.6);
      transition: all 0.28s cubic-bezier(0.34,1.56,0.64,1);
    }
    .gal-card:hover .zoom-btn { opacity: 1; transform: scale(1); }

    /* Category badge */
    .cat-badge {
      position: absolute; top: 10px; left: 10px; z-index: 5;
      font-family: 'DM Sans', sans-serif;
      font-size: 9px; font-weight: 700;
      letter-spacing: .14em; text-transform: uppercase;
      padding: 3px 9px; border-radius: 999px; color: #fff;
    }

    /* Lightbox */
    .lb-overlay {
      position: fixed; inset: 0; z-index: 9999;
      background: rgba(3,7,18,0.97);
      backdrop-filter: blur(28px);
      display: flex; align-items: center; justify-content: center;
      padding: 1rem;
    }
    .lb-inner {
      animation: lightbox-in 0.38s cubic-bezier(0.16,1,0.3,1) both;
      max-width: 980px; width: 100%;
    }

    /* Scroll reveal */
    .reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.65s ease, transform 0.65s ease; }
    .reveal.in { opacity: 1; transform: translateY(0); }

    /* Grid tab-switch animation */
    .grid-animate { animation: fade-cards 0.38s ease both; }
  `}</style>
)

/* ─── Categories ──────────────────────────────────────────────────────────── */
const CATEGORIES = [
  { label: 'All',       icon: '🏫', grad: 'linear-gradient(135deg,#f59e0b,#f97316)' },
  { label: 'Campus',    icon: '🌿', grad: 'linear-gradient(135deg,#34d399,#059669)' },
  { label: 'Classroom', icon: '📚', grad: 'linear-gradient(135deg,#60a5fa,#2563eb)' },
  { label: 'Lab',       icon: '🔬', grad: 'linear-gradient(135deg,#a78bfa,#7c3aed)' },
  { label: 'Events',    icon: '🎉', grad: 'linear-gradient(135deg,#f472b6,#db2777)' },
  { label: 'Results',   icon: '🏆', grad: 'linear-gradient(135deg,#fbbf24,#d97706)' },
]

const catGrad = Object.fromEntries(CATEGORIES.map(c => [c.label, c.grad]))

/* ─── Images data ─────────────────────────────────────────────────────────── */
const IMAGES = [
  // ── Campus ──
  { id: 1,  cat: 'Campus',    tall: true,  src: '/images/school1.webp',            alt: 'School Main Building'           },
  { id: 2,  cat: 'Campus',    tall: false, src: '/images/gallery/campus2.avif',    alt: 'School Corridor'                },
  { id: 3,  cat: 'Campus',    tall: false, src: '/images/gallery/campus1.avif',    alt: 'Notice Board'                   },

  // ── Classroom ──
  { id: 4,  cat: 'Classroom', tall: true,  src: '/images/gallery/classroom1.avif', alt: 'Interactive Learning'           },

  // ── Lab ──
  { id: 5,  cat: 'Lab',       tall: false, src: '/images/gallery/lab1.webp',       alt: 'Computer Lab'                   },

  // ── Events ──
  { id: 6,  cat: 'Events',    tall: true,  src: '/images/gallery/event1.webp',     alt: 'Annual Day Celebration'         },
  { id: 7,  cat: 'Events',    tall: false, src: '/images/gallery/event2.webp',     alt: 'Independence Day Flag Hoisting' },
  { id: 8,  cat: 'Events',    tall: false, src: '/images/gallery/event3.webp',     alt: 'Cultural Dance Programme'       },
  { id: 9,  cat: 'Events',    tall: false, src: '/images/gallery/event4.webp',     alt: 'Sports Day March Past'          },
  { id: 10, cat: 'Events',    tall: false, src: '/images/gallery/event5.webp',     alt: 'Art & Craft Exhibition'         },

  // ── Results ──
  { id: 11, cat: 'Results',   tall: false, src: '/images/gallery/result1.webp',    alt: 'Board Toppers Felicitation'     },
  { id: 12, cat: 'Results',   tall: true,  src: '/images/gallery/result2.webp',    alt: 'State Rank Achievers'           },
  { id: 13, cat: 'Results',   tall: false, src: '/images/gallery/result3.webp',    alt: 'Merit Certificate Distribution' },
  { id: 14, cat: 'Results',   tall: false, src: '/images/gallery/result4.webp',    alt: 'Gold Medal Winners'             },
]

/* ─── Scroll-reveal hook ──────────────────────────────────────────────────── */
function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('in'); obs.disconnect() }
    }, { threshold: 0.12 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

/* ─── Single Gallery Card ─────────────────────────────────────────────────── */
function GalleryCard({ item, index, onOpen }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0) scale(1)'
        }, index * 55)
        obs.disconnect()
      }
    }, { threshold: 0.06 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [index])

  const grad = catGrad[item.cat] || catGrad.All
  const cat  = CATEGORIES.find(c => c.label === item.cat)

  /*
    Card height:
      tall   → 2 grid rows = 2×200px + 1 gap(16px) = 416px
      normal → 1 grid row  = 200px
    These match gridAutoRows: '200px' defined on the grid below.
  */
  const cardHeight = item.tall ? 416 : 200

  return (
    <div
      ref={ref}
      className={`gal-card${item.tall ? ' row-span-2' : ''}`}
      style={{
        height: cardHeight,
        position: 'relative',   /* required for Next.js Image fill */
        opacity: 0,
        transform: 'translateY(20px) scale(0.96)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
      }}
      onClick={() => onOpen(item)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onOpen(item)}
      aria-label={`Open ${item.alt}`}
    >
      {/* Full-cover image */}
      <Image
        src={item.src}
        alt={item.alt}
        fill
        sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
        className="object-cover gal-img"
        placeholder="blur"
        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOCIgaGVpZ2h0PSI4IiB2aWV3Qm94PSIwIDAgOCA4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiMwYzFlNDUiLz48L3N2Zz4="
      />

      {/* Category badge */}
      <div className="cat-badge" style={{ background: grad }}>
        {cat?.icon} {item.cat}
      </div>

      {/* Zoom icon */}
      <div className="zoom-btn" aria-hidden="true">
        <svg width="14" height="14" fill="none" stroke="#fff" strokeWidth="2.2" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35M11 8v6M8 11h6"/>
        </svg>
      </div>

      {/* Caption */}
      <div className="caption">
        <p className="text-white font-semibold text-sm leading-snug drop-shadow">{item.alt}</p>
      </div>
    </div>
  )
}

/* ─── Lightbox ────────────────────────────────────────────────────────────── */
function Lightbox({ item, items, onClose, onNav }) {
  useEffect(() => {
    const fn = e => {
      if (e.key === 'Escape')     onClose()
      if (e.key === 'ArrowRight') onNav(1)
      if (e.key === 'ArrowLeft')  onNav(-1)
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose, onNav])

  const idx  = items.findIndex(i => i.id === item.id)
  const grad = catGrad[item.cat] || catGrad.All
  const cat  = CATEGORIES.find(c => c.label === item.cat)

  return (
    <div
      className="lb-overlay"
      onClick={e => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
    >
      <div className="lb-inner font-body">

        {/* Top bar */}
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-3">
            <span
              className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full text-white shadow"
              style={{ background: grad }}
            >
              {cat?.icon} {item.cat}
            </span>
            <p className="text-white/70 text-sm font-semibold hidden sm:block">{item.alt}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-white/35 text-xs font-body">{idx + 1} / {items.length}</span>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ border: '1px solid rgba(255,255,255,0.14)', background: 'rgba(255,255,255,0.06)' }}
              aria-label="Close lightbox"
            >
              <svg width="15" height="15" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Main image */}
        <div
          className="rounded-2xl overflow-hidden shadow-2xl"
          style={{
            position: 'relative',   /* required for Next.js Image fill */
            aspectRatio: '16/9',
            border: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <Image
            key={item.id}
            src={item.src}
            alt={item.alt}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />

          {/* Prev */}
          <button
            onClick={() => onNav(-1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center z-10 hover:scale-110 transition-transform"
            style={{ background: 'rgba(4,10,28,0.72)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)' }}
            aria-label="Previous image"
          >
            <svg width="18" height="18" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </button>

          {/* Next */}
          <button
            onClick={() => onNav(1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center z-10 hover:scale-110 transition-transform"
            style={{ background: 'rgba(4,10,28,0.72)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)' }}
            aria-label="Next image"
          >
            <svg width="18" height="18" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </button>
        </div>

        {/* Mobile caption */}
        <p className="text-white/60 text-xs font-semibold text-center mt-2 sm:hidden">{item.alt}</p>

        {/* Thumbnail strip */}
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {items.map((it, i) => (
            <button
              key={it.id}
              onClick={() => onNav(i - idx)}
              className="shrink-0 rounded-lg overflow-hidden"
              style={{
                position: 'relative',   /* required for Next.js Image fill */
                width: 60,
                height: 42,
                border: it.id === item.id ? '2px solid #f59e0b' : '2px solid rgba(255,255,255,0.07)',
                opacity: it.id === item.id ? 1 : 0.42,
                transition: 'opacity 0.2s, border-color 0.2s',
              }}
              aria-label={it.alt}
            >
              <Image src={it.src} alt={it.alt} fill sizes="60px" className="object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Count badge ─────────────────────────────────────────────────────────── */
function CountBadge({ count }) {
  return (
    <span
      className="ml-1.5 inline-flex items-center justify-center text-[10px] font-bold rounded-full px-1.5 py-0.5 leading-none"
      style={{ background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.75)', minWidth: 20 }}
    >
      {count}
    </span>
  )
}

/* ─── Main Export ─────────────────────────────────────────────────────────── */
export default function OurGallery() {
  const [active,   setActive]   = useState('All')
  const [gridKey,  setGridKey]  = useState(0)
  const [lightbox, setLightbox] = useState(null)
  const headRef = useReveal()

  const filtered = active === 'All' ? IMAGES : IMAGES.filter(i => i.cat === active)

  const switchTab = useCallback(label => {
    if (label === active) return
    setActive(label)
    setGridKey(k => k + 1)
  }, [active])

  const open  = useCallback(item  => setLightbox(item), [])
  const close = useCallback(()    => setLightbox(null), [])
  const nav   = useCallback(delta => {
    setLightbox(prev => {
      const idx = filtered.findIndex(i => i.id === prev.id)
      return filtered[(idx + delta + filtered.length) % filtered.length]
    })
  }, [filtered])

  return (
    <>
      <GalleryStyles />

      <section
        className="font-body relative overflow-hidden"
        style={{
          background: 'linear-gradient(160deg,#060d1f 0%,#0a1c3a 55%,#060d1f 100%)',
          padding: 'clamp(4rem,8vw,7rem) 0',
        }}
      >
        {/* Background glows */}
        <div className="absolute -top-40 left-1/4 w-[480px] h-[480px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle,rgba(251,191,36,.09) 0%,transparent 70%)', filter: 'blur(55px)' }} />
        <div className="absolute bottom-0 right-10 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle,rgba(56,189,248,.06) 0%,transparent 70%)', filter: 'blur(45px)' }} />

        {/* Dot grid */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.045) 1px,transparent 1px)', backgroundSize: '36px 36px' }} />

        {/* Gold top accent */}
        <div className="absolute top-0 left-0 w-full h-[2px] pointer-events-none"
          style={{ background: 'linear-gradient(90deg,transparent,#f59e0b 25%,#f97316 75%,transparent)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">

          {/* ══ Section Header ══════════════════════════════════════════════ */}
          <div ref={headRef} className="reveal text-center mb-10 sm:mb-12">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5"
              style={{ background: 'rgba(251,191,36,.08)', border: '1px solid rgba(251,191,36,.22)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-amber-300 text-[11px] font-bold tracking-[.18em] uppercase">School Life</span>
            </div>

            <h2
              className="font-display text-white leading-[1.1]"
              style={{ fontSize: 'clamp(2rem,5vw,3.4rem)' }}
            >
              Our{' '}
              <span className="shimmer-gold font-display" style={{ fontSize: 'inherit' }}>Gallery</span>
            </h2>

            <div className="flex items-center justify-center gap-2 mt-4 mb-5">
              <div className="h-[3px] w-12 rounded-full" style={{ background: 'linear-gradient(90deg,#f59e0b,#f97316)' }} />
              <div className="h-[3px] w-7  rounded-full bg-sky-400/45" />
              <div className="h-[3px] w-3  rounded-full bg-emerald-400/35" />
            </div>

            <p className="text-slate-400 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
              A glimpse into the vibrant life at{' '}
              <span className="text-amber-300 font-semibold">Gireeshas Shree Chaitanya</span>
              {' '}— explore every corner of our school.
            </p>
          </div>

          {/* ══ Category Tabs ════════════════════════════════════════════════ */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
            {CATEGORIES.map(({ label, icon }) => {
              const count = label === 'All'
                ? IMAGES.length
                : IMAGES.filter(i => i.cat === label).length
              return (
                <button
                  key={label}
                  className={`tab-pill${active === label ? ' active' : ''}`}
                  onClick={() => switchTab(label)}
                  aria-pressed={active === label}
                >
                  <span className="mr-1">{icon}</span>
                  {label}
                  <CountBadge count={count} />
                </button>
              )
            })}
          </div>

          {/* ══ Masonry Grid ═════════════════════════════════════════════════ */}
          <div
            key={gridKey}
            className="grid gap-4 grid-animate"
            style={{
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))',
              gridAutoRows: '200px',
            }}
          >
            {filtered.map((item, i) => (
              <GalleryCard key={item.id} item={item} index={i} onOpen={open} />
            ))}

            {filtered.length === 0 && (
              <div
                className="col-span-full flex flex-col items-center justify-center py-24 gap-4"
                style={{ opacity: 0.5 }}
              >
                <span className="text-5xl">📷</span>
                <p className="text-white/50 font-semibold text-sm tracking-wide">
                  No photos yet in this category
                </p>
              </div>
            )}
          </div>

          {/* ══ View More ════════════════════════════════════════════════════ */}
          <div className="flex justify-center mt-10 sm:mt-14">
            <button
              className="flex items-center gap-2.5 px-8 py-4 rounded-full font-body font-bold text-sm tracking-widest uppercase text-white"
              style={{ background: 'linear-gradient(135deg,#f59e0b,#f97316)', boxShadow: '0 8px 28px rgba(249,115,22,0.35)', transition: 'all .3s ease' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 16px 44px rgba(249,115,22,0.5)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 8px 28px rgba(249,115,22,0.35)' }}
            >
              <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <rect x="3"  y="3"  width="8" height="8" rx="1"/>
                <rect x="13" y="3"  width="8" height="8" rx="1"/>
                <rect x="3"  y="13" width="8" height="8" rx="1"/>
                <rect x="13" y="13" width="8" height="8" rx="1"/>
              </svg>
              View Full Gallery
            </button>
          </div>
        </div>

        {/* Gold bottom accent */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] pointer-events-none"
          style={{ background: 'linear-gradient(90deg,transparent,#f59e0b 30%,#f97316 70%,transparent)' }} />
      </section>

      {/* Lightbox */}
      {lightbox && (
        <Lightbox item={lightbox} items={filtered} onClose={close} onNav={nav} />
      )}
    </>
  )
}