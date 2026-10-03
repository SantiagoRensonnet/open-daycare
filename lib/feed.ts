import { dayKey } from "@/lib/dates";
import type { Post } from "@/lib/types";

/** Posts published on `now`'s day in the app timezone, newest first. */
export function getTodayPosts(posts: Post[], now: Date): Post[] {
  const today = dayKey(now);
  return posts
    .filter((post) => dayKey(post.publishedAt) === today)
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
}
