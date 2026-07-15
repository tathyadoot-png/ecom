import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/logo.png";

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-4 shrink-0"
    >
      <Image
        src={logo}
        alt="logo"
        width={58}
        height={58}
        priority
      />

      <div>
        <h1 className="text-[30px] leading-none font-heading text-primary">
          Indian Artisan
        </h1>

        <p className="mt-1 text-[11px] uppercase tracking-[0.35em] text-muted">
          HANDCRAFTED MARKETPLACE
        </p>
      </div>
    </Link>
  );
}