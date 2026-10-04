import type { ReactNode } from "react";

// Full class names so Tailwind picks them up. Max-width includes the padding, as in the prototypes.
const COLUMN_WIDTHS = {
  760: "max-w-[760px]",
  820: "max-w-[820px]",
  880: "max-w-[880px]",
} as const;

/** The centered content column inside the staff shell's `main`. Each page picks its prototype's width. */
export function PageColumn({ maxWidth, children }: { maxWidth: keyof typeof COLUMN_WIDTHS; children: ReactNode }) {
  return <div className={`mx-auto w-full px-10 pt-[34px] pb-20 ${COLUMN_WIDTHS[maxWidth]}`}>{children}</div>;
}
