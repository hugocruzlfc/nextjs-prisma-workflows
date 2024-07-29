"use server";

import { createPostSchema, updatePostSchema } from "@/lib/forms.schemas";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export default async function updatePostAction(values: FormData, id: string) {
  try {
    const formDataObj = Object.fromEntries(values.entries());
    const { data, success, error } = updatePostSchema.safeParse(formDataObj);

    if (!success) {
      console.error("Validation failed:", error);
      return { success: false, error: error.errors };
    }

    await prisma.post.update({
      where: {
        id,
      },
      data: {
        title: data.title,
        content: data.content,
        slug: data.title.toLowerCase().replace(/\s+/g, "-"),
      },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error updating post:", error);
    return { success: false, error: "Error updating post" };
  }
}
