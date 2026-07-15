import Container from "@/components/ui/Container";
import {
  Headset,
  MapPin,
  Phone,
  Truck,
} from "lucide-react";

export default function TopBar() {
  return (
    <div className="hidden border-b border-white/10 bg-[var(--primary-dark)] text-white lg:block">
      <Container>
        <div className="flex h-10 items-center justify-between text-[13px]">
          {/* Left */}

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <Headset size={14} />
              <span>Handcrafted by Indian Artisans</span>
            </div>

            <div className="flex items-center gap-2">
              <Truck size={14} />
              <span>Free Shipping Above ₹999</span>
            </div>
          </div>

          {/* Right */}

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <Phone size={14} />

              <span>+91 98765 43210</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin size={14} />

              <span>India</span>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}