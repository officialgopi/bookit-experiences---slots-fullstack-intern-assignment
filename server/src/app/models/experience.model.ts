import mongoose, { Document } from "mongoose";

interface IExperience {
  title: string;
  place: string;
  description: string;
  about: string;
  cost: number;
  totalSlots: number;
}

const schema = new mongoose.Schema<IExperience & Document>(
  {
    title: {
      type: String,
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    totalSlots: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ExperienceModel = mongoose.model<IExperience & Document>(
  "Experience",
  schema
);

export { ExperienceModel };
export type { IExperience };
