import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { SITE } from '@/constants/site';

const footerLinks = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/products' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-text text-cream">
      <Container className="py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <span className="font-heading text-2xl">{SITE.name}</span>
            <p className="mt-2 font-body text-sm text-cream/60">{SITE.description}</p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-2">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-sm text-cream/70 transition-colors hover:text-cream"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-10 border-t border-cream/10 pt-6 font-body text-xs text-cream/50">
          © {year} {SITE.name}. All rights reserved.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
