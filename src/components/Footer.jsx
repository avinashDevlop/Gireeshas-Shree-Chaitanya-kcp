import Image from 'next/image';
import { Phone, Mail, MapPin, Clock, ChevronRight, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const contactInfo = {
    address: "P7PG+2VW, NH-5 Road, Near Kancharapalem Bus Stop, Kancharapalem, Visakhapatnam-530008, Andhra Pradesh",
    phone: "+91 98491 80875",
    phoneRaw: "+919849180875",          // ← digits-only for the tel: link
    email: "info@gireeshaschool.edu.in",
    hours: "Mon–Sat: 8:30 AM – 6:00 PM",
    mapLink: "https://maps.google.com/?q=Gireeshas+Shree+Chaitanya+English+Medium+School+Visakhapatnam",
    rating: "4.3",
    reviews: "54 Google Reviews"
  };

  const links = [
    { name: 'Home', url: '/' },
    { name: 'About Us', url: '/about' },
    { name: 'Academics', url: '/academics' },
    { name: 'Admissions', url: '/admissions' },
    { name: 'Faculty', url: '/faculty' },
    { name: 'Gallery', url: '/gallery' },
    { name: 'Contact', url: '/contact' },
    { name: 'Calendar', url: '/calendar' },
  ];
  
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Poppins:wght@300;400;500;600;700&display=swap');

        :root {
          --yellow:    #FFD700;
          --yellow2:   #FFC107;
          --yellow3:   #FFEE58;
          --red:       #E53935;
          --red2:      #FF5722;
          --red3:      #C62828;
          --green:     #43A047;
          --green2:    #1B5E20;
          --green3:    #66BB6A;
          --white:     #FFFFFF;
          --offwhite:  #FFF9F0;
          --dark:      #0D1B0F;
        }

        /* ═══ FOOTER WRAPPER ═══ */
        .gsc-ft {
          font-family: 'Poppins', sans-serif;
          position: relative;
          overflow: hidden;
          background: linear-gradient(
            160deg,
            #0D1B0F 0%,
            #1a2e10 18%,
            #1B3A2A 35%,
            #0f1f2e 60%,
            #1a0d0d 80%,
            #0D1B0F 100%
          );
          color: var(--white);
        }

        /* animated mesh blobs */
        .gsc-blob {
          position: absolute; border-radius: 50%;
          filter: blur(90px); pointer-events: none; z-index: 0;
          animation: blobFloat 8s ease-in-out infinite alternate;
        }
        .gsc-blob-1 {
          width: 500px; height: 500px; top: -150px; left: -120px;
          background: radial-gradient(circle, rgba(255,215,0,0.18) 0%, transparent 65%);
          animation-delay: 0s;
        }
        .gsc-blob-2 {
          width: 600px; height: 400px; top: 40%; right: -180px;
          background: radial-gradient(circle, rgba(229,57,53,0.15) 0%, transparent 65%);
          animation-delay: -3s;
        }
        .gsc-blob-3 {
          width: 400px; height: 400px; bottom: -100px; left: 30%;
          background: radial-gradient(circle, rgba(67,160,71,0.18) 0%, transparent 65%);
          animation-delay: -5s;
        }
        @keyframes blobFloat {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(30px, 20px) scale(1.08); }
        }

        /* diagonal stripe overlay */
        .gsc-stripes {
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
          background: repeating-linear-gradient(
            -50deg,
            transparent 0px, transparent 60px,
            rgba(255,255,255,0.012) 60px, rgba(255,255,255,0.012) 61px
          );
        }

        /* ═══ RIBBON ═══ */
        .gsc-ribbon {
          position: relative; z-index: 2;
          background: linear-gradient(90deg, var(--red3) 0%, var(--red) 40%, var(--red2) 70%, var(--red3) 100%);
          padding: 9px 16px;
          text-align: center;
          font-size: 11.5px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          font-weight: 700;
          color: var(--yellow3);
          overflow: hidden;
        }
        .gsc-ribbon::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%);
          animation: ribbonShine 3s linear infinite;
        }
        @keyframes ribbonShine {
          from { transform: translateX(-100%); }
          to   { transform: translateX(100%); }
        }

        /* ═══ MAIN BODY ═══ */
        .gsc-body {
          position: relative; z-index: 1;
          max-width: 1280px;
          margin: 0 auto;
          padding: 60px 32px 0;
        }

        /* ═══ MASTHEAD ═══ */
        .gsc-masthead {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 28px;
          flex-wrap: wrap;
          padding-bottom: 40px;
          border-bottom: 1px solid rgba(255,215,0,0.2);
          margin-bottom: 44px;
        }
        .gsc-masthead-left {
          display: flex; align-items: center; gap: 22px; flex-wrap: wrap;
        }

        /* LOGO */
        .gsc-logo {
          position: relative;
          width: 120px; height: 60px;
          flex-shrink: 0;
          filter: drop-shadow(0 4px 16px rgba(255,215,0,0.35)) drop-shadow(0 2px 6px rgba(0,0,0,0.5));
          transition: filter 0.3s;
        }
        .gsc-logo:hover {
          filter: drop-shadow(0 4px 24px rgba(255,215,0,0.6)) drop-shadow(0 2px 8px rgba(0,0,0,0.5));
        }

        .gsc-school-name {
          font-family: 'Playfair Display', serif;
          font-size: clamp(17px, 3.2vw, 33px);
          font-weight: 900;
          line-height: 1.15;
          background: linear-gradient(135deg, #FFFFFF 0%, #FFD700 50%, #FFC107 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .gsc-school-sub {
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--green3);
          margin-top: 5px;
          font-weight: 400;
        }

        /* Stars */
        .gsc-stars { display: flex; align-items: center; gap: 3px; margin-top: 10px; }
        .gsc-star { width: 13px; height: 13px; fill: var(--yellow2); color: var(--yellow2); }
        .gsc-star.dim { fill: rgba(255,215,0,0.22); color: rgba(255,215,0,0.22); }
        .gsc-rating-txt { font-size: 12px; color: rgba(255,255,255,0.5); margin-left: 6px; }
        .gsc-rating-num { font-weight: 700; color: var(--yellow); margin-left: 2px; }

        /* Badges */
        .gsc-badges { display: flex; gap: 8px; flex-wrap: wrap; }
        .gsc-badge {
          font-size: 10.5px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          padding: 5px 13px; border-radius: 999px;
          white-space: nowrap;
        }
        .gsc-badge-y { background: linear-gradient(135deg, var(--yellow), var(--yellow2)); color: #111; }
        .gsc-badge-r { background: linear-gradient(135deg, var(--red), var(--red2)); color: #fff; }
        .gsc-badge-g { background: linear-gradient(135deg, var(--green), var(--green2)); color: #fff; }
        .gsc-badge-o { border: 1.5px solid rgba(255,215,0,0.35); color: rgba(255,215,0,0.85); }

        /* ═══ MAIN GRID ═══ */
        .gsc-grid {
          display: grid;
          grid-template-columns: 1.25fr 0.9fr 1.3fr;
          gap: 48px;
          margin-bottom: 56px;
        }
        @media(max-width:900px){ .gsc-grid { grid-template-columns: 1fr 1fr; } }
        @media(max-width:580px){ .gsc-grid { grid-template-columns: 1fr; } }

        .gsc-col-title {
          font-size: 9.5px; font-weight: 700;
          letter-spacing: 0.28em; text-transform: uppercase;
          margin-bottom: 20px;
          display: flex; align-items: center; gap: 10px;
        }
        .gsc-col-title-y { color: var(--yellow); }
        .gsc-col-title-r { color: #ff7961; }
        .gsc-col-title-g { color: var(--green3); }
        .gsc-col-title::after { content:''; flex:1; height:1px; background: rgba(255,255,255,0.07); }

        /* Contact rows */
        .gsc-crow {
          display: flex; gap: 13px; align-items: flex-start;
          padding: 13px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .gsc-crow:last-child { border-bottom: none; }
        .gsc-ci {
          width: 38px; height: 38px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .gsc-ci svg { width: 15px; height: 15px; }
        .gsc-ci-y { background: linear-gradient(135deg, rgba(255,215,0,0.25), rgba(255,193,7,0.12)); }
        .gsc-ci-y svg { color: var(--yellow); }
        .gsc-ci-r { background: linear-gradient(135deg, rgba(229,57,53,0.3), rgba(255,87,34,0.12)); }
        .gsc-ci-r svg { color: #ff6b6b; }
        .gsc-ci-g { background: linear-gradient(135deg, rgba(67,160,71,0.3), rgba(27,94,32,0.12)); }
        .gsc-ci-g svg { color: var(--green3); }
        .gsc-cl { font-size: 9.5px; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 3px; font-weight: 700; }
        .gsc-cl-y { color: var(--yellow2); }
        .gsc-cl-r { color: #ff7961; }
        .gsc-cl-g { color: var(--green3); }
        .gsc-cv { font-size: 12.5px; color: rgba(255,255,255,0.68); line-height: 1.55; }
        .gsc-cv a { color: inherit; text-decoration: none; transition: color 0.2s; }
        .gsc-cv a:hover { color: var(--yellow); }

        /* ── Click-to-call pulse ring ── */
        .gsc-phone-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: inherit;
          text-decoration: none;
          transition: color 0.2s;
        }
        .gsc-phone-link:hover { color: var(--yellow); }

        .gsc-call-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          margin-top: 8px;
          padding: 7px 14px;
          border-radius: 999px;
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-decoration: none;
          background: linear-gradient(135deg, var(--yellow), var(--yellow2));
          color: #111;
          position: relative;
          transition: box-shadow 0.22s, transform 0.22s;
          box-shadow: 0 3px 14px rgba(255,215,0,0.35);
        }
        .gsc-call-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 22px rgba(255,215,0,0.55);
        }
        /* pulse ring behind the button */
        .gsc-call-btn::before {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 999px;
          border: 2px solid rgba(255,215,0,0.45);
          animation: callPulse 1.8s ease-out infinite;
        }
        @keyframes callPulse {
          0%   { transform: scale(1);   opacity: 0.8; }
          100% { transform: scale(1.45); opacity: 0; }
        }
        .gsc-call-btn svg { width: 13px; height: 13px; flex-shrink: 0; }

        /* Nav */
        .gsc-nav { list-style: none; padding: 0; margin: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 0 8px; }
        .gsc-nav a {
          display: flex; align-items: center; gap: 5px;
          font-size: 13px; font-weight: 500;
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          padding: 8px 0;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          transition: color 0.18s, padding-left 0.18s;
        }
        .gsc-nav a:hover { color: var(--yellow3); padding-left: 5px; }
        .gsc-nav a svg { width: 11px; height: 11px; opacity: 0; transition: opacity 0.18s; color: var(--yellow); }
        .gsc-nav a:hover svg { opacity: 1; }

        /* CTA box */
        .gsc-cta-box {
          border-radius: 18px;
          padding: 26px;
          position: relative; overflow: hidden;
          background: linear-gradient(135deg,
            rgba(229,57,53,0.22) 0%,
            rgba(255,215,0,0.1) 40%,
            rgba(67,160,71,0.15) 100%
          );
          border: 1px solid rgba(255,215,0,0.2);
        }
        .gsc-cta-box::before {
          content: ''; position: absolute;
          top: -60px; right: -60px;
          width: 180px; height: 180px;
          background: radial-gradient(circle, rgba(255,215,0,0.12), transparent 65%);
          border-radius: 50%;
        }
        .gsc-cta-title {
          font-family: 'Playfair Display', serif;
          font-size: 21px; font-weight: 700;
          background: linear-gradient(135deg, var(--yellow), var(--yellow2));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          margin-bottom: 10px; position: relative;
        }
        .gsc-cta-text {
          font-size: 12.5px; color: rgba(255,255,255,0.58);
          line-height: 1.7; margin-bottom: 22px; position: relative;
        }
        .gsc-btn {
          display: flex; align-items: center; justify-content: center; gap: 7px;
          width: 100%; padding: 12px 18px; border-radius: 9px;
          font-size: 13px; font-weight: 700;
          text-decoration: none; margin-bottom: 10px;
          transition: all 0.22s; border: none; cursor: pointer; position: relative;
          font-family: 'Poppins', sans-serif;
        }
        .gsc-btn:last-child { margin-bottom: 0; }
        .gsc-btn-primary {
          background: linear-gradient(135deg, var(--yellow), var(--yellow2));
          color: #111;
          box-shadow: 0 4px 18px rgba(255,215,0,0.28);
        }
        .gsc-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(255,215,0,0.42); }
        .gsc-btn-secondary {
          background: transparent; color: var(--white);
          border: 1.5px solid rgba(255,255,255,0.2);
        }
        .gsc-btn-secondary:hover { background: rgba(255,255,255,0.07); border-color: rgba(255,255,255,0.45); transform: translateY(-2px); }

        /* ═══ BOTTOM BAR ═══ */
        .gsc-bottom-wrap {
          position: relative; z-index: 1;
          background: linear-gradient(90deg, var(--red3) 0%, #8B0000 30%, #3a0000 60%, var(--green2) 100%);
          margin-top: 0;
        }
        .gsc-bottom {
          max-width: 1280px; margin: 0 auto;
          padding: 18px 32px;
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 12px;
        }
        .gsc-copy { font-size: 11.5px; color: rgba(255,255,255,0.5); }
        .gsc-copy a { color: rgba(255,255,255,0.5); text-decoration: none; margin: 0 5px; transition: color 0.2s; }
        .gsc-copy a:hover { color: var(--yellow); }
        .gsc-loc-tag { font-size: 10.5px; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(255,255,255,0.28); }

        /* ═══ MOBILE CENTER ═══ */
        @media (max-width: 640px) {
          .gsc-masthead { flex-direction: column; align-items: center; text-align: center; }
          .gsc-masthead-left { flex-direction: column; align-items: center; text-align: center; }
          .gsc-badges { justify-content: center; }
          .gsc-stars { justify-content: center; }
          .gsc-col-title { justify-content: center; }
          .gsc-col-title::after { display: none; }
          .gsc-crow { flex-direction: column; align-items: center; text-align: center; }
          .gsc-nav { grid-template-columns: 1fr 1fr; }
          .gsc-nav a { justify-content: center; }
          .gsc-bottom { flex-direction: column; align-items: center; text-align: center; }
          .gsc-stat { padding: 18px 12px; }
          .gsc-body { padding: 40px 20px 0; }
          .gsc-call-btn { width: 100%; justify-content: center; }
        }
      `}</style>

      <footer className="gsc-ft">
        {/* Ambient blobs */}
        <div className="gsc-blob gsc-blob-1" />
        <div className="gsc-blob gsc-blob-2" />
        <div className="gsc-blob gsc-blob-3" />
        <div className="gsc-stripes" />

        {/* Ribbon */}
        <div className="gsc-ribbon">
          🌟 Admissions Open for 2025–26 &nbsp;·&nbsp; Enroll Now &nbsp;·&nbsp; Limited Seats 🌟
        </div>

        <div className="gsc-body">

          {/* ── Masthead ── */}
          <div className="gsc-masthead">
            <div className="gsc-masthead-left">
              <div className="gsc-logo">
                <Image
                  src="/images/logo.png"
                  alt="Gireeshas Shree Chaitanya School Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <div className="gsc-school-name">
                  Gireeshas Shree Chaitanya<br />English Medium School
                </div>
                <div className="gsc-school-sub">Nurturing Young Minds · Visakhapatnam</div>
                <div className="gsc-stars">
                  {[1,2,3,4].map(i => (
                    <svg key={i} className="gsc-star" viewBox="0 0 20 20">
                      <path d="M10 1l2.39 4.84 5.34.78-3.86 3.76.91 5.33L10 13.27l-4.78 2.51.91-5.33L2.27 6.62l5.34-.78z"/>
                    </svg>
                  ))}
                  <svg className="gsc-star dim" viewBox="0 0 20 20">
                    <path d="M10 1l2.39 4.84 5.34.78-3.86 3.76.91 5.33L10 13.27l-4.78 2.51.91-5.33L2.27 6.62l5.34-.78z"/>
                  </svg>
                  <span className="gsc-rating-num">4.3</span>
                  <span className="gsc-rating-txt">· 54 Google Reviews</span>
                </div>
              </div>
            </div>
            <div className="gsc-badges">
              <span className="gsc-badge gsc-badge-y">ESTD. 1995</span>
              {/* ✅ Updated grade range: Nursery – 10th */}
              <span className="gsc-badge gsc-badge-r">Nursery – 10th</span>
              <span className="gsc-badge gsc-badge-g">Co-Educational</span>
              <span className="gsc-badge gsc-badge-o">Day School</span>
            </div>
          </div>

          {/* ── 3-column grid ── */}
          <div className="gsc-grid">

            {/* Contact */}
            <div>
              <div className="gsc-col-title gsc-col-title-y">Contact Us</div>

              <div className="gsc-crow">
                <div className="gsc-ci gsc-ci-r"><MapPin /></div>
                <div>
                  <div className="gsc-cl gsc-cl-r">Address</div>
                  <div className="gsc-cv">
                    <a href={contactInfo.mapLink} target="_blank" rel="noopener noreferrer">{contactInfo.address}</a>
                  </div>
                </div>
              </div>

              {/* ✅ Click-to-call phone row */}
              <div className="gsc-crow">
                <div className="gsc-ci gsc-ci-y"><Phone /></div>
                <div>
                  <div className="gsc-cl gsc-cl-y">Phone</div>
                  <div className="gsc-cv">
                    {/* Plain number link */}
                    <a className="gsc-phone-link" href={`tel:${contactInfo.phoneRaw}`}>
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="gsc-crow">
                <div className="gsc-ci gsc-ci-g"><Mail /></div>
                <div>
                  <div className="gsc-cl gsc-cl-g">Email</div>
                  <div className="gsc-cv"><a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a></div>
                </div>
              </div>

              <div className="gsc-crow">
                <div className="gsc-ci gsc-ci-y"><Clock /></div>
                <div>
                  <div className="gsc-cl gsc-cl-y">Hours</div>
                  <div className="gsc-cv">{contactInfo.hours}</div>
                </div>
              </div>
            </div>

            {/* Nav */}
            <div>
              <div className="gsc-col-title gsc-col-title-r">Explore</div>
              <ul className="gsc-nav">
                {links.map((link, i) => (
                  <li key={i}>
                    <a href={link.url}>
                      <ChevronRight />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div>
              <div className="gsc-col-title gsc-col-title-g">Join Our School</div>
              <div className="gsc-cta-box">
                <div className="gsc-cta-title">Admissions Open!</div>
                <div className="gsc-cta-text">
                  Give your child the best foundation. Enroll at Gireeshas Shree Chaitanya — from Nursery through 10th Grade, every child's potential is celebrated.
                </div>
                <a href="/admissions" className="gsc-btn gsc-btn-primary">
                  🎓 Enroll Now <ArrowUpRight size={14} />
                </a>
                <a href={contactInfo.mapLink} target="_blank" rel="noopener noreferrer" className="gsc-btn gsc-btn-secondary">
                  🗺️ Get Directions <ArrowUpRight size={14} />
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="gsc-bottom-wrap">
          <div className="gsc-bottom">
            <div className="gsc-copy">
              © {currentYear} Gireeshas Shree Chaitanya English Medium School. All rights reserved. |
              <a href="/privacy">Privacy</a>·
              <a href="/terms">Terms</a>·
              <a href="/sitemap">Sitemap</a>
            </div>
            <div className="gsc-loc-tag">Kancharapalem · Visakhapatnam · AP 530008</div>
          </div>
        </div>

      </footer>
    </>
  );
};

export default Footer;