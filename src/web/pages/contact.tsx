import { useState } from "react";
import { Link } from "wouter";

function GlobalStyles() {
  return (
    <style>{`
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body { -webkit-tap-highlight-color: transparent; }
      input, textarea, button, select { font-family: inherit; }

      .nav-links { display: flex; gap: 28px; }
      .nav-cta { display: block; }

      .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; padding: 4px; }
      .hamburger span { display: block; width: 24px; height: 2px; background: #fff; border-radius: 2px; transition: all 0.2s; }

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

      .contact-grid {
        display: grid;
        grid-template-columns: 1fr 1.4fr;
        gap: 48px;
        align-items: start;
      }

      @media (max-width: 900px) {
        .nav-links { display: none; }
        .nav-cta { display: none; }
        .hamburger { display: flex; }
        .contact-grid { grid-template-columns: 1fr; gap: 32px; }
      }
    `}</style>
  );
}

const CONTACT_METHODS = [
  {
    icon: "📞",
    label: "Phone",
    value: "+27 (0)81 038 3955",
    href: "tel:+27810383955",
  },
  {
    icon: "✉️",
    label: "General Enquiries",
    value: "hello@masakhegroup.co.za",
    href: "mailto:hello@masakhegroup.co.za",
  },
  {
    icon: "💼",
    label: "Investment Enquiries",
    value: "invest@masakhegroup.co.za",
    href: "mailto:invest@masakhegroup.co.za",
  },
  {
    icon: "📍",
    label: "Address",
    value: "260 Uys Krige Drive, Loevenstein, Cape Town, South Africa",
    href: "https://maps.google.com/?q=260+Uys+Krige+Drive+Loevenstein+Cape+Town",
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", company: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to send");
      setSubmitted(true);
    } catch {
      setSubmitError("Something went wrong. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  const closeMenu = () => setMenuOpen(false);

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
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <img src="/masakhe_logo.png" alt="Masakhe" style={{ width: "34px", height: "34px", objectFit: "contain" }} />
          <span style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 800, fontSize: "18px", color: "#fff", letterSpacing: "1px" }}>MASAKHE</span>
        </Link>

        <div className="nav-links">
          {["About", "Platform", "Traction", "Pricing", "Invest"].map((item) => (
            <a key={item} href={`/#${item.toLowerCase()}`} style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: "15px", fontWeight: 500 }}>{item}</a>
          ))}
          <Link href="/contact" style={{ color: "#38BDF8", textDecoration: "none", fontSize: "15px", fontWeight: 600 }}>Contact</Link>
        </div>

        <Link href="/#invest" className="nav-cta" style={{
          background: "#38BDF8", color: "#192943", padding: "10px 22px",
          borderRadius: "8px", fontWeight: 700, fontSize: "14px", textDecoration: "none",
        }}>Invest Now</Link>

        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span style={{ transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none" }} />
          <span style={{ opacity: menuOpen ? 0 : 1 }} />
          <span style={{ transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none" }} />
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        {["About", "Platform", "Traction", "Pricing", "Invest"].map((item) => (
          <a key={item} href={`/#${item.toLowerCase()}`} onClick={closeMenu}>{item}</a>
        ))}
        <Link href="/contact" onClick={closeMenu} style={{ padding: "14px 0", fontSize: "17px", color: "#38BDF8", textDecoration: "none", fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.07)" }}>Contact Us</Link>
        <a href="/#invest" className="mob-cta" onClick={closeMenu}>Invest $1M →</a>
      </div>

      {/* HERO */}
      <section style={{
        background: "linear-gradient(135deg, #192943 0%, #0f326b 60%, #0d2a5e 100%)",
        padding: "120px clamp(20px,5vw,80px) 72px",
        textAlign: "center", position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", width: "600px", height: "600px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 70%)",
          top: "50%", left: "50%", transform: "translate(-50%, -50%)", pointerEvents: "none",
        }} />
        <div style={{ position: "relative", maxWidth: "700px", margin: "0 auto" }}>
          <div style={{
            display: "inline-block", background: "rgba(56,189,248,0.12)",
            border: "1px solid rgba(56,189,248,0.35)", borderRadius: "24px",
            padding: "7px 18px", fontSize: "12px", fontWeight: 700, color: "#38BDF8",
            letterSpacing: "2px", textTransform: "uppercase", marginBottom: "20px",
          }}>Get In Touch</div>
          <h1 style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: "clamp(32px, 5vw, 60px)",
            fontWeight: 900, color: "#fff", lineHeight: 1.1, marginBottom: "16px",
          }}>We'd Love to Hear From You</h1>
          <p style={{
            fontSize: "clamp(16px, 2vw, 20px)",
            color: "rgba(255,255,255,0.7)", lineHeight: 1.6,
          }}>
            Whether you're an investor, partner, or SMME owner — our team is ready to help.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section style={{ padding: "clamp(48px,8vw,96px) clamp(20px,5vw,80px)", background: "#F8FAFC" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div className="contact-grid">

            {/* LEFT — Contact Info */}
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div>
                <h2 style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(22px,2.5vw,30px)", fontWeight: 900, color: "#192943", marginBottom: "10px" }}>Contact Information</h2>
                <p style={{ fontSize: "clamp(14px,1.5vw,16px)", color: "#5A7090", lineHeight: 1.6 }}>
                  Reach out directly or use the form. We respond to all enquiries within 24 hours.
                </p>
              </div>

              {CONTACT_METHODS.map((method, i) => (
                <a key={i} href={method.href} target={method.href.startsWith("http") ? "_blank" : undefined}
                  style={{ textDecoration: "none", display: "flex", gap: "16px", alignItems: "flex-start", background: "#fff", borderRadius: "14px", padding: "clamp(16px,2vw,22px)", boxShadow: "0 2px 12px rgba(25,41,67,0.07)", border: "1.5px solid #E8F0FA", transition: "border-color 0.2s" }}>
                  <div style={{ fontSize: "28px", flexShrink: 0 }}>{method.icon}</div>
                  <div>
                    <div style={{ fontSize: "12px", fontWeight: 700, color: "#7A90A8", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "4px" }}>{method.label}</div>
                    <div style={{ fontSize: "clamp(14px,1.5vw,16px)", fontWeight: 600, color: "#192943", lineHeight: 1.4 }}>{method.value}</div>
                  </div>
                </a>
              ))}

              {/* Links */}
              <div style={{ background: "#192943", borderRadius: "14px", padding: "clamp(20px,2.5vw,28px)" }}>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "14px" }}>Our Platforms</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {["masakhegroup.co.za", "masakheportal.co.za", "masakhe-partners.co.za"].map((site) => (
                    <a key={site} href={`https://${site}`} target="_blank" style={{ color: "#38BDF8", textDecoration: "none", fontSize: "clamp(14px,1.5vw,16px)", fontWeight: 500 }}>→ {site}</a>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT — Form */}
            <div style={{ background: "#fff", borderRadius: "20px", padding: "clamp(28px,3.5vw,48px)", boxShadow: "0 8px 40px rgba(25,41,67,0.10)", border: "1.5px solid #E8F0FA" }}>
              {submitted ? (
                <div style={{ textAlign: "center", padding: "48px 16px" }}>
                  <div style={{ fontSize: "64px", marginBottom: "20px" }}>🎉</div>
                  <h3 style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(22px,2.5vw,28px)", fontWeight: 800, color: "#192943", marginBottom: "12px" }}>Message Received!</h3>
                  <p style={{ fontSize: "clamp(14px,1.5vw,16px)", color: "#5A7090", lineHeight: 1.6, marginBottom: "24px" }}>
                    Thank you for reaching out. Our team will get back to you within 24 hours.
                  </p>
                  <button onClick={() => setSubmitted(false)} style={{
                    background: "#192943", color: "#fff", padding: "12px 28px",
                    borderRadius: "8px", fontWeight: 700, fontSize: "15px",
                    border: "none", cursor: "pointer", fontFamily: "Montserrat, sans-serif",
                  }}>Send Another Message</button>
                </div>
              ) : (
                <>
                  <h3 style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(20px,2.2vw,26px)", fontWeight: 800, color: "#192943", marginBottom: "6px" }}>Send Us a Message</h3>
                  <p style={{ fontSize: "clamp(13px,1.4vw,15px)", color: "#5A7090", marginBottom: "28px" }}>We'll get back to you within 24 hours.</p>

                  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                      <div>
                        <label style={{ fontSize: "13px", fontWeight: 600, color: "#192943", marginBottom: "6px", display: "block" }}>Full Name *</label>
                        <input
                          type="text"
                          placeholder="John Smith"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          style={{ width: "100%", padding: "13px 14px", border: "1.5px solid #E2EAF2", borderRadius: "8px", fontSize: "15px", outline: "none", color: "#192943" }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: "13px", fontWeight: 600, color: "#192943", marginBottom: "6px", display: "block" }}>Email Address *</label>
                        <input
                          type="email"
                          placeholder="john@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          style={{ width: "100%", padding: "13px 14px", border: "1.5px solid #E2EAF2", borderRadius: "8px", fontSize: "15px", outline: "none", color: "#192943" }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ fontSize: "13px", fontWeight: 600, color: "#192943", marginBottom: "6px", display: "block" }}>Company / Organisation</label>
                      <input
                        type="text"
                        placeholder="Your company name"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        style={{ width: "100%", padding: "13px 14px", border: "1.5px solid #E2EAF2", borderRadius: "8px", fontSize: "15px", outline: "none", color: "#192943" }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: "13px", fontWeight: 600, color: "#192943", marginBottom: "6px", display: "block" }}>Subject *</label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        required
                        style={{ width: "100%", padding: "13px 14px", border: "1.5px solid #E2EAF2", borderRadius: "8px", fontSize: "15px", outline: "none", color: formData.subject ? "#192943" : "#9aacbe", background: "#fff" }}
                      >
                        <option value="" disabled>Select a subject…</option>
                        <option value="Investment Enquiry">Investment Enquiry</option>
                        <option value="Partnership Opportunity">Partnership Opportunity</option>
                        <option value="Platform / Product Question">Platform / Product Question</option>
                        <option value="Press & Media">Press & Media</option>
                        <option value="General Enquiry">General Enquiry</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ fontSize: "13px", fontWeight: 600, color: "#192943", marginBottom: "6px", display: "block" }}>Message *</label>
                      <textarea
                        placeholder="Tell us how we can help you…"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        rows={5}
                        style={{ width: "100%", padding: "13px 14px", border: "1.5px solid #E2EAF2", borderRadius: "8px", fontSize: "15px", outline: "none", resize: "vertical", color: "#192943" }}
                      />
                    </div>

                    {submitError && (
                      <p style={{ color: "#DC2626", fontSize: "14px", textAlign: "center" }}>{submitError}</p>
                    )}

                    <button type="submit" disabled={submitting} style={{
                      background: submitting ? "#5A7090" : "#192943", color: "#fff", padding: "16px",
                      borderRadius: "10px", fontWeight: 800, fontSize: "clamp(15px,1.6vw,17px)",
                      border: "none", cursor: submitting ? "not-allowed" : "pointer",
                      fontFamily: "Montserrat, sans-serif",
                    }}>
                      {submitting ? "Sending…" : "Send Message →"}
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
