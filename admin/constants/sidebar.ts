import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  FolderTree,
  Store,
} from "lucide-react";

export const ADMIN_SIDEBAR_ITEMS =
  [
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

    {
      title: "Categories",
      href: "/categories",
      icon: FolderTree,
    },

    {
      title: "Reviews",
      href: "/reviews",
      icon: FolderTree,
    },

    {
      title: "Stores",
      href: "/stores",
      icon: Store,
    },
  ];

export const VENDOR_SIDEBAR_ITEMS =
  [
    {
      title: "Dashboard",
      href: "/vendor",
      icon: LayoutDashboard,
    },

    {
      title: "My Store",
      href: "/vendor/store",
      icon: Store,
    },

    {
      title: "My Products",
      href: "/vendor/products",
      icon: ShoppingBag,
    },

    {
      title: "My Orders",
      href: "/vendor/orders",
      icon: Package,
    },
  ];