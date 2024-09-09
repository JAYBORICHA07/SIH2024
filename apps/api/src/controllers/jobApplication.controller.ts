import z from "zod";
import { protectedProcedure, router } from "../context.trpc";
import { db } from "../db/db.config";

export const JobApplicationByJobInput = z.object({
    jobId: z.string().trim(),
})

export const JobApplicationSingleInput = z.object({
    applicationId: z.string().trim()
})

export const jobApplicationController = router({
    getJobApplicationsForUser: protectedProcedure
        .query(async ({ input, ctx }) => {
            const jobApplications = await db.job_application
                .where({
                    alumniId: ctx.user?.user.id,
                })
                .select()
            return jobApplications;
        }),
    getJobApplicationForJob: protectedProcedure
        .input(JobApplicationByJobInput)
        .query(async ({ input, ctx }) => {
            const jobApplications = await db.job_application
                .where({
                    jobId: input.jobId
                })
            
            return jobApplications
        })
    ,
    getJobApplication: protectedProcedure
        .input(JobApplicationSingleInput)
        .query(async ({ input, ctx }) => {
            const jobApplication = await db.job_application
                .where({
                    applicationId: input.applicationId,
                })
            return jobApplication[0];
        }),
    createJobApplication: protectedProcedure
        .input(JobApplicationByJobInput)
        .query(async ({ input, ctx }) => {
            const jobApplication = await db.job_application
                .create({
                    alumniId: ctx.user?.user.id!,
                    jobId: input.jobId,
                    status: 'Submitted',
                    applicationDate: new Date(),
                }
            );
            return jobApplication;
        }),
    // updateJobApplication: protectedProcedure
    //     .input(JobApplicationSingleInput)
    //     .query(async ({ input, ctx }) => {
    //         const jobApplication = await db.job_application
    //             .where({
    //                 applicationId: input.applicationId,
    //             })
    //             .update({
    //                 status: 'VI4',
    //             }
    //         );
    //         return jobApplication;
    //     }),
    deleteJobApplication: protectedProcedure
        .input(JobApplicationSingleInput)
        .query(async ({ input, ctx }) => {
            const jobApplication = await db.job_application
                .where({
                    applicationId: input.applicationId,
                })
                .delete()
            return jobApplication;
        }),
})