import Link from "next/link";

const quickLinks = ["About Us", "Contributors", "Projects", "GitHub"];
const quickLinksHrefs = ["#about", "#contributors", "#projects", "https://github.com/atomrobic/keralacoderscafe-saas"];
const resources = ["Documentation", "Community Guidelines", "Contributing Guide", "Code of Conduct"];

export default function Footer() {
  return (
    <footer className="relative bg-kcc-surface-elevated text-kcc-text border-t border-kcc-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div
              className="text-3xl font-black tracking-tighter text-kcc-gold mb-3"
              style={{ fontFamily: "var(--font-newsreader)" }}
            >
              Kerala Coders Cafe
            </div>
            <p className="text-sm text-kcc-text-dim leading-relaxed max-w-md">
              Building a thriving community of developers from God's Own Country.
              Code with purpose, collaborate with passion.
            </p>
            <div className="flex gap-4 mt-6">
              <Link
                href="https://github.com/atomrobic/keralacoderscafe-saas"
                target="_blank"
                rel="noopener"
                className="text-kcc-text-dim hover:text-kcc-gold transition-colors"
              >
                <span className="material-symbols-outlined">code</span>
              </Link>
              <Link
                href="https://chat.whatsapp.com/Kd3tVwJfjjh0HRZtoYfxcm"
                target="_blank"
                rel="noopener"
                className="text-kcc-text-dim hover:text-kcc-gold transition-colors"
              >
                <span className="material-symbols-outlined">chat</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs tracking-widest text-kcc-gold uppercase mb-4 font-semibold">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((label, i) => (
                <li key={label}>
                  <Link
                    href={quickLinksHrefs[i]}
                    target={quickLinksHrefs[i].startsWith("http") ? "_blank" : undefined}
                    rel={quickLinksHrefs[i].startsWith("http") ? "noopener" : undefined}
                    className="text-sm text-kcc-text-dim hover:text-kcc-accent transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xs tracking-widest text-kcc-gold uppercase mb-4 font-semibold">
              Resources
            </h3>
            <ul className="space-y-3">
              {resources.map((label) => (
                <li key={label}>
                  <a href="#" className="text-sm text-kcc-text-dim hover:text-kcc-accent transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-kcc-border flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xs text-kcc-text-dim">
            © {new Date().getFullYear()} Kerala Coders Cafe. Built with ❤️ in Kerala.
          </div>
          <div className="flex gap-6 text-xs">
            {["Privacy Policy", "Terms of Service", "Contact"].map((label) => (
              <a key={label} href="#" className="text-kcc-text-dim hover:text-kcc-accent transition-colors">
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
