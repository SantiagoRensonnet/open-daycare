import { connection } from "next/server";
import { AddKidModal } from "@/components/kids/AddKidModal";
import { KidList, type KidListItem } from "@/components/kids/KidList";
import { PageColumn } from "@/components/staff/PageColumn";
import { getChildParents } from "@/lib/children";
import { ageAt } from "@/lib/dates";
import { children, classroom, classrooms, parents } from "@/lib/sample-data";

export default async function KidsPage() {
  await connection();
  const now = new Date();
  // Every child, in sample-data order, so new children come last. `KidList` groups them by classroom.
  const items: KidListItem[] = children.map((child) => ({
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
        <AddKidModal classrooms={classrooms} defaultClassroomId={classroom.id} />
      </div>

      <KidList key={children.length} classrooms={classrooms} items={items} />
    </PageColumn>
  );
}
