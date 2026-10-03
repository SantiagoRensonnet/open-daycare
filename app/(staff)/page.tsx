import { connection } from "next/server";
import { FeedHeader } from "@/components/feed/FeedHeader";
import { PostQuickCreate } from "@/components/feed/PostQuickCreate";
import { children, classroom, currentUser } from "@/lib/sample-data";

export default async function FeedPage() {
  await connection();
  const now = new Date();

  return (
    <>
      <FeedHeader classroom={classroom} user={currentUser} now={now} />
      <PostQuickCreate user={currentUser} kids={children} />
    </>
  );
}
