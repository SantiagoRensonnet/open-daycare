// Stand-in for persistence until a backend spec lands.
import { atLocalTime } from "@/lib/dates";
import type { Child, Classroom, Post, StaffMember } from "@/lib/types";

export const currentUser: StaffMember = {
  id: "staff-caro",
  firstName: "Caro",
  lastName: "Giménez",
  role: "teacher",
};

const lucia: StaffMember = {
  id: "staff-lucia",
  firstName: "Lucía",
  lastName: "Pereyra",
  role: "teacher",
};

export const staff: StaffMember[] = [currentUser, lucia];

export const classroom: Classroom = {
  id: "classroom-soles",
  name: "Soles",
  childrenCount: 12,
};

const mateo: Child = {
  id: "child-mateo",
  name: "Mateo",
  avatarBg: "#A9D9E8",
  avatarFg: "#1F7A93",
};

export const children: Child[] = [mateo];

/** Sample posts relative to `now`, so they are always "today" (except `p0`, from yesterday). */
export function getSamplePosts(now: Date): Post[] {
  return [
    {
      id: "p1",
      type: "achievement",
      audience: { kind: "family", childId: mateo.id },
      authorId: currentUser.id,
      body: "¡Usó el orinal solito por primera vez! Estaba feliz de contárselo a todos. Un gran paso.",
      photoCaption: null,
      publishedAt: atLocalTime(now, "14:20"),
      reactionCount: 3,
      commentCount: 1,
    },
    {
      id: "p2",
      type: "activity",
      audience: { kind: "family", childId: mateo.id },
      authorId: currentUser.id,
      body: "Pintamos con témperas esta mañana. Mateo eligió el azul para todo y se concentró muchísimo mezclando colores.",
      photoCaption: "pintando con témperas",
      publishedAt: atLocalTime(now, "09:40"),
      reactionCount: 5,
      commentCount: 2,
    },
    {
      id: "p3",
      type: "announcement",
      audience: { kind: "classroom" },
      authorId: currentUser.id,
      body: "El viernes salimos al parque por la mañana. Recuerden mandar gorra y una botellita de agua.",
      photoCaption: null,
      publishedAt: atLocalTime(now, "07:50"),
      reactionCount: 8,
      commentCount: 0,
    },
    {
      id: "p4",
      type: "announcement",
      audience: { kind: "classroom" },
      authorId: lucia.id,
      body: "Mañana la entrada es a las 9:00 por la reunión de personal. ¡Gracias!",
      photoCaption: null,
      publishedAt: atLocalTime(now, "07:30"),
      reactionCount: 2,
      commentCount: 0,
    },
    {
      id: "p0",
      type: "achievement",
      audience: { kind: "family", childId: mateo.id },
      authorId: currentUser.id,
      body: "Hoy comió toda la fruta sin ayuda.",
      photoCaption: null,
      publishedAt: atLocalTime(now, "16:00", 1),
      reactionCount: 4,
      commentCount: 0,
    },
  ];
}
