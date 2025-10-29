import { api } from "@/utils";
import toast from "react-hot-toast";
import { create } from "zustand";

interface BookingState {
  isBooking: boolean;
  name?: string;
  email?: string;
  date?: Date;
  appliedPromo?: string;
  experience?: string;
  slot?: string;
  quantity?: number;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setDate: (date: Date) => void;
  setAppliedPromo: (appliedPromo: string) => void;
  setExperience: (experience: string) => void;
  setSlot: (slot: string) => void;
  setQuantity: (quantity: number) => void;
  reset: () => void;

  acceptBooking: () => Promise<void>;
}

export const useBookingStore = create<BookingState>((set, get) => ({
  isBooking: false,
  name: undefined,
  email: undefined,
  date: undefined,
  appliedPromo: undefined,
  experience: undefined,
  slot: undefined,
  quantity: undefined,
  setName: (name) => set({ name }),
  setEmail: (email) => set({ email }),
  setDate: (date) => set({ date }),
  setAppliedPromo: (appliedPromo) => set({ appliedPromo }),
  setExperience: (experience) => set({ experience }),
  setSlot: (slot) => set({ slot }),
  setQuantity: (quantity) => set({ quantity }),
  reset: () =>
    set({
      isBooking: false,
      name: undefined,
      email: undefined,
      date: undefined,
      appliedPromo: undefined,
      experience: undefined,
      slot: undefined,
      quantity: undefined,
    }),
  acceptBooking: async () => {
    set({ isBooking: true });

    const { name, email, date, appliedPromo, experience, slot, quantity } =
      get();

    try {
      const res = await api.post("/bookings", {
        name,
        email,
        date: new Date(new Date(date!).toISOString().split("T")[0]),
        appliedPromo,
        experience,
        slot,
        quantity,
      });
      if (res && res.data && res.data.data) {
        get().reset();
        toast.success("Booking successful");
      } else {
        toast.error("Booking failed");
      }
    } catch (error) {
      toast.error("Something went wrong while booking");
    } finally {
      if (get().isBooking) set({ isBooking: false });
    }
  },
}));
