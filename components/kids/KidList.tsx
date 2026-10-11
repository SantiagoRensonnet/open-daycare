"use client";

import { useState } from "react";
import { SearchIcon } from "@/components/icons";
import { KidCard } from "@/components/kids/KidCard";
import { childMatchesQuery } from "@/lib/children";
import type { Age, Child, Classroom } from "@/lib/types";

/** Computed on the server (ages depend on today) and passed as plain JSON. */
export type KidListItem = { child: Child; age: Age; parentCount: number };

function countLabel(count: number): string {
  return `${count} ${count === 1 ? "niño" : "niños"}`;
}

function SectionHeader({ name, count }: { name: string; count: number }) {
  return (
    <div className="mb-3.5 flex items-center gap-3">
      <span className="text-[12.5px] font-extrabold tracking-[.8px] text-ink">SALA {name.toUpperCase()}</span>
      <span className="text-[13px] text-subtle">{countLabel(count)}</span>
      <span className="h-px flex-1 bg-divider" />
    </div>
  );
}

export function KidList({ classrooms, items }: { classrooms: Classroom[]; items: KidListItem[] }) {
  const [query, setQuery] = useState("");
  const visible = items.filter(({ child }) => childMatchesQuery(child, query));
  const sections = classrooms
    .map((room) => ({ room, items: visible.filter((item) => item.child.classroomId === room.id) }))
    .filter((section) => section.items.length > 0);

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

      {sections.length === 0 ? (
        <>
          <SectionHeader name={classrooms[0].name} count={0} />
          {items.length === 0 ? (
            <p className="text-[14.5px] text-muted">Todavía no hay niños en esta sala.</p>
          ) : (
            <p className="text-[14.5px] text-muted">Ningún niño coincide con «{query.trim()}».</p>
          )}
        </>
      ) : (
        sections.map((section, index) => (
          <div key={section.room.id} className={index > 0 ? "mt-[26px]" : undefined}>
            <SectionHeader name={section.room.name} count={section.items.length} />
            <div className="grid grid-cols-2 gap-3.5">
              {section.items.map((item) => (
                <KidCard key={item.child.id} {...item} />
              ))}
            </div>
          </div>
        ))
      )}
    </>
  );
}
