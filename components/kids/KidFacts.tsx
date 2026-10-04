import { formatCalendarDate, formatCalendarMonth } from "@/lib/dates";
import type { Child } from "@/lib/types";

export function KidFacts({ child, classroomName }: { child: Child; classroomName: string }) {
  const rows = [
    { label: "Fecha de nacimiento", value: formatCalendarDate(child.birthDate) },
    { label: "Sala", value: classroomName },
    { label: "Ingreso", value: formatCalendarMonth(child.enrolledOn) },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface">
      {rows.map(({ label, value }) => (
        <div
          key={label}
          className="flex justify-between border-b border-line-soft px-[18px] py-[15px] text-[14.5px] last:border-b-0"
        >
          <span className="text-muted">{label}</span>
          <span className="font-extrabold text-ink">{value}</span>
        </div>
      ))}
    </div>
  );
}
