"use server";

import { createPostSchema } from "@/lib/forms.schemas";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export default async function createPostAction(values: FormData) {
  try {
    const formDataObj = Object.fromEntries(values.entries());
    const { data, success, error } = createPostSchema.safeParse(formDataObj);

    if (!success) {
      console.error("Validation failed:", error);
      return { success: false, error: error.errors };
    }

    await prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        slug: data.title.toLowerCase().replace(/\s+/g, "-"),
        author: {
          connect: {
            email: "hugo@gmail.com",
          },
        },
      },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error creating post:", error);
    return { success: false, error: "Error creating post" };
  }
}
