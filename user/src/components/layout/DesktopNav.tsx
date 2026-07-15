import Link from "next/link";

const links = [
  "Home",
  "Shop",
  "Collections",
  "Stories",
];

export default function DesktopNav() {
  return (
    <nav className="hidden lg:flex items-center gap-12">
      {links.map((item) => (
        <Link
          key={item}
          href="/"
          className="text-[15px] font-medium transition hover:text-primary"
        >
          {item}
        </Link>
      ))}
    </nav>
  );
}