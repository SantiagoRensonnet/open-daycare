import type { ReactNode } from "react";

export function AuthSubmitButton({ children }: { children: ReactNode }) {
  return (
    <button
      type="button"
      className="w-full rounded-[15px] bg-gradient-to-b from-[#F4977E] to-[#EE8164] py-[15px] text-center text-[16px] font-extrabold text-white shadow-[0_10px_22px_-8px_rgba(238,129,100,.7)]"
    >
      {children}
    </button>
  );
}
