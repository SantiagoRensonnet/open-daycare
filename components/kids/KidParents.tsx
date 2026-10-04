import Link from "next/link";
import { PlusIcon } from "@/components/icons";
import { fullName } from "@/lib/children";
import { routes } from "@/lib/routes";
import type { Parent, ParentRelationship, ParentStatus } from "@/lib/types";

const RELATIONSHIP_LABELS: Record<ParentRelationship, string> = {
  mother: "Mamá",
  father: "Papá",
  guardian: "Tutor/a",
};

const PARENT_STATUS: Record<ParentStatus, { text: string; chip: string; className: string }> = {
  active: { text: "cuenta activa", chip: "ACTIVA", className: "bg-[#CFEBD8] text-[#3E9B6C]" },
  pending: { text: "invitación enviada", chip: "PENDIENTE", className: "bg-[#F7E7A6] text-[#9A7B1E]" },
};

export function KidParents({ childId, parents }: { childId: string; parents: Parent[] }) {
  return (
    <div className="rounded-2xl border border-line bg-surface px-[18px] py-4">
      <div className="mb-3.5 text-[12.5px] font-extrabold tracking-[.8px] text-divider-label">PADRES VINCULADOS</div>
      <div className="flex flex-col gap-3.5">
        {parents.map((parent) => {
          const status = PARENT_STATUS[parent.status];
          return (
            <div key={parent.id} className="flex items-center gap-3">
              <div
                className="flex size-10 flex-none items-center justify-center rounded-full font-display text-[16px] font-semibold text-white"
                style={{ backgroundColor: parent.avatarBg }}
              >
                {parent.firstName.charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[14.5px] font-extrabold text-ink">{fullName(parent)}</div>
                <div className="text-[12.5px] text-subtle">
                  {RELATIONSHIP_LABELS[parent.relationship]} · {status.text}
                </div>
              </div>
              <span className={`flex-none rounded-full px-[9px] py-1 text-[10.5px] font-extrabold ${status.className}`}>
                {status.chip}
              </span>
            </div>
          );
        })}
        <Link
          href={routes.kidLinkParent(childId)}
          className={`flex items-center gap-3 ${parents.length > 0 ? "pt-2" : ""}`}
        >
          <span className="flex size-10 flex-none items-center justify-center rounded-full border-[1.5px] border-dashed border-[#D8CBBA] text-photo-fg">
            <PlusIcon size={18} strokeWidth={2.2} />
          </span>
          <span className="text-[14.5px] font-extrabold text-edit">
            {parents.length > 0 ? "Vincular otro padre" : "Vincular padre"}
          </span>
        </Link>
      </div>
    </div>
  );
}
