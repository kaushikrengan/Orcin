import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Mail,
  CheckCircle2,
  Cpu,
  Layers,
  FileText,
  Boxes,
  Workflow,
  Sparkles,
  ArrowRight,
  ArrowDown,
  Database,
  Lock,
  ChevronRight,
  Upload,
  Layout,
  Sliders,
  Download,
  FolderArchive,
  RefreshCw,
  GitBranch,
  Split,
  Combine,
  Tag,
  Maximize2,
  FileCode2,
  FileCheck2,
  Zap,
  ShieldCheck,
  AlertCircle,
  Binary,
  Check,
  Server,
  Cloud,
  HardDrive,
  Compass,
  Building2,
  Plane,
  Car,
  HeartPulse,
  Factory,
  ExternalLink,
  X
} from "lucide-react";

interface PrismProductPageProps {
  onBack: () => void;
}

export function PrismProductPage({ onBack }: PrismProductPageProps) {
  const [selectedRms, setSelectedRms] = useState<string>("doors-classic");
  const rmsIllustrationRef = useRef<HTMLDivElement>(null);
  const [rmsScrollProgress, setRmsScrollProgress] = useState<number>(0.25);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();
    let accumulatedFlow = 0;

    const getScrollY = () => {
      return (
        window.scrollY ||
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0
      );
    };

    let lastScrollY = getScrollY();

    const handleScroll = () => {
      const currentY = getScrollY();
      const deltaY = currentY - lastScrollY;
      lastScrollY = currentY;

      // Only advance forward when scrolling DOWN
      // When scrolling UP (reverse scroll), do NOT decrease or reverse movement!
      if (deltaY > 0 && rmsIllustrationRef.current) {
        const rect = rmsIllustrationRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight || 800;
        // Generous bounds so mobile viewport catches it reliably
        if (rect.bottom > -250 && rect.top < windowHeight + 450) {
          // 30% speed boost on forward scroll
          accumulatedFlow += (deltaY / 220) * 1.30;
        }
      }
    };

    // Support direct touch gestures on mobile for immediate tactile responsiveness
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0 && rmsIllustrationRef.current) {
        const currentTouchY = e.touches[0].clientY;
        const touchDeltaY = touchStartY - currentTouchY; // positive when dragging up (scrolling down)
        touchStartY = currentTouchY;

        if (touchDeltaY > 0) {
          const rect = rmsIllustrationRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight || 800;
          if (rect.bottom > -250 && rect.top < windowHeight + 450) {
            accumulatedFlow += (touchDeltaY / 200) * 1.30;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    let ambientAccumulator = 0;

    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - lastTime) / 1000);
      lastTime = now;
      // Continuous ambient drift forward: 0.10 per sec
      ambientAccumulator += dt * 0.10;

      const totalProgress = accumulatedFlow + ambientAccumulator;
      setRmsScrollProgress(totalProgress);
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  const demoEmailSubject = "Request a Demo: PRISM (PDF2ReqIf) Enterprise Pipeline";
  const demoEmailBody = `Hello Orcin Team,

I would like to request a customized demonstration of PRISM (PDF2ReqIf) for our engineering team.

Our Details:
• Name: 
• Company / Organization: 
• Industry (e.g. Automotive ADAS, Aerospace & Defense, Medical Devices): 
• Current RMS Platform (e.g. IBM DOORS Next, DOORS Classic, Polarion ALM): 
• Deployment Preference (Local Air-Gapped or Cloud): 
• Sample Specification Types (e.g. ISO 26262, DO-178C, IEEE, Customer PDFs): 

Looking forward to scheduling a walkthrough.

Best regards,`;

  const demoMailtoUrl = `mailto:orcin.aistudio@gmail.com?subject=${encodeURIComponent(demoEmailSubject)}&body=${encodeURIComponent(demoEmailBody)}`;
  const mailSalesUrl = demoMailtoUrl;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FDFCFB] text-[#1A1A1A] font-sans antialiased selection:bg-[#4B7B7B]/20 selection:text-[#4B7B7B]">
      {/* =========================================================================
          TOP HEADER (Minimalist: Back to Orcin & Demo CTA, No Nav Bar)
          ========================================================================= */}
      <header className="sticky top-0 z-50 bg-[#FDFCFB]/85 backdrop-blur-md border-b border-[#E6E2DE] transition-all">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Wordmark & Back Navigation */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-[#1A1A1A]/70 hover:text-[#4B7B7B] transition-colors bg-transparent border-none cursor-pointer py-1.5 px-2.5 -ml-2.5 rounded-lg hover:bg-[#1A1A1A]/5"
            >
              <ArrowLeft size={14} className="text-[#4B7B7B]" />
              <span>Back to Orcin</span>
            </button>
            <div className="h-4 w-[1px] bg-[#E6E2DE]" aria-hidden="true" />
            <span className="font-heading font-bold text-sm tracking-tight text-[#1A1A1A]">
              PRISM (PDF2ReqIf)
            </span>
          </div>

          {/* Primary Action Button (Direct pre-drafted Email to Orcin) */}
          <div className="flex items-center gap-3">
            <a
              href={demoMailtoUrl}
              className="px-4 py-2 text-xs font-mono uppercase tracking-[0.18em] font-medium text-white bg-[#1A1A1A] hover:bg-[#4B7B7B] rounded-lg shadow-sm hover:shadow transition-all duration-200 cursor-pointer no-underline whitespace-nowrap inline-flex items-center gap-2 group"
            >
              <Mail size={13} className="text-[#4B7B7B] group-hover:text-white transition-colors" />
              <span>Request a Demo</span>
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* =========================================================================
            01 — HERO SECTION
            Prism illustration front and center (responsive across all viewports with
            minimal icons/vectors), followed by headline, supporting text, and CTAs below.
            ========================================================================= */}
        <section className="relative pt-8 sm:pt-12 md:pt-16 pb-20 md:pb-28 px-5 sm:px-6 overflow-hidden flex flex-col items-center">
          {/* Subtle Ambient Radial Lighting */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-gradient-to-b from-[#4B7B7B]/12 via-[#4B7B7B]/4 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

          {/* FRONT AND CENTER: Sleek PRISM Dispersion Hero Illustration (Reference Match) */}
          <div className="w-full max-w-5xl mx-auto mb-8 sm:mb-12 relative flex justify-center select-none px-2 sm:px-4">
            <svg
              viewBox="0 0 1020 330"
              className="w-full h-auto max-h-[280px] sm:max-h-[320px] md:max-h-[360px] drop-shadow-sm overflow-visible"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* 3D Black Obsidian Prism Gradients */}
                <linearGradient id="prismLeftFacet" x1="15%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2E353D" />
                  <stop offset="25%" stopColor="#1C2127" />
                  <stop offset="65%" stopColor="#0B0D10" />
                  <stop offset="100%" stopColor="#020304" />
                </linearGradient>

                <linearGradient id="prismRightFacet" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#20252B" />
                  <stop offset="35%" stopColor="#121519" />
                  <stop offset="75%" stopColor="#07080A" />
                  <stop offset="100%" stopColor="#000000" />
                </linearGradient>

                <linearGradient id="prismSheen" x1="0%" y1="0%" x2="100%" y2="85%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
                  <stop offset="30%" stopColor="#FFFFFF" stopOpacity="0.14" />
                  <stop offset="65%" stopColor="#FFFFFF" stopOpacity="0" />
                </linearGradient>

                <linearGradient id="ridgeGleam" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                  <stop offset="45%" stopColor="#E2E8F0" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#94A3B8" stopOpacity="0.55" />
                </linearGradient>

                {/* Incoming Focused Light Beam */}
                <linearGradient id="beamIncomingGrad" x1="0%" y1="50%" x2="100%" y2="50%">
                  <stop offset="0%" stopColor="#4B7B7B" stopOpacity="0.12" />
                  <stop offset="45%" stopColor="#7FAEB4" stopOpacity="0.4" />
                  <stop offset="85%" stopColor="#E0F2FE" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
                </linearGradient>

                <linearGradient id="beamConeGrad" x1="0%" y1="50%" x2="100%" y2="50%">
                  <stop offset="0%" stopColor="#4B7B7B" stopOpacity="0.04" />
                  <stop offset="60%" stopColor="#38BDF8" stopOpacity="0.16" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.55" />
                </linearGradient>

                {/* Dispersed Spectral Rays */}
                <linearGradient id="rayCyan" x1="0%" y1="50%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.98" />
                  <stop offset="35%" stopColor="#38BDF8" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#0284C7" stopOpacity="0.85" />
                </linearGradient>

                <linearGradient id="rayTeal" x1="0%" y1="50%" x2="100%" y2="25%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.98" />
                  <stop offset="35%" stopColor="#2DD4BF" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#0D9488" stopOpacity="0.85" />
                </linearGradient>

                <linearGradient id="rayEmerald" x1="0%" y1="50%" x2="100%" y2="55%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.98" />
                  <stop offset="35%" stopColor="#34D399" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#059669" stopOpacity="0.85" />
                </linearGradient>

                <linearGradient id="rayAmber" x1="0%" y1="50%" x2="100%" y2="85%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.98" />
                  <stop offset="35%" stopColor="#FBBF24" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#D97706" stopOpacity="0.85" />
                </linearGradient>

                {/* Badges Floating Gradients */}
                <linearGradient id="badgeCyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0284C7" />
                  <stop offset="100%" stopColor="#0369A1" />
                </linearGradient>
                <linearGradient id="badgeTealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0D9488" />
                  <stop offset="100%" stopColor="#0F766E" />
                </linearGradient>
                <linearGradient id="badgeEmeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#059669" />
                  <stop offset="100%" stopColor="#047857" />
                </linearGradient>
                <linearGradient id="badgeAmberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#D97706" />
                  <stop offset="100%" stopColor="#B45309" />
                </linearGradient>

                {/* Optical & Drop Shadow Filters */}
                <filter id="glowWide" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <filter id="glowTight" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2.5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <filter id="shadowGround" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="8" />
                </filter>
                <filter id="docShadow" x="-10%" y="-10%" width="125%" height="125%">
                  <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#0F172A" floodOpacity="0.08" />
                </filter>
              </defs>

              {/* Ambient Grid Reference Lines */}
              <g opacity="0.15" stroke="#4B7B7B" strokeWidth="0.75" strokeDasharray="3 5">
                <line x1="40" y1="165" x2="980" y2="165" />
                <line x1="510" y1="20" x2="510" y2="300" />
              </g>

              {/* =========================================================================
                  LEFT: TECHNICAL DOCUMENT / PDF SOURCE (Minimalist Engineering Stack)
                  ========================================================================= */}
              <g transform="translate(45, 55)">
                {/* Back Tilted Document Sheet */}
                <rect
                  x="8"
                  y="4"
                  width="135"
                  height="175"
                  rx="8"
                  fill="#F3EFEA"
                  stroke="#E4E0D9"
                  strokeWidth="1.2"
                  transform="rotate(-4, 70, 90)"
                  opacity="0.65"
                />

                {/* Front White Document Sheet */}
                <g filter="url(#docShadow)">
                  <rect
                    x="18"
                    y="10"
                    width="136"
                    height="175"
                    rx="10"
                    fill="#FFFFFF"
                    stroke="#D6D1CA"
                    strokeWidth="1.5"
                  />

                  {/* Red PDF Tag Badge */}
                  <rect x="28" y="22" width="34" height="17" rx="4" fill="#E11D48" />
                  <text
                    x="35"
                    y="34"
                    fontFamily="'JetBrains Mono', monospace"
                    fontSize="9.5"
                    fontWeight="800"
                    fill="#FFFFFF"
                  >
                    PDF
                  </text>

                  {/* Document Title Placeholder Lines */}
                  <line x1="70" y1="28" x2="140" y2="28" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
                  <line x1="70" y1="35" x2="115" y2="35" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />

                  {/* Body Paragraph Simulation Lines */}
                  <line x1="28" y1="52" x2="140" y2="52" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" opacity="0.45" />
                  <line x1="28" y1="62" x2="128" y2="62" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
                  <line x1="28" y1="72" x2="135" y2="72" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />

                  {/* CAD Schematic Box (Simulating engineering blueprints) */}
                  <rect
                    x="28"
                    y="84"
                    width="54"
                    height="38"
                    rx="4"
                    fill="#F8FAFC"
                    stroke="#4B7B7B"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                  />
                  {/* Schematic Crosshair & Geometry */}
                  <circle cx="45" cy="103" r="5" fill="#4B7B7B" fillOpacity="0.15" stroke="#4B7B7B" strokeWidth="1" />
                  <line x1="33" y1="103" x2="57" y2="103" stroke="#4B7B7B" strokeWidth="0.8" strokeOpacity="0.6" />
                  <line x1="45" y1="91" x2="45" y2="115" stroke="#4B7B7B" strokeWidth="0.8" strokeOpacity="0.6" />
                  <path d="M 50 98 L 74 91 M 50 108 L 74 115" stroke="#4B7B7B" strokeWidth="1" strokeOpacity="0.5" />

                  {/* Mini Data Table (Simulating engineering specifications) */}
                  <rect
                    x="88"
                    y="84"
                    width="54"
                    height="38"
                    rx="4"
                    fill="#F8FAFC"
                    stroke="#CBD5E1"
                    strokeWidth="1"
                  />
                  <line x1="88" y1="96" x2="142" y2="96" stroke="#CBD5E1" strokeWidth="1" />
                  <line x1="88" y1="108" x2="142" y2="108" stroke="#CBD5E1" strokeWidth="1" />
                  <line x1="115" y1="84" x2="115" y2="122" stroke="#CBD5E1" strokeWidth="1" />

                  {/* Extracted Requirement Callout Box */}
                  <rect
                    x="28"
                    y="130"
                    width="114"
                    height="24"
                    rx="4"
                    fill="#4B7B7B"
                    fillOpacity="0.08"
                    stroke="#4B7B7B"
                    strokeWidth="1"
                    strokeDasharray="3 2"
                  />
                  <text
                    x="35"
                    y="146"
                    fontFamily="'JetBrains Mono', monospace"
                    fontSize="8.5"
                    fontWeight="700"
                    fill="#0D9488"
                  >
                    [REQ-2481] Avionics
                  </text>
                </g>

                {/* Optical Light Emitter Node on Right Edge */}
                <circle cx="154" cy="110" r="14" fill="#38BDF8" fillOpacity="0.15" filter="url(#glowTight)" />
                <circle cx="154" cy="110" r="5" fill="#FFFFFF" />
                <circle cx="154" cy="110" r="3" fill="#38BDF8" />
              </g>

              {/* =========================================================================
                  INCOMING CONCENTRATED LIGHT BEAM (Source Document to Prism Face)
                  ========================================================================= */}
              <g opacity="0.95">
                {/* Soft Atmospheric Cone */}
                <polygon
                  points="199,160 199,170 440,167 440,163"
                  fill="url(#beamConeGrad)"
                  filter="url(#glowTight)"
                />
                {/* Core Luminous Laser Ray */}
                <line
                  x1="199"
                  y1="165"
                  x2="440"
                  y2="165"
                  stroke="url(#beamIncomingGrad)"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  filter="url(#glowTight)"
                />
                <line
                  x1="199"
                  y1="165"
                  x2="440"
                  y2="165"
                  stroke="#FFFFFF"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                {/* Incidence Point on Prism: Concentrated Flash & Lens Flare */}
                <circle cx="440" cy="165" r="4.5" fill="#FFFFFF" filter="url(#glowWide)" />
                <circle cx="440" cy="165" r="2.5" fill="#FFFFFF" />
                <line x1="440" y1="156" x2="440" y2="174" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" opacity="0.85" />
                <line x1="431" y1="165" x2="449" y2="165" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" opacity="0.85" />
              </g>

              {/* =========================================================================
                  FRONT AND CENTER: 3D SOLID BLACK OBSIDIAN PRISM (SHINY & OPAQUE)
                  ========================================================================= */}
              <g id="blackPrismGroup">
                {/* Realistic Ground Soft Shadow */}
                <ellipse cx="510" cy="258" rx="95" ry="16" fill="#000000" opacity="0.32" filter="url(#shadowGround)" />
                <ellipse cx="510" cy="254" rx="72" ry="9" fill="#000000" opacity="0.65" />

                {/* Left Facet: Opaque Glossy Obsidian with Deep Shading */}
                <polygon
                  points="510,42 440,238 510,252"
                  fill="url(#prismLeftFacet)"
                  stroke="#333D45"
                  strokeWidth="0.8"
                />

                {/* Diagonal Specular Sheen (Mirror-like glass gloss across left face) */}
                <polygon
                  points="510,42 462,125 476,190 510,145"
                  fill="url(#prismSheen)"
                />

                {/* Right Facet: Opaque Jet Black Obsidian */}
                <polygon
                  points="510,42 580,238 510,252"
                  fill="url(#prismRightFacet)"
                  stroke="#22282E"
                  strokeWidth="0.8"
                />

                {/* Subtle Specular Rim on Right Face */}
                <line x1="511" y1="46" x2="578" y2="235" stroke="#FFFFFF" strokeWidth="0.75" strokeOpacity="0.35" />

                {/* Center Beveled Gleaming Ridge Line */}
                <line
                  x1="510"
                  y1="42"
                  x2="510"
                  y2="252"
                  stroke="url(#ridgeGleam)"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  filter="url(#glowTight)"
                />
                <line
                  x1="510"
                  y1="42"
                  x2="510"
                  y2="252"
                  stroke="#FFFFFF"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />

                {/* Chamfer Bevel Edges (Polished Obsidian Reflections) */}
                <line
                  x1="510"
                  y1="42"
                  x2="440"
                  y2="238"
                  stroke="#FFFFFF"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeOpacity="0.95"
                  filter="url(#glowTight)"
                />
                <line
                  x1="510"
                  y1="42"
                  x2="580"
                  y2="238"
                  stroke="#E2E8F0"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeOpacity="0.8"
                />
                <line x1="440" y1="238" x2="510" y2="252" stroke="#64748B" strokeWidth="1.2" strokeLinecap="round" />
                <line x1="510" y1="252" x2="580" y2="238" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" />

                {/* Sparkling Diamond Apex Glint Star */}
                <circle cx="510" cy="42" r="5" fill="#FFFFFF" filter="url(#glowWide)" />
                <path
                  d="M 510 28 L 510 56 M 496 42 L 524 42"
                  stroke="#FFFFFF"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  opacity="0.95"
                />
                <path
                  d="M 501 33 L 519 51 M 501 51 L 519 33"
                  stroke="#FFFFFF"
                  strokeWidth="1"
                  strokeLinecap="round"
                  opacity="0.75"
                />
                <circle cx="510" cy="42" r="2.2" fill="#FFFFFF" />

                {/* Minimal PRISM Wordmark Underneath */}
                <text
                  x="510"
                  y="280"
                  textAnchor="middle"
                  fontFamily="'JetBrains Mono', monospace"
                  fontSize="9.5"
                  fontWeight="700"
                  fill="#0F172A"
                  letterSpacing="2.5"
                >
                  PRISM (PDF2ReqIf)
                </text>
              </g>

              {/* =========================================================================
                  DISPERSED REFRACTED SPECTRAL RAYS (Center to Right)
                  ========================================================================= */}
              <g opacity="0.95">
                {/* Ray 1 -> 12 images (Cyan / Sky Blue) */}
                <path
                  d="M 545 135 C 615 115, 665 55, 735 55"
                  stroke="url(#rayCyan)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                  filter="url(#glowTight)"
                />
                <path
                  d="M 545 135 C 615 115, 665 55, 735 55"
                  stroke="#E0F2FE"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                />
                {/* Sparkle Photon */}
                <circle cx="635" cy="98" r="1.8" fill="#38BDF8" opacity="0.85" filter="url(#glowTight)" />

                {/* Ray 2 -> 150 requirements (Teal / Aquamarine) */}
                <path
                  d="M 555 155 C 625 155, 670 120, 735 120"
                  stroke="url(#rayTeal)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                  filter="url(#glowTight)"
                />
                <path
                  d="M 555 155 C 625 155, 670 120, 735 120"
                  stroke="#CCFBF1"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                />
                {/* Sparkle Photon */}
                <circle cx="640" cy="140" r="1.8" fill="#2DD4BF" opacity="0.85" filter="url(#glowTight)" />

                {/* Ray 3 -> 24 tables (Emerald / Mint) */}
                <path
                  d="M 555 175 C 625 175, 670 185, 735 185"
                  stroke="url(#rayEmerald)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                  filter="url(#glowTight)"
                />
                <path
                  d="M 555 175 C 625 175, 670 185, 735 185"
                  stroke="#D1FAE5"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                />
                {/* Sparkle Photon */}
                <circle cx="638" cy="180" r="1.8" fill="#34D399" opacity="0.85" filter="url(#glowTight)" />

                {/* Ray 4 -> 18 formulas (Amber / Gold) */}
                <path
                  d="M 545 195 C 615 215, 665 250, 735 250"
                  stroke="url(#rayAmber)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                  filter="url(#glowTight)"
                />
                <path
                  d="M 545 195 C 615 215, 665 250, 735 250"
                  stroke="#FEF3C7"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                />
                {/* Sparkle Photon */}
                <circle cx="635" cy="232" r="1.8" fill="#FBBF24" opacity="0.85" filter="url(#glowTight)" />
              </g>

              {/* =========================================================================
                  RIGHT: NATURALLY FLOATING EXTRACTED ICONS & COUNTS
                  (Floating naturally without cards/rectangles, matching reference image)
                  ========================================================================= */}
              <g transform="translate(735, 0)">
                {/* 1. 12 images */}
                <g transform="translate(0, 55)">
                  {/* Aura Glow */}
                  <circle cx="0" cy="0" r="21" fill="#0284C7" fillOpacity="0.14" filter="url(#glowWide)" />
                  {/* Circular Badge */}
                  <circle cx="0" cy="0" r="15" fill="url(#badgeCyanGrad)" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.45" />
                  {/* Image / Gallery Vector Icon */}
                  <rect x="-7.5" y="-6" width="15" height="12" rx="2" fill="none" stroke="#FFFFFF" strokeWidth="1.2" />
                  <circle cx="-2.5" cy="-2.5" r="1.3" fill="#FFFFFF" />
                  <path d="M -6.5 4.5 L -2 -0.5 L 2 3.5 L 5 0.5 L 6.5 4.5" fill="none" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  {/* Count & Label */}
                  <text x="24" y="1" dominantBaseline="middle" fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif">
                    <tspan fontSize="17" fontWeight="800" fill="#0F172A">12</tspan>
                    <tspan dx="7" fontSize="14" fontWeight="600" fill="#475569">images</tspan>
                  </text>
                </g>

                {/* 2. 150 requirements */}
                <g transform="translate(0, 120)">
                  {/* Aura Glow */}
                  <circle cx="0" cy="0" r="21" fill="#0D9488" fillOpacity="0.14" filter="url(#glowWide)" />
                  {/* Circular Badge */}
                  <circle cx="0" cy="0" r="15" fill="url(#badgeTealGrad)" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.45" />
                  {/* Checklist / Requirement Icon */}
                  <path d="M -5.5 0.5 L -1.5 4.5 L 5.5 -3" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  {/* Count & Label */}
                  <text x="24" y="1" dominantBaseline="middle" fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif">
                    <tspan fontSize="17" fontWeight="800" fill="#0F172A">150</tspan>
                    <tspan dx="7" fontSize="14" fontWeight="600" fill="#475569">requirements</tspan>
                  </text>
                </g>

                {/* 3. 24 tables */}
                <g transform="translate(0, 185)">
                  {/* Aura Glow */}
                  <circle cx="0" cy="0" r="21" fill="#059669" fillOpacity="0.14" filter="url(#glowWide)" />
                  {/* Circular Badge */}
                  <circle cx="0" cy="0" r="15" fill="url(#badgeEmeraldGrad)" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.45" />
                  {/* Table Grid Icon */}
                  <rect x="-7" y="-6" width="14" height="12" rx="2" fill="none" stroke="#FFFFFF" strokeWidth="1.2" />
                  <line x1="-7" y1="-1" x2="7" y2="-1" stroke="#FFFFFF" strokeWidth="1" />
                  <line x1="0" y1="-6" x2="0" y2="6" stroke="#FFFFFF" strokeWidth="1" />
                  {/* Count & Label */}
                  <text x="24" y="1" dominantBaseline="middle" fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif">
                    <tspan fontSize="17" fontWeight="800" fill="#0F172A">24</tspan>
                    <tspan dx="7" fontSize="14" fontWeight="600" fill="#475569">tables</tspan>
                  </text>
                </g>

                {/* 4. 18 formulas */}
                <g transform="translate(0, 250)">
                  {/* Aura Glow */}
                  <circle cx="0" cy="0" r="21" fill="#D97706" fillOpacity="0.14" filter="url(#glowWide)" />
                  {/* Circular Badge */}
                  <circle cx="0" cy="0" r="15" fill="url(#badgeAmberGrad)" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.45" />
                  {/* Math Sigma Icon */}
                  <path d="M 4.5 -5 L -3.5 -5 L 0.5 0 L -3.5 5 L 4.5 5" fill="none" stroke="#FFFFFF" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  {/* Count & Label */}
                  <text x="24" y="1" dominantBaseline="middle" fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif">
                    <tspan fontSize="17" fontWeight="800" fill="#0F172A">18</tspan>
                    <tspan dx="7" fontSize="14" fontWeight="600" fill="#475569">formulas</tspan>
                  </text>
                </g>
              </g>
            </svg>
          </div>

          {/* BELOW THE PRISM: Heading Text, Supporting Description, and Buttons */}
          <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif-display font-extrabold text-[#1A1A1A] tracking-tight leading-[1.08] text-balance max-w-4xl">
              From PDF Requirements to RMS-Ready Import.
            </h1>

            {/* Supporting Text */}
            <p className="mt-5 text-sm sm:text-base md:text-lg text-[#1A1A1A]/75 font-sans font-light leading-relaxed max-w-2xl text-balance">
              PRISM (PDF2ReqIf) extracts requirements, tables, figures, formulas, and document hierarchy from complex engineering specifications and delivers ready-to-import formats directly to your RMS—slashing manual preparation time and effort by more than 80%.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
              <a
                href={demoMailtoUrl}
                className="w-full sm:w-auto px-7 py-3 text-xs font-mono uppercase tracking-[0.2em] font-semibold text-white bg-[#1A1A1A] hover:bg-[#4B7B7B] rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer no-underline flex items-center justify-center gap-2 group"
              >
                <Mail size={14} className="text-[#4B7B7B] group-hover:text-white transition-colors" />
                <span>Request a Demo</span>
                <ArrowRight size={14} className="text-[#4B7B7B] group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </section>

        {/* =========================================================================
            02 — HOW PRISM WORKS (Illustrated Roadmap)
            ========================================================================= */}
        <section id="how-it-works" className="py-24 md:py-32 px-6 bg-[#FDFCFB]">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-display font-extrabold text-[#1A1A1A] tracking-tight leading-tight text-balance">
                Go from PDF to RMS import in four steps.
              </h2>
              <p className="mt-4 text-base sm:text-lg text-[#1A1A1A]/70 font-sans font-light leading-relaxed text-balance">
                PRISM (PDF2ReqIf) combines AI document understanding, engineering rules, and review workflows to extract requirements and deliver ready-to-import formats—cutting manual engineering effort by over 80%.
              </p>
            </div>

            {/* =========================================================================
                CLEAN SUBTLE ROADMAP (BIG ICONS, NUMBER, STEP & INFO, SUBTLE DOTTED LINE)
                ========================================================================= */}
            <div className="relative w-full py-4 sm:py-8 select-none">
              {/* ---------------------------------------------------------------------
                  DESKTOP & TABLET: 4-Step Curved Wavy Flow with Subtle Dotted Grey Line
                  --------------------------------------------------------------------- */}
              <div className="hidden md:block relative w-full pt-2 pb-10">
                {/* Very Subtle Thin Dotted Grey Wavy Roadmap Line */}
                <svg
                  className="absolute top-0 left-0 w-full h-[220px] overflow-visible pointer-events-none z-0"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 1000 220"
                >
                  <path
                    d="M 60 50 C 90 50, 100 50, 125 50 C 250 50, 250 130, 375 130 C 500 130, 500 50, 625 50 C 750 50, 750 130, 875 130 C 900 130, 910 130, 940 130"
                    stroke="#D1D5DB"
                    strokeWidth="1"
                    strokeDasharray="2.5 3.5"
                    strokeLinecap="round"
                  />
                </svg>

                {/* 4 Steps Columns Staggered along the Wavy Curve */}
                <div className="grid grid-cols-4 gap-6 lg:gap-10 relative z-10">
                  {/* Step 1: High Crest */}
                  <div className="flex flex-col items-center text-center group pt-2.5">
                    <div className="relative mb-5 w-20 h-20 flex items-center justify-center bg-[#FDFCFB] rounded-full z-10">
                      <Upload
                        size={60}
                        className="text-[#0284C7] transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1 drop-shadow-xs"
                        strokeWidth={1.6}
                      />
                    </div>
                    <div className="text-xs sm:text-sm font-mono font-bold tracking-widest text-[#0284C7] uppercase mb-1">
                      01
                    </div>
                    <h3 className="font-heading font-bold text-xl text-[#1A1A1A] mb-2">
                      Upload PDF
                    </h3>
                    <p className="text-xs sm:text-[13px] text-[#1A1A1A]/70 font-sans leading-relaxed max-w-[230px]">
                      Drop complex multi-column specifications, engineering drawings, and rasterized standards.
                    </p>
                  </div>

                  {/* Step 2: Low Trough */}
                  <div className="flex flex-col items-center text-center group pt-[90px]">
                    <div className="relative mb-5 w-20 h-20 flex items-center justify-center bg-[#FDFCFB] rounded-full z-10">
                      <Sparkles
                        size={60}
                        className="text-[#0D9488] transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1 drop-shadow-xs"
                        strokeWidth={1.6}
                      />
                    </div>
                    <div className="text-xs sm:text-sm font-mono font-bold tracking-widest text-[#0D9488] uppercase mb-1">
                      02
                    </div>
                    <h3 className="font-heading font-bold text-xl text-[#1A1A1A] mb-2">
                      AI Extraction
                    </h3>
                    <p className="text-xs sm:text-[13px] text-[#1A1A1A]/70 font-sans leading-relaxed max-w-[230px]">
                      Deconstructs clauses, requirements, tables, figures, formulas, and document hierarchy into data.
                    </p>
                  </div>

                  {/* Step 3: High Crest */}
                  <div className="flex flex-col items-center text-center group pt-2.5">
                    <div className="relative mb-5 w-20 h-20 flex items-center justify-center bg-[#FDFCFB] rounded-full z-10">
                      <Sliders
                        size={60}
                        className="text-[#D97706] transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1 drop-shadow-xs"
                        strokeWidth={1.6}
                      />
                    </div>
                    <div className="text-xs sm:text-sm font-mono font-bold tracking-widest text-[#D97706] uppercase mb-1">
                      03
                    </div>
                    <h3 className="font-heading font-bold text-xl text-[#1A1A1A] mb-2">
                      Engineer Review
                    </h3>
                    <p className="text-xs sm:text-[13px] text-[#1A1A1A]/70 font-sans leading-relaxed max-w-[230px]">
                      Calibrate classifications, fine-tune bounding boxes, and validate requirement links.
                    </p>
                  </div>

                  {/* Step 4: Low Trough */}
                  <div className="flex flex-col items-center text-center group pt-[90px]">
                    <div className="relative mb-5 w-20 h-20 flex items-center justify-center bg-[#FDFCFB] rounded-full z-10">
                      <Download
                        size={60}
                        className="text-[#059669] transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1 drop-shadow-xs"
                        strokeWidth={1.6}
                      />
                    </div>
                    <div className="text-xs sm:text-sm font-mono font-bold tracking-widest text-[#059669] uppercase mb-1">
                      04
                    </div>
                    <h3 className="font-heading font-bold text-xl text-[#1A1A1A] mb-2">
                      RMS Export
                    </h3>
                    <p className="text-xs sm:text-[13px] text-[#1A1A1A]/70 font-sans leading-relaxed max-w-[230px]">
                      Generates validated OMG ReqIF 1.2 archives ready for DOORS and Polarion.
                    </p>
                  </div>
                </div>
              </div>

              {/* ---------------------------------------------------------------------
                  MOBILE & SMALL TABLET: Vertical Flow with Subtle Dotted Grey Line
                  --------------------------------------------------------------------- */}
              <div className="block md:hidden relative py-4 px-2">
                {/* Very Subtle Vertical Wavy Dotted Grey Roadmap Line */}
                <svg
                  className="absolute left-[30px] top-6 bottom-10 w-4 h-[calc(100%-60px)] overflow-visible pointer-events-none z-0"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 10 400"
                >
                  <path
                    d="M 5 0 C 9 50, 1 100, 5 150 C 9 200, 1 250, 5 300 C 9 350, 1 380, 5 400"
                    stroke="#D1D5DB"
                    strokeWidth="1"
                    strokeDasharray="2 3"
                    strokeLinecap="round"
                  />
                </svg>

                <div className="space-y-10 relative z-10">
                  {/* Step 1 */}
                  <div className="flex items-start gap-5">
                    <div className="relative shrink-0 w-14 h-14 flex items-center justify-center bg-[#FDFCFB]">
                      <Upload size={48} className="text-[#0284C7]" strokeWidth={1.6} />
                    </div>
                    <div className="pt-0.5">
                      <div className="text-xs font-mono font-bold tracking-widest text-[#0284C7] uppercase mb-1">
                        01
                      </div>
                      <h3 className="font-heading font-bold text-lg text-[#1A1A1A] mb-1">
                        Upload PDF
                      </h3>
                      <p className="text-xs text-[#1A1A1A]/70 font-sans leading-relaxed">
                        Drop complex engineering specifications, blueprints, and multi-column PDFs.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex items-start gap-5">
                    <div className="relative shrink-0 w-14 h-14 flex items-center justify-center bg-[#FDFCFB]">
                      <Sparkles size={48} className="text-[#0D9488]" strokeWidth={1.6} />
                    </div>
                    <div className="pt-0.5">
                      <div className="text-xs font-mono font-bold tracking-widest text-[#0D9488] uppercase mb-1">
                        02
                      </div>
                      <h3 className="font-heading font-bold text-lg text-[#1A1A1A] mb-1">
                        AI Extraction
                      </h3>
                      <p className="text-xs text-[#1A1A1A]/70 font-sans leading-relaxed">
                        Detects clauses, requirements, tables, figures, formulas, and document hierarchy.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex items-start gap-5">
                    <div className="relative shrink-0 w-14 h-14 flex items-center justify-center bg-[#FDFCFB]">
                      <Sliders size={48} className="text-[#D97706]" strokeWidth={1.6} />
                    </div>
                    <div className="pt-0.5">
                      <div className="text-xs font-mono font-bold tracking-widest text-[#D97706] uppercase mb-1">
                        03
                      </div>
                      <h3 className="font-heading font-bold text-lg text-[#1A1A1A] mb-1">
                        Engineer Review
                      </h3>
                      <p className="text-xs text-[#1A1A1A]/70 font-sans leading-relaxed">
                        Verify classifications, tune bounding boxes, and validate requirement links.
                      </p>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="flex items-start gap-5">
                    <div className="relative shrink-0 w-14 h-14 flex items-center justify-center bg-[#FDFCFB]">
                      <Download size={48} className="text-[#059669]" strokeWidth={1.6} />
                    </div>
                    <div className="pt-0.5">
                      <div className="text-xs font-mono font-bold tracking-widest text-[#059669] uppercase mb-1">
                        04
                      </div>
                      <h3 className="font-heading font-bold text-lg text-[#1A1A1A] mb-1">
                        RMS Export
                      </h3>
                      <p className="text-xs text-[#1A1A1A]/70 font-sans leading-relaxed">
                        Generate OMG ReqIF 1.2 packages ready for DOORS Classic, Next, and Polarion.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            04 — RMS INTEGRATION & FORMAT COMPATIBILITY
            ========================================================================= */}
        <section id="rms-integration" className="py-24 md:py-32 px-6 bg-[#F7F5F2] border-t border-b border-[#E6E2DE]">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-display font-extrabold text-[#1A1A1A] tracking-tight leading-tight text-balance">
                Ready-to-import format compatibility for every major RMS.
              </h2>
              <p className="mt-4 text-base sm:text-lg text-[#1A1A1A]/70 font-sans font-light leading-relaxed text-balance">
                Generate pre-formatted, validated requirement packages directly formatted for IBM DOORS, Polarion, Windchill, and Jama—eliminating over 80% of manual data entry and transfer time.
              </p>
            </div>

            {/* =========================================================================
                VISUAL SCROLL-DRIVEN REQUIREMENTS EXTRACTION ILLUSTRATION
                (PDF on Left -> Dynamic Moving Requirements on Scroll -> Top 3 RMS on Right)
                ========================================================================= */}
            <div
              ref={rmsIllustrationRef}
              className="relative w-full rounded-3xl bg-white border border-[#E6E2DE] p-6 sm:p-8 lg:p-12 shadow-sm overflow-hidden"
            >
              {/* Subtle ambient backdrops */}
              <div
                className="absolute inset-0 pointer-events-none opacity-40"
                style={{
                  backgroundImage: "radial-gradient(#CBD5E1 1px, transparent 1px)",
                  backgroundSize: "24px 24px"
                }}
              />
              <div className="absolute -left-12 top-1/2 -translate-y-1/2 w-80 h-80 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -right-12 top-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

              {/* Top Center: PRISM Logo Emblem */}
              <div className="relative z-10 flex flex-col items-center justify-center mb-8">
                <div className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 rounded-2xl bg-[#FDFCFB] border border-[#E6E2DE] shadow-xs hover:border-[#4B7B7B]/50 transition-colors cursor-default">
                  {/* Geometric 3D Obsidian Prism Logo Icon */}
                  <div className="relative w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center shrink-0">
                    <svg
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 sm:w-7 sm:h-7 drop-shadow-xs"
                    >
                      <defs>
                        <linearGradient id="prismLogoFacetLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#1E293B" />
                          <stop offset="100%" stopColor="#0F172A" />
                        </linearGradient>
                        <linearGradient id="prismLogoFacetRight" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#334155" />
                          <stop offset="100%" stopColor="#1E293B" />
                        </linearGradient>
                        <linearGradient id="prismLogoSheen" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="#0D9488" stopOpacity="0.2" />
                        </linearGradient>
                      </defs>
                      <ellipse cx="16" cy="28" rx="10" ry="2.5" fill="#000000" opacity="0.18" />
                      <polygon points="16,3 6,25 16,27" fill="url(#prismLogoFacetLeft)" stroke="#0F172A" strokeWidth="0.75" />
                      <polygon points="16,3 26,25 16,27" fill="url(#prismLogoFacetRight)" stroke="#1E293B" strokeWidth="0.75" />
                      <polygon points="16,3 12,14 16,16" fill="url(#prismLogoSheen)" />
                      <line x1="16" y1="3" x2="16" y2="27" stroke="#94A3B8" strokeWidth="0.75" strokeLinecap="round" />
                      <circle cx="21" cy="20" r="1.5" fill="#38BDF8" />
                    </svg>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-heading font-extrabold text-sm sm:text-base tracking-tight text-[#1A1A1A]">
                      PRISM
                    </span>
                    <span className="font-mono text-[11px] sm:text-xs font-semibold text-[#4B7B7B]">
                      (PDF2ReqIf)
                    </span>
                  </div>
                </div>
              </div>

              {/* ---------------------------------------------------------------------
                  DESKTOP & TABLET: HORIZONTAL FLOW (PDF -> CONDUIT STREAM -> 3 RMS)
                  --------------------------------------------------------------------- */}
              <div className="relative z-10 hidden md:grid md:grid-cols-12 items-center gap-4 lg:gap-8 min-h-[420px]">
                {/* LEFT: SOURCE PDF CARD (Cols 1-3) */}
                <div className="md:col-span-3 flex flex-col items-center justify-center text-center p-6 rounded-2xl bg-[#FDFCFB] border border-[#E6E2DE] shadow-xs relative">
                  {/* PDF Document Visual */}
                  <div className="relative mb-4 group cursor-default">
                    {/* Shadow / Glow behind icon */}
                    <div className="absolute inset-0 bg-rose-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all" />

                    {/* PDF Icon Emblem */}
                    <div className="relative w-28 h-32 rounded-2xl bg-white border-2 border-rose-200/90 shadow-lg flex flex-col justify-between p-3.5 overflow-hidden">
                      {/* Top Red Bar & Badge */}
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded bg-rose-600 text-white font-mono font-black text-[11px] tracking-wider">
                          PDF
                        </span>
                        <div className="w-5 h-5 rounded-sm bg-rose-100 flex items-center justify-center">
                          <FileText size={13} className="text-rose-600" />
                        </div>
                      </div>

                      {/* Mock Text Lines representing Requirements */}
                      <div className="space-y-1.5 py-2">
                        <div className="h-1.5 bg-rose-200/70 rounded-full w-full" />
                        <div className="h-1.5 bg-rose-100 rounded-full w-4/5" />
                        <div className="h-1.5 bg-emerald-200 rounded-full w-full flex items-center justify-end">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block mr-0.5" />
                        </div>
                        <div className="h-1.5 bg-rose-100 rounded-full w-3/4" />
                      </div>

                      {/* Bottom Footer Tag */}
                      <div className="text-[10px] font-mono font-semibold text-rose-700 text-left pt-1 border-t border-rose-100 truncate">
                        Spec_v4.2.pdf
                      </div>
                    </div>

                    {/* Emitting Output Node */}
                    <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-rose-500 border-2 border-white shadow-md flex items-center justify-center text-white">
                      <ArrowRight size={12} className="animate-pulse" />
                    </div>
                  </div>

                  <h3 className="font-heading font-bold text-lg text-[#1A1A1A]">
                    Engineering PDF
                  </h3>
                </div>

                {/* CENTER: STREAM CONDUIT & TRAVELING REQUIREMENTS (Cols 4-9) */}
                <div className="md:col-span-6 relative h-[400px] flex items-center justify-center">
                  {/* SVG Conduit Paths connecting PDF to the 3 RMS endpoints */}
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    viewBox="0 0 360 400"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient id="streamGradTop" x1="0%" y1="50%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#E11D48" stopOpacity="0.4" />
                        <stop offset="50%" stopColor="#4B7B7B" stopOpacity="0.7" />
                        <stop offset="100%" stopColor="#0F62FE" stopOpacity="0.9" />
                      </linearGradient>
                      <linearGradient id="streamGradMid" x1="0%" y1="50%" x2="100%" y2="50%">
                        <stop offset="0%" stopColor="#E11D48" stopOpacity="0.4" />
                        <stop offset="50%" stopColor="#4B7B7B" stopOpacity="0.7" />
                        <stop offset="100%" stopColor="#0043CE" stopOpacity="0.9" />
                      </linearGradient>
                      <linearGradient id="streamGradBot" x1="0%" y1="50%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#E11D48" stopOpacity="0.4" />
                        <stop offset="50%" stopColor="#4B7B7B" stopOpacity="0.7" />
                        <stop offset="100%" stopColor="#0D9488" stopOpacity="0.9" />
                      </linearGradient>
                    </defs>

                    {/* Subtle Base Dotted Tracks */}
                    <path
                      d="M 10 200 C 140 200, 220 56, 350 56"
                      stroke="#E2E8F0"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />
                    <path
                      d="M 10 200 C 140 200, 220 200, 350 200"
                      stroke="#E2E8F0"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />
                    <path
                      d="M 10 200 C 140 200, 220 344, 350 344"
                      stroke="#E2E8F0"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />

                    {/* Active Gradient Conduit Overlays */}
                    <path
                      d="M 10 200 C 140 200, 220 56, 350 56"
                      stroke="url(#streamGradTop)"
                      strokeWidth="2.5"
                      strokeDasharray="8 6"
                      className="opacity-70"
                      style={{
                        strokeDashoffset: `${-rmsScrollProgress * 140}px`,
                        transition: "stroke-dashoffset 0.1s linear"
                      }}
                    />
                    <path
                      d="M 10 200 C 140 200, 220 200, 350 200"
                      stroke="url(#streamGradMid)"
                      strokeWidth="2.5"
                      strokeDasharray="8 6"
                      className="opacity-70"
                      style={{
                        strokeDashoffset: `${-rmsScrollProgress * 140}px`,
                        transition: "stroke-dashoffset 0.1s linear"
                      }}
                    />
                    <path
                      d="M 10 200 C 140 200, 220 344, 350 344"
                      stroke="url(#streamGradBot)"
                      strokeWidth="2.5"
                      strokeDasharray="8 6"
                      className="opacity-70"
                      style={{
                        strokeDashoffset: `${-rmsScrollProgress * 140}px`,
                        transition: "stroke-dashoffset 0.1s linear"
                      }}
                    />
                  </svg>

                  {/* FLOATING REQUIREMENT CONTENT TOKENS (Continuous Flow, Fade-in on Left, Fade-out on Right) */}
                  <div className="relative w-full h-full overflow-hidden pointer-events-none">
                    {[
                      {
                        id: "req-1",
                        path: "top",
                        title: "[REQ-01] ASIL-D Brake Torque < 150ms",
                        format: ".reqif",
                        dotColor: "bg-[#0F62FE]",
                        badgeBg: "bg-blue-50 text-[#0F62FE] border-blue-100",
                        borderStyle: "border-blue-200/90",
                        offset: 0.0
                      },
                      {
                        id: "req-2",
                        path: "mid",
                        title: "[REQ-02] CAN-FD Latency <= 5ms",
                        format: "OSLC",
                        dotColor: "bg-[#0043CE]",
                        badgeBg: "bg-indigo-50 text-[#0043CE] border-indigo-100",
                        borderStyle: "border-indigo-200/90",
                        offset: 0.17
                      },
                      {
                        id: "req-3",
                        path: "bot",
                        title: "[REQ-03] Temp Range -40°C..+125°C",
                        format: "LiveDoc",
                        dotColor: "bg-[#0D9488]",
                        badgeBg: "bg-teal-50 text-[#0D9488] border-teal-100",
                        borderStyle: "border-teal-200/90",
                        offset: 0.34
                      },
                      {
                        id: "req-4",
                        path: "top",
                        title: "[SEC-04] Cryptographic Key Storage",
                        format: ".dxl",
                        dotColor: "bg-[#0F62FE]",
                        badgeBg: "bg-blue-50 text-[#0F62FE] border-blue-100",
                        borderStyle: "border-blue-200/90",
                        offset: 0.51
                      },
                      {
                        id: "req-5",
                        path: "mid",
                        title: "[V&V-05] Verification Trace Matrix",
                        format: ".reqifz",
                        dotColor: "bg-[#0043CE]",
                        badgeBg: "bg-indigo-50 text-[#0043CE] border-indigo-100",
                        borderStyle: "border-indigo-200/90",
                        offset: 0.68
                      },
                      {
                        id: "req-6",
                        path: "bot",
                        title: "[SYS-06] Fail-Operational Steering",
                        format: ".reqifz",
                        dotColor: "bg-[#0D9488]",
                        badgeBg: "bg-teal-50 text-[#0D9488] border-teal-100",
                        borderStyle: "border-teal-200/90",
                        offset: 0.85
                      }
                    ].map((token) => {
                      const p = (rmsScrollProgress + token.offset) % 1.0;
                      // Horizontal position: flows from left (6%) to right (86%)
                      const posX = 6 + p * 80;

                      // Vertical position follows conduit curves:
                      // top path: 50% down to 14%
                      // mid path: 50%
                      // bot path: 50% up to 86%
                      const curve = Math.sin(p * Math.PI * 0.5);
                      let posY = 50;
                      if (token.path === "top") posY = 50 - curve * 36;
                      if (token.path === "bot") posY = 50 + curve * 36;

                      // Smooth fade-in as it leaves PDF (0 to 0.15)
                      // Full opacity across the middle (0.15 to 0.76)
                      // Smooth fade-out as it enters RMS (0.76 to 1.0)
                      let opacity = 1;
                      let scale = 1;
                      if (p < 0.15) {
                        opacity = Math.max(0, p / 0.15);
                        scale = 0.8 + (p / 0.15) * 0.2;
                      } else if (p > 0.76) {
                        opacity = Math.max(0, (1 - p) / 0.24);
                        scale = 1.0 - ((p - 0.76) / 0.24) * 0.15;
                      }

                      return (
                        <div
                          key={token.id}
                          className="absolute z-20 transition-transform duration-75 ease-out"
                          style={{
                            left: `${posX}%`,
                            top: `${posY}%`,
                            transform: `translate(-50%, -50%) scale(${scale})`,
                            opacity: opacity
                          }}
                        >
                          <div className={`bg-white/95 backdrop-blur-md border ${token.borderStyle} shadow-md rounded-lg px-2.5 py-1.5 flex items-center gap-2 whitespace-nowrap`}>
                            <span className={`w-2 h-2 rounded-full ${token.dotColor} animate-pulse`} />
                            <span className="text-[11px] font-mono font-bold text-[#1A1A1A]">
                              {token.title}
                            </span>
                            <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold border ${token.badgeBg}`}>
                              {token.format}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* RIGHT: TOP 3 RMS DESTINATION PLATFORMS (Cols 10-12) */}
                <div className="md:col-span-3 flex flex-col justify-between h-[400px] py-1">
                  {/* RMS 1: IBM DOORS Classic */}
                  <div
                    onClick={() => setSelectedRms("doors-classic")}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer bg-white shadow-xs group flex items-center gap-4 relative overflow-hidden ${
                      selectedRms === "doors-classic"
                        ? "border-[#0F62FE] ring-2 ring-[#0F62FE]/20 shadow-md"
                        : "border-[#E6E2DE] hover:border-[#0F62FE]/50"
                    }`}
                  >
                    {/* Active receiving glow */}
                    <div
                      className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#0F62FE] transition-all"
                      style={{ opacity: rmsScrollProgress > 0.4 ? 1 : 0.3 }}
                    />

                    {/* Big Icon */}
                    <div className="w-14 h-14 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0F62FE] shrink-0 group-hover:scale-105 transition-transform">
                      <Database size={28} strokeWidth={1.8} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4 className="font-heading font-bold text-base text-[#1A1A1A] truncate">
                        IBM DOORS
                      </h4>
                    </div>
                  </div>

                  {/* RMS 2: IBM DOORS Next / ELM */}
                  <div
                    onClick={() => setSelectedRms("doors-next")}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer bg-white shadow-xs group flex items-center gap-4 relative overflow-hidden ${
                      selectedRms === "doors-next"
                        ? "border-[#0043CE] ring-2 ring-[#0043CE]/20 shadow-md"
                        : "border-[#E6E2DE] hover:border-[#0043CE]/50"
                    }`}
                  >
                    {/* Active receiving glow */}
                    <div
                      className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#0043CE] transition-all"
                      style={{ opacity: rmsScrollProgress > 0.5 ? 1 : 0.3 }}
                    />

                    {/* Big Icon */}
                    <div className="w-14 h-14 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[#0043CE] shrink-0 group-hover:scale-105 transition-transform">
                      <Layers size={28} strokeWidth={1.8} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4 className="font-heading font-bold text-base text-[#1A1A1A] truncate">
                        DOORS Next
                      </h4>
                    </div>
                  </div>

                  {/* RMS 3: Siemens Polarion ALM */}
                  <div
                    onClick={() => setSelectedRms("polarion")}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer bg-white shadow-xs group flex items-center gap-4 relative overflow-hidden ${
                      selectedRms === "polarion"
                        ? "border-[#0D9488] ring-2 ring-[#0D9488]/20 shadow-md"
                        : "border-[#E6E2DE] hover:border-[#0D9488]/50"
                    }`}
                  >
                    {/* Active receiving glow */}
                    <div
                      className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#0D9488] transition-all"
                      style={{ opacity: rmsScrollProgress > 0.45 ? 1 : 0.3 }}
                    />

                    {/* Big Icon */}
                    <div className="w-14 h-14 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-[#0D9488] shrink-0 group-hover:scale-105 transition-transform">
                      <Cpu size={28} strokeWidth={1.8} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4 className="font-heading font-bold text-base text-[#1A1A1A] truncate">
                        Polarion ALM
                      </h4>
                    </div>
                  </div>
                </div>
              </div>

              {/* ---------------------------------------------------------------------
                  MOBILE VIEW: VERTICAL CASCADE (PDF TOP -> STREAM -> 3 RMS BOTTOM)
                  --------------------------------------------------------------------- */}
              <div className="relative z-10 md:hidden flex flex-col gap-4">
                {/* PDF Top */}
                <div className="p-4 rounded-2xl bg-[#FDFCFB] border border-[#E6E2DE] shadow-xs flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-14 rounded-xl bg-white border-2 border-rose-200 text-rose-600 flex flex-col items-center justify-center shrink-0 shadow-xs p-1">
                      <FileText size={20} className="mb-0.5" />
                      <span className="text-[8px] font-mono font-black uppercase text-rose-600">
                        PDF
                      </span>
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-sm text-[#1A1A1A]">
                        Engineering PDF
                      </h3>
                      <p className="text-[11px] font-mono text-[#4B7B7B]">
                        Source Specification
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200/70 text-[10px] font-mono font-semibold text-rose-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                    STREAMING
                  </div>
                </div>

                {/* Mobile Traveling Content Tokens in Vertical Conduit Track */}
                <div className="relative h-72 sm:h-80 rounded-2xl bg-gradient-to-b from-[#FAF8F5] via-white to-[#FAF8F5] border border-[#E6E2DE] overflow-hidden p-3 shadow-inner">
                  {/* Vertical Conduit Guide Rail & Moving Pulse Beam */}
                  <div className="absolute left-6 top-0 bottom-0 w-8 pointer-events-none flex flex-col items-center">
                    <div className="w-0.5 h-full bg-[#E2E8F0] relative">
                      {/* Animated gradient pulse flowing downwards */}
                      <div
                        className="absolute inset-x-0 w-full bg-gradient-to-b from-transparent via-[#4B7B7B] to-transparent h-24"
                        style={{
                          top: `${(rmsScrollProgress % 1.0) * 100}%`,
                          transform: "translateY(-50%)"
                        }}
                      />
                    </div>
                  </div>

                  {/* Flow direction indicator badge */}
                  <div className="absolute right-3 top-3 text-[9px] font-mono uppercase tracking-widest text-[#4B7B7B] bg-[#4B7B7B]/10 px-2 py-0.5 rounded-md flex items-center gap-1 z-10 pointer-events-none">
                    <span>Continuous Flow</span>
                    <ArrowDown size={10} className="animate-bounce" />
                  </div>

                  {/* Vertically Traveling Requirement Packets (Downward Motion) */}
                  {[
                    {
                      id: "m-req-1",
                      title: "[REQ-01] ASIL-D Brake Torque",
                      format: ".reqif",
                      target: "IBM DOORS",
                      color: "#0F62FE",
                      badgeBg: "bg-blue-50 text-[#0F62FE] border-blue-200",
                      dotBg: "bg-[#0F62FE]",
                      offset: 0.0
                    },
                    {
                      id: "m-req-2",
                      title: "[REQ-02] CAN-FD Latency <= 5ms",
                      format: "OSLC",
                      target: "DOORS Next",
                      color: "#0043CE",
                      badgeBg: "bg-indigo-50 text-[#0043CE] border-indigo-200",
                      dotBg: "bg-[#0043CE]",
                      offset: 0.333
                    },
                    {
                      id: "m-req-3",
                      title: "[REQ-03] Temp -40°C..+125°C",
                      format: "ReqIF 1.2",
                      target: "Polarion ALM",
                      color: "#0D9488",
                      badgeBg: "bg-teal-50 text-[#0D9488] border-teal-200",
                      dotBg: "bg-[#0D9488]",
                      offset: 0.666
                    }
                  ].map((item) => {
                    const p = (rmsScrollProgress + item.offset) % 1.0;
                    // Token physical vertical position (travels downward from 6% to 84%)
                    const topPercent = p * 78 + 6;

                    // Smooth fade-in at top and fade-out at bottom
                    let opacity = 1;
                    let scale = 1;
                    if (p < 0.16) {
                      const ratio = p / 0.16;
                      opacity = ratio;
                      scale = 0.88 + ratio * 0.12;
                    } else if (p > 0.82) {
                      const ratio = (1 - p) / 0.18;
                      opacity = Math.max(0, ratio);
                      scale = 0.92 + ratio * 0.08;
                    }

                    return (
                      <div
                        key={item.id}
                        className="absolute left-3 right-3 p-2.5 rounded-xl bg-white border shadow-xs flex items-center justify-between text-xs font-mono select-none"
                        style={{
                          top: `${topPercent}%`,
                          transform: `translateY(-50%) scale(${scale})`,
                          opacity: opacity,
                          borderColor: item.color + "45",
                          boxShadow: `0 4px 14px ${item.color}15`
                        }}
                      >
                        {/* Rail connector node */}
                        <div className="flex items-center gap-2.5 truncate">
                          <span
                            className={`w-2.5 h-2.5 rounded-full ${item.dotBg} ring-2 ring-white shadow-xs shrink-0`}
                          />
                          <div className="min-w-0">
                            <span className="text-[11px] font-bold text-[#1A1A1A] truncate block">
                              {item.title}
                            </span>
                            <span className="text-[9px] text-[#1A1A1A]/50">
                              to {item.target}
                            </span>
                          </div>
                        </div>

                        <span
                          className={`text-[9px] px-2 py-0.5 rounded font-bold border shrink-0 ${item.badgeBg}`}
                        >
                          {item.format}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* 3 RMS Bottom */}
                <div className="space-y-2.5">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#1A1A1A]/50 px-1 font-semibold flex items-center justify-between">
                    <span>Target RMS Platforms</span>
                    <span className="text-[#4B7B7B] text-[10px]">Ready to Import</span>
                  </div>

                  {/* DOORS Classic */}
                  <div className="p-3.5 rounded-xl bg-white border border-[#E6E2DE] shadow-xs flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#0F62FE] flex items-center justify-center shrink-0">
                      <Database size={20} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="font-heading font-bold text-sm text-[#1A1A1A]">
                        IBM DOORS
                      </span>
                    </div>
                  </div>

                  {/* DOORS Next */}
                  <div className="p-3.5 rounded-xl bg-white border border-[#E6E2DE] shadow-xs flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-indigo-50 text-[#0043CE] flex items-center justify-center shrink-0">
                      <Layers size={20} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="font-heading font-bold text-sm text-[#1A1A1A]">
                        DOORS Next
                      </span>
                    </div>
                  </div>

                  {/* Polarion */}
                  <div className="p-3.5 rounded-xl bg-white border border-[#E6E2DE] shadow-xs flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-teal-50 text-[#0D9488] flex items-center justify-center shrink-0">
                      <Cpu size={20} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="font-heading font-bold text-sm text-[#1A1A1A]">
                        Polarion ALM
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            05 — INDUSTRIES
            ========================================================================= */}
        <section
          id="industries"
          className="relative py-24 md:py-32 px-6 overflow-hidden bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/prism-bg-1.jpg')"
          }}
        >
          {/* Background image covering entire section */}
          <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            <img
              src="/prism-bg-1.jpg"
              alt="Prism Background"
              className="w-full h-full object-cover object-center"
            />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-16 p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl bg-black/45 backdrop-blur-md border border-white/15 shadow-2xl shadow-black/30">
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-serif-display font-extrabold tracking-tight leading-tight text-balance drop-shadow-md text-white"
                style={{ color: "#ffffff" }}
              >
                Built for engineering teams across industries.
              </h2>
              <p
                className="mt-4 text-base sm:text-lg font-sans font-normal leading-relaxed text-balance drop-shadow-sm text-slate-100"
                style={{ color: "#F3F4F6" }}
              >
                PRISM (PDF2ReqIf) extracts requirements from dense regulatory specifications into ready-to-import formats, saving engineering teams over 80% time across mission-critical industries:
              </p>
            </div>

            {/* 4 Industries Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Industry 1: Automotive & ADAS */}
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 border border-[#E6E2DE] shadow-sm hover:border-[#4B7B7B]/50 hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                  <Car size={20} />
                </div>
                <h3 className="font-heading font-bold text-base text-[#1A1A1A] mb-1">
                  Automotive &amp; ADAS
                </h3>
                <p className="text-xs text-[#1A1A1A]/70 font-sans leading-relaxed mb-3">
                  Radar, camera perception, autonomous braking, and drive-by-wire specs.
                </p>
                <div className="pt-3 border-t border-[#E6E2DE] text-[10px] font-mono text-[#4B7B7B]">
                  ISO 26262 &bull; ASIL A–D
                </div>
              </div>

              {/* Industry 2: Aerospace & Defense */}
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 border border-[#E6E2DE] shadow-sm hover:border-[#4B7B7B]/50 hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center mb-4">
                  <Plane size={20} />
                </div>
                <h3 className="font-heading font-bold text-base text-[#1A1A1A] mb-1">
                  Aerospace &amp; Defense
                </h3>
                <p className="text-xs text-[#1A1A1A]/70 font-sans leading-relaxed mb-3">
                  Flight management, mission avionics, radar cross-sections, and telemetry.
                </p>
                <div className="pt-3 border-t border-[#E6E2DE] text-[10px] font-mono text-[#4B7B7B]">
                  DO-178C &bull; DO-254
                </div>
              </div>

              {/* Industry 3: Medical Devices */}
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 border border-[#E6E2DE] shadow-sm hover:border-[#4B7B7B]/50 hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
                  <HeartPulse size={20} />
                </div>
                <h3 className="font-heading font-bold text-base text-[#1A1A1A] mb-1">
                  Medical Devices
                </h3>
                <p className="text-xs text-[#1A1A1A]/70 font-sans leading-relaxed mb-3">
                  Robotic surgical units, diagnostic imaging, and therapeutic systems.
                </p>
                <div className="pt-3 border-t border-[#E6E2DE] text-[10px] font-mono text-[#4B7B7B]">
                  IEC 62304 &bull; FDA 21 CFR
                </div>
              </div>

              {/* Industry 4: Industrial Automation */}
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 border border-[#E6E2DE] shadow-sm hover:border-[#4B7B7B]/50 hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                  <Factory size={20} />
                </div>
                <h3 className="font-heading font-bold text-base text-[#1A1A1A] mb-1">
                  Industrial Automation
                </h3>
                <p className="text-xs text-[#1A1A1A]/70 font-sans leading-relaxed mb-3">
                  PLCs, robotics controllers, plant telemetry, and hazardous environment systems.
                </p>
                <div className="pt-3 border-t border-[#E6E2DE] text-[10px] font-mono text-[#4B7B7B]">
                  IEC 61508 &bull; SIL 1–4
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            06 — DEPLOYMENT ARCHITECTURE
            ========================================================================= */}
        <section id="deployment" className="py-24 md:py-32 px-6 bg-[#F7F5F2] border-t border-b border-[#E6E2DE]">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E6E2DE] text-xs font-mono font-semibold uppercase tracking-[0.2em] text-[#4B7B7B] mb-4 shadow-2xs">
                Deployment Architecture
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-display font-extrabold text-[#1A1A1A] tracking-tight leading-tight text-balance">
                Deploy on your terms: on-premises or scalable cloud.
              </h2>
              <p className="mt-4 text-base sm:text-lg text-[#1A1A1A]/70 font-sans font-light leading-relaxed text-balance">
                Whether you require complete air-gapped isolation with zero data egress for ITAR environments or rapid cloud processing, PRISM (PDF2ReqIf) fits your security and infrastructure needs.
              </p>
            </div>

            {/* Deployment Options Side-by-Side (Comparison Cards) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {/* Option 1: Local / On-Premises */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E6E2DE] shadow-sm hover:border-[#4B7B7B]/40 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 text-[#1A1A1A] flex items-center justify-center">
                      <HardDrive size={20} />
                    </div>
                  </div>
                  <h3 className="font-heading font-bold text-xl text-[#1A1A1A] mb-2">
                    Local / On-Premises
                  </h3>
                  <p className="text-sm text-[#1A1A1A]/70 font-sans leading-relaxed mb-4">
                    Zero data egress, air-gapped environments, local VLM execution.
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E6E2DE] font-mono text-xs text-[#1A1A1A]/60 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-emerald-600" />
                    <span>Quantized 4-bit local VLM via Vulkan / llama.cpp</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-emerald-600" />
                    <span>Fits in 600 MB RAM on standard workstations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-emerald-600" />
                    <span>ITAR &amp; classified engineering network compliant</span>
                  </div>
                </div>
              </div>

              {/* Option 2: Cloud & Hybrid */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E6E2DE] shadow-sm hover:border-[#4B7B7B]/40 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Cloud size={20} />
                    </div>
                  </div>
                  <h3 className="font-heading font-bold text-xl text-[#1A1A1A] mb-2">
                    Cloud &amp; Hybrid
                  </h3>
                  <p className="text-sm text-[#1A1A1A]/70 font-sans leading-relaxed mb-4">
                    Fast, scalable document processing powered by Google Gemini.
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E6E2DE] font-mono text-xs text-[#1A1A1A]/60 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-emerald-600" />
                    <span>Sub-second page throughput with multimodal reasoning</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-emerald-600" />
                    <span>Massive multi-page specification batches in parallel</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-emerald-600" />
                    <span>Zero local GPU required; seamless API key integration</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            06 — FINAL CTA
            ========================================================================= */}
        <section className="py-24 md:py-32 px-6 bg-[#12161A] text-white relative overflow-hidden">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#4B7B7B]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
            <span className="text-xs font-mono uppercase tracking-[0.24em] text-[#4B7B7B] font-semibold mb-4">
              Get Started with PRISM (PDF2ReqIf)
            </span>

            {/* Headline */}
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif-display font-extrabold text-white tracking-tight leading-[1.1] text-balance">
              Ready to save 80%+ time on your RMS requirements import?
            </h2>

            {/* Supporting Text */}
            <p className="mt-5 text-base sm:text-lg text-white/70 font-sans font-light leading-relaxed max-w-xl text-balance">
              See how PRISM (PDF2ReqIf) extracts all requirements from engineering PDFs and delivers ready-to-import formats directly into your RMS in minutes.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <a
                href={demoMailtoUrl}
                className="w-full sm:w-auto px-8 py-4 text-xs font-mono uppercase tracking-[0.2em] font-semibold text-[#12161A] bg-white hover:bg-slate-100 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-2.5 no-underline shadow-lg group"
              >
                <Mail size={15} className="text-[#4B7B7B]" />
                <span>Request a Demo</span>
                <ArrowRight size={14} className="text-[#4B7B7B] group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
