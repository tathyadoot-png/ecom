import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { SITE } from '@/constants/site';

// Only routes that actually exist — see Header's NAV_LINKS for the
// same rule (the previous footer linked to /about and /contact,
// neither of which exist anywhere in this storefront).
const footerLinks = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/products' },
  { label: 'Categories', href: '/categories' },
  { label: 'Search', href: '/search' },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-text text-cream">
      <Container className="py-16">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <span className="font-heading text-3xl font-light">{SITE.name}</span>
            <p className="mt-3 font-body text-sm leading-relaxed text-cream/60">{SITE.description}</p>
            <div className="mt-5 flex items-center gap-2 font-body text-xs uppercase tracking-[0.15em] text-cream/40">
              <span className="text-accent">✦</span> Handcrafted Across India
            </div>
          </div>

          <nav className="flex flex-wrap gap-x-10 gap-y-3">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-sm text-cream/70 transition-colors hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-12 border-t border-cream/10 pt-6 font-body text-xs text-cream/40">
          © {year} {SITE.name}. All rights reserved.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
