import type { ReactNode } from "react";

/** One row of one or more label + control groups inside a `Modal` body. */
export function ModalRow({ children }: { children: ReactNode }) {
  return <div className="mb-[18px] flex gap-3.5 last:mb-0">{children}</div>;
}
