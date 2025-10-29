import { api } from "@/utils";
import toast from "react-hot-toast";
import { create } from "zustand";

interface IPromo {
  promoCode: string;
  discountInPercentage: number;
  isActive: boolean;
}

interface PromoState {
  validationLoading: boolean;
  validatePromoCode: (
    experience: string,
    promoCode: string
  ) => Promise<IPromo | undefined>;
}

export const usePromoStore = create<PromoState>((set) => ({
  validationLoading: false,
  validatePromoCode: async (experience: string, promoCode: string) => {
    set({ validationLoading: true });
    try {
      const res = await api.post("/promo/validate", { promoCode, experience });
      if (res && res.data && res.data.data) {
        const { data } = res.data;
        return data.promo;
      } else {
        toast.error("Invalid promo code");
      }
    } catch (error) {
      toast.error("Something went wrong while validating promo code");
    } finally {
      set({ validationLoading: false });
    }
  },
}));
