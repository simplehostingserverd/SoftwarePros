import PostEditor from "@/components/PostEditor";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

async function getPost(slug: string) {
  try {
    const post = await db.post.findUnique({
      where: { slug },
      select: {
        id: true,
        title: true,
        slug: true,
        content: true,
        excerpt: true,
        published: true,
        metaTitle: true,
        metaDescription: true,
      },
    });
    return post;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  // Convert null values to undefined to match PostEditor interface
  const postForEditor = {
    ...post,
    excerpt: post.excerpt ?? undefined,
    metaTitle: post.metaTitle ?? undefined,
    metaDescription: post.metaDescription ?? undefined,
  };

  return <PostEditor post={postForEditor} isEditing={true} />;
}
