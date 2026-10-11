import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { ChevronLeftIcon, SunIcon } from "@/components/icons";
import { KidFacts } from "@/components/kids/KidFacts";
import { KidHealthNotes } from "@/components/kids/KidHealthNotes";
import { KidParents } from "@/components/kids/KidParents";
import { KidProfileHeader } from "@/components/kids/KidProfileHeader";
import { PageColumn } from "@/components/staff/PageColumn";
import { getChild, getChildParents } from "@/lib/children";
import { ageAt } from "@/lib/dates";
import { routes } from "@/lib/routes";
import { children, classrooms, parents } from "@/lib/sample-data";

export default async function KidPage({ params }: PageProps<"/kids/[id]">) {
  const { id } = await params;
  await connection();
  const now = new Date();

  // Unknown ids (including "new", until the add-child spec lands) get the standard 404.
  const child = getChild(children, id);
  if (child === undefined) notFound();
  // A miss is bad sample data, not a user error.
  const childClassroom = classrooms.find((room) => room.id === child.classroomId)!;
  const childParents = getChildParents(parents, child.id);
  // Notes win; with none, the box falls back to the allergy list. No notes and no allergies → no box.
  const healthText = child.notes ?? (child.allergies.length > 0 ? child.allergies.join(", ") : null);

  return (
    <PageColumn maxWidth={820}>
      <Link href={routes.kids} className="mb-5 flex items-center gap-[7px] text-[14px] font-bold text-muted">
        <ChevronLeftIcon size={18} />
        Volver a Niños
      </Link>

      <div className="flex flex-wrap items-start gap-[26px]">
        <div className="flex min-w-[300px] flex-1 flex-col gap-[18px]">
          <KidProfileHeader child={child} age={ageAt(child.birthDate, now)} classroomName={childClassroom.name} />
          {healthText !== null && <KidHealthNotes text={healthText} />}
          <KidFacts child={child} classroomName={childClassroom.name} />
        </div>

        <div className="flex w-[300px] flex-none flex-col gap-3.5">
          <Link
            href={routes.kidSummary(child.id)}
            className="flex w-full items-center justify-center gap-[9px] rounded-[14px] bg-ink p-[13px] text-[15px] font-extrabold text-white"
          >
            <SunIcon size={18} strokeWidth={2} />
            Resumen del día
          </Link>
          <KidParents childId={child.id} parents={childParents} />
        </div>
      </div>
    </PageColumn>
  );
}
