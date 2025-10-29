import z from "zod";

const getExperiencesSchema = z.object({
  query: z.object({
    page: z.coerce.number().default(1),
    limit: z.coerce.number().default(10),
    search: z.string().optional(),
  }),
});

const getExperienceByIdSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

export { getExperiencesSchema, getExperienceByIdSchema };
