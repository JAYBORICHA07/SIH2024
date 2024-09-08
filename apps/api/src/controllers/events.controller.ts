import { protectedProcedure, router } from "../context.trpc";
import z from "zod";
import { db } from "../db/db.config";

const eventCreateSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  date: z.string().min(1),
  location: z.string().min(1),
  capacity: z.string().min(1),
  time: z.string().min(1),
  type: z.string().min(1),
});

export const eventController = router({
  createEvent: protectedProcedure
    .input(eventCreateSchema)
    .mutation(async ({ input, ctx }) => {
      console.info(input);
      console.info(ctx.user?.user.id);
      console.info("hiiii");
      const createdEvent = await db.events
        .insert({
          event_name: input.title,
          description: input.description,
          event_date: input.date,
          location: input.location,
          organizer_id: ctx.user?.user.id,
          capacity: input.capacity,
          event_time: input.time,
          event_type: input.type,
        })
        .select("event_id");

      console.info(createdEvent);

      return createdEvent;
    }),
});
