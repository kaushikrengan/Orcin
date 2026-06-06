import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Upload, CheckCircle2, ChevronRight, FileText, Database, Play, AlertTriangle, ShieldCheck, RefreshCw, Layers, Sliders, PlayCircle } from "lucide-react";

// ==========================================
// 🏢 DEMO 1: KIRA SPECIAL INTERACTIVE SIMULATOR
// ==========================================
export function KiraDemo() {
  const [phase, setPhase] = useState<"idle" | "uploading" | "completed">("idle");
  const [progress, setProgress] = useState(0);
  const [logText, setLogText] = useState("");
  const [filterType, setFilterType] = useState<string>("All");

  const extractedData = [
    {
      item: "Telemetry module must capture and persist stream data with latency under 50ms.",
      type: "Functional",
      allocation: "Software",
      fulfillment: "Existing helper function TelemetryStreamer.writeRaw() with caching activated.",
      isExisting: true
    },
    {
      item: "System casing must withstand deep thermal gradients up to 85°C continuously.",
      type: "Process",
      allocation: "Hardware",
      fulfillment: "Suggest new custom physical mounting shroud [ThermalVentShield_v3] in grade 5 titanium alloy.",
      isExisting: false
    },
    {
      item: "Emergency shutoff valve must activate and de-energize the manifold within 30ms of failure detection.",
      type: "Safety",
      allocation: "System",
      fulfillment: "Existing safety function SafetyCore.triggerEmergencyTrips() via electromagnetic coil valve SV-104.",
      isExisting: true
    },
    {
      item: "Relay logic controls must isolate auxiliary lines when primary control loop is compromised.",
      type: "Safety",
      allocation: "Hardware",
      fulfillment: "Suggest new mechanical disconnect assembly on auxiliary manifolds to guarantee absolute isolation.",
      isExisting: false
    },
    {
      item: "Database audit logs must enforce AES-GCM data hashing on disk matching NIST-800 security regulations.",
      type: "Process",
      allocation: "Software",
      fulfillment: "Existing framework cryptography service SecurityCrypt.hashAuditTrail(). Fully compliant.",
      isExisting: true
    },
    {
      item: "User admin operations must utilize mandatory multi-factor webtokens.",
      type: "Functional",
      allocation: "Software",
      fulfillment: "Suggest new login enforcement procedure AuthCore.enforceMFA() in the web interface controller.",
      isExisting: false
    },
    {
      item: "Compressor motor must regulate and limit maximum physical operating pressure below 25 bar.",
      type: "Safety",
      allocation: "System",
      fulfillment: "Existing mechanical relief valve PV-440 operates as pressure cap override. Fully compliant.",
      isExisting: true
    }
  ];

  useEffect(() => {
    if (phase === "uploading") {
      setProgress(0);
      setLogText("Initializing optical OCR layout parser...");
      
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setPhase("completed"), 400);
            return 100;
          }
          const next = prev + 5;
          if (next < 25) {
            setLogText("Extracting requirements...");
          } else if (next < 50) {
            setLogText("Extracting tables...");
          } else if (next < 70) {
            setLogText("Normalizing tabular structures & matrices...");
          } else if (next < 90) {
            setLogText("Mapping requirement allocations to sub-assemblies...");
          } else {
            setLogText("Comparing vs legacy database standard functions...");
          }
          return next;
        });
      }, 70);
      return () => clearInterval(interval);
    }
  }, [phase]);

  const filteredData = filterType === "All" 
    ? extractedData 
    : extractedData.filter(d => d.type === filterType);

  return (
    <div className="w-full h-full min-h-[350px] bg-[#0E1317] border border-white/10 rounded-2xl p-4 flex flex-col justify-between font-sans text-xs text-white select-none">
      {/* Mini Title Bar */}
      <div className="flex items-center justify-center border-b border-white/5 pb-2.5 mb-2 shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
          <span className="font-mono text-sm tracking-widest uppercase font-extrabold text-teal">
            KIRA
          </span>
        </div>
      </div>

      {/* Main Workspace Area */}
      <div className="flex-grow flex flex-col justify-center relative overflow-hidden">
        <AnimatePresence mode="wait">
          {phase === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              onClick={() => setPhase("uploading")}
              className="flex-grow flex flex-col items-center justify-center border border-dashed border-white/10 hover:border-teal/50 hover:bg-white/[0.01] rounded-xl p-6 cursor-pointer transition-all duration-300 group"
            >
              <div className="p-3 bg-white/[0.03] group-hover:bg-teal/10 rounded-full text-[#94A3B8] group-hover:text-teal transition-all duration-300 mb-3">
                <Upload size={22} />
              </div>
              <h4 className="text-sm font-semibold tracking-tight text-white mb-1 shrink-0">
                Simulate Spec Upload & Extraction
              </h4>
              <p className="text-center text-[#64748B] text-[11px] max-w-[280px] leading-relaxed">
                Click here to analyze raw <code className="text-[#F59E0B] font-mono">sample.pdf</code>.
                KIRA will extract requirement rows, auto-allocate to units, and map fulfillments in real-time.
              </p>
            </motion.div>
          )}

          {phase === "uploading" && (
            <motion.div
              key="uploading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-grow flex flex-col justify-center items-center px-4"
            >
              <div className="relative w-full max-w-sm h-2 bg-white/5 rounded-full overflow-hidden mb-4 border border-white/5">
                <motion.div
                  className="bg-teal h-full rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex items-center gap-2.5">
                <RefreshCw size={13} className="animate-spin text-teal" />
                <span className="font-mono text-[#94A3B8] text-[10px] tracking-tight">
                  [STEP] {logText} ({progress}%)
                </span>
              </div>
            </motion.div>
          )}

          {phase === "completed" && (
            <motion.div
              key="completed"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex-grow flex flex-col justify-between h-full"
            >
              {/* Controls bar above table */}
              <div className="flex items-center justify-between mb-2 shrink-0 select-none">
                <div className="flex items-center gap-1 text-[#10B981] font-mono text-[9px] font-semibold">
                  <CheckCircle2 size={12} />
                  <span>PARSED COMPONENT STRUCTURE TABLE</span>
                </div>
                
                {/* Micro Filter Controls */}
                <div className="flex gap-1">
                  {["All", "Functional", "Safety", "Process"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setFilterType(t)}
                      className={`px-1.5 py-0.5 rounded-[3px] text-[8px] font-mono tracking-tight cursor-pointer transition-all border-none ${
                        filterType === t
                          ? "bg-teal text-white"
                          : "bg-white/5 text-slate-400 hover:text-white"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Robust Scrollable Responsive Table */}
              <div className="flex-grow overflow-auto max-h-[190px] border border-white/10 rounded-lg bg-black/40">
                <table className="w-full text-left border-collapse font-sans text-[10px]">
                  <thead>
                    <tr className="border-b border-white/10 text-slate-400 font-mono text-[9px] uppercase tracking-wider sticky top-0 z-10">
                      <th className="py-2 px-3 font-semibold min-w-[130px] bg-[#161D24]">Extracted Item</th>
                      <th className="py-2 px-2 font-semibold bg-[#161D24]">Req. Type</th>
                      <th className="py-2 px-2 font-semibold bg-[#161D24]">Allocation</th>
                      <th className="py-2 px-3 font-semibold min-w-[160px] bg-[#161D24]">Fulfillment</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredData.map((row, idx) => (
                      <tr 
                        key={idx} 
                        className="hover:bg-white/[0.02] transition-colors group align-top"
                      >
                        {/* Column 1: Extracted Item */}
                        <td className="py-2 px-3 text-white/90 leading-normal font-sans">
                          {row.item}
                        </td>
                        {/* Column 2: Req Type */}
                        <td className="py-2 px-2 whitespace-nowrap">
                          <span className={`px-1.5 py-0.5 rounded text-[8px] font-mono leading-none font-semibold ${
                            row.type === "Safety" 
                              ? "bg-red-500/15 text-red-400 border border-red-500/20" 
                              : row.type === "Functional"
                                ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/20"
                                : "bg-purple-500/15 text-purple-400 border border-purple-500/20"
                          }`}>
                            {row.type}
                          </span>
                        </td>
                        {/* Column 3: Allocation */}
                        <td className="py-2 px-2 whitespace-nowrap">
                          <span className="text-slate-300 font-mono tracking-tight">
                            {row.allocation}
                          </span>
                        </td>
                        {/* Column 4: Fulfillment */}
                        <td className="py-2 px-3 text-slate-300 leading-normal font-sans">
                          <div className="flex items-start gap-1.5">
                            {row.isExisting ? (
                              <span className="shrink-0 bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 px-1 py-0.2 rounded font-mono text-[8.5px] uppercase font-bold tracking-tight mt-0.5">
                                Existing
                              </span>
                            ) : (
                              <span className="shrink-0 bg-amber-500/15 text-amber-500 border border-amber-500/25 px-1 py-0.2 rounded font-mono text-[8.5px] uppercase font-bold tracking-tight mt-0.5">
                                Proposed
                              </span>
                            )}
                            <span className="text-[10px]">
                              {row.fulfillment}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredData.length === 0 && (
                      <tr>
                        <td colSpan={4} className="py-6 text-center text-slate-500 font-mono text-[10px] uppercase">
                          No requirements found for filter configuration
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Reset/Controls row */}
              <div className="flex justify-between items-center mt-2.5 shrink-0 select-none">
                <span className="text-[9px] text-[#64748B] font-mono">
                  MATRIX ROW COUNT: {filteredData.length} UNITS
                </span>
                <button
                  onClick={() => setPhase("idle")}
                  className="bg-white/5 hover:bg-white/10 active:scale-95 text-white/80 font-mono text-[9px] uppercase px-3 py-1.5 rounded border border-white/10 cursor-pointer transition-all"
                >
                  Clear & Re-Upload
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ==========================================
// 📊 DEMO 2: SCAR DUAL-LENS VERIFICATION SIMULATOR
// ==========================================
export function ScarDemo() {
  const [activeTab, setActiveTab] = useState<"all" | "match" | "eq" | "conflict">("all");
  const [highlighted, setHighlighted] = useState<number | null>(null);

  return (
    <div className="w-full h-full min-h-[350px] bg-[#0E1317] border border-white/10 rounded-2xl p-4 flex flex-col justify-between font-sans text-xs text-white">
      {/* Top Controller Bar */}
      <div className="shrink-0 flex items-center justify-between border-b border-white/5 pb-2 mb-2 select-none">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          <span className="font-mono text-sm tracking-widest uppercase font-extrabold text-teal">
            SCAR
          </span>
        </div>
        <div className="flex gap-1">
          {(["all", "match", "eq", "conflict"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setHighlighted(null);
              }}
              className={`px-2 py-1 rounded text-[9px] uppercase tracking-wider font-semibold font-mono transition-all border-none cursor-pointer ${
                activeTab === tab
                  ? tab === "match"
                    ? "bg-[#10B981]/20 text-[#10B981] border-none"
                    : tab === "eq"
                    ? "bg-[#F59E0B]/20 text-[#F59E0B] border-none"
                    : tab === "conflict"
                    ? "bg-[#EF4444]/20 text-[#EF4444] border-none"
                    : "bg-white/15 text-white border-none"
                  : "bg-white/5 text-white/50 hover:text-white border-none"
              }`}
            >
              {tab === "all" ? "All" : tab === "match" ? "Exact" : tab === "eq" ? "Equiv." : "Contradict"}
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Semantic Breakdown metrics deck */}
      <div className="grid grid-cols-4 gap-2 mb-2 select-none shrink-0 text-[10px]">
        {/* Total Ingested CARD */}
        <div 
          onClick={() => { setActiveTab("all"); setHighlighted(null); }}
          className={`px-2 py-1.5 rounded-lg border transition-all cursor-pointer ${
            activeTab === "all" 
              ? "bg-white/5 border-white/20 shadow-sm" 
              : "bg-white/[0.015] border-white/5 hover:border-white/10"
          }`}
        >
          <div className="text-[#94A3B8] font-mono uppercase text-[7.5px] tracking-wider leading-none mb-0.5">Total Clauses</div>
          <div className="flex items-baseline gap-1">
            <span className="text-sm font-semibold font-mono text-white">6</span>
            <span className="text-[7.5px] text-[#64748B]">Parsed</span>
          </div>
        </div>

        {/* Exact Matches CARD */}
        <div 
          onClick={() => { setActiveTab("match"); setHighlighted(null); }}
          className={`px-2 py-1.5 rounded-lg border transition-all cursor-pointer ${
            activeTab === "match" 
              ? "bg-[#10B981]/10 border-[#10B981]/30 shadow-sm" 
              : "bg-white/[0.015] border-white/5 hover:border-[#10B981]/20"
          }`}
        >
          <div className="text-[#10B981] font-mono uppercase text-[7.5px] tracking-wider leading-none mb-0.5">Exact Matches</div>
          <div className="flex items-baseline gap-1">
            <span className="text-sm font-semibold font-mono text-[#10B981]">2</span>
            <span className="text-[7.5px] text-[#10B981]/60">33.3%</span>
          </div>
        </div>

        {/* Semantic Equivalents CARD */}
        <div 
          onClick={() => { setActiveTab("eq"); setHighlighted(null); }}
          className={`px-2 py-1.5 rounded-lg border transition-all cursor-pointer ${
            activeTab === "eq" 
              ? "bg-[#F59E0B]/10 border-[#F59E0B]/30 shadow-sm" 
              : "bg-white/[0.015] border-white/5 hover:border-[#F59E0B]/20"
          }`}
        >
          <div className="text-[#F59E0B] font-mono uppercase text-[7.5px] tracking-wider leading-none mb-0.5">Semantic Equiv.</div>
          <div className="flex items-baseline gap-1">
            <span className="text-sm font-semibold font-mono text-[#F59E0B]">2</span>
            <span className="text-[7.5px] text-[#F59E0B]/60 font-medium">33.3%</span>
          </div>
        </div>

        {/* Contradictions CARD */}
        <div 
          onClick={() => { setActiveTab("conflict"); setHighlighted(null); }}
          className={`px-2 py-1.5 rounded-lg border transition-all cursor-pointer ${
            activeTab === "conflict" 
              ? "bg-[#EF4444]/15 border-[#EF4444]/30 shadow-sm animate-pulse" 
              : "bg-white/[0.015] border-white/5 hover:border-[#EF4444]/20"
          }`}
        >
          <div className="text-[#EF4444] font-mono uppercase text-[7.5px] tracking-wider leading-none mb-0.5">Contradictions</div>
          <div className="flex items-baseline gap-1">
            <span className="text-sm font-semibold font-mono text-[#EF4444]">2</span>
            <span className="text-[7.5px] text-[#EF4444]/70 font-semibold">33.3%</span>
          </div>
        </div>
      </div>

      {/* Side-by-Side Panels Grid */}
      <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-3 items-stretch relative overflow-hidden my-2">
        {/* Left Side Panel: BASE INTERNAL STDS */}
        <div className="bg-white/[0.015] border border-white/5 rounded-xl p-3 flex flex-col gap-2 justify-start overflow-y-auto">
          <h5 className="font-mono text-[9px] tracking-wider text-teal uppercase font-bold border-b border-teal/10 pb-1.5 mb-1 select-none">
            📄 VERSION 1
          </h5>
          <div className="flex flex-col gap-2 font-mono text-[10px] leading-relaxed">
            {/* Row 1 */}
            <div
              onClick={() => setHighlighted(0)}
              className={`p-2 rounded border cursor-pointer transition-all ${
                highlighted === 0 ? "scale-[1.01]" : ""
              } ${
                activeTab === "all" || activeTab === "match"
                  ? "border-[#10B981]/20 bg-[#10B981]/5 text-[#10B981]"
                  : "opacity-20 border-white/5 text-white/40"
              }`}
            >
              <span className="block text-[8px] font-bold text-white/35 uppercase select-none mb-0.5">Base Standard Code 4.1</span>
              &quot;The provider shall maintain full sensor telemetry database logs for 180 continuous days.&quot;
            </div>

            {/* Row 2 */}
            <div
              onClick={() => setHighlighted(1)}
              className={`p-2 rounded border cursor-pointer transition-all ${
                highlighted === 1 ? "scale-[1.01]" : ""
              } ${
                activeTab === "all" || activeTab === "eq"
                  ? "border-[#F59E0B]/20 bg-[#F59E0B]/5 text-[#F59E0B]"
                  : "opacity-20 border-white/5 text-white/40"
              }`}
            >
              <span className="block text-[8px] font-bold text-white/35 uppercase select-none mb-0.5">Base Safety Directive 9.3</span>
              &quot;All critical system deviations must generate alarms to duty engineer within 48 hours.&quot;
            </div>

            {/* Row 3 */}
            <div
              onClick={() => setHighlighted(2)}
              className={`p-2 rounded border cursor-pointer transition-all ${
                highlighted === 2 ? "scale-[1.01]" : ""
              } ${
                activeTab === "all" || activeTab === "conflict"
                  ? "border-[#EF4444]/20 bg-[#EF4444]/5 text-[#EF4444]"
                  : "opacity-20 border-white/5 text-white/40"
              }`}
            >
              <span className="block text-[8px] font-bold text-white/35 uppercase select-none mb-0.5">Structural Threshold Section 12</span>
              &quot;Under standard static flow, absolute channel pressure load cap limit is fixed at 25 bar.&quot;
            </div>
          </div>
        </div>

        {/* Right Side Panel: CLIENT PROPOSAL */}
        <div className="bg-white/[0.015] border border-white/5 rounded-xl p-3 flex flex-col gap-2 justify-start overflow-y-auto">
          <h5 className="font-mono text-[9px] tracking-wider text-amber-500 uppercase font-bold border-b border-amber-500/10 pb-1.5 mb-1 select-none">
            📄 VERSION 2
          </h5>
          <div className="flex flex-col gap-2 font-mono text-[10px] leading-relaxed">
            {/* Row 1 */}
            <div
              onClick={() => setHighlighted(0)}
              className={`p-2 rounded border cursor-pointer transition-all ${
                highlighted === 0 ? "scale-[1.01]" : ""
              } ${
                activeTab === "all" || activeTab === "match"
                  ? "border-[#10B981]/20 bg-[#10B981]/5 text-[#10B981]"
                  : "opacity-20 border-white/5 text-white/40"
              }`}
            >
              <span className="block text-[8px] font-bold text-white/35 uppercase select-none mb-0.5">Contract page 18 section 2.1</span>
              &quot;All recorded telemetry elements must reside within persistent archives for 6 calendar months.&quot;
            </div>

            {/* Row 2 */}
            <div
              onClick={() => setHighlighted(1)}
              className={`p-2 rounded border cursor-pointer transition-all ${
                highlighted === 1 ? "scale-[1.01]" : ""
              } ${
                activeTab === "all" || activeTab === "eq"
                  ? "border-[#F59E0B]/20 bg-[#F59E0B]/5 text-[#F59E0B]"
                  : "opacity-20 border-white/5 text-white/40"
              }`}
            >
              <span className="block text-[8px] font-bold text-white/35 uppercase select-none mb-0.5">Contract design spec page 42</span>
              &quot;Emergency report packets are queued and pushed to engineering operations within 2 days of incident.&quot;
            </div>

            {/* Row 3 */}
            <div
              onClick={() => setHighlighted(2)}
              className={`p-2 rounded border cursor-pointer transition-all ${
                highlighted === 2 ? "scale-[1.01]" : ""
              } ${
                activeTab === "all" || activeTab === "conflict"
                  ? "border-[#EF4444]/20 bg-[#EF4444]/5 text-[#EF4444]"
                  : "opacity-20 border-white/5 text-white/40"
              }`}
            >
              <span className="block text-[8px] font-bold text-white/35 uppercase select-none mb-0.5">Contract materials page 81</span>
              &quot;Hydraulic load verification stress testing is permitted to spike up to 32 bar load limits without trip.&quot;
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Context Diagnostic Console */}
      <div className="shrink-0 bg-black/60 border border-white/10 rounded-lg p-2.5 flex items-start gap-2 select-none min-h-[60px]">
        {highlighted === null ? (
          <div className="flex-grow flex items-center justify-center gap-2 py-1 text-[#64748B] font-mono text-[9px] tracking-wider uppercase text-center w-full">
            <Sliders size={12} className="animate-pulse" />
            <span>Click any highlighted code block above to run Vector Analysis comparison</span>
          </div>
        ) : (
          <div className="flex gap-2 w-full animate-fadeIn font-sans">
            <div className={`p-1.5 rounded shrink-0 self-center ${
              highlighted === 0 ? "bg-[#10B981]/20 text-[#10B981]" : highlighted === 1 ? "bg-[#F59E0B]/20 text-[#F59E0B]" : "bg-[#EF4444]/20 text-[#EF4444]"
            }`}>
              <AlertTriangle size={14} />
            </div>
            <div className="flex-grow min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <span className="font-mono text-[9px] uppercase tracking-wider font-semibold text-white">
                  {highlighted === 0 ? "FAISS VECTOR EMBEDDING MATCH: 94%" : highlighted === 1 ? "LLM SEMANTIC ALIGNMENT: VALID" : "CONVENTIONAL CONTRADICTION IDENTIFIED!"}
                </span>
                <span className={`text-[8.5px] font-mono uppercase px-1 rounded ${
                  highlighted === 0 ? "text-[#10B981] bg-[#10B981]/15" : highlighted === 1 ? "text-[#F59E0B] bg-[#F59E0B]/15" : "text-[#EF4444] bg-[#EF4444]/15 animate-pulse"
                }`}>
                  {highlighted === 0 ? "Safe / Matches standard" : highlighted === 1 ? "Different wording / Same timing" : "CRITICAL HAZARD DETECTED"}
                </span>
              </div>
              <p className="text-[10px] text-[#94A3B8] leading-tight">
                {highlighted === 0 && "180 continuous days aligns perfectly with 6 calendar months (vector delta = 0.051). Safe record compliance established."}
                {highlighted === 1 && "48 hours maps directly to 2 days under operations logic. RAG aligned parameters safely with matching priority."}
                {highlighted === 2 && "⚠️ CRITICAL EXCEPTION: Client contract addendum permits testing spikes up to 32 bar, which violates standard 25 bar physical limit threshold of current boiler assemblies."}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 🚗 DEMO 3: RODDS EDGE-INFERENCE SIMULATOR
// ==========================================
export function RoddsDemo() {
  const [running, setRunning] = useState(true);
  const [threatStatus, setThreatStatus] = useState<"SAFE" | "WARNING" | "CRITICAL" | "TRIGGERED">("SAFE");
  const [ttc, setTtc] = useState(4.2);
  const [speed, setSpeed] = useState(24.5);
  
  // Use a ref to guarantee unique IDs for newly recycled conveyor elements
  const nextIdRef = React.useRef(505);
  
  // Dense elements configuration with initial staggered horizontal positions and progression states
  const [items, setItems] = useState<Array<{
    id: string;
    name: string;
    y: number;
    x: number;
    type: "STANDARD" | "ANOMALY";
    confidence: number;
  }>>([
    { id: "ID_501", name: "AL_PLATE", y: 15, x: -14, type: "STANDARD", confidence: 99.1 },
    { id: "ID_502", name: "SHROUD_V3", y: 45, x: 12, type: "STANDARD", confidence: 98.4 },
    { id: "ID_503", name: "DEBRIS_HAZARD", y: 70, x: -2, type: "ANOMALY", confidence: 94.7 },
    { id: "ID_504", name: "HEX_BOLT_M8", y: 92, x: -18, type: "STANDARD", confidence: 97.8 }
  ]);

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setItems((prevItems) => {
        // Move each item down
        const updated = prevItems.map((item) => {
          let nextY = item.y + 4.5; // faster movement
          if (nextY >= 100) {
            nextY = 0;
            // Generate a random next item scenario
            const isHazard = Math.random() > 0.65;
            const names = isHazard 
              ? ["DEBRIS_HAZARD", "SPARK_EMISSION", "UNSTABLE_GEAR"]
              : ["AL_PLATE", "SHROUD_V3", "HEX_BOLT_M8", "BRACKET_CORE", "GASKET_RING"];
            const selectedName = names[Math.floor(Math.random() * names.length)];
            const rX = Math.floor(Math.random() * 32) - 16;
            const rConf = parseFloat((92 + Math.random() * 7.9).toFixed(1));
            const newIdVal = nextIdRef.current++;
            return {
              id: `ID_${newIdVal}`,
              name: selectedName,
              y: nextY,
              x: rX,
              type: isHazard ? "ANOMALY" : "STANDARD" as any,
              confidence: rConf
            };
          }
          return { ...item, y: nextY };
        });

        // Calculate global threat status from the anomalies present on the lane
        const anomalies = updated.filter(item => item.type === "ANOMALY");
        let highestAnomalyY = 0;
        anomalies.forEach(a => {
          if (a.y > highestAnomalyY) highestAnomalyY = a.y;
        });

        if (highestAnomalyY >= 85) {
          setThreatStatus("TRIGGERED");
          setSpeed(0);
          setTtc(0.0);
        } else if (highestAnomalyY >= 65) {
          setThreatStatus("CRITICAL");
          setSpeed(8.4);
          setTtc(parseFloat(((100 - highestAnomalyY) / 20).toFixed(1)));
        } else if (highestAnomalyY >= 40) {
          setThreatStatus("WARNING");
          setSpeed(18.2);
          setTtc(parseFloat(((100 - highestAnomalyY) / 20).toFixed(1)));
        } else {
          setThreatStatus("SAFE");
          setSpeed(28.5);
          setTtc(4.2);
        }

        return updated;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [running]);

  const triggerManualHazard = () => {
    if (!running) return;
    // Instantly inject a high-priority hazard at 70% progression so it slides down and trips!
    setItems(prev => {
      const rest = prev.filter(i => i.name !== "TEST_HAZARD");
      return [
        ...rest,
        { id: "ID_999", name: "TEST_HAZARD", y: 68, x: 2, type: "ANOMALY", confidence: 99.9 }
      ];
    });
  };

  return (
    <div className="w-full h-full min-h-[350px] bg-[#0E1317] border border-white/10 rounded-2xl p-4 flex flex-col justify-between font-sans text-xs text-white">
      {/* Mini Title Bar */}
      <div className="flex items-center justify-between border-b border-white/5 pb-2.5 mb-2 shrink-0 relative select-none">
        <div className="w-16" /> {/* Spacer */}
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${running ? "bg-[#10B981] animate-pulse" : "bg-gray-500"}`} />
          <span className="font-mono text-sm tracking-widest uppercase font-extrabold text-teal">
            RODDS
          </span>
        </div>
        <div className="flex gap-2 min-w-16 justify-end">
          <button 
            onClick={() => setRunning(!running)}
            className="bg-white/10 hover:bg-white/20 px-2 py-0.5 rounded text-[9px] border-none font-mono text-white cursor-pointer"
          >
            {running ? "PAUSE" : "RESUME"}
          </button>
        </div>
      </div>

      {/* Active Camera View Simulation Canvas */}
      <div className="flex-grow bg-[#05080A] rounded-xl border border-white/5 relative overflow-hidden flex flex-col justify-end p-3 min-h-[160px]">
        {/* Sky/Atmosphere grid bg for pseudo 3d */}
        <div className="absolute inset-0 opacity-25 flex flex-col justify-between p-2 pointer-events-none select-none">
          <div className="border-b border-[#38BDF8]/10 w-full h-[1px]" />
          <div className="border-b border-[#38BDF8]/10 w-full h-[1px]" />
          <div className="border-b border-[#38BDF8]/10 w-full h-[1px]" />
        </div>

        {/* 3D Moving Lane Trapezoid Corridor zone */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
          {/* Static Perspective Guidelines */}
          <line x1="20" y1="100" x2="45" y2="40" stroke="rgba(255,255,255, 0.05)" strokeWidth="0.5" />
          <line x1="80" y1="100" x2="55" y2="40" stroke="rgba(255,255,255, 0.05)" strokeWidth="0.5" />
          
          <path
            d="M 28,100 L 46,45 L 54,45 L 72,100 Z"
            fill={
              threatStatus === "SAFE"
                ? "rgba(75, 123, 123, 0.05)"
                : threatStatus === "WARNING"
                ? "rgba(245, 158, 11, 0.12)"
                : "rgba(239, 68, 68, 0.22)"
            }
            stroke={
              threatStatus === "SAFE"
                ? "rgba(75, 123, 123, 0.35)"
                : threatStatus === "WARNING"
                ? "rgba(245, 158, 11, 0.8)"
                : "rgba(239, 68, 68, 0.95)"
            }
            strokeWidth="0.75"
            strokeDasharray="2,2"
            className={threatStatus === "CRITICAL" || threatStatus === "TRIGGERED" ? "animate-pulse" : ""}
          />
        </svg>

        {/* Realtime Moving Object Bounding Boxes */}
        {running && items.map((item) => {
          // Calculate item-specific space positions
          const distance = (10 * (1 - item.y / 100)).toFixed(1);
          const isAnomaly = item.type === "ANOMALY";
          
          let boxColorClass = "border-teal/60 text-teal bg-teal/10";
          let outerTargetClass = "border-teal/50 bg-teal/20";
          let innerTargetClass = "bg-teal";

          if (isAnomaly) {
            if (item.y >= 85) {
              boxColorClass = "border-red-500 text-red-400 bg-red-950/45 shadow-[0_0_10px_rgba(239,68,68,0.4)]";
              outerTargetClass = "border-red-500/80 bg-red-500/30";
              innerTargetClass = "bg-red-500";
            } else if (item.y >= 65) {
              boxColorClass = "border-red-400 text-red-400 bg-red-950/25";
              outerTargetClass = "border-red-400/60 bg-red-400/20";
              innerTargetClass = "bg-red-400";
            } else if (item.y >= 40) {
              boxColorClass = "border-amber-400 text-amber-300 bg-amber-950/25";
              outerTargetClass = "border-amber-400/60 bg-amber-400/20";
              innerTargetClass = "bg-amber-400";
            } else {
              boxColorClass = "border-yellow-500 text-yellow-400 bg-yellow-950/15";
              outerTargetClass = "border-yellow-500/40 bg-yellow-500/10";
              innerTargetClass = "bg-yellow-500";
            }
          }

          return (
            <div
              key={item.id}
              className="absolute flex flex-col items-center pointer-events-none will-change-transform"
              style={{
                left: `${50 + (item.x * (0.35 + item.y * 0.0125))}%`,
                top: `${40 + (item.y * 0.55)}%`,
                transform: `translate3d(-50%, -50%, 0) scale(${0.26 + (item.y * 0.012)})`,
                zIndex: Math.floor(item.y),
                opacity: item.y > 84 ? Math.max(0, 1 - (item.y - 84) / 12) : 1,
              }}
            >
              <div className={`border rounded px-1.5 py-0.5 flex flex-col items-center gap-0.5 font-mono ${boxColorClass}`}>
                <span className="text-[6.5px] bg-black/85 px-1 py-0.2 rounded-sm tracking-wide text-white/90 mb-0.5 whitespace-nowrap">
                  {item.id} : {item.name}
                </span>
                <div className="flex items-center gap-1 text-[7.5px] font-bold">
                  <span>{item.y >= 85 && isAnomaly ? "TRIPPED 0.0m" : `${distance}m`}</span>
                  <span className="opacity-60">({item.confidence}%)</span>
                </div>
              </div>
              
              {/* Visual target pointer */}
              <div className={`w-2.5 h-2.5 rounded-full border flex items-center justify-center mt-1 animate-pulse ${outerTargetClass}`}>
                <div className={`w-1 h-1 rounded-full ${innerTargetClass}`} />
              </div>
            </div>
          );
        })}

        {/* Hazard Alarm Overlay Alert */}
        <AnimatePresence>
          {(threatStatus === "CRITICAL" || threatStatus === "TRIGGERED") && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: running ? 1 : 0 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#EF4444]/10 pointer-events-none border border-[#EF4444]/30 select-none flex items-center justify-center"
            >
              <div className="bg-[#EF4444]/80 text-white font-mono px-3 py-1 text-[8.5px] tracking-widest font-bold rounded shadow-lg flex items-center gap-1.5 animate-bounce mb-12 uppercase">
                <AlertTriangle size={11} className="fill-white stroke-[#EF4444]" />
                {threatStatus === "TRIGGERED" ? "CRITICAL EMERGENCY OVERRIDE TRIGGERED" : "COLLISION WARNING PREDICTED"}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Telemetry Readout Stats Bar inside Camera Frame */}
        <div className="w-full bg-[#0e1317]/95 rounded-lg p-2 flex justify-between items-center z-[200] border border-white/10 select-none text-[8.5px] font-mono leading-normal relative">
          <div className="flex flex-col">
            <span className="text-white/40">CLOSING_RATE</span>
            <span className="text-white font-bold">{running ? `${speed.toFixed(1)} fps` : "0.0 fps"}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-white/40">CALC_TTC</span>
            <span className={`font-bold font-mono ${ttc <= 1.5 ? "text-[#EF4444] animate-pulse" : ttc <= 3.0 ? "text-[#F59E0B]" : "text-teal"}`}>
              {running ? `${ttc}s` : "STANDBY"}
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-white/40">OVERRIDE DECISION</span>
            <span className={`font-bold px-1.5 py-0.2 rounded-sm ${
              threatStatus === "TRIGGERED"
                ? "bg-[#EF4444] text-white"
                : threatStatus === "CRITICAL"
                ? "bg-[#EF4444]/20 text-[#EF4444]"
                : threatStatus === "WARNING"
                ? "bg-[#F59E0B]/20 text-[#F59E0B]"
                : "bg-teal/15 text-teal"
            }`}>
              {threatStatus === "TRIGGERED" ? "BRAKES_ON" : threatStatus === "CRITICAL" ? "DEPLOY_BRAKES" : threatStatus === "WARNING" ? "DE_BOUNCE" : "PASSIVE_MONITOR"}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom control row */}
      <div className="shrink-0 flex gap-2 justify-between items-center select-none pt-2 mt-1">
        <span className="text-[#64748B] text-[9px] font-mono">
          MODEL: RESNET-18 QAT QUANTIZED [CONVEY_SAFETY]
        </span>
        <button
          onClick={triggerManualHazard}
          disabled={!running}
          className="bg-[#EF4444] hover:bg-red-600 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 text-white font-semibold font-mono text-[9px] px-3 py-1.5 rounded transition-all border-none cursor-pointer flex items-center gap-1 uppercase"
        >
          <PlayCircle size={10} /> Test Hazard Trap
        </button>
      </div>
    </div>
  );
}
