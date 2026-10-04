import type { Age } from "@/lib/types";

/** "3 años", "1 año"; under a year, "4 meses", "1 mes", "0 meses". */
export function formatAgeLabel({ years, months }: Age): string {
  if (years >= 1) return years === 1 ? "1 año" : `${years} años`;
  return months === 1 ? "1 mes" : `${months} meses`;
}
