import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function Page() {
  const user = await prisma.user.findUnique({
    where: {
      email: "hugo@gmail.com",
    },
    include: {
      posts: true,
    },
  });

  return (
    <main className="flex flex-col items-center gap-y-5 pt-24 text-center">
      <h1 className="text-3xl font-semibold">My Profile: {user?.email}</h1>
      <h2 className="text-2xl font-semibold">
        My posts: ({user?.posts.length})
      </h2>
      <ul className="border-t border-b border-black/10 py-5 leading-8">
        {user?.posts.map((post) => (
          <li
            key={post.id}
            className="flex items-center justify-between px-5"
          >
            <Link href={`/posts/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
