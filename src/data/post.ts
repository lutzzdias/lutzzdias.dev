import { type CollectionEntry, getCollection } from "astro:content";

export async function getAllPosts(): Promise<CollectionEntry<"posts">[]> {
  return (await getCollection("posts")).sort(
    (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf(),
  );
}

export async function getTagMetadata(
  tag: string,
): Promise<CollectionEntry<"tags"> | undefined> {
  const tagEntries = await getCollection("tags", (entry) => {
    return entry.id === tag;
  });

  return tagEntries[0];
}

export function getAllTags(posts: CollectionEntry<"posts">[]) {
  return posts.flatMap((post) => [...post.data.tags]);
}

export function getUniqueTags(posts: CollectionEntry<"posts">[]) {
  return [...new Set(getAllTags(posts))];
}

export function getUniqueTagsWithCounts(
  posts: CollectionEntry<"posts">[],
): { tag: string; count: number }[] {
  const counts: Record<string, number> = {};

  for (const tag of getAllTags(posts)) {
    counts[tag] = (counts[tag] ?? 0) + 1;
  }

  return Object.entries(counts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}
