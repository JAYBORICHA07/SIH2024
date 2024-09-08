import z from "zod";
import { protectedProcedure, router } from "../context.trpc";
import { db } from "../db/db.config";

export const ProfileInput = z.object({
    email: z.string().trim().email(),
    name: z.string().trim().optional(),
    department: z.string().trim().optional(),
    linkedinProfile: z.string().trim().optional(),
    graduationYear: z.number().optional(),
    currentLocation: z.string().trim().optional(),
    mobileNumber: z.string().trim().optional(),
    profilePicture: z.string().optional(),
    currCompany: z.string().trim().optional(),
    currRole: z.string().trim().optional(),
    collegeId: z.string().trim().optional(),
});

export const profileController = router({
    updateProfile: protectedProcedure
        .input(ProfileInput)
        .query(async ({ input, ctx }) => {
            const profile = await db.user
                .where({
                    id: ctx.user?.user.id,
                })
                .update({
                    email: input.email,
                    name: input.name,
                    department: input.department,
                    linkedinProfile: input.linkedinProfile,
                    graduationYear: input.graduationYear,
                    currentLocation: input.currentLocation,
                    mobileNumber: input.mobileNumber,
                    profilePicture: input.profilePicture,
                    currCompany: input.currCompany,
                    currRole: input.currRole,
                    collegeId: input.collegeId,
                }
            );
            return profile;
        }),
    getProfile: protectedProcedure
        .query(async ({ input, ctx }) => {
            const profile = await db.user
                .where({
                    id: ctx.user?.user.id,
                })
            return profile[0];
        }),
    
    demo: protectedProcedure
        .query(async ({ input, ctx }) => {
            const event = await db.events.all();
            return event;
        })
})