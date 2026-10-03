import Link from "next/link";
import { PostTypeBadge } from "@/components/feed/PostTypeBadge";
import { HeartIcon, ImageIcon, MegaphoneIcon, MessageIcon } from "@/components/icons";
import { formatTime } from "@/lib/dates";
import { routes } from "@/lib/routes";
import type { Child, Post, StaffMember } from "@/lib/types";

type PostCardProps = {
  post: Post;
  author: StaffMember;
  child: Child | null;
  isOwn: boolean;
};

export function PostCard({ post, author, child, isOwn }: PostCardProps) {
  const isFamily = post.audience.kind === "family" && child !== null;

  return (
    <article className="rounded-[20px] border border-line bg-surface px-[22px] py-5 shadow-[0_4px_16px_-12px_rgba(120,90,60,.5)]">
      <div className="mb-3.5 flex items-center gap-3">
        {isFamily ? (
          <div
            className="flex size-11 flex-none items-center justify-center rounded-full font-display text-[17px] font-semibold"
            style={{ backgroundColor: child.avatarBg, color: child.avatarFg }}
          >
            {child.name.charAt(0)}
          </div>
        ) : (
          <div className="flex size-11 flex-none items-center justify-center rounded-full bg-[#CCD8F4] text-[#4E72C8]">
            <MegaphoneIcon size={20} />
          </div>
        )}
        <div className="flex-1">
          <div className="font-display text-[16.5px] font-semibold text-ink">
            {isFamily ? child.name : "Anuncio general"}
          </div>
          <div className="text-[12.5px] text-subtle">
            {formatTime(post.publishedAt)} · publicado por {isOwn ? "ti" : author.firstName}
          </div>
        </div>
        <PostTypeBadge type={post.type} />
      </div>

      <div className="mb-2.5 text-[12.5px] text-subtle">
        {isFamily ? `Para: familia de ${child.name}` : "Para: toda la sala"}
      </div>
      <p className="m-0 text-[15.5px] leading-[1.55] text-body">{post.body}</p>

      {post.photoCaption !== null && (
        <Link
          href={routes.postPhoto(post.id)}
          className="mt-3.5 flex h-[200px] flex-col items-center justify-center gap-2 rounded-2xl border-[1.5px] border-dashed border-photo-border bg-photo-bg text-photo-fg"
        >
          <ImageIcon size={30} />
          <span className="text-[13.5px]">Foto · {post.photoCaption}</span>
        </Link>
      )}

      <div className="mt-4 flex items-center gap-[18px] border-t border-line-soft pt-3.5">
        <span className="flex items-center gap-[7px] text-sm font-bold text-accent-strong">
          <HeartIcon size={19} />
          {post.reactionCount}
        </span>
        <Link
          href={routes.postDetail(post.id)}
          className="flex items-center gap-[7px] text-sm font-bold text-muted"
        >
          <MessageIcon size={18} />
          {post.commentCount}
        </Link>
        <span className="flex-1" />
        {isOwn && (
          <Link href={routes.postEdit(post.id)} className="text-sm font-extrabold text-edit">
            Editar
          </Link>
        )}
      </div>
    </article>
  );
}
