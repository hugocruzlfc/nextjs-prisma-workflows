import createPostAction from "@/actions/create-post.action";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function Home() {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      slug: true,
    },
    take: 10, // Limit to 10 posts, pagination
  });

  const postCount = await prisma.post.count();
  return (
    <main className="flex flex-col items-center gap-y-5 pt-24 text-center">
      <h1 className="text-3xl font-semibold">All posts ({postCount})</h1>
      <ul className="border-t border-b border-black/10 py-5 leading-8">
        {posts.map((post) => (
          <li
            key={post.id}
            className="flex items-center justify-between px-5"
          >
            <Link href={`/posts/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>

      <form
        action={createPostAction}
        className="flex flex-col gap-y-2 w-[300px]"
      >
        <input
          className="border border-black/10 px-3 py-2"
          placeholder="Title"
          type="text"
          name="title"
        />
        <textarea
          className="border border-black/10 px-3 py-2"
          placeholder="Content"
          name="content"
          rows={5}
        ></textarea>
        <button className="bg-black text-white px-3 py-2">Create Post</button>
      </form>
    </main>
  );
}
