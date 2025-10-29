import mongoose, { Document } from "mongoose";

const SLOTS = {
  EARLY_MORNING: "EARLY_MORNING",
  MORNING: "MORNING",
  LATE_MORNING: "LATE_MORNING",
  NOON: "NOON",
  AFTERNOON: "AFTERNOON",
  EVENING: "EVENING",
  NIGHT: "NIGHT",
  MIDNIGHT: "MIDNIGHT",
  DAWN: "DAWN",
};

const SLOTS_ENUM = Object.values(SLOTS);

interface ISlot {
  slot: (typeof SLOTS)[keyof typeof SLOTS];
  experience: mongoose.Types.ObjectId;
  capacity: number;
}

const schema = new mongoose.Schema<ISlot & Document>({
  slot: {
    type: String,
    enum: SLOTS_ENUM,
    required: true,
  },
  experience: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
});

const SlotModel = mongoose.model<ISlot & Document>("Slot", schema);

export { SlotModel };
export type { ISlot };
export { SLOTS, SLOTS_ENUM };
