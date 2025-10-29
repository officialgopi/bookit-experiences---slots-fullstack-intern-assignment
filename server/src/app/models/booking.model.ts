import mongoose, { Document } from "mongoose";

interface IBooking {
  name: string;
  email: string;
  experience: mongoose.Types.ObjectId;
  slot: mongoose.Types.ObjectId;
  bookingDate: mongoose.Types.ObjectId;
  appliedPromo?: mongoose.Types.ObjectId;
  quantity: number;
  totalPrice: number;
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
    required: true,
  },
  bookingDate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BookingDate",
    default: new Date(),
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 0,
  },
});

const BookingModel = mongoose.model<IBooking & Document>("Booking", schema);

export { BookingModel };
export type { IBooking };
