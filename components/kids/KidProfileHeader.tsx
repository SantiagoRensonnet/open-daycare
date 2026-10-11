import Link from "next/link";
import { formatAgeLabel } from "@/components/kids/age-label";
import { KidAvatar } from "@/components/kids/KidAvatar";
import { routes } from "@/lib/routes";
import type { Age, Child } from "@/lib/types";

export function KidProfileHeader({ child, age, classroomName }: { child: Child; age: Age; classroomName: string }) {
  return (
    <div className="flex items-center gap-[18px]">
      <KidAvatar child={child} size={84} />
      <div className="flex-1">
        <h1 className="m-0 font-display text-[28px] font-semibold text-ink">{child.fullName}</h1>
        <p className="mt-[3px] text-[15px] text-muted">
          {formatAgeLabel(age)} · Sala {classroomName}
        </p>
      </div>
      <Link
        href={routes.kidEdit(child.id)}
        className="rounded-xl border-[1.5px] border-line bg-surface px-4 py-[9px] text-[14px] font-bold text-nav"
      >
        Editar
      </Link>
    </div>
  );
}
