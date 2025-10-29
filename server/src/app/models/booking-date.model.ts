import mongoose from "mongoose";

interface IBookingDate {
  slot: mongoose.Types.ObjectId;
  date: Date;
  totalBookings: number;
}

const schema = new mongoose.Schema<IBookingDate>(
  {
    slot: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Slot",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    totalBookings: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const BookingDateModel = mongoose.model<IBookingDate>("BookingDate", schema);

export { BookingDateModel };
export type { IBookingDate };
