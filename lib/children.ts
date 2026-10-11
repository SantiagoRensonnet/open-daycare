// Pure selectors over plain data. Never import sample-data.ts here: client components use this module.
import type { Child, Classroom, Parent } from "@/lib/types";

/** The classroom's children, in input order. */
export function getClassroomChildren(children: Child[], classroomId: string): Child[] {
  return children.filter((child) => child.classroomId === classroomId);
}

/** One entry per classroom, in classroom order, keeping the input order inside each. */
export function getChildrenByClassroom(
  children: Child[],
  classrooms: Classroom[],
): { classroom: Classroom; children: Child[] }[] {
  return classrooms.map((classroom) => ({
    classroom,
    children: getClassroomChildren(children, classroom.id),
  }));
}

export function getChild(children: Child[], id: string): Child | undefined {
  return children.find((child) => child.id === id);
}

/** The child's linked parents (any status), in input order. */
export function getChildParents(parents: Parent[], childId: string): Parent[] {
  return parents.filter((parent) => parent.childIds.includes(childId));
}

export function fullName(person: { firstName: string; lastName: string }): string {
  return `${person.firstName} ${person.lastName}`;
}

/** The first word of the full name, e.g. "Mateo". Used by the feed. */
export function shortName(child: Child): string {
  return child.fullName.trim().split(/\s+/)[0] ?? "";
}

/** Trimmed, lowercased and without diacritics, so accented and plain letters match. */
export function normalizeSearch(text: string): string {
  return text.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().trim();
}

/** An empty or blank query matches every child. */
export function childMatchesQuery(child: Child, query: string): boolean {
  const needle = normalizeSearch(query);
  return needle === "" || normalizeSearch(child.fullName).includes(needle);
}
