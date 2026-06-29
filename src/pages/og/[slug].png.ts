import type { CollectionEntry } from "astro:content";
import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import { renderCard } from "../../og/card";

export async function getStaticPaths() {
  const posts = await getCollection("blog");
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { post },
  }));
}

export const GET: APIRoute<{ post: CollectionEntry<"blog"> }> = async (
  context,
) => {
  const { post } = context.props;
  const png = await renderCard({
    title: post.data.title,
    description: post.data.description,
    date: post.data.date,
    tags: post.data.tags,
  });
  return new Response(new Uint8Array(png), {
    headers: { "Content-Type": "image/png" },
  });
};
