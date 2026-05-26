import { motion, useSpring, useMotionValue, useScroll, useTransform, AnimatePresence } from "motion/react";
import { ArrowRight, Box as BoxIcon, Cpu, Workflow, Zap, Banknote, Clock, Database, LineChart, Mail, Menu, X, Wand2, Settings, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, CheckCircle2, User, Sparkles, Network } from "lucide-react";
import { useRef, useMemo, Suspense, useEffect, useState } from "react";

// --- STYLISH SYSTEMS CONSTELLATION ---

function WorkflowConstellation() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  const mouse = useRef({ x: 0, y: 0 });
  const mouseTarget = useRef({ x: 0, y: 0 });

  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" ? window.innerWidth < 768 : false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseTarget.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseTarget.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    resize();

    let time = 0;

    const render = () => {
      time += 1;
      
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse coordinates with trailing damping
      mouse.current.x += (mouseTarget.current.x - mouse.current.x) * 0.06;
      mouse.current.y += (mouseTarget.current.y - mouse.current.y) * 0.06;

      const isMobile = width < 768;
      const colsCount = isMobile ? 6 : 10;
      const rowsCount = isMobile ? 8 : 6;

      const marginX = isMobile ? 32 : 60;
      const marginY = isMobile ? 32 : 60;

      const gridWidth = width - marginX * 2;
      const gridHeight = height - marginY * 2;

      const colWidth = gridWidth / colsCount;
      const rowHeight = gridHeight / rowsCount;

      // Coordinate systems grid (checked pattern over entire page)
      ctx.strokeStyle = "rgba(75, 123, 123, 0.16)";
      ctx.lineWidth = 1.0;
      for (let c = 0; c <= colsCount; c++) {
        const x = marginX + c * colWidth;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let r = 0; r <= rowsCount; r++) {
        const y = marginY + r * rowHeight;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Intersecting nodes grid details (+) over entire page
      ctx.fillStyle = "rgba(75, 123, 123, 0.42)";
      for (let c = 0; c <= colsCount; c++) {
        for (let r = 0; r <= rowsCount; r++) {
          const x = marginX + c * colWidth;
          const y = marginY + r * rowHeight;
          ctx.fillRect(x - 5, y - 1, 10, 2);
          ctx.fillRect(x - 1, y - 5, 2, 10);
        }
      }

      // Compute Orcin logo target coordinates dynamically
      const navPaddingY = isMobile ? 16 : 20; // p-4 vs p-5
      const py = 10; // py-2.5 is 10px
      const px = isMobile ? 24 : 40; // px-6 vs px-10
      const containerLeft = width > 1280 ? (width - 1280) / 2 : 0;
      const logoX = containerLeft + px + 16; // 16px is half of w-8 logo
      const logoY = navPaddingY + py + 16; // 16px is half of h-8 logo

      // Subtle glow directly behind the central intelligence unit (Orcin Logo)
      const pulseLogo = Math.sin(time * 0.025) * 0.15 + 1.0;
      const logoGlowRad = 45 * pulseLogo;
      const logoRadialGrad = ctx.createRadialGradient(logoX, logoY, 0, logoX, logoY, logoGlowRad);
      logoRadialGrad.addColorStop(0, "rgba(75, 123, 123, 0.22)");
      logoRadialGrad.addColorStop(0.5, "rgba(75, 123, 123, 0.08)");
      logoRadialGrad.addColorStop(1, "rgba(75, 123, 123, 0)");
      ctx.fillStyle = logoRadialGrad;
      ctx.beginPath();
      ctx.arc(logoX, logoY, logoGlowRad, 0, Math.PI * 2);
      ctx.fill();

      // Draw custom data flow running from beyond the screen strictly following grid lines to the logo in the navbar
      const flows = [
        {
          points: [
            { x: -50, y: marginY + 2 * rowHeight },
            { x: marginX + 1 * colWidth, y: marginY + 2 * rowHeight },
            { x: marginX + 1 * colWidth, y: logoY },
            { x: logoX, y: logoY }
          ]
        },
        {
          points: [
            { x: width + 50, y: marginY + 3 * rowHeight },
            { x: marginX + (colsCount - 2) * colWidth, y: marginY + 3 * rowHeight },
            { x: marginX + (colsCount - 2) * colWidth, y: logoY },
            { x: logoX, y: logoY }
          ]
        },
        {
          points: [
            { x: -50, y: marginY + 5 * rowHeight },
            { x: marginX + 2 * colWidth, y: marginY + 5 * rowHeight },
            { x: marginX + 2 * colWidth, y: logoY },
            { x: logoX, y: logoY }
          ]
        },
        {
          points: [
            { x: width + 50, y: marginY + 5 * rowHeight },
            { x: marginX + (colsCount - 2) * colWidth, y: marginY + 5 * rowHeight },
            { x: marginX + (colsCount - 2) * colWidth, y: logoY },
            { x: logoX, y: logoY }
          ]
        },
        {
          points: [
            { x: marginX + 2 * colWidth, y: height + 50 },
            { x: marginX + 2 * colWidth, y: logoY },
            { x: logoX, y: logoY }
          ]
        },
        {
          points: [
            { x: marginX + (colsCount - 3) * colWidth, y: height + 50 },
            { x: marginX + (colsCount - 3) * colWidth, y: logoY },
            { x: logoX, y: logoY }
          ]
        }
      ];

      flows.forEach((flow, flowIdx) => {
        const packetCount = 2;
        for (let pNum = 0; pNum < packetCount; pNum++) {
          const speedMultiplier = isMobile ? 1.3 : 1.0;
          const progress = ((time * 0.0022 * speedMultiplier) + (pNum / packetCount) + (flowIdx * 0.15)) % 1.0;
          
          const segments: { x1: number, y1: number, x2: number, y2: number, len: number }[] = [];
          let totalLen = 0;
          for (let i = 0; i < flow.points.length - 1; i++) {
            const p1 = flow.points[i];
            const p2 = flow.points[i + 1];
            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const len = Math.sqrt(dx * dx + dy * dy);
            segments.push({ x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y, len });
            totalLen += len;
          }

          if (totalLen === 0) continue;

          const targetDist = progress * totalLen;
          let currentDist = 0;
          let currentX = flow.points[0].x;
          let currentY = flow.points[0].y;

          for (const seg of segments) {
            if (targetDist >= currentDist && targetDist <= currentDist + seg.len) {
              const ratio = seg.len > 0 ? (targetDist - currentDist) / seg.len : 0;
              currentX = seg.x1 + (seg.x2 - seg.x1) * ratio;
              currentY = seg.y1 + (seg.y2 - seg.y1) * ratio;
              break;
            }
            currentDist += seg.len;
          }

          const trailLength = 6;
          for (let tIdx = 0; tIdx < trailLength; tIdx++) {
            const trailProgress = Math.max(0, progress - tIdx * 0.035);
            const trailTargetDist = trailProgress * totalLen;
            let trDist = 0;
            let trX = flow.points[0].x;
            let trY = flow.points[0].y;

            for (const seg of segments) {
              if (trailTargetDist >= trDist && trailTargetDist <= trDist + seg.len) {
                const ratio = seg.len > 0 ? (trailTargetDist - trDist) / seg.len : 0;
                trX = seg.x1 + (seg.x2 - seg.x1) * ratio;
                trY = seg.y1 + (seg.y2 - seg.y1) * ratio;
                break;
              }
              trDist += seg.len;
            }

            const alpha = (1.0 - tIdx / trailLength) * (1.0 - progress) * 0.45;
            ctx.fillStyle = `rgba(75, 123, 123, ${alpha})`;
            ctx.beginPath();
            ctx.arc(trX, trY, 3.2 - tIdx * 0.5, 0, Math.PI * 2);
            ctx.fill();
          }

          ctx.fillStyle = `rgba(75, 123, 123, ${(1.0 - progress) * 0.8})`;
          ctx.beginPath();
          ctx.arc(currentX, currentY, 3.8, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, []);


  return (
    <div ref={containerRef} className="w-full h-full absolute inset-0 pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full block opacity-95" />
    </div>
  );
}

// --- ESTIMATOR BACKGROUND GRID ---

function EstimatorGrid() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  const mouse = useRef({ x: 0, y: 0 });
  const mouseTarget = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseTarget.current.x = (x / rect.width) * 2 - 1;
      mouseTarget.current.y = (y / rect.height) * 2 - 1;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    resize();

    let time = 0;

    const render = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse coordinates with trailing damping
      mouse.current.x += (mouseTarget.current.x - mouse.current.x) * 0.05;
      mouse.current.y += (mouseTarget.current.y - mouse.current.y) * 0.05;

      const isMobile = width < 768;
      const colsCount = isMobile ? 6 : 10;
      const rowsCount = isMobile ? 6 : 5;

      const marginX = isMobile ? 24 : 48;
      const marginY = isMobile ? 24 : 48;

      const gridWidth = width - marginX * 2;
      const gridHeight = height - marginY * 2;

      const colWidth = gridWidth / colsCount;
      const rowHeight = gridHeight / rowsCount;

      // Coordinate systems grid (identical to WorkflowConstellation style)
      ctx.strokeStyle = "rgba(75, 123, 123, 0.12)";
      ctx.lineWidth = 1.0;
      for (let c = 0; c <= colsCount; c++) {
        const x = marginX + c * colWidth;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let r = 0; r <= rowsCount; r++) {
        const y = marginY + r * rowHeight;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Intersecting nodes grid details (+) over estimator bg
      ctx.fillStyle = "rgba(75, 123, 123, 0.35)";
      for (let c = 0; c <= colsCount; c++) {
        for (let r = 0; r <= rowsCount; r++) {
          const x = marginX + c * colWidth;
          const y = marginY + r * rowHeight;
          ctx.fillRect(x - 4, y - 1, 8, 2);
          ctx.fillRect(x - 1, y - 4, 2, 8);
        }
      }

      // Elegant pulse movement in columns to mimic the intelligence lines in hero
      ctx.strokeStyle = "rgba(75, 123, 123, 0.25)";
      ctx.lineWidth = 1.5;
      const activeCols = [1, colsCount - 1, 3];
      activeCols.forEach((colIdx) => {
        if (colIdx >= 0 && colIdx <= colsCount) {
          const colX = marginX + colIdx * colWidth;
          const progress = (time * 0.002 + colIdx * 0.2) % 1;
          const gradY = progress * height;
          const grad = ctx.createLinearGradient(colX, gradY - 120, colX, gradY + 120);
          grad.addColorStop(0, "rgba(75, 123, 123, 0)");
          grad.addColorStop(0.5, "rgba(75, 123, 123, 0.35)");
          grad.addColorStop(1, "rgba(75, 123, 123, 0)");
          ctx.strokeStyle = grad;
          ctx.beginPath();
          ctx.moveTo(colX, 0);
          ctx.lineTo(colX, height);
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full absolute inset-0 pointer-events-none opacity-80">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}

// --- PROGRESSIVE STORY COMPONENTS ---

function StorySection() {
  const [sliderVal, setSliderVal] = useState(35); // Initial value e.g. 35%
  const [estimateScale, setEstimateScale] = useState(1);
  const prevSliderValRef = useRef(sliderVal);
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" ? window.innerWidth < 768 : false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const hTopVal = isMobile ? 36 : 48;
  const hTopHalf = hTopVal / 2;

  // Compute smooth continuous savings based on a sleek quadratic curve starting at 0 and ending at 35000
  const roundedSavings = useMemo(() => {
    const minSavings = 0;
    const maxSavings = 35000;
    const ratio = sliderVal / 100;
    // Curved projection for compounding dividends
    const calculated = minSavings + ratio * ratio * (maxSavings - minSavings);
    return Math.round(calculated / 50) * 50;
  }, [sliderVal]);

  // Adjust container scale on value change
  useEffect(() => {
    const prev = prevSliderValRef.current;
    if (sliderVal === prev) return;
    const diff = sliderVal - prev;
    prevSliderValRef.current = sliderVal;

    if (diff > 0) {
      setEstimateScale(1.05);
      const timer = setTimeout(() => setEstimateScale(1), 100);
      return () => clearTimeout(timer);
    } else {
      setEstimateScale(0.95);
      const timer = setTimeout(() => setEstimateScale(1), 100);
      return () => clearTimeout(timer);
    }
  }, [sliderVal]);

  return (
    <section 
      id="estimator" 
      className="relative overflow-hidden pt-16 pb-24 md:pt-20 md:pb-28 border-b border-graphite/10 border-t border-graphite/10 bg-sand transition-all duration-150 ease-out"
    >
      <div className="w-full max-w-3xl mx-auto px-6 flex flex-col items-center relative z-20">
        
        {/* Header content */}
        <div className="text-center mb-10 max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-serif-display font-extrabold text-graphite tracking-tight leading-tight text-balance">
            Simulate your impact with <span className="text-teal italic">Orcin&apos;s capabilities.</span>
          </h2>
          <p className="text-slate/60 text-sm md:text-base leading-relaxed font-sans font-light mt-3 max-w-lg mx-auto">
            Slide the control below to estimate the impact of automating work from humble adjustments to aggressive intelligence systems.
          </p>
        </div>

        {/* Flat Calculator Board */}
        <div className="w-full relative flex flex-col items-center">
          
          {/* 3D Isometric Accent-Teal Cuboid Pillar */}
          <div className="absolute left-1/2 -translate-x-1/2 w-[260px] sm:w-[330px] md:w-[400px] top-[105px] sm:top-[125px] md:top-[135px] bottom-[-300px] sm:bottom-[-350px] z-10 pointer-events-none flex flex-col items-center">
            
            {/* Top Face (Diamond with reflective gloss sheen) */}
            <div 
              className="w-full absolute top-0 left-0 z-20 bg-gradient-to-tr from-[#315454] via-[#487171] to-[#639494] shadow-[inset_0_2px_4px_rgba(255,255,255,0.45),0_6px_24px_rgba(15,35,35,0.25)] border-b border-white/10"
              style={{ 
                height: `${hTopVal}px`,
                clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" 
              }}
            >
              {/* Inner bevel layer inside top face */}
              <div 
                className="absolute inset-[1.5px] bg-gradient-to-tr from-[#365C5C] to-[#518585]/40 opacity-90"
                style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
              />
              {/* Highlight flare on the leading corner */}
              <div 
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/25 blur-lg rounded-full"
              />
            </div>

            {/* Pillar Sides Container */}
            <div 
              className="w-full flex-1 relative z-10"
              style={{ marginTop: `${hTopHalf}px` }}
            >
              {/* Left Side (Light source facing - luxurious gradient teal transition) */}
              <div 
                className="absolute left-0 top-0 w-1/2 h-full bg-gradient-to-b from-[#558484] via-[#416B6B] to-[#2E4A4A] border-l border-white/15"
                style={{ clipPath: `polygon(0% 0px, 100% ${hTopHalf}px, 100% 100%, 0% 100%)` }}
              >
                {/* Specular mirror sheen */}
                <div className="absolute top-0 bottom-0 left-[15%] w-[12%] bg-gradient-to-r from-white/15 to-transparent mix-blend-overlay filter blur-[1px]" />
              </div>

              {/* Right Side (Shadowed side - high-contrast deep twilight teal) */}
              <div 
                className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-b from-[#2E4747] via-[#203131] to-[#121F1F] border-r border-black/25"
                style={{ clipPath: `polygon(0% ${hTopHalf}px, 100% 0px, 100% 100%, 0% 100%)` }}
              >
                {/* Deeper occlusion shadow on the far right */}
                <div className="absolute top-0 bottom-0 right-0 w-[40%] bg-gradient-to-l from-black/25 to-transparent" />
              </div>

              {/* Glowing Beveled Front Corner Edge - Facing the user directly */}
              <div 
                className="absolute left-1/2 -translate-x-1/2 top-0 w-[2px] h-full bg-gradient-to-b from-white/45 via-teal-200/15 to-transparent z-25 shadow-[0_0_8px_rgba(255,255,255,0.35)]"
                style={{ top: `${hTopHalf}px` }}
              />
            </div>

            {/* Floating shadow projection under estimated savings on top face */}
            <div 
              className="absolute -top-[12px] sm:-top-[16px] w-[140px] sm:w-[180px] h-5 bg-teal-900/40 blur-md rounded-full mix-blend-multiply opacity-80 scale-x-105"
            />
          </div>


          {/* Big live money display hovering elegantly on top of the monumental pillar background */}
          <div className="text-center relative select-none w-full max-w-full flex flex-col items-center pt-4 mb-4 sm:mb-6 z-20">
            <span className="text-xs font-mono text-graphite/50 tracking-wider uppercase block mb-1">Estimated Monthly Savings</span>
            
            {/* Floating Money Display */}
            <div className="relative inline-block px-4 py-2 sm:py-3 max-w-full z-20">
              

              {/* Floating Money Display Text Content */}
              <div className="relative z-10 flex flex-col items-center">
                <motion.div 
                  animate={{ scale: estimateScale }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="flex items-baseline justify-center gap-1 text-graphite whitespace-nowrap flex-nowrap drop-shadow-[0_4px_16px_rgba(77,143,143,0.1)]"
                >
                  <span className="text-4xl sm:text-5xl md:text-7xl font-sans font-extrabold tracking-tight text-[#457B7B] whitespace-nowrap">
                    $ {roundedSavings.toLocaleString()}{roundedSavings === 35000 ? "+" : ""}
                  </span>
                  <span className="text-xs sm:text-sm md:text-base font-mono text-graphite/65 font-semibold uppercase whitespace-nowrap select-none">/ mo</span>
                 </motion.div>
              </div>
            </div>
          </div>

          {/* Elegant Card containing control slider and node points */}
          <div className="w-full bg-white/95 backdrop-blur-md border border-graphite/10 shadow-2xl shadow-[#457B7B]/10 p-4 sm:p-5 md:p-6 rounded-2xl relative z-20 select-none mt-12 sm:mt-16 md:mt-20">
            
            {/* Plain Custom Slider Bar */}
            <div className="relative py-3 w-full">
              
              {/* Native range slider customized for beautiful touch dragging */}
              <input 
                type="range"
                min="0"
                max="100"
                value={sliderVal}
                onChange={(e) => setSliderVal(parseInt(e.target.value))}
                className="absolute inset-y-0 left-0 w-full h-full opacity-0 cursor-pointer z-30"
              />

              {/* Visual backing line track */}
              <div className="h-2 w-full bg-graphite/10 rounded-full relative pointer-events-none">
                {/* Active gradient fill */}
                <div 
                  className="absolute h-full left-0 rounded-full bg-gradient-to-r from-[#4B7B7B]/70 to-[#4B7B7B]"
                  style={{ width: `${sliderVal}%` }}
                />
              </div>



              {/* Slider thumb representation on top of range */}
              <div 
                className="absolute top-1/2 w-6 h-6 -ml-3 -mt-3 rounded-full bg-[#FDFCFB] border-3 border-teal shadow-lg pointer-events-none z-20 scale-100 hover:scale-110 active:scale-120"
                style={{ left: `${sliderVal}%` }}
              />

            </div>

            {/* Stage representations */}
            {(() => {
              const stages = [
                {
                  id: 1,
                  pct: 0,
                  label: "Manual operations",
                  icon: User,
                  isActive: (val: number) => val < 12.5
                },
                {
                  id: 2,
                  pct: 25,
                  label: "Basic automation",
                  icon: Zap,
                  isActive: (val: number) => val >= 12.5 && val < 37.5
                },
                {
                  id: 3,
                  pct: 50,
                  label: "AI assisted workflows",
                  icon: Sparkles,
                  isActive: (val: number) => val >= 37.5 && val < 62.5
                },
                {
                  id: 4,
                  pct: 75,
                  label: "Connected intelligence",
                  icon: Network,
                  isActive: (val: number) => val >= 62.5 && val < 87.5
                },
                {
                  id: 5,
                  pct: 100,
                  label: "Autonomous systems",
                  icon: Cpu,
                  isActive: (val: number) => val >= 87.5
                }
              ];

              const activeStage = stages.find((s) => s.isActive(sliderVal)) || stages[0];
              const ActiveIcon = activeStage.icon;

              return (
                <>
                  {/* Desktop Layout - Horizontal Stages */}
                  <div className="hidden md:block relative w-full h-[88px] select-none mt-4">
                    {stages.map((stage) => {
                      const active = stage.isActive(sliderVal);
                      const StageIcon = stage.icon;
                      return (
                        <div
                          key={stage.id}
                          style={{ left: `calc(${stage.pct}% + ${(50 - stage.pct) * 1.08}px)` }}
                          className={`absolute -translate-x-1/2 transition-all duration-300 flex flex-col items-center w-32 ${
                            active ? "text-teal font-extrabold translate-y-[-2px]" : "text-graphite/40 font-light"
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 mb-1.5 ${
                            active ? "bg-teal/20 scale-110 shadow-sm border border-teal/30" : "bg-graphite/5"
                          }`}>
                            <StageIcon 
                              size={18} 
                              className={`transition-all duration-300 ${active ? "text-teal" : "text-graphite/40"}`} 
                              fill={active ? "currentColor" : "none"} 
                            />
                          </div>
                          <span className="leading-tight break-words uppercase font-semibold text-[10px] tracking-tight text-center">
                            {stage.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Mobile Layout - Single Center Highlighted Stage (Touch-friendly & dynamic) */}
                  <div className="md:hidden flex flex-col items-center justify-center select-none mt-4 py-1">
                    <span className="text-[9px] font-mono text-graphite/40 uppercase tracking-widest mb-2">Stage {activeStage.id} of 5</span>
                    <div className="flex items-center gap-3 bg-teal/5 border border-teal/10 px-4 py-2.5 rounded-xl w-full max-w-[280px]">
                      <div className="w-10 h-10 rounded-full bg-teal/15 flex items-center justify-center shrink-0">
                        <ActiveIcon size={20} className="text-teal" fill="none" />
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="leading-tight uppercase font-extrabold text-[10px] sm:text-xs tracking-wide text-graphite">
                          {activeStage.label}
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              );
            })()}

          </div>

          {/* Disclaimer Text */}
          <p className="text-[10px] md:text-xs text-white/95 font-sans font-medium tracking-wide text-center text-balance max-w-lg mt-6 relative z-20 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
            * Note: This projection is an estimate; actual savings will vary depending on the unique scale, integration depth, and operational impact of the final solution.
          </p>

        </div>
      </div>
    </section>
  );
}



const PROCESS_STEPS = [
  { title: "Workflow Audit", align: "right" as const, description: "We identify repetitive execution, operational inefficiencies, fragmented workflows, and hidden business overhead across existing operations." },
  { title: "System Mapping", align: "left" as const, description: "Visualizing the hidden dependencies across teams and systems." },
  { title: "Intelligence Design", align: "right" as const, description: "Intelligent workflows, automation systems, and operational assistants are integrated directly into day-to-day business execution." },
  { title: "Workflow Transformation", align: "left" as const, description: "Manual execution is replaced with intelligent operational systems designed for faster, more accurate, and scalable business execution." },
];

function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Total span: (5-1) * 45 degrees = 180 degrees (half circle)
  const totalRotation = 180;
  const rotation = useTransform(scrollYProgress, [0, 1], [0, -totalRotation]);

  return (
    <section 
      id="process"
      ref={containerRef}
      className="relative min-h-[500vh] bg-[#F3EFEA] overflow-visible w-full border-t border-graphite/5"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center px-6 md:px-24 overflow-hidden">
        
        {/* Header - Fixed at top for better hierarchy */}
        <div className="absolute top-28 md:top-12 left-1/2 -translate-x-1/2 w-full max-w-4xl px-6 z-50 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-2"
          >
            <h2 className="text-4xl md:text-6xl font-serif-display font-extrabold text-graphite tracking-tight leading-tight mt-3 text-balance">
              Our process for building <span className="text-teal italic">intelligent systems.</span>
            </h2>
          </motion.div>
        </div>

        {/* THE ROTATING CAROUSEL STAGE - Centered at the very bottom edge */}
        <div className="absolute top-[100%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160vw] h-[160vw] md:w-[130vh] md:h-[130vh] lg:w-[120vh] lg:h-[120vh] max-w-[2400px] max-h-[2400px]">
          
          {/* Accent Filled Stage Background */}
          <div className="absolute inset-0 rounded-full bg-teal shadow-[0_0_100px_rgba(75,123,123,0.15)]" />

          {/* Static Center Point Dot (The Peak) */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 md:w-6 md:h-6 bg-cream rounded-full shadow-[0_0_30px_rgba(253,252,251,0.6)] z-0" />
          
          {/* Rotating Ring Container */}
          <motion.div 
            style={{ rotate: rotation }}
            className="relative w-full h-full origin-center"
          >
            {PROCESS_STEPS.map((step, idx) => (
              <ProcessItem 
                key={idx} 
                step={step} 
                index={idx}
                scrollProgress={scrollYProgress}
                parentRotation={rotation}
                totalRotation={totalRotation}
              />
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}

function ProcessItem({ 
  step, 
  index, 
  scrollProgress,
  parentRotation,
  totalRotation
}: { 
  step: typeof PROCESS_STEPS[0], 
  index: number,
  scrollProgress: any,
  parentRotation: any,
  totalRotation: number
}) {
  const angle = index * 60; // Spacing between items to spread across 180 deg
  
  // Counter-rotation to keep the card always upright
  const counterRotate = useTransform(parentRotation, (r: any) => -(Number(r) + angle));
  
  // Each item needs to highlight when it passes the center top (0 deg)
  const itemRotation = useTransform(scrollProgress, [0, 1], [angle, angle - totalRotation]);
  
  // Opacity peaks when item is at the top (0 degrees relative)
  const opacity = useTransform(
    itemRotation,
    [-50, -15, 0, 15, 50],
    [0, 0.4, 1, 0.4, 0]
  );

  const scale = useTransform(
    itemRotation,
    [-50, 0, 50],
    [0.7, 1.1, 0.7]
  );

  const blur = useTransform(
    itemRotation,
    [-40, 0, 40],
    [10, 0, 10]
  );

  return (
    <div 
      className="absolute inset-0 pointer-events-none"
      style={{ transform: `rotate(${angle}deg)` }}
    >
      {/* Center Point - On Arc */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 md:w-5 md:h-5 rounded-full bg-cream shadow-[0_0_20px_rgba(253,252,251,0.4)] z-20 pointer-events-auto" />

      {/* Content wrapper - translated INWARDS from the arc to stay safely inside */}
      <div className="absolute top-[160px] md:top-[200px] left-1/2 -translate-x-1/2 w-0 h-0 flex items-center justify-center z-10 pointer-events-auto">
        <motion.div 
          style={{ 
            rotate: counterRotate,
            opacity, 
            scale,
            filter: useTransform(blur, (b) => `blur(${b}px)`)
          }}
          className="relative flex flex-col items-center justify-center w-[320px] md:w-[600px] lg:w-[800px]"
        >
          {/* Step Text */}
          <span className="font-mono text-[10px] md:text-xs text-cream/70 font-medium tracking-[0.2em] md:tracking-[0.3em] uppercase whitespace-nowrap mb-4 md:mb-6">
            Step 0{index + 1}
          </span>

          {/* Title */}
          <h3 className="text-2xl md:text-4xl lg:text-5xl font-heading font-medium text-cream tracking-tight leading-[1.1] text-balance text-center max-w-[280px] md:max-w-[500px]">
            {step.title}
          </h3>
          
          {/* Description */}
          <p className="mt-4 md:mt-6 text-cream/80 text-base md:text-lg font-light leading-relaxed text-center w-[200px] md:w-[350px] lg:w-[500px] text-balance">
            {step.description}
          </p>
        </motion.div>
      </div>
    </div>
  );
}


// --- UI COMPONENTS ---


export default function App() {
  return (
    <div className="relative min-h-screen selection:bg-teal/20 selection:text-teal bg-cream text-graphite font-sans antialiased">
      <Navbar />
      
      <main className="relative">
        {/* HERO SECTION */}
        <section id="hero-section" className="relative min-h-screen flex flex-col justify-center px-6 md:px-24 pt-32 pb-20 overflow-hidden">
          {/* Background Canvas - Changed to pointer-events-auto to capture mouse move */}
          <div className="absolute inset-0 z-0">
            <WorkflowConstellation />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl mx-auto relative z-10 pointer-events-none text-center px-4"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif-display font-extrabold tracking-tight leading-[1.1] mb-6 text-graphite text-balance">
              Eliminate <br />
              operational costs with <br />
              <span className="text-teal italic">intelligent workflows.</span>
            </h1>
            
            <p className="text-base md:text-lg text-slate/75 font-sans font-light max-w-xl mx-auto leading-relaxed mb-10 text-balance">
              We design AI-powered operational systems that automate repetitive work, eliminate workflow friction, and help businesses operate with greater speed, clarity, and efficiency.
            </p>
            
            <div className="flex justify-center pointer-events-auto">
              <button 
                onClick={() => document.getElementById("estimator")?.scrollIntoView({ behavior: "smooth" })}
                className="group bg-graphite text-ivory px-8 py-4 rounded-sm font-heading text-xs tracking-widest hover:bg-teal transition-all flex items-center gap-2 shadow-lg cursor-pointer"
              >
                START SAVING
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </section>

        {/* PROGRESSIVE STORY SECTION */}
        <StorySection />

        {/* SERVICES SECTION */}
        <ServicesSection />

        {/* OUR WORK SECTION */}
        <WorkSection />

        {/* PROCESS SECTION */}
        <ProcessSection />

        {/* CONTACT CALLOUT */}
        <section id="contact" className="min-h-screen flex items-center justify-center px-6 md:px-24 bg-graphite relative overflow-hidden -mt-[2px] z-20">
          <div className="absolute inset-0 opacity-10">
             <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,#4B7B7B,transparent)] blur-3xl translate-y-1/2" />
          </div>
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 1 }}
            >
            <h2 className="text-5xl md:text-8xl font-serif-display font-extrabold mb-12 text-ivory tracking-tight">
                Ready to <span className="italic text-teal/80">Synchronize?</span>
              </h2>
              <p className="text-ivory/40 mb-16 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">
                Our limited capacity ensures deep integration with your engineering leadership. Reach out to discuss your operational roadmap.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <a 
                  href="mailto:kaushikrengan@gmail.com" 
                  className="w-full sm:w-auto bg-ivory text-graphite px-12 py-6 rounded-sm font-heading font-bold tracking-widest text-sm hover:scale-105 transition-transform shadow-2xl text-center"
                >
                  MAIL US
                </a>
                
                <a 
                  href="tel:+918870897691" 
                  className="w-full sm:w-auto border border-ivory/30 text-ivory px-12 py-6 rounded-sm font-heading font-bold tracking-widest text-sm hover:bg-ivory hover:text-graphite hover:scale-105 transition-all shadow-2xl text-center"
                >
                  FREE DISCOVERY CALL
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleScroll = (id: string) => {
    setMobileMenuOpen(false);
    
    // A small timeout ensures that the state update (closing the menu) doesn't interrupt or cancel
    // the smooth scrolling animation on mobile screens due to immediate re-renders/layout shifts.
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] p-4 md:p-5 flex flex-col items-center">
      <div className="glass w-full max-w-7xl px-6 md:px-10 py-2.5 rounded-sm flex flex-col border-teal/10 shadow-2xl bg-ivory/90 backdrop-blur-xl border-t-2 border-t-teal/40 transition-all duration-300">
        <div className="flex items-center justify-between w-full">
          <button 
            onClick={() => handleScroll("hero-section")} 
            className="flex items-center gap-3 cursor-pointer text-left hover:opacity-80 transition-opacity bg-transparent border-none p-0"
          >
            <div className="relative w-8 h-8 flex items-center justify-center">
              {/* Rotating Glow shadow behind */}
              <div 
                className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,#4D8F8F,#1F3F3F,transparent,#4D8F8F)] opacity-80 blur-[2.5px] animate-spin scale-105" 
                style={{ animationDuration: '3s' }} 
              />
              <div 
                className="absolute inset-0 rounded-full bg-[conic-gradient(from_180deg,#89B0AF,transparent,#4D8F8F)] opacity-50 blur-[1.5px] animate-spin scale-105" 
                style={{ animationDuration: '5s', animationDirection: 'reverse' }} 
              />
              
              {/* Core Solid Badge - Original size and style */}
              <div className="relative w-8 h-8 bg-teal flex items-center justify-center rounded-full z-10 shadow-[0_0_12px_rgba(75,123,123,0.35)]">
                <div className="w-3 h-3 bg-white/20 rounded-full blur-[1px]" />
              </div>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-heading font-bold text-lg tracking-tighter">ORCIN</span>
              <span className="font-mono text-[8px] font-medium tracking-[0.4em] text-slate/40 uppercase">STUDIO</span>
            </div>
          </button>
          
          <div className="hidden md:flex items-center gap-10">
            {["Services", "Work", "Process"].map(item => (
              <button 
                key={item} 
                onClick={() => handleScroll(item.toLowerCase())} 
                className="font-mono text-[10px] uppercase tracking-[0.2em] font-medium text-slate/60 hover:text-teal transition-all relative group cursor-pointer bg-transparent border-none p-0"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[0.5px] bg-teal group-hover:w-full transition-all duration-300" />
              </button>
            ))}
            <button 
              onClick={() => handleScroll("contact")}
              className="bg-graphite text-ivory px-6 py-2 rounded-sm font-mono text-[10px] font-medium tracking-[0.2em] hover:bg-teal transition-all flex items-center gap-2 shadow-lg cursor-pointer border-none"
            >
              CONTACT <Mail size={12} />
            </button>
          </div>
          
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-graphite cursor-pointer bg-slate-100/40 hover:bg-slate-100/60 active:bg-slate-200/80 active:scale-90 transition-all duration-100 border-none flex items-center justify-center rounded-full w-10 h-10 touch-manipulation"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="overflow-hidden md:hidden flex flex-col gap-2.5 mt-4 pt-4 border-t border-graphite/5"
            >
              {["Services", "Work", "Process"].map(item => (
                <button
                  key={item}
                  onClick={() => handleScroll(item.toLowerCase())}
                  className="font-mono text-[11px] uppercase tracking-[0.25em] font-semibold text-slate/70 hover:text-teal active:text-teal active:bg-teal/10 px-4 py-3 text-left cursor-pointer bg-transparent border-none w-full transition-all duration-100 rounded-sm flex items-center touch-manipulation h-11"
                >
                  {item}
                </button>
              ))}
              <button
                onClick={() => handleScroll("contact")}
                className="bg-graphite text-ivory active:bg-teal active:scale-[0.98] w-full h-11 py-3 rounded-sm font-mono text-[11px] font-semibold tracking-[0.25em] hover:bg-teal transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer mt-1 border-none touch-manipulation"
              >
                CONTACT <Mail size={12} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

const SERVICES_DATA = {
  assist: [
    { title: "AI Assistants & Copilots", description: "Context-aware AI assistants integrated directly into business workflows. Support teams with faster execution, retrieval, and operational coordination." },
    { title: "Knowledge Management Systems", description: "Centralized systems that organize and retrieve operational knowledge intelligently. Reduce information fragmentation across teams, tools, and workflows." },
    { title: "Semantic Search Systems", description: "Enable contextual search across documents, systems, and operational data. Help teams retrieve relevant information faster and more accurately." },
    { title: "RAG-Based Knowledge Systems", description: "AI systems that retrieve and respond using internal business knowledge sources. Deliver contextual answers grounded in operational and organizational data." },
    { title: "AI Productivity Tools", description: "Custom AI tools designed around operational execution and team productivity. Reduce repetitive work while improving day-to-day workflow efficiency." },
    { title: "Multi-Agent AI Workflows", description: "Coordinated AI systems designed to manage complex operational processes. Enable intelligent task distribution, coordination, and workflow execution." },
    { title: "Operational Decision Support Systems", description: "AI-powered systems that assist operational planning and business execution. Improve decision-making speed, visibility, and execution consistency." }
  ],
  automate: [
    { title: "AI Workflow Automation", description: "Automate repetitive workflows across business operations using intelligent execution systems. Reduce manual effort, delays, and operational dependency on repetitive tasks." },
    { title: "Intelligent Document Processing", description: "Extract, organize, validate, and process business documents automatically. Reduce time spent on manual review, classification, and information handling." },
    { title: "Automated Reporting Systems", description: "Generate operational and business reports without repetitive manual effort. Improve reporting speed, consistency, and operational visibility." },
    { title: "Business Process Automation", description: "Streamline repetitive operational processes across teams and internal systems. Reduce execution overhead while improving workflow efficiency and scalability." },
    { title: "Workflow Orchestration", description: "Coordinate workflows, approvals, and operational execution across multiple systems. Ensure smoother execution flow between teams, tools, and business operations." },
    { title: "Data Processing Automation", description: "Automate structured and unstructured data processing workflows at scale. Reduce manual handling while improving processing speed and operational accuracy." },
    { title: "Workflow Digitization", description: "Transform manual workflows into intelligent digital operational systems. Improve execution visibility, consistency, and long-term operational scalability." }
  ]
};

function ServicesSection() {
  const [activeCategory, setActiveCategory] = useState<'assist' | 'automate' | null>('assist');
  const [expandedService, setExpandedService] = useState<number | null>(null);

  const activeData = activeCategory ? SERVICES_DATA[activeCategory] : [];

  return (
    <section className="py-24 px-6 md:px-24 bg-[#FFFFFF] text-teal font-sans min-h-[800px] flex flex-col relative overflow-hidden border-b border-graphite/5" id="services">
      {/* Title */}
      <div className="mb-8 md:mb-16 z-20">
        <h2 
          className="text-4xl md:text-6xl font-serif-display font-extrabold tracking-tight text-graphite text-center text-balance"
        >
          Choose your path to <span className="text-teal italic">lower business costs.</span>
        </h2>
      </div>

      <div className="flex-grow relative w-full flex flex-col items-center">
        {/* Category Buttons Container */}
        <motion.div 
          animate={{ 
            x: activeCategory === 'assist' ? (window.innerWidth >= 1024 ? '25%' : '0') : 
               activeCategory === 'automate' ? (window.innerWidth >= 1024 ? '-25%' : '0') : '0',
            y: (activeCategory && window.innerWidth < 1024) ? 0 : 
               (!activeCategory && window.innerWidth >= 1024) ? 0 : 0
          }}
          transition={{ type: "spring", damping: 25, stiffness: 120 }}
          className={`
            flex items-center justify-center gap-6 md:gap-16 z-30 mb-12 lg:mb-0 relative 
            lg:absolute lg:top-1/2 lg:-translate-y-1/2 w-full
            ${activeCategory ? 'lg:pointer-events-auto' : 'pointer-events-auto'}
          `}
        >
          {/* Assist Button */}
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(75,123,123,0.3)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveCategory(activeCategory === 'assist' ? null : 'assist')}
            className={`
              relative w-32 h-32 md:w-56 md:h-56 rounded-full flex flex-col items-center justify-center gap-2 md:gap-4 transition-all duration-500 overflow-hidden
              ${activeCategory === 'assist' ? 'text-white border-2 border-teal/20' : 'text-teal border border-teal/10'}
            `}
            style={{
              background: activeCategory === 'assist' 
                ? 'radial-gradient(circle at 30% 30%, #4B7B7B, #2C4A4A)' 
                : 'radial-gradient(circle at 30% 30%, #FDFCFB, #F3F0EC)',
              boxShadow: activeCategory === 'assist'
                ? 'inset -10px -10px 20px rgba(0,0,0,0.5), inset 10px 10px 20px rgba(255,255,255,0.1), 0 20px 50px rgba(0,0,0,0.2)'
                : 'inset -5px -5px 15px rgba(0,0,0,0.05), inset 5px 5px 15px rgba(255,255,255,1), 0 10px 30px rgba(0,0,0,0.05)'
            }}
          >
            {/* Glossy highlight */}
            <div className="absolute top-[10%] left-[15%] w-[40%] h-[20%] bg-white/20 rounded-[100%] blur-[8px] rotate-[-15deg] pointer-events-none" />
            
            <motion.div
              animate={{ rotate: activeCategory === 'assist' ? [0, 5, -5, 0] : 0 }}
              transition={{ repeat: activeCategory === 'assist' ? Infinity : 0, duration: 3 }}
              className="z-10"
            >
              <Wand2 size={window.innerWidth >= 768 ? 56 : 32} className={`${activeCategory === 'assist' ? 'text-white' : 'text-teal/40'}`} />
            </motion.div>
            <span className="text-sm md:text-xl font-heading font-medium tracking-tight z-10">Assist</span>
          </motion.button>

          {/* Automate Button */}
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(75,123,123,0.3)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveCategory(activeCategory === 'automate' ? null : 'automate')}
            className={`
              relative w-32 h-32 md:w-56 md:h-56 rounded-full flex flex-col items-center justify-center gap-2 md:gap-4 transition-all duration-500 overflow-hidden
              ${activeCategory === 'automate' ? 'text-white border-2 border-teal/20' : 'text-teal border border-teal/10'}
            `}
            style={{
              background: activeCategory === 'automate' 
                ? 'radial-gradient(circle at 30% 30%, #4B7B7B, #2C4A4A)' 
                : 'radial-gradient(circle at 30% 30%, #FDFCFB, #F3F0EC)',
              boxShadow: activeCategory === 'automate'
                ? 'inset -10px -10px 20px rgba(0,0,0,0.5), inset 10px 10px 20px rgba(255,255,255,0.1), 0 20px 50px rgba(0,0,0,0.2)'
                : 'inset -5px -5px 15px rgba(0,0,0,0.05), inset 5px 5px 15px rgba(255,255,255,1), 0 10px 30px rgba(0,0,0,0.05)'
            }}
          >
            {/* Glossy highlight */}
            <div className="absolute top-[10%] left-[15%] w-[40%] h-[20%] bg-white/20 rounded-[100%] blur-[8px] rotate-[-15deg] pointer-events-none" />

            <motion.div
              animate={{ rotate: activeCategory === 'automate' ? 360 : 0 }}
              transition={{ repeat: activeCategory === 'automate' ? Infinity : 0, duration: 10, ease: "linear" }}
              className="z-10"
            >
              <Settings size={window.innerWidth >= 768 ? 56 : 32} className={`${activeCategory === 'automate' ? 'text-white' : 'text-teal/40'}`} />
            </motion.div>
            <span className="text-sm md:text-xl font-heading font-medium tracking-tight z-10">Automate</span>
          </motion.button>
        </motion.div>

        {/* Services Content Container */}
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row relative min-h-[400px]">
          <AnimatePresence mode="wait">
            {activeCategory && (
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, x: activeCategory === 'assist' ? -100 : 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: activeCategory === 'assist' ? -100 : 100 }}
                transition={{ type: "spring", damping: 20, stiffness: 100 }}
                className={`flex-grow flex flex-col lg:flex-row w-full ${activeCategory === 'automate' ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Services List */}
                <div className={`flex-1 flex flex-col gap-4 md:gap-6 justify-center py-6 z-20 ${activeCategory === 'assist' ? 'lg:items-start lg:pr-[55%]' : 'lg:items-end lg:pl-[55%]'}`}>
                  {activeData.map((service, idx) => (
                    <div key={service.title} className="w-full max-w-2xl">
                      <motion.div
                        initial={{ opacity: 0, x: activeCategory === 'assist' ? -30 : 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        onClick={() => setExpandedService(expandedService === idx ? null : idx)}
                        className={`group cursor-pointer p-4 md:p-6 rounded-xl transition-all duration-300 ${expandedService === idx ? 'bg-teal/5' : 'hover:bg-teal/5'}`}
                      >
                        <div className="flex items-center justify-between gap-4">
                          <h4 className={`text-lg md:text-xl font-heading font-medium tracking-tight transition-colors ${expandedService === idx ? 'text-teal' : 'text-graphite/80 group-hover:text-teal'}`}>
                            {service.title}
                          </h4>
                          <div className="text-teal/40 group-hover:text-teal">
                            {expandedService === idx ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                          </div>
                        </div>
                        
                        {/* Description Dropdown */}
                        <AnimatePresence>
                          {expandedService === idx && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <p className="mt-4 text-slate/60 text-base md:text-lg font-light leading-relaxed pb-2">
                                {service.description}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Visual Decoration */}
                        <div className="h-[1px] w-full bg-teal/10 mt-4 group-hover:bg-teal/30 transition-colors" />
                      </motion.div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

// --- OUR WORK SECTION ---

const PROJECTS = [
  {
    title: "Knowledge assistant for engineering team",
    category: "Engineering Operations",
    description: "A unified technical retrieval system indexing complex CAD schemas, standard operating procedures, and product specification sheets, helping engineering teams resolve design queries instantly.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    metrics: [
      { label: "Design Query Resolution", value: "< 2.5s" },
      { label: "Information Search Time Avoided", value: "72%" },
      { label: "Engineering Productivity Gains", value: "$145,000" }
    ]
  },
  {
    title: "Automated reporting system",
    category: "Information Automation",
    description: "An automated data processing and presentation pipeline aggregating multi-sensor logs, telemetry files, and team updates to emit comprehensive compliance reports with zero manual overhead.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    metrics: [
      { label: "Manual Report Offset", value: "-98%" },
      { label: "Weekly Engineering Hours Reclaimed", value: "18h" },
      { label: "Operational Error Frequency", value: "0.0%" }
    ]
  },
  {
    title: "Engineering requirements similarity assist",
    category: "System Architecture",
    description: "An intelligent similarity analysis utility matching new system specs against legacy requirements databases, identifying duplicated design efforts and conflicting safety constraints in real-time.",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80",
    metrics: [
      { label: "Duplicate Requirement Matches", value: "94%" },
      { label: "Design Process Speedup", value: "3.5x" },
      { label: "Rework Cost Avoided", value: "$85,000" }
    ]
  },
  {
    title: "AI visual inspection for manufacturing quality control",
    category: "Computer Vision",
    description: "A high-frequency neural network model running visual verification sweeps on live assembly conveyors to flag microscopic physical variances, material cracks, and surface blemishes instantly.",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
    metrics: [
      { label: "Microscopic Void Detection", value: "99.94%" },
      { label: "Product Return Reduction", value: "42%" },
      { label: "Inspection Velocity Reached", value: "60 fps" }
    ]
  }
];

function ProjectGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    resize();

    let time = 0;
    const render = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      const isMobile = width < 768;
      const colsCount = isMobile ? 6 : 10;
      const rowsCount = isMobile ? 6 : 5;

      const marginX = isMobile ? 32 : 60;
      const marginY = isMobile ? 32 : 60;

      const gridWidth = width - marginX * 2;
      const gridHeight = height - marginY * 2;

      const colWidth = gridWidth / colsCount;
      const rowHeight = gridHeight / rowsCount;

      // Coordinate systems grid (checked pattern)
      ctx.strokeStyle = "rgba(75, 123, 123, 0.12)";
      ctx.lineWidth = 1.0;
      for (let c = 0; c <= colsCount; c++) {
        const x = marginX + c * colWidth;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let r = 0; r <= rowsCount; r++) {
        const y = marginY + r * rowHeight;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Intersecting nodes grid details (+)
      ctx.fillStyle = "rgba(75, 123, 123, 0.35)";
      for (let c = 0; c <= colsCount; c++) {
        for (let r = 0; r <= rowsCount; r++) {
          const x = marginX + c * colWidth;
          const y = marginY + r * rowHeight;
          ctx.fillRect(x - 5, y - 1, 10, 2);
          ctx.fillRect(x - 1, y - 5, 2, 10);
        }
      }

      // Elegant background glowing radial gradient
      const glowX = width * 0.3 + Math.sin(time * 0.002) * width * 0.1;
      const glowY = height * 0.5 + Math.cos(time * 0.001) * height * 0.05;
      const r1 = Math.max(width, height) * 0.45;
      const grad = ctx.createRadialGradient(glowX, glowY, 0, glowX, glowY, r1);
      grad.addColorStop(0, "rgba(75, 123, 123, 0.08)");
      grad.addColorStop(1, "rgba(75, 123, 123, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full absolute inset-0 pointer-events-none z-0">
      <canvas ref={canvasRef} className="w-full h-full block opacity-95" />
    </div>
  );
}

function WorkSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = right/next, -1 = left/prev

  const nextProject = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % PROJECTS.length);
  };

  const prevProject = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "115%" : "-115%",
    }),
    center: {
      x: 0,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? "115%" : "-115%",
    }),
  };

  return (
    <section className="py-24 px-6 md:px-24 bg-[#F3EFEA] text-graphite min-h-[700px] flex flex-col relative overflow-hidden border-b border-graphite/5" id="work">
      {/* Visual blueprint checked grid background */}
      <ProjectGridBackground />

      <div className="w-full max-w-7xl mx-auto z-10 relative flex-grow flex flex-col justify-between">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-4">
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-4xl md:text-6xl font-serif-display font-extrabold text-graphite tracking-tight leading-tight mt-2 pb-1 text-balance">
              Our work in <span className="text-teal font-semibold italic">production.</span>
            </h2>
          </div>
        </div>

        {/* Carousel Navigation Controls moved to top */}
        <div className="flex justify-center items-center mb-8 md:mb-12">
          <div className="flex items-center gap-6">
            <button 
              onClick={prevProject} 
              className="w-12 h-12 rounded-full border border-graphite/10 flex items-center justify-center hover:bg-graphite/5 hover:border-graphite/35 transition-all text-graphite cursor-pointer bg-white shadow-sm"
              aria-label="Previous Case Study"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Little Carousel Dot Steppers */}
            <div className="flex justify-center items-center gap-2">
              {PROJECTS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (idx === currentIndex) return;
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${idx === currentIndex ? 'bg-teal w-8' : 'bg-graphite/20 w-1.5 hover:bg-graphite/40'}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button 
              onClick={nextProject} 
              className="w-12 h-12 rounded-full border border-graphite/10 flex items-center justify-center hover:bg-graphite/5 hover:border-graphite/35 transition-all text-graphite cursor-pointer bg-white shadow-sm"
              aria-label="Next Case Study"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Carousel Window */}
        <div className="relative w-full overflow-hidden min-h-[480px]">
          <AnimatePresence custom={direction} mode="popLayout">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center bg-white border border-graphite/10 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 shadow-[0_24px_50px_rgba(75,123,123,0.06)]"
            >
              
              {/* Product Representation Thumbnail (Desktop/Large screens only) */}
              <div className="hidden lg:block lg:col-span-5 relative group">
                {/* Visual Glass Browser-Frame */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white/80 border border-graphite/10 shadow-[0_32px_64px_-16px_rgba(75,123,123,0.15)]">
                  {/* Miniature Toolbar */}
                  <div className="h-8 bg-graphite/5 border-b border-graphite/5 px-4 flex items-center gap-1.5 pointer-events-none font-bold">
                    <div className="w-2 h-2 rounded-full bg-graphite/20" />
                    <div className="w-2 h-2 rounded-full bg-graphite/20" />
                    <div className="w-2 h-2 rounded-full bg-graphite/20" />
                  </div>
                  
                  {/* Product Image Image Tag with Referrer-policy constraint */}
                  <div className="w-full h-[calc(100%-32px)] relative">
                    <img
                      src={PROJECTS[currentIndex].image}
                      alt={PROJECTS[currentIndex].title}
                      className="w-full h-full object-cover grayscale brightness-95 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent pointer-events-none" />
                    
                    {/* Category floating pill top corner */}
                    <div className="absolute top-4 right-4 bg-teal/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase text-white border border-white/10 font-bold">
                      {PROJECTS[currentIndex].category}
                    </div>
                  </div>
                </div>

                {/* Grid accent shadow lines */}
                <div className="absolute -bottom-4 -right-4 w-full h-full border border-teal/10 rounded-2xl -z-10 pointer-events-none translate-x-2 translate-y-2 opacity-30" />
              </div>

              {/* Product Content Details and Metrics */}
              <div className="col-span-1 lg:col-span-7 flex flex-col justify-between py-2">
                <div className="flex flex-col gap-4">
                  <h3 className="text-3xl md:text-4xl font-heading font-medium text-graphite tracking-tight leading-tight mt-1">
                    {PROJECTS[currentIndex].title}
                  </h3>

                  {/* Product Representation Thumbnail (Mobile only, rendered after title) */}
                  <div className="block lg:hidden relative group my-4">
                    {/* Visual Glass Browser-Frame */}
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white/80 border border-graphite/10 shadow-[0_16px_36px_-8px_rgba(75,123,123,0.15)]">
                      {/* Miniature Toolbar */}
                      <div className="h-8 bg-graphite/5 border-b border-graphite/5 px-4 flex items-center gap-1.5 pointer-events-none font-bold">
                        <div className="w-2 h-2 rounded-full bg-graphite/20" />
                        <div className="w-2 h-2 rounded-full bg-graphite/20" />
                        <div className="w-2 h-2 rounded-full bg-graphite/20" />
                      </div>
                      
                      {/* Product Image Image Tag with Referrer-policy constraint */}
                      <div className="w-full h-[calc(100%-32px)] relative">
                        <img
                          src={PROJECTS[currentIndex].image}
                          alt={PROJECTS[currentIndex].title}
                          className="w-full h-full object-cover grayscale brightness-95"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent pointer-events-none" />
                        
                        {/* Category floating pill top corner */}
                        <div className="absolute top-4 right-4 bg-teal/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase text-white border border-white/10 font-bold">
                          {PROJECTS[currentIndex].category}
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-graphite/70 text-base md:text-lg leading-relaxed font-sans font-light max-w-2xl">
                    {PROJECTS[currentIndex].description}
                  </p>
                </div>

                {/* Savings Metrics Panel */}
                <div className="mt-8 md:mt-12">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {PROJECTS[currentIndex].metrics.map((metric, mIdx) => (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * mIdx + 0.2 }}
                        key={mIdx} 
                        className="bg-[#FDFCFB]/90 backdrop-blur-sm border border-graphite/10 rounded-xl p-5 hover:border-teal/40 hover:bg-[#F3EFEA]/90 transition-all flex flex-col gap-1 shadow-sm"
                      >
                        <span className="font-sans text-3xl md:text-4xl font-semibold text-teal tracking-tight">
                          {metric.value}
                        </span>
                        <span className="font-mono text-[9px] font-medium tracking-wider text-graphite/60 uppercase leading-normal">
                          {metric.label}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-20 px-6 md:px-24 bg-cream border-t border-graphite/5 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="flex items-center gap-3 grayscale opacity-30">
            <div className="w-6 h-6 bg-graphite rounded-full" />
            <span className="font-heading font-bold text-lg tracking-tighter uppercase">ORCIN STUDIO</span>
          </div>
          <p className="font-mono text-[9px] font-medium tracking-[0.2em] text-slate/30 text-center md:text-left">
            ENGINEERING WORKFLOWS, INTELLIGENTLY ORCHESTRATED
          </p>
        </div>
        
        <div className="flex gap-12 font-mono text-[10px] uppercase tracking-[0.2em] font-medium text-slate/40">
        </div>
        
        <div className="flex flex-col items-center md:items-end gap-2">
        </div>
      </div>
    </footer>
  );
}
