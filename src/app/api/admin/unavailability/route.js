import connectToDatabase from "@/lib/mongodb";
import IrinaUnavailability from "@/models/IrinaUnavailability";
import { adminAuth } from "@/lib/adminAuth";
import { checkUnavailabilityConflicts } from "@/lib/conflictCheck";

export async function GET(request) {
  try {
    const auth = adminAuth(request);
    if (!auth.success) {
      return Response.json(
        { success: false, error: auth.error },
        { status: 401 }
      );
    }

    await connectToDatabase();

    // Auto-delete past records
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    await IrinaUnavailability.deleteMany({ date: { $lt: today } });

    const unavailabilities = await IrinaUnavailability.find({}).sort({
      date: 1,
      startTime: 1,
    });

    return Response.json({ success: true, data: unavailabilities });
  } catch (error) {
    console.error("Error fetching unavailabilities:", error);
    return Response.json(
      { success: false, error: "Failed to fetch unavailabilities" },
      { status: 500 }
    );
  }
}

const BUSINESS_HOURS = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

export async function POST(request) {
  let session = null;
  try {
    const auth = adminAuth(request);
    if (!auth.success) {
      return Response.json(
        { success: false, error: auth.error },
        { status: 401 }
      );
    }

    const mongoose = await connectToDatabase();

    // Auto-delete past records first (independent of transaction)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    await IrinaUnavailability.deleteMany({ date: { $lt: today } });

    const body = await request.json();
    const { date, slots, isFullDay, reason } = body;

    // Validate
    if (!date) {
      return Response.json(
        { success: false, error: "Date is required" },
        { status: 400 }
      );
    }

    // Determine target slots
    let targetSlots = [];
    if (isFullDay) {
      targetSlots = BUSINESS_HOURS;
    } else if (slots && Array.isArray(slots) && slots.length > 0) {
      targetSlots = slots;
    } else {
      return Response.json(
        {
          success: false,
          error: "Select 'Full Day' or at least one time slot",
        },
        { status: 400 }
      );
    }

    // Prepare records
    const recordsToCreate = targetSlots.map((time) => ({
      date,
      startTime: time,
      endTime: time.replace(/^\d{2}/, (match) => {
        const hour = parseInt(match) + 1;
        return hour.toString().padStart(2, "0");
      }),
      reason:
        reason ||
        (isFullDay ? "Full Day Unavailability" : "Doctor Appointment/Other"),
    }));

    // Start Transaction
    session = await mongoose.startSession();
    session.startTransaction();

    // 1. Delete existing unavailability for these specific slots on this date
    // logic: We delete ANY overlap to enable "re-booking" or "updating" smoothly
    // For Full Day, we wipe the day. For slots, we wipe those slots.

    const targetDate = new Date(date);
    const nextDay = new Date(targetDate);
    nextDay.setDate(nextDay.getDate() + 1);

    if (isFullDay) {
      // Delete all for the day
      await IrinaUnavailability.deleteMany({
        date: {
          $gte: targetDate,
          $lt: nextDay,
        },
      }).session(session);
    } else {
      // Delete only the specific slots to be overwritten
      await IrinaUnavailability.deleteMany({
        date: {
          $gte: targetDate,
          $lt: nextDay,
        },
        startTime: { $in: targetSlots },
      }).session(session);
    }

    // 2. Insert new records
    await IrinaUnavailability.insertMany(recordsToCreate, { session });

    await session.commitTransaction();

    return Response.json(
      { success: true, data: recordsToCreate },
      { status: 201 }
    );
  } catch (error) {
    if (session) {
      await session.abortTransaction();
    }
    console.error("Error creating unavailability:", error);
    return Response.json(
      { success: false, error: "Failed to create unavailability" },
      { status: 500 }
    );
  } finally {
    if (session) {
      session.endSession();
    }
  }
}
