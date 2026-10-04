import type { Child } from "@/lib/types";

const AVATAR_SIZES = {
  48: "size-12 text-[19px]",
  84: "size-[84px] text-[34px]",
} as const;

export function KidAvatar({ child, size }: { child: Child; size: keyof typeof AVATAR_SIZES }) {
  return (
    <div
      className={`flex flex-none items-center justify-center rounded-full font-display font-semibold ${AVATAR_SIZES[size]}`}
      style={{ backgroundColor: child.avatarBg, color: child.avatarFg }}
    >
      {child.firstName.charAt(0)}
    </div>
  );
}
