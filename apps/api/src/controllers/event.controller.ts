import z from "zod";
import { protectedProcedure, publicProcedure, router } from "../context.trpc";
import { db } from "../db/db.config";

const eventCreationInput = z.object({
  title: z.string().trim(),
  date: z.string().trim(),
  time: z.string().trim(),
  location: z.string().trim(),
  type: z.string().trim(),
  description: z.string().trim(),
  capacity: z.string().trim(),
});

export const eventController = router({
  createEvent: protectedProcedure
    .input(eventCreationInput)
    .query(async ({ input, ctx }) => {
      console.info(input);
      console.info(ctx.user?.user.id);

      const event = await db.events.create({
        capacity: input.capacity,
        eventDate: input.date,
        eventTitle: input.title,
        organizerId: ctx.user?.user.id,
        description: input.description,
        eventTime: input.time,
        eventType: input.type,
        location: input.location,
      });
      console.info(event);
      return event;
    }),

  getEventById: publicProcedure.input(z.string()).query(async ({ input }) => {
    console.info(input);
    const event = await db.events.findBy({ eventId: input });
    console.info(event);
    return event;
  }),
});
