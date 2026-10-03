import { POST_TYPE_LABELS } from "@/components/feed/post-type-labels";
import type { PostType } from "@/lib/types";

const POST_TYPE_BADGES: Record<PostType, { className: string; dotClassName: string }> = {
  achievement: { className: "bg-[#CFEBD8] text-[#3E9B6C]", dotClassName: "bg-[#3E9B6C]" },
  activity: { className: "bg-[#C7E7F1] text-[#2E89A6]", dotClassName: "bg-[#2E89A6]" },
  announcement: { className: "bg-[#CCD8F4] text-[#4E72C8]", dotClassName: "bg-[#4E72C8]" },
};

export function PostTypeBadge({ type }: { type: PostType }) {
  const badge = POST_TYPE_BADGES[type];

  return (
    <div className={`flex items-center gap-[7px] rounded-full px-3 py-1.5 ${badge.className}`}>
      <span className={`size-2 rounded-full ${badge.dotClassName}`} />
      <span className="text-[12px] font-extrabold tracking-[.5px] uppercase">{POST_TYPE_LABELS[type]}</span>
    </div>
  );
}
