"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType } from "react";
import { BellIcon, HomeIcon, UserIcon, UsersIcon } from "@/components/icons";
import { routes } from "@/lib/routes";

const NAV_ITEMS: { label: string; href: string; icon: ComponentType<{ size?: number }> }[] = [
  { label: "Feed", href: routes.home, icon: HomeIcon },
  { label: "Niños", href: routes.children, icon: UsersIcon },
  { label: "Avisos", href: routes.notifications, icon: BellIcon },
  { label: "Mi cuenta", href: routes.account, icon: UserIcon },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-1 flex-col gap-1">
      {NAV_ITEMS.map(({ label, href, icon: NavIcon }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={`flex items-center gap-3 rounded-xl px-3 py-[11px] text-[14.5px] ${
              isActive ? "bg-accent-soft font-extrabold text-accent-text" : "font-semibold text-nav"
            }`}
          >
            <NavIcon size={19} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
