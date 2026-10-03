import { connection } from "next/server";
import { FeedHeader } from "@/components/feed/FeedHeader";
import { PostCard } from "@/components/feed/PostCard";
import { PostQuickCreate } from "@/components/feed/PostQuickCreate";
import { getTodayPosts } from "@/lib/feed";
import { children, classroom, currentUser, getSamplePosts, staff } from "@/lib/sample-data";

export default async function FeedPage() {
  await connection();
  const now = new Date();
  const posts = getTodayPosts(getSamplePosts(now), now);

  return (
    <>
      <FeedHeader classroom={classroom} user={currentUser} now={now} />
      <PostQuickCreate user={currentUser} kids={children} />

      <div className="mb-3.5 flex items-center gap-3.5">
        <span className="text-[12.5px] font-extrabold tracking-[.8px] text-divider-label">PUBLICADO HOY</span>
        <span className="h-px flex-1 bg-divider" />
      </div>

      {posts.length === 0 ? (
        <p className="text-[14.5px] text-muted">Todavía no hay publicaciones hoy.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {posts.map((post) => {
            const { audience } = post;
            const author = staff.find((member) => member.id === post.authorId)!;
            const child =
              audience.kind === "family" ? children.find((kid) => kid.id === audience.childId)! : null;
            return (
              <PostCard
                key={post.id}
                post={post}
                author={author}
                child={child}
                isOwn={post.authorId === currentUser.id}
              />
            );
          })}
        </div>
      )}
    </>
  );
}
