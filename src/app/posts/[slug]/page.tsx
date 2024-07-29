import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await prisma.post.findUnique({
    where: {
      slug: params.slug,
    },
    // cacheStrategy: { ttl: 60 },
  });
  return (
    <main className="flex flex-col items-center gap-y-5 pt-24 text-center">
      <h1 className="text-3xl font-semibold">{post?.title}</h1>
      <p> {post?.content}</p>
    </main>
  );
}
