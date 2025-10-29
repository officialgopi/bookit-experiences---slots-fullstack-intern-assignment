import { api } from "@/utils";
import toast from "react-hot-toast";
import { create } from "zustand";

interface ISlot {
  bookingCount: {
    date: Date;
    remainingBookings: number;
  }[];
  slot: string;
  experience: string;
  capacity: number;
}

interface IExperience {
  _id: string;
  title: string;
  place: string;
  description: string;
  about: string;
  cost: number;
  totalSlots: number;
  slots?: ISlot[];
}

interface ExperiencesStore {
  isExperiencesLoading: boolean;
  isExperienceDetailsLoading: boolean;
  experiences: IExperience[];
  page: number;
  getExperiences: (page: number) => Promise<void>;
  getExperienceDetails: (id: string) => Promise<
    | (IExperience & {
        slots: ISlot[];
      })
    | undefined
  >;
}

export const useExperiencesStore = create<ExperiencesStore>((set, get) => ({
  isExperiencesLoading: false,
  isExperienceDetailsLoading: false,
  experiences: [],
  page: 0,
  getExperiences: async (page: number) => {
    set({
      isExperiencesLoading: true,
    });
    try {
      const res = await api.get(`/api/experiences?page=${page + 1}&limit=20`);
      if (res && res.data && res.data.data) {
        const { data } = res.data;
        set((state) => ({
          experiences: [...state.experiences, ...data.experiences],
          page,
          isExperiencesLoading: false,
        }));
      } else {
        toast.error("No more experiences found");
      }
    } catch (error) {
      toast.error("Something went wrong while fetching experiences");
    } finally {
      if (get().isExperiencesLoading)
        set({
          isExperiencesLoading: false,
        });
    }
  },

  getExperienceDetails: async (id: string) => {
    set({
      isExperienceDetailsLoading: true,
    });

    const experienceExists = get().experiences.find((exp) => exp._id === id);
    if (experienceExists) {
      if (experienceExists.slots) {
        return experienceExists;
      }
    }

    try {
      const res = await api.get(`/api/experiences/${id}`);
      if (res && res.data && res.data.data) {
        const { data } = res.data;
        set((state) => ({
          experiences: [
            ...state.experiences.map((exp) =>
              exp._id === id ? data.experience : exp
            ),
          ],
          isExperienceDetailsLoading: false,
        }));

        return data.experience;
      } else {
        toast.error("Experience details not found");
      }
    } catch (error) {
      toast.error("Something went wrong while fetching experience details");
    } finally {
      if (get().isExperienceDetailsLoading)
        set({
          isExperienceDetailsLoading: false,
        });
    }
  },

  searchExperiences: async (search: string, page: string) => {
    set({
      isExperiencesLoading: true,
    });
    try {
      const res = await api.get(
        `/api/experiences?search=${search}&page=${page}&limit=20`
      );
      if (res && res.data && res.data.data) {
        const { data } = res.data;
        return data.experiences;
      } else {
        toast.error("No more experiences found");
      }
    } catch (error) {
      toast.error("Something went wrong while searching experiences");
    } finally {
      if (get().isExperiencesLoading)
        set({
          isExperiencesLoading: false,
        });
    }
  },
}));
