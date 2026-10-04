"use client";

import { useState } from "react";
import { SearchIcon } from "@/components/icons";
import { KidCard } from "@/components/kids/KidCard";
import { childMatchesQuery } from "@/lib/children";
import type { Age, Child } from "@/lib/types";

/** Computed on the server (ages depend on today) and passed as plain JSON. */
export type KidListItem = { child: Child; age: Age; parentCount: number };

export function KidList({ classroomName, items }: { classroomName: string; items: KidListItem[] }) {
  const [query, setQuery] = useState("");
  const visible = items.filter(({ child }) => childMatchesQuery(child, query));
  const count = visible.length;

  return (
    <>
      <div className="mb-[22px] flex items-center gap-[11px] rounded-[14px] border border-line bg-surface px-4 py-3">
        <SearchIcon size={18} className="flex-none text-photo-fg" />
        <input
          type="search"
          placeholder="Buscar niño…"
          aria-label="Buscar niño"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="min-w-0 flex-1 border-none bg-transparent px-0.5 py-px text-[15px] text-ink outline-none placeholder:text-[#B6A99B]"
        />
      </div>

      <div className="mb-3.5 flex items-center gap-3">
        <span className="text-[12.5px] font-extrabold tracking-[.8px] text-ink">SALA {classroomName.toUpperCase()}</span>
        <span className="text-[13px] text-subtle">
          {count} {count === 1 ? "niño" : "niños"}
        </span>
        <span className="h-px flex-1 bg-divider" />
      </div>

      {items.length === 0 ? (
        <p className="text-[14.5px] text-muted">Todavía no hay niños en esta sala.</p>
      ) : visible.length === 0 ? (
        <p className="text-[14.5px] text-muted">Ningún niño coincide con «{query.trim()}».</p>
      ) : (
        <div className="grid grid-cols-2 gap-3.5">
          {visible.map((item) => (
            <KidCard key={item.child.id} {...item} />
          ))}
        </div>
      )}
    </>
  );
}
