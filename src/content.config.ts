import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

function sanitizeTags(array: string[]) {
  return [
    ...new Set(array.map((str) => str.toLowerCase().replace(/\s+/g, "-"))),
  ];
}

const posts = defineCollection({
  loader: glob({ base: "./src/content/posts", pattern: "**/*.{md,mdx}" }),
  schema: () =>
    z.object({
      title: z.string().max(64),
      description: z.string().max(256),
      draft: z.boolean().default(false),
      tags: z.array(z.string()).default([]).transform(sanitizeTags),
      publishDate: z
        .string()
        .or(z.date())
        .transform((val) => new Date(val)),
      updatedDate: z
        .string()
        .optional()
        .transform((str) => (str ? new Date(str) : undefined)),
    }),
});

const tags = defineCollection({
  loader: glob({ base: "./src/content/tags", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string().max(64).optional(),
    description: z.string().optional(),
  }),
});

export const collections = { posts, tags };
