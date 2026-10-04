import Link from "next/link";
import { connection } from "next/server";
import { PlusIcon } from "@/components/icons";
import { KidList, type KidListItem } from "@/components/kids/KidList";
import { PageColumn } from "@/components/staff/PageColumn";
import { getChildParents, getClassroomChildren } from "@/lib/children";
import { ageAt } from "@/lib/dates";
import { routes } from "@/lib/routes";
import { children, classroom, parents } from "@/lib/sample-data";

export default async function KidsPage() {
  await connection();
  const now = new Date();
  const items: KidListItem[] = getClassroomChildren(children, classroom.id).map((child) => ({
    child,
    age: ageAt(child.birthDate, now),
    parentCount: getChildParents(parents, child.id).length,
  }));

  return (
    <PageColumn maxWidth={880}>
      <div className="mb-[22px] flex items-end justify-between gap-4">
        <div>
          <div className="mb-1 text-[12.5px] font-extrabold tracking-[.8px] text-accent-text">GESTIÓN</div>
          <h1 className="m-0 font-display text-[30px] font-semibold text-ink">Niños</h1>
        </div>
        <Link
          href={routes.kidNew}
          className="flex items-center gap-2 rounded-[14px] bg-[linear-gradient(180deg,#F4977E,#EE8164)] px-[18px] py-[11px] text-[14.5px] font-extrabold text-white shadow-[0_8px_18px_-8px_rgba(238,129,100,.7)]"
        >
          <PlusIcon size={17} />
          Agregar niño
        </Link>
      </div>

      <KidList classroomName={classroom.name} items={items} />
    </PageColumn>
  );
}
