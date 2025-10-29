import { PromoModel } from "../models";
import { validatePromoSchema } from "../schemas/promo.schema";
import { ApiError, ApiResponse, AsyncHandler } from "../utils";

const validatePromo = AsyncHandler(async (req, res) => {
  const { success, data } = validatePromoSchema.safeParse({
    body: req.body,
  });

  if (!success) {
    throw new ApiError(400, "Invalid promo code");
  }

  const { promoCode } = data.body;

  const promo = await PromoModel.findOne({
    promoCode: promoCode,
  }).lean();

  if (!promo) {
    throw new ApiError(404, "Promo code not found");
  }

  new ApiResponse(
    200,
    {
      promo,
    },
    "Promo code is valid"
  ).send(res);
});

export { validatePromo };
