import z from "zod";
import { protectedProcedure, router } from "../context.trpc";
import { db } from "../db/db.config";

export const NetworkingHubSingleInput = z.object({
    alumniId1: z.string().trim(),
    alumniId2: z.string().trim(),
});

export const NetworkingHubForAlumniInput = z.object({
    alumniId: z.string().trim(),
})

export const networkingHubController = router({
    // getNetworkingHubs: protectedProcedure
    //     .query(async ({ input, ctx }) => {
    //         const networkingHubs = await db.networking_hub
    //             .select()
    //         return networkingHubs;
    //     }),
    getNetworkingHub: protectedProcedure
        .input(NetworkingHubSingleInput)
        .query(async ({ input, ctx }) => {
            const networkingHub = await db.networking_hub
                .where({
                    hubId: input.hubId,
                })
            return networkingHub[0];
        }),
    createNetworkingHub: protectedProcedure
        .input(NetworkingHubInput)
        .query(async ({ input, ctx }) => {
            const networkingHub = await db.networking_hub
                .create({
                    hubName: input.hubName,
                    hubDescription: input.hubDescription,
                    hubType: input.hubType,
                    createdBy: ctx.user?.user.id!,
                    members: [],
                });
            return networkingHub;
        }),
    updateNetworkingHub: protectedProcedure
        .input(NetworkingHubUpdateInput)
        .query(async ({ input, ctx }) => {
            const networkingHub = await db.networking_hub
                .where({
                    hubId: input.hubId,
                })
                .update({
                    hubName: input.hubName,
                    hubDescription: input.hubDescription,
                    hubType: input.hubType,
                    createdBy: ctx.user?.user.id!,
                    members: input.members,
                });
            return networkingHub;
        }),
    deleteNetworkingHub: protectedProcedure
        .input(NetworkingHubSingleInput)
        .query(async ({ input, ctx }) => {
            const networkingHub = await db.networking_hub
                .where({
                    hubId: input.hubId,
                })
                .delete();
            return networkingHub;
        }),
})