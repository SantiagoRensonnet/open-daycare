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
  childrenCount: number;
};

export type Child = {
  id: string;
  name: string;
  avatarBg: string;
  avatarFg: string;
};

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
