import mongoose, { Document } from "mongoose";

interface IPromo {
  promoCode: string;
  discountInPercentage: number;
  linkedExperiences: mongoose.Types.ObjectId[];
  isActive: boolean;
}

const schema = new mongoose.Schema<IPromo & Document>({
  promoCode: {
    type: String,
    required: true,
  },

  discountInPercentage: {
    type: Number,
    required: true,
    min: [0, "Percentage Value should be greater than or equal to 0"],
    max: [100, "Discount Percentage should be within 100"],
  },

  linkedExperiences: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Experience",
    default: [],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const PromoModel = mongoose.model<IPromo & Document>("Promo", schema);

export { PromoModel };
export type { IPromo };
