import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deletePostAction(id: string) {
  try {
    await prisma.post.delete({
      where: {
        id,
      },
    });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting post:", error);
    return { success: false, error: "Error deleting post" };
  }
}
