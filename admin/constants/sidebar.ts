import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  LogOut,
} from "lucide-react";

export const SIDEBAR_ITEMS = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },

  {
    title: "Products",
    href: "/products",
    icon: ShoppingBag,
  },

  {
    title: "Orders",
    href: "/orders",
    icon: Package,
  },

  {
    title: "Customers",
    href: "/customers",
    icon: Users,
  },
];