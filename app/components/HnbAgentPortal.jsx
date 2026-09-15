"use client";

import { useState } from "react";
import { Shield, Search, MessageCircle, Check, X, ArrowLeft, ArrowRight, Menu, ChevronDown, BookOpen } from "lucide-react";

const brand = {
  teal: "#00305B",
  tealDark: "#001F3D",
  coral: "#F26522",
  ink: "#1A1A1A",
  paper: "#F5F6F8",
  line: "#DCE0E5",
};

const serif = { fontFamily: "Georgia, 'Times New Roman', serif" };

const FEATURES = [
  { title: "Built for the field and the office", body: "Mobile-first drawers and large touch targets on the road; a multi-column layout with split document previews at your desk." },
  { title: "Role-based access, admin-verified", body: "New agents register into a pending queue. A designated department reviews, approves, or rejects every account." },
  { title: "Real-time knowledge base", body: "Policy guides and product updates live in a cloud CMS and push to every open session the moment an admin publishes." },
  { title: "AI knowledge assistant", body: "Ask in plain language and get answers grounded in the official policy documents, not a generic search box." },
  { title: "Offline-ready in the field", body: "Progressive Web App caching keeps core reference material available on weak or dropped connections." },
  { title: "Sinhala & Tamil ready", body: "English ships first; the localization framework is wired in from day one for a smooth Phase 2 rollout." },
];

const DOCS = [
  { id: "d1", title: "Motor Comprehensive — Claim Workflow", tag: "Claims", body: "Step-by-step process for lodging and settling a motor comprehensive claim, including required documents and turnaround SLAs." },
  { id: "d2", title: "Life Protect Plus — Policy Guide", tag: "Policy", body: "Coverage tiers, exclusions, premium schedule and rider add-ons for the Life Protect Plus product line." },
  { id: "d3", title: "Health Shield — Pre-authorization", tag: "Claims", body: "When pre-authorization is required, the hospital network list, and escalation contacts for urgent cases." },
  { id: "d4", title: "Q3 2026 Product Update", tag: "Update", body: "New rider bundle for Health Shield and revised premium bands effective this quarter." },
];

const CATEGORIES = ["Legal & Regulatory", "Documentation & Forms", "Product Lines"];

const CHAPTERS = [
  {
    id: "ch1",
    number: 1,
    title: "Legal Systems",
    category: "Legal & Regulatory",
    summary: "Core contract-law principles applied to insurance, plus the regulatory framework governing insurers, brokers and agents in Sri Lanka.",
    keyTopics: ["Formation of Contract", "Contractual Capacity", "Discharge & Remedies", "Assignment", "IRCSL", "Agents & Brokers", "Code of Conduct"],
    sections: [
      { heading: "1.1.1 Formation of a Contract", body: "A valid contract needs an offer and unconditional acceptance, consideration, and (where the law requires it, as with insurance) a written form. Marketing material like brochures or ads is only an \"invitation to treat\" — the customer's proposal to the insurer is the actual offer." },
      { heading: "1.1.2 Contractual Capacity", body: "Minors (under 18), mentally incapacitated persons, and involuntarily intoxicated persons generally can't be bound by a contract, though a contract purely beneficial to a minor may still stand." },
      { heading: "1.1.3–1.1.4 Discharge & Remedies", body: "A contract ends through performance, breach, frustration, mutual agreement, or operation of law. When breached, the innocent party can seek rescission, damages, specific performance, or an injunction." },
      { heading: "1.1.5 Limitation of Actions", body: "Under the Prescription Ordinance: 2 years to claim for negligent-driving damages, 6 years to dispute repudiation of a written insurance claim, 3 years for a claim with no written contract." },
      { heading: "1.1.6 Assignment", body: "A policyholder can transfer their policy rights to another party (e.g. a bank as loan security). This needs consideration and notice to the insurer to be validly registered." },
      { heading: "1.2 Regulation of Insurance", body: "The Regulation of the Insurance Industry Act No. 43 of 2000 replaced the old Control of Insurance Act. It established the Insurance Regulatory Commission of Sri Lanka (IRCSL), which supervises the industry, sets tariffs, issues directives, and runs the Policyholders' Protection Fund." },
      { heading: "1.3–1.4 Brokers & Agents", body: "Only IRCSL-registered companies can act as brokers; only individuals can be registered as agents, and an agent can't work for two insurers or brokers at once. Agents must remit collected premiums within two weeks." },
      { heading: "1.5 Code of Conduct for Insurance Agents", body: "Eight principles from the Insurance Association of Sri Lanka: integrity & honesty, competent advice, quality service pre/post sale, enabling informed client decisions, confidentiality, protecting public confidence, legal compliance, and professional conduct with all stakeholders." },
    ],
  },
  {
    id: "ch2",
    number: 2,
    title: "Insurance Documents",
    category: "Documentation & Forms",
    summary: "The paper trail of a policy — from the proposal form that starts it to the survey report that helps settle a claim.",
    keyTopics: ["Proposal Forms", "Policy Forms", "Warranties", "Cover Notes", "Endorsements", "Claim Forms", "Survey Reports"],
    sections: [
      { heading: "2.1 Proposal Forms", body: "The basis of the contract. Captures the proposer's name, address, occupation, prior insurance history, past losses, and sum insured. A false answer entitles the insurer to avoid the contract entirely." },
      { heading: "2.2 Policy Forms", body: "Made up of a heading, a preamble/recital naming the parties, the operative clause (what perils are covered and when the insurer pays), a schedule of contract-specific details, and conditions." },
      { heading: "Conditions: precedent vs subsequent", body: "Breaching a condition precedent voids the policy from inception; breaching a condition subsequent voids it going forward; breaching a condition precedent to liability only blocks that one claim, leaving the rest of the policy intact." },
      { heading: "2.3 Warranties", body: "Stricter than conditions — must be literally and exactly complied with, whether or not the breach actually relates to the loss. A breached warranty makes the policy voidable at the insurer's option." },
      { heading: "2.4 Cover Notes", body: "Temporary proof of cover issued while the full policy is being prepared. States insured details, sum insured, period, risk covered, and premium — and is superseded once the real policy is issued." },
      { heading: "2.5–2.6 Endorsements & Renewal Notices", body: "An endorsement is a memorandum that alters policy terms after issue. A renewal notice is sent about a month before expiry — good practice, but not a legal obligation on the insurer." },
      { heading: "2.7–2.8 Claim Forms & Survey Reports", body: "The claim form captures the circumstances of a loss (not used in marine cargo claims). A survey report is an independent assessment from a licensed surveyor on the cause and extent of loss, used to process and settle the claim." },
    ],
  },
  {
    id: "ch5",
    number: 5,
    title: "Fire Insurance",
    category: "Product Lines",
    summary: "What a standard Fire policy actually covers, the 12 standard exclusions, and the additional perils agents can sell on top.",
    keyTopics: ["Standard Cover", "12 Exclusions", "Additional Perils", "Sum Insured Basis", "Declaration Policies", "Business Interruption"],
    sections: [
      { heading: "5.1 What's Covered", body: "Fire, lightning, and limited explosion (domestic boilers/gas only). To count as \"fire,\" there must be actual ignition of something not meant to be burning, and it must be accidental." },
      { heading: "5.2 Related Covered Damage", body: "Damage from firefighting water, smoke/heat from the fire, related structural collapse, and damage caused during rescue efforts are all still covered as part of the fire claim." },
      { heading: "5.3 The 12 Standard Exclusions", body: "Self-fermentation/spontaneous combustion, weather perils (cyclone, flood — insurable separately), war, forest-clearing fires, riot/civil commotion, earthquake, self-caused electrical machine damage, government-ordered burning, subterranean fire, theft during/after a fire, and nuclear/radioactive damage." },
      { heading: "5.4 Property Excluded Unless Declared", body: "Goods held in trust, unset precious stones/bullion, high-value curios or artwork, manuscripts/plans, securities/cash/business records, and explosives — none are covered unless specifically declared and agreed." },
      { heading: "5.5 Additional (Special) Perils", body: "Sold as extensions at extra premium, grouped as Chemical (explosion, spontaneous combustion), Social (riot & strike, malicious damage, terrorism — funded via Sri Lanka's government Strike, Riot, Civil Commotion & Terrorism Fund), Natural (cyclone/storm, flood, earthquake), and Miscellaneous (aircraft damage, water-tank bursts, vehicle impact, sprinkler leakage, electrical fire damage)." },
      { heading: "5.6 Sum Insured Basis", body: "Buildings are insured on reinstatement cost (or modern-equivalent cost if obsolete); contents on new-replacement cost. Fluctuating stock can use a Declaration Policy, where a provisional premium (75% of the annual rate) is later trued up against monthly declared values." },
      { heading: "5.7 Consequential Loss (Business Interruption)", body: "Covers lost profit after an insured peril interrupts the business — but only alongside an active material-damage policy on the same property. The key variable is the \"Indemnity Period\": how long the business's results stay affected, typically 12–36 months." },
    ],
  },
];

const GLOSSARY = [
  { term: "Invitation to Treat", def: "Marketing material (ads, brochures) inviting a proposal — not itself an offer capable of being accepted." },
  { term: "Consideration", def: "The monetary/financial value that must pass between parties for a contract to be valid." },
  { term: "Assignment", def: "Transferring a policyholder's rights under a policy to another party, e.g. a bank as loan security." },
  { term: "Warranty (insurance)", def: "A condition that must be literally complied with; any breach makes the policy voidable, even if unrelated to the actual loss." },
  { term: "Cover Note", def: "Temporary written proof of insurance cover issued before the full policy document is ready." },
  { term: "Endorsement", def: "A memorandum attached to a policy that formally alters its original terms." },
  { term: "Declaration Policy", def: "A stock policy where sum insured is trued up periodically against actual declared stock values." },
  { term: "Indemnity Period", def: "How long a business interruption policy pays out for — the time the business's results stay affected by the loss." },
  { term: "IRCSL", def: "Insurance Regulatory Commission of Sri Lanka — supervises and regulates the entire insurance industry." },
];

const PENDING_USERS = [
  { id: "u1", name: "Nadeesha Perera", email: "nadeesha.perera@hnbinsurance.lk", requested: "2 hours ago" },
  { id: "u2", name: "Kasun Fernando", email: "kasun.fernando@hnbinsurance.lk", requested: "Yesterday" },
  { id: "u3", name: "Ishara De Silva", email: "ishara.desilva@hnbinsurance.lk", requested: "2 days ago" },
];

function TopNav({ view, setView }) {
  const items = [
    ["landing", "Home"],
    ["login", "Sign in"],
    ["dashboard", "Agent portal"],
    ["library", "Library"],
    ["admin", "Admin"],
  ];
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: brand.line, background: "white" }}>
      <div className="flex items-center gap-2">
        <Shield size={20} color={brand.teal} />
        <span className="font-semibold text-sm" style={serif}>HNB Agent Portal</span>
      </div>
      <div className="flex items-center gap-1 text-xs">
        {items.map(([key, label]) => (
          <button
            key={key}
            onClick={() => setView(key)}
            className="px-3 py-1.5 rounded-full font-medium transition"
            style={
              view === key
                ? { background: brand.teal, color: "white" }
                : { color: brand.ink, opacity: 0.6 }
            }
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

function Landing({ setView }) {
  return (
    <main style={{ background: brand.paper, color: brand.ink }}>
      <section className="relative overflow-hidden px-6 pt-14 pb-16 md:px-12 md:pt-20 md:pb-24">
        <div
          aria-hidden
          className="absolute inset-0 -z-0"
          style={{
            background:
              "radial-gradient(1000px 500px at 15% -10%, rgba(242,101,34,0.14), transparent), radial-gradient(800px 450px at 105% 10%, rgba(0,48,91,0.10), transparent)",
          }}
        />
        <div className="relative max-w-2xl">
          <p className="mb-4 text-xs font-semibold" style={{ color: brand.coral, letterSpacing: "0.08em" }}>
            HNB INSURANCE SRI LANKA · INTERNAL
          </p>
          <h1 className="text-4xl md:text-5xl leading-tight mb-6" style={serif}>
            One reference, every device, every agent.
          </h1>
          <p className="text-lg mb-8" style={{ color: brand.ink, opacity: 0.8 }}>
            Policy details, claim workflows and product updates — instantly searchable
            in the field on a phone, and side-by-side with source documents at your desk.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setView("dashboard")}
              className="px-6 py-3 rounded-full text-sm font-semibold text-white"
              style={{ background: brand.teal }}
            >
              Preview the portal
            </button>
            <button
              onClick={() => setView("login")}
              className="px-6 py-3 rounded-full text-sm font-semibold text-white"
              style={{ background: brand.coral }}
            >
              Request agent access
            </button>
          </div>
        </div>
      </section>

      <section className="px-6 pb-16 md:px-12 md:pb-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {FEATURES.map((f) => (
            <div key={f.title} className="p-5 rounded-2xl border bg-white" style={{ borderColor: brand.line }}>
              <h3 className="font-semibold mb-2" style={serif}>{f.title}</h3>
              <p className="text-sm" style={{ opacity: 0.7 }}>{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 pb-20 md:px-12">
        <div className="max-w-6xl mx-auto p-8 md:p-12 rounded-3xl text-white" style={{ background: brand.teal }}>
          <h2 className="text-2xl md:text-3xl mb-3" style={serif}>
            New here? Registration goes to your admin team first.
          </h2>
          <p className="mb-6 max-w-xl" style={{ opacity: 0.85 }}>
            Accounts start in a pending state until the designated department approves
            access — no self-service into live policy data.
          </p>
          <button
            onClick={() => setView("login")}
            className="px-6 py-3 rounded-full text-sm font-semibold text-white"
            style={{ background: brand.coral }}
          >
            Create an account
          </button>
        </div>
      </section>
    </main>
  );
}

function Login({ setView }) {
  const [mode, setMode] = useState("signin");
  return (
    <main className="min-h-[500px] flex items-center justify-center px-6 py-16" style={{ background: brand.paper }}>
      <div className="w-full max-w-md p-8 rounded-2xl border bg-white" style={{ borderColor: brand.line }}>
        <button onClick={() => setView("landing")} className="flex items-center gap-1 text-sm mb-6" style={{ color: brand.teal }}>
          <ArrowLeft size={14} /> Back
        </button>

        {mode !== "pending" && (
          <>
            <h1 className="text-2xl mb-6" style={serif}>{mode === "signin" ? "Sign in" : "Request agent access"}</h1>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                if (mode === "signup") setMode("pending");
              }}
            >
              {mode === "signup" && <Field label="Full name" placeholder="e.g. Nadeesha Perera" />}
              <Field label="Work email" type="email" placeholder="agent@hnbinsurance.lk" />
              <Field label="Password" type="password" placeholder="••••••••" />
              <button type="submit" className="w-full py-3 rounded-full text-sm font-semibold text-white" style={{ background: brand.coral }}>
                {mode === "signin" ? "Sign in" : "Submit for approval"}
              </button>
            </form>
            <button
              className="mt-4 text-sm underline underline-offset-2"
              style={{ color: brand.teal }}
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            >
              {mode === "signin" ? "New agent? Request access" : "Already approved? Sign in"}
            </button>
          </>
        )}

        {mode === "pending" && (
          <div className="text-center p-6 rounded-xl" style={{ background: brand.paper }}>
            <p className="text-xl mb-2" style={serif}>Request submitted</p>
            <p className="text-sm mb-4" style={{ opacity: 0.7 }}>
              Your account is pending review by the HNB Insurance admin team. You'll get
              access once approved — no need to submit again.
            </p>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold" style={{ background: "#FEF3C7", color: "#92400E" }}>
              Status: Pending
            </span>
          </div>
        )}
      </div>
    </main>
  );
}

function Field({ label, type = "text", placeholder }) {
  return (
    <label className="block text-sm font-medium" style={{ opacity: 0.8 }}>
      {label}
      <input
        type={type}
        placeholder={placeholder}
        className="mt-1 w-full px-3 py-2.5 rounded-lg border text-sm outline-none"
        style={{ borderColor: brand.line }}
      />
    </label>
  );
}

function Dashboard() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(DOCS[0]);
  const [chatOpen, setChatOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const filtered = DOCS.filter((d) => (d.title + d.body).toLowerCase().includes(query.toLowerCase()));

  const Sidebar = (
    <div className="p-4 h-full">
      <p className="text-sm font-semibold mb-3" style={{ ...serif, color: brand.teal }}>Knowledge search</p>
      <div className="relative mb-3">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ opacity: 0.4 }} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search policies, claims, updates…"
          className="w-full pl-8 pr-3 py-2.5 rounded-lg border text-sm outline-none"
          style={{ borderColor: brand.line }}
        />
      </div>
      <ul className="space-y-1">
        {filtered.map((d) => (
          <li key={d.id}>
            <button
              onClick={() => { setActive(d); setSidebarOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm"
              style={active.id === d.id ? { background: brand.teal, color: "white" } : { color: brand.ink }}
            >
              <span className="block font-medium">{d.title}</span>
              <span className="text-xs" style={{ opacity: active.id === d.id ? 0.7 : 0.5 }}>{d.tag}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <main className="relative min-h-[600px]" style={{ background: brand.paper, color: brand.ink }}>
      <div className="flex md:hidden items-center justify-between px-4 py-3 border-b bg-white" style={{ borderColor: brand.line }}>
        <button onClick={() => setSidebarOpen(true)} className="flex items-center gap-2 text-sm font-medium">
          <Menu size={16} /> Search knowledge base
        </button>
      </div>

      <div className="grid md:grid-cols-[280px_1fr]">
        <aside className="hidden md:block border-r bg-white" style={{ borderColor: brand.line }}>{Sidebar}</aside>

        <section className="p-6 md:p-10">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3" style={{ background: "rgba(242,101,34,0.15)", color: brand.coral }}>
            {active.tag}
          </span>
          <h1 className="text-2xl mb-3" style={serif}>{active.title}</h1>
          <p className="max-w-2xl mb-6" style={{ opacity: 0.8 }}>{active.body}</p>
          <div className="p-6 rounded-xl border border-dashed text-sm" style={{ borderColor: brand.line, opacity: 0.5 }}>
            Split-screen document preview (PDF/DOC) renders here on desktop — collapses
            into a full-screen sheet on mobile.
          </div>
        </section>
      </div>

      {/* mobile bottom drawer for search */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 md:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setSidebarOpen(false)} />
          <div className="absolute bottom-0 inset-x-0 rounded-t-2xl bg-white max-h-[80%] overflow-auto">{Sidebar}</div>
        </div>
      )}

      <button
        onClick={() => setChatOpen((v) => !v)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full text-white flex items-center justify-center shadow-lg z-20"
        style={{ background: brand.teal }}
        aria-label="Open AI knowledge assistant"
      >
        <MessageCircle size={22} />
      </button>

      {chatOpen && (
        <div className="fixed z-20 bottom-24 left-4 right-4 sm:left-auto sm:right-6 sm:w-96 rounded-2xl border bg-white p-4 shadow-xl" style={{ borderColor: brand.line }}>
          <p className="text-sm font-semibold mb-3" style={serif}>Knowledge Assistant</p>
          <div className="space-y-2 text-sm mb-3">
            <p className="p-3 rounded-lg" style={{ background: brand.paper }}>
              "Does a breached warranty always void a fire claim?"
            </p>
            <p className="p-3 rounded-lg" style={{ background: "rgba(0,48,91,0.08)" }}>
              Yes in principle — a warranty must be literally complied with, and any breach
              makes the policy voidable at the insurer's option, regardless of whether it
              relates to the loss. In practice, purely technical breaches are often treated
              as non-standard claims under company guidelines.
              <span className="block text-xs mt-1" style={{ opacity: 0.5 }}>Source: Chapter 2 §2.3 — Warranties</span>
            </p>
          </div>
          <input
            placeholder="Ask about a policy or claim…"
            className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
            style={{ borderColor: brand.line }}
          />
        </div>
      )}
    </main>
  );
}

function Library() {
  const [category, setCategory] = useState("All");
  const [active, setActive] = useState(CHAPTERS[0]);
  const [openSections, setOpenSections] = useState([0]);
  const [showGlossary, setShowGlossary] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const visible = category === "All" ? CHAPTERS : CHAPTERS.filter((c) => c.category === category);

  function toggleSection(i) {
    setOpenSections((open) => (open.includes(i) ? open.filter((x) => x !== i) : [...open, i]));
  }

  const ChapterList = (
    <div className="p-4">
      <p className="text-sm font-semibold mb-3" style={{ ...serif, color: brand.teal }}>Training Library</p>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {["All", ...CATEGORIES].map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className="px-2.5 py-1 rounded-full text-xs font-medium"
            style={category === c ? { background: brand.teal, color: "white" } : { background: brand.paper, color: brand.ink, opacity: 0.7 }}
          >
            {c}
          </button>
        ))}
      </div>
      <ul className="space-y-1">
        {visible.map((c) => (
          <li key={c.id}>
            <button
              onClick={() => { setActive(c); setOpenSections([0]); setDrawerOpen(false); }}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm"
              style={active.id === c.id ? { background: brand.teal, color: "white" } : { color: brand.ink }}
            >
              <span className="block font-medium">Ch {c.number} — {c.title}</span>
              <span className="text-xs" style={{ opacity: active.id === c.id ? 0.7 : 0.5 }}>{c.category}</span>
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={() => setShowGlossary((v) => !v)}
        className="mt-4 w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold border"
        style={{ borderColor: brand.line, color: brand.teal }}
      >
        <BookOpen size={14} /> {showGlossary ? "Hide glossary" : "Quick-reference glossary"}
      </button>
    </div>
  );

  return (
    <main className="relative min-h-[600px]" style={{ background: brand.paper, color: brand.ink }}>
      <div className="flex md:hidden items-center justify-between px-4 py-3 border-b bg-white" style={{ borderColor: brand.line }}>
        <button onClick={() => setDrawerOpen(true)} className="flex items-center gap-2 text-sm font-medium">
          <Menu size={16} /> Browse chapters
        </button>
      </div>

      <div className="grid md:grid-cols-[300px_1fr]">
        <aside className="hidden md:block border-r bg-white overflow-y-auto" style={{ borderColor: brand.line }}>{ChapterList}</aside>

        <section className="p-6 md:p-10 max-w-3xl">
          {showGlossary ? (
            <>
              <h1 className="text-2xl mb-5" style={serif}>Quick-reference glossary</h1>
              <div className="space-y-4">
                {GLOSSARY.map((g) => (
                  <div key={g.term} className="pb-4 border-b" style={{ borderColor: brand.line }}>
                    <p className="font-semibold text-sm" style={{ color: brand.teal }}>{g.term}</p>
                    <p className="text-sm mt-1" style={{ opacity: 0.75 }}>{g.def}</p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3" style={{ background: "rgba(242,101,34,0.15)", color: brand.coral }}>
                Chapter {active.number} · {active.category}
              </span>
              <h1 className="text-2xl md:text-3xl mb-3" style={serif}>{active.title}</h1>
              <p className="mb-5" style={{ opacity: 0.8 }}>{active.summary}</p>
              <div className="flex flex-wrap gap-2 mb-8">
                {active.keyTopics.map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: "rgba(0,48,91,0.08)", color: brand.teal }}>
                    {t}
                  </span>
                ))}
              </div>

              <div className="space-y-2">
                {active.sections.map((s, i) => {
                  const open = openSections.includes(i);
                  return (
                    <div key={s.heading} className="rounded-xl border bg-white overflow-hidden" style={{ borderColor: brand.line }}>
                      <button
                        onClick={() => toggleSection(i)}
                        className="w-full flex items-center justify-between px-4 py-3 text-left text-sm font-semibold"
                      >
                        {s.heading}
                        <ChevronDown size={16} style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.15s", opacity: 0.5 }} />
                      </button>
                      {open && <p className="px-4 pb-4 text-sm" style={{ opacity: 0.75 }}>{s.body}</p>}
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </section>
      </div>

      {drawerOpen && (
        <div className="fixed inset-0 z-30 md:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setDrawerOpen(false)} />
          <div className="absolute bottom-0 inset-x-0 rounded-t-2xl bg-white max-h-[80%] overflow-auto">{ChapterList}</div>
        </div>
      )}
    </main>
  );
}

function Admin() {
  const [decided, setDecided] = useState({});
  return (
    <main className="px-6 py-10 md:px-12 min-h-[500px]" style={{ background: brand.paper, color: brand.ink }}>
      <p className="text-xs font-semibold mb-2" style={{ color: brand.coral, letterSpacing: "0.08em" }}>ADMIN DASHBOARD</p>
      <h1 className="text-3xl mb-8" style={serif}>Pending agent sign-ups</h1>

      <div className="rounded-2xl border overflow-hidden bg-white" style={{ borderColor: brand.line }}>
        <table className="w-full text-left text-sm">
          <thead style={{ background: brand.paper }}>
            <tr>
              <th className="px-5 py-3 font-medium" style={{ opacity: 0.6 }}>Agent</th>
              <th className="px-5 py-3 font-medium" style={{ opacity: 0.6 }}>Requested</th>
              <th className="px-5 py-3 font-medium" style={{ opacity: 0.6 }}>Status</th>
              <th className="px-5 py-3 font-medium" style={{ opacity: 0.6 }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {PENDING_USERS.map((p) => {
              const status = decided[p.id];
              return (
                <tr key={p.id} className="border-t" style={{ borderColor: brand.line }}>
                  <td className="px-5 py-4">
                    <div className="font-medium">{p.name}</div>
                    <div style={{ opacity: 0.5 }}>{p.email}</div>
                  </td>
                  <td className="px-5 py-4" style={{ opacity: 0.6 }}>{p.requested}</td>
                  <td className="px-5 py-4">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={
                        status === "approved"
                          ? { background: "#D1FAE5", color: "#065F46" }
                          : status === "rejected"
                          ? { background: "#FEE2E2", color: "#991B1B" }
                          : { background: "#FEF3C7", color: "#92400E" }
                      }
                    >
                      {status ? status[0].toUpperCase() + status.slice(1) : "Pending"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setDecided((d) => ({ ...d, [p.id]: "approved" }))}
                        className="px-3 py-1.5 rounded-full text-xs font-semibold text-white flex items-center gap-1"
                        style={{ background: brand.teal }}
                      >
                        <Check size={12} /> Approve
                      </button>
                      <button
                        onClick={() => setDecided((d) => ({ ...d, [p.id]: "rejected" }))}
                        className="px-3 py-1.5 rounded-full text-xs font-semibold border flex items-center gap-1"
                        style={{ borderColor: brand.line }}
                      >
                        <X size={12} /> Reject
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="mt-6 max-w-xl text-sm" style={{ opacity: 0.6 }}>
        In production, approve/reject writes to Supabase with row-level security so only
        this admin department can change access, and the change pushes to the agent's
        session in real time.
      </p>
    </main>
  );
}

export default function HnbAgentPortal() {
  const [view, setView] = useState("landing");
  return (
    <div className="min-h-screen" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
      <TopNav view={view} setView={setView} />
      {view === "landing" && <Landing setView={setView} />}
      {view === "login" && <Login setView={setView} />}
      {view === "dashboard" && <Dashboard />}
      {view === "library" && <Library />}
      {view === "admin" && <Admin />}
    </div>
  );
}
