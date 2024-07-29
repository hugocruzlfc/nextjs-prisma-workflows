import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const initialPosts: Prisma.PostCreateInput[] = [
  {
    title: "Post 1",
    content: "Content 1",
    slug: "post-1",
    author: {
      connectOrCreate: {
        where: {
          email: "hugo@gmail.com",
        },
        create: {
          email: "hugo@gmail.com",
          hashedpassword: "123456",
        },
      },
    },
  },
];

async function main() {
  console.log("Start seeding ...");

  for (const postData of initialPosts) {
    const newPost = await prisma.post.create({
      data: postData,
    });
    console.log(`Created post with id: ${newPost.id}`);
  }

  console.log("Seeding finished.");
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
