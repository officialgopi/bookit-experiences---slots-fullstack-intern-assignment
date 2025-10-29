import mongoose, { Document } from "mongoose";

interface IBooking {
  name: string;
  email: string;
  experience: mongoose.Types.ObjectId;
  slot: mongoose.Types.ObjectId;
  date: Date;
  appliedPromo?: mongoose.Types.ObjectId;
}

const schema = new mongoose.Schema<IBooking & Document>({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  experience: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Experience",
    required: true,
  },

  appliedPromo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Promo",
  },
  slot: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Slot",
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

const BookingModel = mongoose.model<IBooking & Document>("Booking", schema);

export { BookingModel };
export type { IBooking };
