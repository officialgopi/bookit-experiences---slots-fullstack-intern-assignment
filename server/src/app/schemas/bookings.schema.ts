import z from "zod";

const acceptBookingSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Invalid email address"),
    date: z.coerce.date(),
    appliedPromo: z.string().optional(),
    experience: z.string().min(1, "Experience ID is required"),
    slot: z.string().min(1, "Slot ID is required"),
    quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  }),
});

export { acceptBookingSchema };
