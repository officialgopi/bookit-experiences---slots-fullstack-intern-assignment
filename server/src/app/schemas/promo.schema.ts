import z from "zod";

const validatePromoSchema = z.object({
  body: z.object({
    promoCode: z.string().min(2).max(100),
    experience: z.string(),
  }),
});

export { validatePromoSchema };
