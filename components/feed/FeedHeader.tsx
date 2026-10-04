import { formatHeaderDate } from "@/lib/dates";
import type { Classroom, StaffMember } from "@/lib/types";

type FeedHeaderProps = { classroom: Classroom; user: StaffMember; now: Date; childCount: number };

export function FeedHeader({ classroom, user, now, childCount: count }: FeedHeaderProps) {

  return (
    <div className="mb-6">
      <div className="mb-1 text-[12.5px] font-extrabold tracking-[.8px] text-accent-text">
        GUARDERÍA · SALA {classroom.name.toUpperCase()}
      </div>
      <h1 className="m-0 font-display text-[30px] font-semibold text-ink">Hola, {user.firstName}</h1>
      <p className="mt-[5px] text-[14.5px] text-muted">
        {count} {count === 1 ? "niño" : "niños"} · {formatHeaderDate(now)}
      </p>
    </div>
  );
}
