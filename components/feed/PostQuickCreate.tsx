import { POST_TYPE_LABELS } from "@/components/feed/post-type-labels";
import type { Child, PostType, StaffMember } from "@/lib/types";

const selectClassName =
  "cursor-pointer rounded-full border-[1.5px] border-line bg-surface px-4 py-1.5 text-sm font-bold text-nav outline-none";

// Uncontrolled native fields and a `type="button"` submit: nothing is posted until persistence lands.
export function PostQuickCreate({ user, kids }: { user: StaffMember; kids: Child[] }) {
  return (
    <form className="mb-6 rounded-[18px] border border-line bg-surface px-[18px] py-3.5 shadow-[0_4px_14px_-10px_rgba(120,90,60,.4)]">
      <div className="flex items-start gap-3.5">
        <div className="flex size-10 flex-none items-center justify-center rounded-full bg-accent font-display text-base font-semibold text-white">
          {user.firstName.charAt(0)}
        </div>
        <textarea
          name="body"
          rows={3}
          placeholder="Comparte un momento…"
          aria-label="Comparte un momento"
          className="min-w-0 flex-1 resize-y rounded-[14px] border-[1.5px] border-[#EADFD0] bg-white px-4 py-3 text-[15px] leading-normal text-ink outline-none placeholder:text-[#B6A99B]"
        />
      </div>
      <div className="mt-3 flex items-center gap-[9px] pl-[54px]">
        <select name="audience" aria-label="Para" defaultValue="classroom" className={selectClassName}>
          <option value="classroom">Toda la sala</option>
          {kids.map((child) => (
            <option key={child.id} value={child.id}>
              {child.name}
            </option>
          ))}
        </select>
        <select name="type" aria-label="Tipo" defaultValue="announcement" className={selectClassName}>
          {(Object.keys(POST_TYPE_LABELS) as PostType[]).map((type) => (
            <option key={type} value={type}>
              {POST_TYPE_LABELS[type]}
            </option>
          ))}
        </select>
        <span className="flex-1" />
        <button
          type="button"
          className="cursor-pointer rounded-xl bg-[linear-gradient(180deg,#F4977E,#EE8164)] px-[18px] py-2 text-sm font-extrabold text-white shadow-[0_8px_18px_-8px_rgba(238,129,100,.75)]"
        >
          Publicar
        </button>
      </div>
    </form>
  );
}
