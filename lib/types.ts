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
  firstName: string;
  lastName: string;
  classroomId: string;
  avatarBg: string;
  avatarFg: string;
  /** Calendar date "YYYY-MM-DD", no time or zone. */
  birthDate: string;
  /** Calendar date "YYYY-MM-DD", no time or zone. */
  enrolledOn: string;
  /** Short allergy name for the list chip, e.g. "Maní". `null` → no allergy. */
  allergy: string | null;
  /** Free text for "Alergias y notas". `null` → the box is hidden. */
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
