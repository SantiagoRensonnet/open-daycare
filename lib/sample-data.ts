// Stand-in for persistence until a backend spec lands.
import { atLocalTime } from "@/lib/dates";
import type { Child, Classroom, Parent, Post, StaffMember } from "@/lib/types";

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

export const classrooms: Classroom[] = [
  { id: "classroom-soles", name: "Soles" },
  { id: "classroom-lunas", name: "Lunas" },
  { id: "classroom-estrellas", name: "Estrellas" },
];

/** The current user's classroom (the staff sidebar and feed are about Soles only). */
export const classroom: Classroom = classrooms[0];

const mateo: Child = {
  id: "child-mateo",
  fullName: "Mateo Fernández",
  classroomId: classroom.id,
  avatarBg: "#A9D9E8",
  avatarFg: "#1F7A93",
  birthDate: "2023-03-12",
  enrolledOn: "2026-02-02",
  allergies: ["Maní"],
  notes: "Alergia al maní. Evitar frutos secos. Lleva inhalador en la mochila.",
};

export const children: Child[] = [
  mateo,
  {
    id: "child-sofia",
    fullName: "Sofía Méndez",
    classroomId: classroom.id,
    avatarBg: "#F4B8CC",
    avatarFg: "#C44A7A",
    birthDate: "2024-05-20",
    enrolledOn: "2026-03-02",
    allergies: [],
    notes: null,
  },
  {
    id: "child-benjamin",
    fullName: "Benjamín Ruiz",
    classroomId: classroom.id,
    avatarBg: "#B9DEC4",
    avatarFg: "#3E8B62",
    birthDate: "2023-01-08",
    enrolledOn: "2025-03-03",
    allergies: [],
    notes: null,
  },
  {
    id: "child-valentina",
    fullName: "Valentina Soto",
    classroomId: classroom.id,
    avatarBg: "#F4DC8E",
    avatarFg: "#9A7B1E",
    birthDate: "2024-02-14",
    enrolledOn: "2026-03-02",
    allergies: [],
    notes: null,
  },
  {
    id: "child-tomas",
    fullName: "Tomás Díaz",
    classroomId: classroom.id,
    avatarBg: "#C9B6E8",
    avatarFg: "#7B5FC0",
    birthDate: "2023-06-30",
    enrolledOn: "2025-03-03",
    allergies: ["Lactosa"],
    notes: "Intolerancia a la lactosa. Usar leche sin lactosa en la merienda.",
  },
  {
    id: "child-emma",
    fullName: "Emma Castro",
    classroomId: classroom.id,
    avatarBg: "#F4B8CC",
    avatarFg: "#C44A7A",
    birthDate: "2024-07-03",
    enrolledOn: "2026-04-06",
    allergies: [],
    notes: null,
  },
  {
    id: "child-lucas",
    fullName: "Lucas Romero",
    classroomId: classroom.id,
    avatarBg: "#A9D9E8",
    avatarFg: "#1F7A93",
    birthDate: "2023-04-22",
    enrolledOn: "2025-03-03",
    allergies: [],
    notes: null,
  },
  {
    id: "child-olivia",
    fullName: "Olivia Vega",
    classroomId: classroom.id,
    avatarBg: "#B9DEC4",
    avatarFg: "#3E8B62",
    birthDate: "2024-01-11",
    enrolledOn: "2026-03-02",
    allergies: [],
    notes: null,
  },
];

/** Appends a child to the in-memory list. Survives requests; lost when the server restarts. */
export function addChild(child: Child): void {
  children.push(child);
}

export const parents: Parent[] = [
  {
    id: "parent-lucia-fernandez",
    firstName: "Lucía",
    lastName: "Fernández",
    relationship: "mother",
    status: "active",
    avatarBg: "#C9B6E8",
    childIds: ["child-mateo"],
  },
  {
    id: "parent-diego-fernandez",
    firstName: "Diego",
    lastName: "Fernández",
    relationship: "father",
    status: "pending",
    avatarBg: "#A9C7E8",
    childIds: ["child-mateo"],
  },
  {
    id: "parent-carla-mendez",
    firstName: "Carla",
    lastName: "Méndez",
    relationship: "mother",
    status: "active",
    avatarBg: "#F4B8CC",
    childIds: ["child-sofia"],
  },
  {
    id: "parent-paula-ruiz",
    firstName: "Paula",
    lastName: "Ruiz",
    relationship: "mother",
    status: "active",
    avatarBg: "#B9DEC4",
    childIds: ["child-benjamin"],
  },
  {
    id: "parent-martin-ruiz",
    firstName: "Martín",
    lastName: "Ruiz",
    relationship: "father",
    status: "active",
    avatarBg: "#A9C7E8",
    childIds: ["child-benjamin"],
  },
  {
    id: "parent-andrea-diaz",
    firstName: "Andrea",
    lastName: "Díaz",
    relationship: "guardian",
    status: "active",
    avatarBg: "#C9B6E8",
    childIds: ["child-tomas"],
  },
  {
    id: "parent-jorge-castro",
    firstName: "Jorge",
    lastName: "Castro",
    relationship: "father",
    status: "pending",
    avatarBg: "#A9C7E8",
    childIds: ["child-emma"],
  },
  {
    id: "parent-natalia-romero",
    firstName: "Natalia",
    lastName: "Romero",
    relationship: "mother",
    status: "active",
    avatarBg: "#F4DC8E",
    childIds: ["child-lucas"],
  },
  {
    id: "parent-sergio-vega",
    firstName: "Sergio",
    lastName: "Vega",
    relationship: "father",
    status: "active",
    avatarBg: "#A9C7E8",
    childIds: ["child-olivia"],
  },
];

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
