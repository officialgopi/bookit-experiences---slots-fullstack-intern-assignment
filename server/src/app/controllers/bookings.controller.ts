import mongoose from "mongoose";
import {
  BookingModel,
  ExperienceModel,
  PromoModel,
  SlotModel,
} from "../models";
import { BookingDateModel } from "../models/booking-date.model";
import { acceptBookingSchema } from "../schemas/bookings.schema";
import { AsyncHandler, ApiResponse, ApiError, formatDate } from "../utils";

const acceptBooking = AsyncHandler(async (req, res) => {
  const { data, success } = acceptBookingSchema.safeParse({
    body: req.body,
  });

  if (!success) {
    throw new ApiError(400, "Invalid request data");
  }

  const { name, email, date, quantity, appliedPromo, experience, slot } =
    data.body;

  const experienceData = await ExperienceModel.findById(experience).lean();

  if (!experienceData) {
    throw new ApiError(404, "Experience not found");
  }

  const slotData = await SlotModel.findById(slot).lean();

  if (!slotData) {
    throw new ApiError(404, "Slot not found");
  }

  let bookingDateId = await BookingDateModel.findOne({
    date: formatDate(date),
    slot: slot,
    experience: experience,
  }).lean();

  if (!bookingDateId) {
    const newBookingDate = new BookingDateModel({
      date: formatDate(date),
      slot: slot,
      experience: experience,
    });
    const savedBookingDate = await newBookingDate.save();
    bookingDateId = savedBookingDate;
  }

  const isBookingExists = await BookingModel.findOne({
    email: email,
    experience: experience,
    slot: slot,
    bookingDate: bookingDateId._id,
  }).lean();

  if (isBookingExists) {
    throw new ApiError(400, "Booking already exists");
  }

  const newBooking = new BookingModel({
    name,
    email,
    bookingDate: bookingDateId._id,
    quantity,
    totalPrice: experienceData.cost * quantity,
  });
  if (appliedPromo) {
    const promoData = await PromoModel.findOne({
      promoCode: appliedPromo,
      isActive: true,
      linkedExperiences: {
        $or: [
          {
            $size: 0,
          },
          {
            $in: [experience],
          },
        ],
      },
    }).lean();

    if (promoData) {
      newBooking.appliedPromo = promoData._id as mongoose.Types.ObjectId;
      newBooking.totalPrice =
        newBooking.totalPrice -
        (newBooking.totalPrice * promoData.discountInPercentage) / 100;
    }
  }

  await newBooking.save();

  new ApiResponse(
    201,
    {
      bookingId: newBooking._id,
    },
    "Booking accepted successfully"
  ).send(res);
});

export { acceptBooking };
