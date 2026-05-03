import { useState, useEffect, useRef } from "react";

const STATS = [
  { value: "171+", label: "Active Subscribers" },
  { value: "25%", label: "MoM Growth" },
  { value: "2.67M", label: "SA SMMEs" },
  { value: "9", label: "Modules" },
];

const MODULES = [
  { icon: "🌐", name: "Website Builder", desc: "Professional websites, no coding needed." },
  { icon: "📱", name: "Social Media Hub", desc: "Design & schedule posts from your dashboard." },
  { icon: "💼", name: "Biz Connect", desc: "Manage LinkedIn updates to grow professionally." },
  { icon: "🧾", name: "Quotes & Invoices", desc: "Generate professional invoices in seconds." },
  { icon: "📊", name: "Income & Expenses", desc: "Real-time cash flow tracking and reporting." },
  { icon: "👥", name: "HR & Payroll", desc: "Manage your team, leave, and payroll." },
  { icon: "🤝", name: "Client CRM", desc: "Track every client from contact to conversion." },
  { icon: "📢", name: "Campaign Builder", desc: "Plan and launch marketing campaigns." },
  { icon: "💰", name: "Partner Program", desc: "Earn recurring income via referrals." },
];

const PLANS = [
  {
    name: "Enterprize",
    price: "R599",
    label: "Starter",
    features: ["Website Builder", "Social Media Hub", "Biz Connect", "Single User", "WhatsApp Support"],
    highlight: false,
  },
  {
    name: "Enterprize Plus",
    price: "R899",
    label: "Most Popular",
    features: ["All Starter features", "Financial Transactions", "Quotes & Invoices", "Client CRM", "Campaign Builder", "Priority Support"],
    highlight: true,
  },
  {
    name: "Enterprize Premium",
    price: "R1,499",
    label: "All-In-One",
    features: ["All Plus features", "Up to 4 Users", "HR & Payroll", "Management Accounts", "All Future Updates", "Premium Support"],
    highlight: false,
  },
];

const FUNDS = [
  { pct: "40%", amount: "$400K", title: "Marketing & Growth", color: "#38BDF8", items: ["Digital advertising campaigns", "SMME community partnerships", "B-BBEE channel distribution", "Referral & affiliate programs"] },
  { pct: "35%", amount: "$350K", title: "Team & Hiring", color: "#7FBAFF", items: ["Sales team expansion", "Customer success managers", "Platform developers", "Support specialists"] },
  { pct: "25%", amount: "$250K", title: "Tech & Infrastructure", color: "#34D399", items: ["AI feature development", "Mobile app launch", "Cloud scaling & security", "POPIA & SARS compliance"] },
];

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const step = Math.ceil(target / (1800 / 16));
          const timer = setInterval(() => {
            start += step;
            if (start >= target) { setCount(target); clearInterval(timer); }
            else setCount(start);
          }, 16);
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

// Responsive style helper — injects a <style> tag once
function GlobalStyles() {
  return (
    <style>{`
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body { -webkit-tap-highlight-color: transparent; }
      input, textarea, button, select { font-family: inherit; }

      .nav-links { display: flex; gap: 28px; }
      .nav-cta { display: block; }

      /* Hamburger */
      .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; padding: 4px; }
      .hamburger span { display: block; width: 24px; height: 2px; background: #fff; border-radius: 2px; transition: all 0.2s; }

      /* Mobile menu */
      .mobile-menu {
        display: none;
        position: fixed; top: 68px; left: 0; right: 0; z-index: 99;
        background: rgba(25,41,67,0.98); backdrop-filter: blur(12px);
        padding: 20px 24px 28px;
        flex-direction: column; gap: 0;
        border-bottom: 1px solid rgba(56,189,248,0.15);
      }
      .mobile-menu.open { display: flex; }
      .mobile-menu a {
        padding: 14px 0; font-size: 17px; color: rgba(255,255,255,0.8);
        text-decoration: none; font-weight: 500;
        border-bottom: 1px solid rgba(255,255,255,0.07);
      }
      .mobile-menu .mob-cta {
        margin-top: 16px; background: #38BDF8; color: #192943; text-align: center;
        padding: 14px; border-radius: 10px; font-weight: 800; font-size: 17px;
        border: none;
      }

      .hero-stats { display: flex; gap: 0; justify-content: center; flex-wrap: wrap; }
      .hero-stat-item { padding: 16px 28px; text-align: center; border-right: 1px solid rgba(255,255,255,0.15); }
      .hero-stat-item:last-child { border-right: none; }

      .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
      .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
      .grid-2-1 { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; }

      .growth-row { display: flex; gap: 0; }
      .growth-item { flex: 1; text-align: center; padding: 20px 12px; border-radius: 10px; }

      @media (max-width: 900px) {
        .nav-links { display: none; }
        .nav-cta { display: none; }
        .hamburger { display: flex; }

        .grid-3 { grid-template-columns: 1fr; gap: 16px; }
        .grid-4 { grid-template-columns: repeat(2, 1fr); gap: 16px; }
        .grid-2-1 { grid-template-columns: 1fr; gap: 32px; }

        .hero-stats { gap: 0; }
        .hero-stat-item { padding: 12px 16px; border-right: none; border-bottom: 1px solid rgba(255,255,255,0.1); width: 50%; }
        .hero-stat-item:nth-child(odd) { border-right: 1px solid rgba(255,255,255,0.15); }
        .hero-stat-item:nth-last-child(-n+2) { border-bottom: none; }

        .growth-row { flex-wrap: wrap; }
        .growth-item { width: 50%; min-width: 0; }
      }

      @media (max-width: 600px) {
        .grid-4 { grid-template-columns: 1fr 1fr; }
        .growth-item { width: 50%; }
        .hero-stat-item { width: 50%; }
      }
    `}</style>
  );
}

export default function Index() {
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const closeMenu = () => setMenuOpen(false);

  // Shared section padding responsive
  const sp = "clamp(48px, 8vw, 100px) clamp(20px, 5vw, 80px)";

  return (
    <div style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif", background: "#fff", color: "#192943" }}>
      <GlobalStyles />

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(25,41,67,0.97)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(56,189,248,0.15)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 clamp(16px,4vw,48px)", height: "68px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img src="/masakhe_logo.png" alt="Masakhe" style={{ width: "34px", height: "34px", objectFit: "contain" }} />
          <span style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 800, fontSize: "18px", color: "#fff", letterSpacing: "1px" }}>MASAKHE</span>
        </div>

        <div className="nav-links">
          {["About", "Platform", "Traction", "Pricing", "Invest"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: "15px", fontWeight: 500 }}>{item}</a>
          ))}
        </div>

        <a href="#invest" className="nav-cta" style={{
          background: "#38BDF8", color: "#192943", padding: "10px 22px",
          borderRadius: "8px", fontWeight: 700, fontSize: "14px", textDecoration: "none",
        }}>Invest Now</a>

        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span style={{ transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none" }} />
          <span style={{ opacity: menuOpen ? 0 : 1 }} />
          <span style={{ transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none" }} />
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        {["About", "Platform", "Traction", "Pricing", "Invest"].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} onClick={closeMenu}>{item}</a>
        ))}
        <a href="#invest" className="mob-cta" onClick={closeMenu}>Invest $1M →</a>
      </div>

      {/* HERO */}
      <section style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #192943 0%, #0f326b 60%, #0d2a5e 100%)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "100px clamp(20px,5vw,80px) 72px",
        textAlign: "center", position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", width: "700px", height: "700px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 70%)",
          top: "50%", left: "50%", transform: "translate(-50%, -50%)", pointerEvents: "none",
        }} />
        <div style={{ position: "relative", maxWidth: "900px", width: "100%" }}>
          <div style={{
            display: "inline-block", background: "rgba(56,189,248,0.12)",
            border: "1px solid rgba(56,189,248,0.35)", borderRadius: "24px",
            padding: "7px 18px", fontSize: "12px", fontWeight: 700, color: "#38BDF8",
            letterSpacing: "2px", textTransform: "uppercase", marginBottom: "24px",
          }}>Investor Opportunity — 2026</div>

          <h1 style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: "clamp(32px, 6vw, 76px)",
            fontWeight: 900, color: "#fff", lineHeight: 1.05, marginBottom: "20px",
          }}>
            The All-In-One Business OS<br />for South Africa's{" "}
            <span style={{ color: "#38BDF8" }}>2.67M SMMEs</span>
          </h1>

          <p style={{
            fontSize: "clamp(16px, 2.2vw, 21px)",
            color: "rgba(255,255,255,0.7)", lineHeight: 1.6, marginBottom: "40px",
            maxWidth: "680px", margin: "0 auto 40px",
          }}>
            9 powerful modules. One affordable platform. 171 paying subscribers growing at 25% MoM — organically, with zero ad spend.
          </p>

          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginBottom: "56px" }}>
            <a href="#invest" style={{
              background: "#38BDF8", color: "#192943", padding: "15px 36px",
              borderRadius: "10px", fontWeight: 800, fontSize: "clamp(15px,2vw,18px)",
              textDecoration: "none", fontFamily: "Montserrat, sans-serif",
              display: "inline-block",
            }}>Invest $1M →</a>
            <a href="https://masakheportal.co.za" target="_blank" style={{
              background: "rgba(255,255,255,0.08)", color: "#fff",
              padding: "15px 36px", borderRadius: "10px",
              fontWeight: 600, fontSize: "clamp(15px,2vw,18px)",
              textDecoration: "none", border: "1px solid rgba(255,255,255,0.2)",
              display: "inline-block",
            }}>View Platform</a>
          </div>

          {/* Stats */}
          <div className="hero-stats" style={{
            background: "rgba(255,255,255,0.05)", borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.08)", overflow: "hidden",
          }}>
            {STATS.map((s, i) => (
              <div key={i} className="hero-stat-item">
                <div style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(26px,3.5vw,40px)", fontWeight: 900, color: "#38BDF8", lineHeight: 1, marginBottom: "4px" }}>{s.value}</div>
                <div style={{ fontSize: "clamp(12px,1.4vw,14px)", color: "rgba(255,255,255,0.55)", fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section id="about" style={{ padding: sp, background: "#F8FAFC" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "clamp(32px,5vw,56px)" }}>
            <div style={{ display: "inline-block", background: "#FEF0F0", border: "1px solid #FBBFBF", borderRadius: "24px", padding: "7px 18px", fontSize: "12px", fontWeight: 700, color: "#DC2626", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "16px" }}>The Problem</div>
            <h2 style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(26px,4vw,48px)", fontWeight: 900, color: "#192943", marginBottom: "14px", lineHeight: 1.1 }}>SA SMMEs Are Being Left Behind</h2>
            <p style={{ fontSize: "clamp(15px,1.8vw,19px)", color: "#5A7090", maxWidth: "640px", margin: "0 auto" }}>70% fail within 5 years — not from bad ideas, but from the cost and complexity of running a business.</p>
          </div>
          <div className="grid-3">
            {[
              { icon: "💸", title: "Too Many Tools, Too Much Cost", desc: "Average SMME spends R3,000–R8,000/month on 5+ separate subscriptions.", stat: "5+ tools required" },
              { icon: "⏱️", title: "Admin Kills Productivity", desc: "Small business owners lose 15+ hours per week to manual admin tasks.", stat: "15+ hours/week wasted" },
              { icon: "🚫", title: "No Local All-In-One Exists", desc: "Global tools like QuickBooks and Shopify aren't built for SA compliance or budgets.", stat: "2.67M underserved" },
            ].map((item, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: "16px", padding: "clamp(24px,3vw,36px)", boxShadow: "0 4px 20px rgba(25,41,67,0.07)", borderLeft: "5px solid #DC2626" }}>
                <div style={{ fontSize: "36px", marginBottom: "16px" }}>{item.icon}</div>
                <h3 style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(17px,1.8vw,21px)", fontWeight: 800, color: "#192943", marginBottom: "10px", lineHeight: 1.2 }}>{item.title}</h3>
                <p style={{ fontSize: "clamp(14px,1.5vw,16px)", color: "#5A7090", lineHeight: 1.5, marginBottom: "14px" }}>{item.desc}</p>
                <div style={{ background: "#FEF0F0", borderRadius: "8px", padding: "9px 14px", fontSize: "14px", fontWeight: 700, color: "#DC2626" }}>{item.stat}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLATFORM */}
      <section id="platform" style={{ padding: sp, background: "#fff" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "clamp(32px,5vw,56px)" }}>
            <div style={{ display: "inline-block", background: "rgba(56,189,248,0.1)", border: "1px solid rgba(56,189,248,0.3)", borderRadius: "24px", padding: "7px 18px", fontSize: "12px", fontWeight: 700, color: "#0f326b", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "16px" }}>The Solution</div>
            <h2 style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(26px,4vw,48px)", fontWeight: 900, color: "#192943", marginBottom: "14px", lineHeight: 1.1 }}>One Platform. Every Tool Your Business Needs.</h2>
            <p style={{ fontSize: "clamp(15px,1.8vw,19px)", color: "#5A7090", maxWidth: "640px", margin: "0 auto" }}>9 modules replacing multiple expensive subscriptions — all in one dashboard.</p>
          </div>
          <div className="grid-3">
            {MODULES.map((m, i) => (
              <div key={i} style={{ background: "#F0F7FF", borderRadius: "14px", padding: "clamp(18px,2.5vw,26px)", border: "1.5px solid #C8DEFF", display: "flex", gap: "14px", alignItems: "flex-start" }}>
                <div style={{ fontSize: "28px", flexShrink: 0 }}>{m.icon}</div>
                <div>
                  <div style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(15px,1.6vw,17px)", fontWeight: 700, color: "#192943", marginBottom: "5px" }}>{m.name}</div>
                  <div style={{ fontSize: "clamp(13px,1.3vw,15px)", color: "#5A7090", lineHeight: 1.4 }}>{m.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <a href="https://masakheportal.co.za" target="_blank" style={{
              display: "inline-block", background: "#192943", color: "#fff",
              padding: "clamp(13px,1.5vw,16px) clamp(24px,3vw,40px)",
              borderRadius: "10px", fontWeight: 700, fontSize: "clamp(15px,1.6vw,17px)", textDecoration: "none",
            }}>View Live Platform →</a>
          </div>
        </div>
      </section>

      {/* TRACTION */}
      <section id="traction" style={{ padding: sp, background: "#192943" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "clamp(32px,5vw,56px)" }}>
            <div style={{ display: "inline-block", background: "rgba(56,189,248,0.15)", border: "1px solid rgba(56,189,248,0.4)", borderRadius: "24px", padding: "7px 18px", fontSize: "12px", fontWeight: 700, color: "#38BDF8", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "16px" }}>Traction</div>
            <h2 style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(26px,4vw,48px)", fontWeight: 900, color: "#fff", marginBottom: "14px", lineHeight: 1.1 }}>Growing 25% Every Month — Organically</h2>
            <p style={{ fontSize: "clamp(15px,1.8vw,19px)", color: "rgba(255,255,255,0.6)", maxWidth: "600px", margin: "0 auto" }}>No paid ads. No VC fuel. Pure product-market fit.</p>
          </div>
          <div className="grid-4" style={{ marginBottom: "32px" }}>
            {[
              { num: 171, suffix: "+", label: "Active Subscribers" },
              { num: 25, suffix: "%", label: "MoM Growth Rate" },
              { num: 153, suffix: "K+", label: "Est. MRR (Rands)" },
              { num: 0, suffix: "", label: "Paid Ad Spend" },
            ].map((item, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(56,189,248,0.15)", borderRadius: "16px", padding: "clamp(20px,2.5vw,32px)", textAlign: "center" }}>
                <div style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(36px,4vw,50px)", fontWeight: 900, color: "#38BDF8", lineHeight: 1, marginBottom: "8px" }}>
                  <AnimatedCounter target={item.num} suffix={item.suffix} />
                </div>
                <div style={{ fontSize: "clamp(13px,1.3vw,15px)", color: "rgba(255,255,255,0.6)" }}>{item.label}</div>
              </div>
            ))}
          </div>
          <div style={{ background: "rgba(56,189,248,0.08)", border: "1px solid rgba(56,189,248,0.2)", borderRadius: "16px", padding: "clamp(20px,3vw,32px)" }}>
            <div style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(16px,1.8vw,20px)", fontWeight: 700, color: "#fff", marginBottom: "16px" }}>Projected Subscriber Growth at 25% MoM</div>
            <div className="growth-row">
              {[
                { period: "Today", subs: "171", highlight: false },
                { period: "Month 6", subs: "530", highlight: false },
                { period: "Month 12", subs: "2,400", highlight: true },
                { period: "Month 18", subs: "8,900", highlight: false },
                { period: "Month 24", subs: "18,500+", highlight: false },
              ].map((item, i) => (
                <div key={i} className="growth-item" style={{
                  background: item.highlight ? "rgba(56,189,248,0.2)" : "transparent",
                  border: item.highlight ? "1px solid rgba(56,189,248,0.4)" : "1px solid transparent",
                }}>
                  <div style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(20px,2.5vw,30px)", fontWeight: 900, color: item.highlight ? "#38BDF8" : "#fff" }}>{item.subs}</div>
                  <div style={{ fontSize: "clamp(11px,1.2vw,13px)", color: "rgba(255,255,255,0.5)", marginTop: "4px" }}>{item.period}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ padding: sp, background: "#F8FAFC" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "clamp(32px,5vw,56px)" }}>
            <div style={{ display: "inline-block", background: "rgba(212,168,67,0.12)", border: "1px solid rgba(212,168,67,0.4)", borderRadius: "24px", padding: "7px 18px", fontSize: "12px", fontWeight: 700, color: "#B07D10", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "16px" }}>Business Model</div>
            <h2 style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(26px,4vw,48px)", fontWeight: 900, color: "#192943", marginBottom: "14px", lineHeight: 1.1 }}>Recurring SaaS Revenue — 3 Tiers</h2>
            <p style={{ fontSize: "clamp(15px,1.8vw,19px)", color: "#5A7090" }}>Predictable, low-churn model. Avg ARPU: R899/month.</p>
          </div>
          <div className="grid-3">
            {PLANS.map((plan, i) => (
              <div key={i} style={{
                background: plan.highlight ? "#192943" : "#fff",
                borderRadius: "20px", padding: "clamp(28px,3vw,40px) clamp(20px,2.5vw,32px)",
                boxShadow: "0 4px 24px rgba(25,41,67,0.08)",
                border: plan.highlight ? "2px solid #38BDF8" : "2px solid #E8F0FA",
                position: "relative", marginTop: plan.highlight ? "0" : "0",
              }}>
                {plan.highlight && (
                  <div style={{
                    position: "absolute", top: "-14px", left: "50%", transform: "translateX(-50%)",
                    background: "#38BDF8", borderRadius: "20px", padding: "5px 18px",
                    fontSize: "12px", fontWeight: 700, color: "#192943", whiteSpace: "nowrap",
                  }}>⭐ Most Popular</div>
                )}
                <div style={{ fontSize: "12px", fontWeight: 700, color: plan.highlight ? "rgba(255,255,255,0.5)" : "#7A90A8", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px" }}>{plan.label}</div>
                <div style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(40px,4.5vw,54px)", fontWeight: 900, color: plan.highlight ? "#fff" : "#192943", lineHeight: 1, marginBottom: "4px" }}>{plan.price}</div>
                <div style={{ fontSize: "15px", color: plan.highlight ? "rgba(255,255,255,0.5)" : "#7A90A8", marginBottom: "14px" }}>/ month</div>
                <div style={{ fontSize: "17px", fontWeight: 700, color: plan.highlight ? "#38BDF8" : "#192943", marginBottom: "18px" }}>{plan.name}</div>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "9px" }}>
                  {plan.features.map((f, j) => (
                    <li key={j} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "clamp(14px,1.5vw,16px)", color: plan.highlight ? "rgba(255,255,255,0.75)" : "#5A7090" }}>
                      <span style={{ width: "18px", height: "18px", background: plan.highlight ? "rgba(56,189,248,0.2)" : "#E0F5FF", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 700, color: plan.highlight ? "#38BDF8" : "#0f326b", flexShrink: 0 }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* USE OF FUNDS */}
      <section style={{ padding: sp, background: "#fff" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "clamp(32px,5vw,56px)" }}>
            <div style={{ display: "inline-block", background: "rgba(56,189,248,0.1)", border: "1px solid rgba(56,189,248,0.3)", borderRadius: "24px", padding: "7px 18px", fontSize: "12px", fontWeight: 700, color: "#0f326b", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "16px" }}>Use of Funds</div>
            <h2 style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(26px,4vw,48px)", fontWeight: 900, color: "#192943", marginBottom: "14px", lineHeight: 1.1 }}>How We Deploy <span style={{ color: "#38BDF8" }}>$1,000,000</span></h2>
            <p style={{ fontSize: "clamp(15px,1.8vw,19px)", color: "#5A7090" }}>Every dollar tied to a specific growth outcome.</p>
          </div>
          <div className="grid-3">
            {FUNDS.map((item, i) => (
              <div key={i} style={{ background: "#F8FAFC", borderRadius: "16px", padding: "clamp(24px,3vw,36px)", borderLeft: `5px solid ${item.color}` }}>
                <div style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(40px,5vw,54px)", fontWeight: 900, color: item.color, lineHeight: 1, marginBottom: "4px" }}>{item.pct}</div>
                <div style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(18px,2vw,22px)", fontWeight: 800, color: "#192943", marginBottom: "4px" }}>{item.amount}</div>
                <div style={{ fontSize: "clamp(15px,1.6vw,17px)", fontWeight: 700, color: "#192943", marginBottom: "16px" }}>{item.title}</div>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "9px" }}>
                  {item.items.map((f, j) => (
                    <li key={j} style={{ display: "flex", gap: "10px", fontSize: "clamp(13px,1.4vw,15px)", color: "#5A7090", alignItems: "flex-start" }}>
                      <span style={{ color: item.color, fontWeight: 700, marginTop: "1px", flexShrink: 0 }}>→</span>{f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INVEST / CONTACT */}
      <section id="invest" style={{ padding: sp, background: "#192943" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div className="grid-2-1">
            {/* Left info */}
            <div>
              <div style={{ display: "inline-block", background: "rgba(56,189,248,0.15)", border: "1px solid rgba(56,189,248,0.4)", borderRadius: "24px", padding: "7px 18px", fontSize: "12px", fontWeight: 700, color: "#38BDF8", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "20px" }}>The Ask</div>
              <h2 style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(28px,4vw,50px)", fontWeight: 900, color: "#fff", lineHeight: 1.05, marginBottom: "20px" }}>Ready to Invest in South Africa's Future?</h2>
              <p style={{ fontSize: "clamp(15px,1.8vw,18px)", color: "rgba(255,255,255,0.7)", lineHeight: 1.6, marginBottom: "32px" }}>
                We're raising $1,000,000 to scale the Masakhe SMME Builder — marketing, team, and technology.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "32px" }}>
                {[
                  { label: "Raise Amount", value: "$1,000,000" },
                  { label: "Structure", value: "Equity · Revenue Share · Grants · Partnerships" },
                  { label: "12-Month MRR Target", value: "R2.16M (2,400 subscribers)" },
                  { label: "Projected Valuation (12mo)", value: "~$7.2M at 5x ARR" },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                    <div style={{ width: "8px", height: "8px", background: "#38BDF8", borderRadius: "50%", marginTop: "7px", flexShrink: 0 }} />
                    <div>
                      <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", fontWeight: 600 }}>{item.label}: </span>
                      <span style={{ fontSize: "clamp(14px,1.5vw,16px)", color: "#fff", fontWeight: 600 }}>{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ padding: "20px 24px", background: "rgba(56,189,248,0.1)", border: "1px solid rgba(56,189,248,0.25)", borderRadius: "12px" }}>
                <div style={{ fontSize: "clamp(15px,1.6vw,17px)", color: "rgba(255,255,255,0.85)", marginBottom: "6px" }}>📞 <strong style={{ color: "#fff" }}>+27 (0)81 038 3955</strong></div>
                <div style={{ fontSize: "clamp(15px,1.6vw,17px)", color: "rgba(255,255,255,0.85)" }}>✉️ <strong style={{ color: "#38BDF8" }}>hello@masakhegroup.co.za</strong></div>
              </div>
            </div>

            {/* Form */}
            <div style={{ background: "#fff", borderRadius: "20px", padding: "clamp(24px,3vw,40px)", boxShadow: "0 32px 80px rgba(0,0,0,0.3)" }}>
              {submitted ? (
                <div style={{ textAlign: "center", padding: "32px 16px" }}>
                  <div style={{ fontSize: "56px", marginBottom: "16px" }}>🎉</div>
                  <h3 style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(22px,2.5vw,26px)", fontWeight: 800, color: "#192943", marginBottom: "10px" }}>Thank You!</h3>
                  <p style={{ fontSize: "clamp(14px,1.5vw,16px)", color: "#5A7090", lineHeight: 1.5 }}>We've received your enquiry. Lance will reach out within 24 hours.</p>
                </div>
              ) : (
                <>
                  <h3 style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(20px,2.2vw,24px)", fontWeight: 800, color: "#192943", marginBottom: "6px" }}>Express Investment Interest</h3>
                  <p style={{ fontSize: "clamp(13px,1.4vw,15px)", color: "#5A7090", marginBottom: "24px" }}>We'll respond within 24 hours.</p>
                  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                    {[
                      { key: "name", label: "Full Name", type: "text", placeholder: "John Smith" },
                      { key: "email", label: "Email Address", type: "email", placeholder: "john@company.com" },
                      { key: "company", label: "Company / Organisation", type: "text", placeholder: "Your company name" },
                    ].map((field) => (
                      <div key={field.key}>
                        <label style={{ fontSize: "13px", fontWeight: 600, color: "#192943", marginBottom: "5px", display: "block" }}>{field.label}</label>
                        <input
                          type={field.type}
                          placeholder={field.placeholder}
                          value={(formData as any)[field.key]}
                          onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                          required
                          style={{
                            width: "100%", padding: "13px 14px", border: "1.5px solid #E2EAF2",
                            borderRadius: "8px", fontSize: "16px", outline: "none", color: "#192943",
                            WebkitAppearance: "none",
                          }}
                        />
                      </div>
                    ))}
                    <div>
                      <label style={{ fontSize: "13px", fontWeight: 600, color: "#192943", marginBottom: "5px", display: "block" }}>Message (optional)</label>
                      <textarea
                        placeholder="Tell us about your investment interest..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={3}
                        style={{
                          width: "100%", padding: "13px 14px", border: "1.5px solid #E2EAF2",
                          borderRadius: "8px", fontSize: "16px", outline: "none", resize: "vertical",
                          color: "#192943", WebkitAppearance: "none",
                        }}
                      />
                    </div>
                    <button type="submit" style={{
                      background: "#192943", color: "#fff", padding: "15px",
                      borderRadius: "10px", fontWeight: 800, fontSize: "clamp(15px,1.6vw,17px)",
                      border: "none", cursor: "pointer", fontFamily: "Montserrat, sans-serif",
                      WebkitAppearance: "none", touchAction: "manipulation",
                    }}>
                      Submit Investment Interest →
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#0a1929", padding: "clamp(32px,4vw,48px) clamp(20px,4vw,48px)", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "14px" }}>
          <img src="/masakhe_logo.png" alt="Masakhe" style={{ width: "30px", height: "30px", objectFit: "contain" }} />
          <span style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 800, fontSize: "17px", color: "#fff" }}>MASAKHE GROUP</span>
        </div>
        <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)", marginBottom: "12px" }}>260 Uys Krige Drive, Loevenstein, Cape Town, South Africa</p>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          {["masakhegroup.co.za", "masakheportal.co.za", "masakhe-partners.co.za"].map((site) => (
            <a key={site} href={`https://${site}`} target="_blank" style={{ color: "#38BDF8", textDecoration: "none", fontSize: "14px" }}>{site}</a>
          ))}
        </div>
        <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.2)", marginTop: "20px" }}>© 2026 Masakhe Group (Pty) Ltd. All rights reserved.</p>
      </footer>
    </div>
  );
}
