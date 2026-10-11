// Pure parsing and validation for the "Agregar niño" form, shared by the client and the server.
// It returns error codes, not copy, so `lib/` stays free of UI strings.
import { normalizeSearch } from "@/lib/children";
import type { Child } from "@/lib/types";

export type ChildFormInput = {
  fullName: string;
  birthDate: string;
  classroomId: string;
  allergies: string;
  notes: string;
};

export type ChildFormError = "required" | "invalid-date" | "future" | "too-old" | "invalid-classroom";

export type ChildFormErrors = Partial<Record<"fullName" | "birthDate" | "classroomId", ChildFormError>>;

export type NewChild = {
  fullName: string;
  birthDate: string;
  classroomId: string;
  allergies: string[];
  notes: string | null;
};

/** The 5 prototype avatar color pairs, rotated by a child's position (criterion 4.6). */
export const AVATAR_COLORS: { bg: string; fg: string }[] = [
  { bg: "#A9D9E8", fg: "#1F7A93" },
  { bg: "#F4B8CC", fg: "#C44A7A" },
  { bg: "#B9DEC4", fg: "#3E8B62" },
  { bg: "#F4DC8E", fg: "#9A7B1E" },
  { bg: "#C9B6E8", fg: "#7B5FC0" },
];

function collapseSpaces(text: string): string {
  return text.trim().replace(/\s+/g, " ");
}

function pad(value: number): string {
  return String(value).padStart(2, "0");
}

function toKey(year: number, month: number, day: number): string {
  return `${year}-${pad(month)}-${pad(day)}`;
}

/** The same calendar day 6 years before `today`. Feb 29 → Feb 28 on a non-leap year. */
function sixYearsBefore(today: string): string {
  const [year, month, day] = today.split("-").map(Number);
  const targetYear = year - 6;
  const lastDay = new Date(Date.UTC(targetYear, month, 0)).getUTCDate();
  return toKey(targetYear, month, Math.min(day, lastDay));
}

/** Reads the form's raw strings. Missing keys become "". */
export function readChildForm(formData: FormData): ChildFormInput {
  return {
    fullName: String(formData.get("fullName") ?? ""),
    birthDate: String(formData.get("birthDate") ?? ""),
    classroomId: String(formData.get("classroomId") ?? ""),
    allergies: String(formData.get("allergies") ?? ""),
    notes: String(formData.get("notes") ?? ""),
  };
}

export function parseChildForm(
  input: ChildFormInput,
  today: string,
  classroomIds: string[],
): { ok: true; value: NewChild } | { ok: false; errors: ChildFormErrors } {
  const errors: ChildFormErrors = {};

  const fullName = collapseSpaces(input.fullName);
  if (fullName === "") errors.fullName = "required";

  const rawBirthDate = input.birthDate.trim();
  let birthDate = "";
  if (rawBirthDate === "") {
    errors.birthDate = "required";
  } else {
    const match = rawBirthDate.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (match === null) {
      errors.birthDate = "invalid-date";
    } else {
      const day = Number(match[1]);
      const month = Number(match[2]);
      const year = Number(match[3]);
      const utc = new Date(Date.UTC(year, month - 1, day));
      if (utc.getUTCFullYear() !== year || utc.getUTCMonth() !== month - 1 || utc.getUTCDate() !== day) {
        errors.birthDate = "invalid-date";
      } else {
        birthDate = toKey(year, month, day);
        if (birthDate > today) errors.birthDate = "future";
        else if (birthDate < sixYearsBefore(today)) errors.birthDate = "too-old";
      }
    }
  }

  if (!classroomIds.includes(input.classroomId)) errors.classroomId = "invalid-classroom";

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  const seenAllergies = new Set<string>();
  const allergies: string[] = [];
  for (const raw of input.allergies.split(",")) {
    const allergy = collapseSpaces(raw);
    if (allergy === "") continue;
    const key = normalizeSearch(allergy);
    if (seenAllergies.has(key)) continue;
    seenAllergies.add(key);
    allergies.push(allergy);
  }

  const notes = input.notes.trim();

  return {
    ok: true,
    value: {
      fullName,
      birthDate,
      classroomId: input.classroomId,
      allergies,
      notes: notes === "" ? null : notes,
    },
  };
}

export function buildChild(value: NewChild, meta: { id: string; today: string; position: number }): Child {
  const color = AVATAR_COLORS[meta.position % AVATAR_COLORS.length];
  return {
    id: meta.id,
    fullName: value.fullName,
    classroomId: value.classroomId,
    avatarBg: color.bg,
    avatarFg: color.fg,
    birthDate: value.birthDate,
    enrolledOn: meta.today,
    allergies: value.allergies,
    notes: value.notes,
  };
}
