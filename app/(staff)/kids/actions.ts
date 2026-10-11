"use server";

import { refresh } from "next/cache";
import { buildChild, parseChildForm, type ChildFormErrors, type ChildFormInput } from "@/lib/child-form";
import { dayKey } from "@/lib/dates";
import { addChild, children, classrooms } from "@/lib/sample-data";

/** Validates again on the server, appends the child to the in-memory list and re-renders the page. */
export async function createChild(
  input: ChildFormInput,
): Promise<{ ok: true } | { ok: false; errors: ChildFormErrors }> {
  const today = dayKey(new Date());
  const result = parseChildForm(input, today, classrooms.map((room) => room.id));
  if (!result.ok) return { ok: false, errors: result.errors };

  addChild(
    buildChild(result.value, {
      id: `child-${crypto.randomUUID()}`,
      today,
      position: children.length,
    }),
  );
  refresh();
  return { ok: true };
}
