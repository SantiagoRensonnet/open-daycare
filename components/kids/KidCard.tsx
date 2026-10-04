import Link from "next/link";
import { ChevronRightIcon } from "@/components/icons";
import { formatAgeLabel } from "@/components/kids/age-label";
import { KidAvatar } from "@/components/kids/KidAvatar";
import type { KidListItem } from "@/components/kids/KidList";
import { fullName } from "@/lib/children";
import { routes } from "@/lib/routes";

const chipClassName = "flex-none rounded-full px-[9px] py-[5px] text-[11px] font-extrabold";

function parentsLabel(count: number): string {
  if (count === 0) return "sin padres vinculados";
  return count === 1 ? "1 padre vinculado" : `${count} padres vinculados`;
}

export function KidCard({ child, age, parentCount }: KidListItem) {
  return (
    <Link
      href={routes.kidDetail(child.id)}
      className="flex min-w-0 items-center gap-3.5 rounded-[18px] border border-line bg-surface p-4 shadow-[0_4px_14px_-12px_rgba(120,90,60,.5)] transition duration-150 hover:-translate-y-0.5 hover:border-[#F2A78E]"
    >
      <KidAvatar child={child} size={48} />
      <div className="min-w-0 flex-1">
        <div className="font-display text-[16px] font-semibold text-ink">{fullName(child)}</div>
        <div className="text-[13px] text-subtle">
          {formatAgeLabel(age)} · {parentsLabel(parentCount)}
        </div>
      </div>
      {/* Allergy is safety information, so it wins over the "link a parent" hint. */}
      {child.allergy !== null ? (
        <span className={`${chipClassName} bg-[#FBD8CC] text-[#D9684A] uppercase`}>{child.allergy}</span>
      ) : parentCount === 0 ? (
        <span className={`${chipClassName} bg-[#F9D2DE] text-[#C56486]`}>VINCULAR</span>
      ) : (
        <ChevronRightIcon size={18} className="flex-none text-[#CBB89F]" />
      )}
    </Link>
  );
}
