export type StaffRole = "teacher";

export type StaffMember = {
  id: string;
  firstName: string;
  lastName: string;
  role: StaffRole;
};

export type Classroom = {
  id: string;
  name: string;
};

export type Child = {
  id: string;
  /** The child's full name, e.g. "Mateo Fernández". The feed derives its first word. */
  fullName: string;
  classroomId: string;
  avatarBg: string;
  avatarFg: string;
  /** Calendar date "YYYY-MM-DD", no time or zone. */
  birthDate: string;
  /** Calendar date "YYYY-MM-DD", no time or zone. */
  enrolledOn: string;
  /** Allergy names, in the order typed. Empty → no allergy. The list chip shows the first one. */
  allergies: string[];
  /** Free text for "Alergias y notas". `null` → the box shows the allergies, or is hidden. */
  notes: string | null;
};

export type ParentRelationship = "mother" | "father" | "guardian";

export type ParentStatus = "active" | "pending";

export type Parent = {
  id: string;
  firstName: string;
  lastName: string;
  relationship: ParentRelationship;
  status: ParentStatus;
  /** The initial is white. */
  avatarBg: string;
  /** A parent can be linked to several children. */
  childIds: string[];
};

/** `months` is the total number of completed months. */
export type Age = { years: number; months: number };

export type PostType = "achievement" | "activity" | "announcement";

export type PostAudience =
  | { kind: "family"; childId: string }
  | { kind: "classroom" };

export type Post = {
  id: string;
  type: PostType;
  audience: PostAudience;
  authorId: string;
  body: string;
  /** `null` means the post has no photo. */
  photoCaption: string | null;
  publishedAt: Date;
  reactionCount: number;
  commentCount: number;
};
