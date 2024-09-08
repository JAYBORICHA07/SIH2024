import { protectedProcedure, router } from "../context.trpc";
import { db } from "../db/db.config";

export const jobController = router({
  getAllJobs: protectedProcedure.query(async () => {
    const jobs = await db.job_postings.selectAll();
    return jobs;
  }),
});
