import { ExperienceModel, SlotModel } from "../models";
import { BookingDateModel } from "../models/booking-date.model";
import {
  getExperienceByIdSchema,
  getExperiencesSchema,
} from "../schemas/experiences.schema";
import { ApiError, ApiResponse, AsyncHandler } from "../utils";

const getExperiences = AsyncHandler(async (req, res) => {
  const { data, success } = getExperiencesSchema.safeParse({
    query: req.query,
  });

  if (!success) {
    throw new ApiError(400, "Invalid query parameters");
  }

  const { page, limit } = data.query;

  const experiences = await ExperienceModel.find()
    .skip((page - 1) * limit)
    .limit(limit);

  new ApiResponse(
    200,
    {
      experiences,
    },
    "Experiences fetched successfully"
  ).send(res);
});

const getExperienceById = AsyncHandler(async (req, res) => {
  const { data, success } = getExperienceByIdSchema.safeParse({
    params: req.params,
  });

  if (!success) {
    throw new ApiError(400, "Invalid parameters");
  }

  const experience = await ExperienceModel.findById(data.params.id).lean();

  if (!experience) {
    throw new ApiError(404, "Experience not found");
  }

  const slots = await SlotModel.find({
    experience: experience._id,
  }).lean();

  const detailedSlotsPromise = slots.map(async (slot) => {
    const { _id, capacity } = slot;
    const bookingCount = await BookingDateModel.aggregate([
      {
        $match: {
          slot: _id,
          date: {
            $gt: new Date(),
          },
        },
      },
      {
        $group: {
          _id: "$date",
          count: { $sum: 1 },
        },
      },
    ]);

    bookingCount.sort((a, b) => a._id.getTime() - b._id.getTime());

    const formattedBookingCount = bookingCount.map(({ _id, count }) => {
      return {
        date: _id,
        remainingBookings: capacity - count,
      };
    });

    return {
      ...slot,
      bookingCount: formattedBookingCount,
    };
  });

  const detailedSlots = await Promise.all(detailedSlotsPromise);

  new ApiResponse(
    200,
    {
      experience: {
        ...experience,
        slots: detailedSlots,
      },
    },
    "Experience fetched successfully"
  ).send(res);
});

export { getExperiences, getExperienceById };
