import Link from "next/link";
import { LogOutIcon, PlusIcon, SunIcon } from "@/components/icons";
import { SidebarNav } from "@/components/staff/SidebarNav";
import { routes } from "@/lib/routes";
import type { Classroom, StaffMember, StaffRole } from "@/lib/types";

const ROLE_LABELS: Record<StaffRole, string> = {
  teacher: "Maestra",
};

export function Sidebar({ user, classroom }: { user: StaffMember; classroom: Classroom }) {
  return (
    <aside className="sticky top-0 flex h-screen w-[248px] flex-none flex-col border-r border-line bg-surface px-4 py-6">
      <Link href={routes.home} className="flex items-center gap-[11px] px-2 pt-1 pb-[22px]">
        <div className="flex size-[38px] flex-none items-center justify-center rounded-xl bg-[linear-gradient(155deg,#F8C3A8,#F2937A)] text-white">
          <SunIcon size={21} />
        </div>
        <div>
          <div className="font-display text-[17px] leading-none font-semibold text-ink">OpenDayCare</div>
          <div className="mt-0.5 text-[11.5px] text-subtle">Sala {classroom.name}</div>
        </div>
      </Link>

      <Link
        href={routes.postNew}
        className="mb-[18px] flex w-full items-center justify-center gap-2 rounded-[14px] bg-[linear-gradient(180deg,#F4977E,#EE8164)] p-3 text-[14.5px] font-extrabold text-white shadow-[0_8px_18px_-8px_rgba(238,129,100,.75)]"
      >
        <PlusIcon size={17} />
        Nueva publicación
      </Link>

      <SidebarNav />

      <div className="mt-2.5 border-t border-line pt-3.5">
        <div className="flex items-center gap-[11px] px-2 py-1.5">
          <div className="flex size-[38px] flex-none items-center justify-center rounded-full bg-accent font-display text-base font-semibold text-white">
            {user.firstName.charAt(0)}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-extrabold text-ink">
              {user.firstName} {user.lastName}
            </div>
            <div className="text-xs text-subtle">
              {ROLE_LABELS[user.role]} · {classroom.name}
            </div>
          </div>
          <Link
            href={routes.login}
            title="Cerrar sesión"
            aria-label="Cerrar sesión"
            className="flex size-8 flex-none items-center justify-center rounded-[10px] bg-cream text-muted"
          >
            <LogOutIcon size={16} />
          </Link>
        </div>
      </div>
    </aside>
  );
}
