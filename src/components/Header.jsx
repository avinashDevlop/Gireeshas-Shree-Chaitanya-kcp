"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const navItems = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    children: [
      { label: "About", href: "/about" },
      { label: "About Philosophy", href: "/about/philosophy" },
      { label: "Mission / Vision", href: "/about/mission-vision" },
      { label: "Principal's Message", href: "/about/principal" },
      { label: "Director's Message", href: "/about/director" },
    ],
  },
  { label: "Features", href: "/features" },
  {
    label: "Rules & Regulations",
    children: [
      { label: "School Rules", href: "/rules/school-rules" },
      { label: "School Uniform", href: "/rules/uniform" },
    ],
  },
  { label: "Our Facility", href: "/facility" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

function NavItem({ item }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const timeoutRef = useRef(null);
  const hasChildren = item.children?.length > 0;

  const open_ = () => { clearTimeout(timeoutRef.current); setOpen(true); };
  const close_ = () => { timeoutRef.current = setTimeout(() => setOpen(false), 180); };

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={hasChildren ? open_ : undefined}
      onMouseLeave={hasChildren ? close_ : undefined}
    >
      {hasChildren ? (
        <button
          onClick={() => setOpen((v) => !v)}
          className={`flex items-center gap-1 px-3.5 py-2 rounded-lg text-[13.5px] font-medium cursor-pointer border-none outline-none whitespace-nowrap select-none ${
            open
              ? "bg-white/20 text-white"
              : "text-white/90 hover:text-white hover:bg-white/10"
          }`}
        >
          {item.label}
          <svg
            className={`w-3 h-3 mt-px transition-transform duration-300 opacity-70 ${open ? "rotate-180" : ""}`}
            viewBox="0 0 10 6" fill="none"
          >
            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      ) : (
        <Link
          href={item.href}
          className="flex items-center px-3.5 py-2 rounded-lg text-[13.5px] font-medium text-white/90 hover:text-white hover:bg-white/10 whitespace-nowrap"
        >
          {item.label}
        </Link>
      )}

      {hasChildren && (
        <div
          className={`absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2 z-[9999] ${
            open
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
          style={{ minWidth: "210px" }}
          onMouseEnter={open_}
          onMouseLeave={close_}
        >
          <div className="flex justify-center">
            <div
              className="w-2.5 h-2.5 rotate-45 -mb-[5px] relative z-10 border-l border-t"
              style={{ background: "#FFFFFF", borderColor: "#FECACA" }}
            />
          </div>

          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: "#FFFFFF",
              border: "1px solid #FEE2E2",
              boxShadow: "0 16px 48px rgba(239,68,68,0.08), 0 2px 8px rgba(251,191,36,0.08)",
            }}
          >
            <div className="h-[3px]" style={{ background: "linear-gradient(90deg, #F87171, #FBBF24 60%, #FDE68A)" }} />

            {item.children.map((child, i) => (
              <Link
                key={i}
                href={child.href}
                onClick={() => setOpen(false)}
                className="group flex items-center gap-3 px-4 py-3 border-b last:border-0 hover:bg-[#FFF7ED]"
                style={{ borderColor: "#FEF3C7" }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0 group-hover:scale-150 transition-transform duration-200"
                  style={{ background: "#FBBF24" }}
                />
                <span className="text-[13px] font-medium text-[#2C3E50] group-hover:text-[#B91C1C] flex-1 leading-snug">
                  {child.label}
                </span>
                <svg
                  className="w-3 h-3 text-[#EF4444] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                  viewBox="0 0 8 8" fill="none"
                >
                  <path d="M1 4h6M4 1l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [showDesktopHeader, setShowDesktopHeader] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Update scrolled state for visual effects (mobile only)
      setScrolled(currentScrollY > 8);
      
      // Desktop: Show header when scrolled past 50px, hide at top
      if (window.innerWidth >= 1024) { // lg breakpoint
        if (currentScrollY > 50) {
          setShowDesktopHeader(true);
        } else {
          setShowDesktopHeader(false);
        }
      }
    };

    // Initial check
    handleScroll();

    // Add resize listener to handle screen size changes
    const handleResize = () => {
      handleScroll(); // Re-evaluate based on new screen size
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Desktop: Fixed styling with no transitions/animations
  const desktopNavBg = "linear-gradient(135deg, #DC2626 0%, #EF4444 30%, #F97316 65%, #FBBF24 100%)";
  const desktopNavShadow = "0 2px 20px rgba(220,38,38,0.2)";
  const desktopPadding = { top: "10px", bottom: "10px" };
  const desktopLogoSize = { width: "44px", height: "44px" };
  const desktopLogoImageSize = 40;
  const desktopMainTextSize = "24px";
  const desktopSecondaryTextSize = "20px";
  const desktopTaglineSize = "13px";

  // Mobile: Animated styling with transitions
  const mobileNavBg = scrolled
    ? "linear-gradient(135deg, #DC2626 0%, #EF4444 30%, #F97316 65%, #FBBF24 100%)"
    : "linear-gradient(135deg, rgba(220,38,38,0.15) 0%, rgba(249,115,22,0.18) 50%, rgba(251,191,36,0.15) 100%)";

  const mobileNavBackdrop = scrolled ? "none" : "blur(16px) saturate(1.6)";
  const mobileNavBorder = scrolled ? "none" : "1px solid rgba(255,255,255,0.28)";
  const mobileNavShadow = scrolled
    ? "0 2px 20px rgba(220,38,38,0.2)"
    : "0 4px 32px rgba(220,38,38,0.08), 0 1px 0 rgba(255,255,255,0.2) inset";

  const mobilePadding = {
    top: scrolled ? "10px" : "16px",
    bottom: scrolled ? "10px" : "16px",
  };

  const mobileLogoSize = {
    width: scrolled ? "clamp(36px, 6vw, 44px)" : "clamp(44px, 7vw, 56px)",
    height: scrolled ? "clamp(36px, 6vw, 44px)" : "clamp(44px, 7vw, 56px)",
  };

  const mobileLogoImageSize = scrolled ? 40 : 52;
  const mobileMainTextSize = scrolled ? "clamp(16px, 4vw, 24px)" : "clamp(20px, 5vw, 32px)";
  const mobileSecondaryTextSize = scrolled ? "clamp(14px, 3.5vw, 20px)" : "clamp(18px, 4.5vw, 28px)";
  const mobileTaglineSize = scrolled ? "clamp(10px, 1.5vw, 13px)" : "clamp(11px, 1.8vw, 14px)";

  return (
    <header className="w-full fixed top-0 z-50">
      {/* Desktop Header - Hidden at top, appears on scroll */}
      <div 
        className="hidden lg:block"
        style={{
          transition: "transform 0.3s ease-in-out",
          transform: showDesktopHeader ? "translateY(0)" : "translateY(-100%)",
        }}
      >
        <div
          style={{
            background: desktopNavBg,
            boxShadow: desktopNavShadow,
          }}
        >
          <div
            className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between"
            style={{
              paddingTop: desktopPadding.top,
              paddingBottom: desktopPadding.bottom,
            }}
          >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 sm:gap-3 md:gap-4 group flex-shrink-0">
              <div
                className="flex-shrink-0 rounded-full flex items-center justify-center overflow-hidden"
                style={{
                  width: desktopLogoSize.width,
                  height: desktopLogoSize.height,
                  background: "white",
                  boxShadow: "0 0 0 2px rgba(255,255,255,0.3), 0 8px 20px rgba(220,38,38,0.3)",
                }}
              >
                <Image
                  src="/images/logo.png"
                  alt="School Logo"
                  width={desktopLogoImageSize}
                  height={desktopLogoImageSize}
                  className="object-contain"
                  priority
                />
              </div>

              <div className="flex flex-col">
                <div className="flex items-baseline flex-nowrap">
                  <span 
                    className="font-black text-white tracking-tight whitespace-nowrap"
                    style={{
                      fontSize: desktopMainTextSize,
                      textShadow: "0 4px 8px rgba(0,0,0,0.25)",
                      lineHeight: "1.1",
                    }}
                  >
                    Gireeshas
                  </span>
                  <span 
                    className="font-bold text-white whitespace-nowrap ml-1 sm:ml-1.5"
                    style={{
                      fontSize: desktopSecondaryTextSize,
                      textShadow: "0 4px 8px rgba(0,0,0,0.25)",
                      lineHeight: "1.1",
                      background: "linear-gradient(135deg, #FFFFFF 0%, #FFF7E6 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Shree Chaitanya
                  </span>
                </div>
                
                <div className="hidden md:flex items-center mt-0.5">
                  <span 
                    className="text-white/90 font-semibold tracking-wide whitespace-nowrap"
                    style={{
                      fontSize: desktopTaglineSize,
                      letterSpacing: "0.5px",
                      textTransform: "uppercase",
                      textShadow: "0 2px 4px rgba(0,0,0,0.2)",
                      background: "linear-gradient(135deg, #FFFFFF 0%, #FFE5B4 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    English Medium School
                  </span>
                  <span 
                    className="mx-2 text-white/40"
                    style={{ fontSize: "12px" }}
                  >
                    ◆
                  </span>
                  <span 
                    className="text-white/70 font-medium italic whitespace-nowrap"
                    style={{
                      fontSize: "9px",
                      letterSpacing: "0.8px",
                      textTransform: "uppercase",
                    }}
                  >
                    Since 1995
                  </span>
                </div>

                <div className="hidden sm:flex md:hidden items-center mt-0.5">
                  <span 
                    className="text-white/90 font-medium tracking-wide whitespace-nowrap"
                    style={{
                      fontSize: "9px",
                      letterSpacing: "0.3px",
                      textTransform: "uppercase",
                      textShadow: "0 2px 4px rgba(0,0,0,0.2)",
                    }}
                  >
                    English Medium • Since 1995
                  </span>
                </div>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="flex items-center gap-0.5 mx-4 xl:mx-6">
              {navItems.map((item, i) => (
                <NavItem key={i} item={item} />
              ))}
            </nav>

            {/* Apply Now button */}
            <Link
              href="/admissions"
              className="inline-flex items-center gap-1.5 text-[13px] lg:text-[14px] font-semibold px-4 lg:px-5 py-2 lg:py-2.5 rounded-xl"
              style={{
                background: "white",
                color: "#B91C1C",
                boxShadow: "0 4px 15px rgba(220,38,38,0.3)",
              }}
            >
              <span className="hidden xl:inline">Apply Now</span>
              <span className="inline xl:hidden">Apply</span>
              <svg className="w-3.5 h-3.5 lg:w-4 lg:h-4" fill="none" viewBox="0 0 16 16">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Header - Always visible with animations */}
      <div className="lg:hidden">
        <div
          style={{
            background: mobileNavBg,
            backdropFilter: mobileNavBackdrop,
            WebkitBackdropFilter: mobileNavBackdrop,
            borderBottom: mobileNavBorder,
            boxShadow: mobileNavShadow,
            transition: "background 0.45s ease, backdrop-filter 0.45s ease, border 0.45s ease, box-shadow 0.45s ease",
          }}
        >
          <div
            className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between"
            style={{
              paddingTop: mobilePadding.top,
              paddingBottom: mobilePadding.bottom,
              transition: "padding 0.25s",
            }}
          >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 sm:gap-3 md:gap-4 group flex-shrink-0">
              <div
                className="flex-shrink-0 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105 overflow-hidden"
                style={{
                  width: mobileLogoSize.width,
                  height: mobileLogoSize.height,
                  transition: "width 0.25s, height 0.25s",
                  background: "white",
                  boxShadow: scrolled
                    ? "0 0 0 2px rgba(255,255,255,0.3), 0 8px 20px rgba(220,38,38,0.3)"
                    : "0 0 0 3px rgba(255,255,255,0.4), 0 10px 25px rgba(220,38,38,0.2)",
                }}
              >
                <Image
                  src="/images/logo.png"
                  alt="School Logo"
                  width={mobileLogoImageSize}
                  height={mobileLogoImageSize}
                  className="object-contain"
                  priority
                />
              </div>

              <div className="flex flex-col">
                <div className="flex items-baseline flex-nowrap">
                  <span 
                    className="font-black text-white tracking-tight whitespace-nowrap"
                    style={{
                      fontSize: mobileMainTextSize,
                      textShadow: scrolled 
                        ? "0 4px 8px rgba(0,0,0,0.25)" 
                        : "0 6px 12px rgba(0,0,0,0.2)",
                      transition: "font-size 0.25s, text-shadow 0.25s",
                      lineHeight: "1.1",
                    }}
                  >
                    Gireeshas
                  </span>
                  <span 
                    className="font-bold text-white whitespace-nowrap ml-1 sm:ml-1.5"
                    style={{
                      fontSize: mobileSecondaryTextSize,
                      textShadow: scrolled 
                        ? "0 4px 8px rgba(0,0,0,0.25)" 
                        : "0 6px 12px rgba(0,0,0,0.2)",
                      transition: "font-size 0.25s, text-shadow 0.25s",
                      lineHeight: "1.1",
                      background: "linear-gradient(135deg, #FFFFFF 0%, #FFF7E6 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Shree Chaitanya
                  </span>
                </div>
                
                <div className="flex sm:hidden items-center mt-0.5">
                  <span 
                    className="text-white/80 font-medium whitespace-nowrap"
                    style={{
                      fontSize: scrolled ? "8px" : "9px",
                      letterSpacing: "0.2px",
                      textTransform: "uppercase",
                      transition: "font-size 0.25s",
                    }}
                  >
                    English Medium School
                  </span>
                </div>
              </div>
            </Link>

            {/* Mobile menu button */}
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              {/* Hamburger menu */}
              <button
                onClick={() => setMobileOpen((v) => !v)}
                className="flex flex-col items-center justify-center transition-all hover:bg-white/20 rounded-lg"
                style={{
                  width: scrolled ? "clamp(32px, 8vw, 40px)" : "clamp(36px, 9vw, 44px)",
                  height: scrolled ? "clamp(32px, 8vw, 40px)" : "clamp(36px, 9vw, 44px)",
                  border: "1.5px solid rgba(255,255,255,0.4)",
                }}
                aria-label="Toggle navigation"
              >
                <span className={`block h-0.5 bg-white rounded-full transition-all duration-300 ${
                  mobileOpen 
                    ? "w-5 sm:w-6 rotate-45 translate-y-[6px] sm:translate-y-[7px]" 
                    : "w-5 sm:w-6"
                }`} />
                <span className={`block h-0.5 bg-white rounded-full transition-all duration-300 mt-1 sm:mt-1.5 ${
                  mobileOpen 
                    ? "w-0 opacity-0" 
                    : "w-4 sm:w-5"
                }`} />
                <span className={`block h-0.5 bg-white rounded-full transition-all duration-300 mt-1 sm:mt-1.5 ${
                  mobileOpen 
                    ? "w-5 sm:w-6 -rotate-45 -translate-y-[6px] sm:-translate-y-[7px]" 
                    : "w-5 sm:w-6"
                }`} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile drawer */}
        <div
          className="overflow-hidden"
          style={{
            maxHeight: mobileOpen ? "680px" : "0",
            transition: "max-height 0.38s cubic-bezier(0.4,0,0.2,1)",
            background: "white",
            borderBottom: mobileOpen ? "2px solid #EF4444" : "none",
            boxShadow: mobileOpen ? "0 8px 24px rgba(220,38,38,0.1)" : "none",
          }}
        >
          <div className="h-[3px]" style={{ background: "linear-gradient(90deg, #DC2626, #F97316 50%, #FBBF24)" }} />

          <div className="max-w-lg mx-auto px-2 sm:px-4">
            {navItems.map((item, i) => (
              <div key={i} className="border-b" style={{ borderColor: "#FEF3C7" }}>
                {item.children ? (
                  <>
                    <button
                      onClick={() => setExpanded(expanded === i ? null : i)}
                      className="w-full flex items-center justify-between px-3 sm:px-5 py-3 sm:py-4 text-[13px] sm:text-[14px] font-medium transition-colors"
                      style={{
                        color: expanded === i ? "#DC2626" : "#2C3E50",
                        background: expanded === i ? "#FFF7ED" : "transparent",
                      }}
                    >
                      <span>{item.label}</span>
                      <span
                        className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all duration-300"
                        style={{
                          background: expanded === i ? "#EF4444" : "#FEE2E2",
                          color: expanded === i ? "white" : "#EF4444",
                          transform: expanded === i ? "rotate(180deg)" : "none",
                        }}
                      >
                        <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" viewBox="0 0 10 6" fill="none">
                          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </span>
                    </button>

                    <div
                      className="overflow-hidden transition-all duration-300"
                      style={{ maxHeight: expanded === i ? "320px" : "0" }}
                    >
                      {item.children.map((childItem, j) => (
                        <Link
                          key={j}
                          href={childItem.href}
                          onClick={() => { setMobileOpen(false); setExpanded(null); }}
                          className="flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-2.5 sm:py-3.5 text-[13px] sm:text-[14px] text-[#34495E] font-medium border-b last:border-0 hover:bg-[#FFF7ED] hover:text-[#B91C1C] transition-colors group"
                          style={{ borderColor: "#FEF3C7" }}
                        >
                          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#FBBF24] flex-shrink-0 group-hover:scale-125 transition-transform" />
                          {childItem.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-3 sm:py-4 text-[13px] sm:text-[14px] font-medium text-[#2C3E50] hover:text-[#DC2626] hover:bg-[#FFF7ED] transition-colors group"
                  >
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#EF4444] opacity-0 group-hover:opacity-100 flex-shrink-0 transition-opacity" />
                    {item.label}
                  </Link>
                )}
              </div>
            ))}

            <div className="p-3 sm:p-4 md:p-5">
              <Link
                href="/admissions"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 sm:py-3.5 md:py-4 rounded-xl sm:rounded-2xl text-white font-semibold text-[14px] sm:text-[15px] md:text-[16px] tracking-wide transition-all active:scale-95 hover:brightness-110"
                style={{
                  background: "linear-gradient(135deg, #DC2626, #F97316 60%, #FBBF24)",
                  boxShadow: "0 6px 20px rgba(220,38,38,0.4)",
                }}
              >
                Apply for Admissions
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 16 16">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 320px) {
          .group {
            max-width: 180px;
          }
        }
      `}</style>
    </header>
  );
}