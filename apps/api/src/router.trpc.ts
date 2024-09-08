import { inferRouterOutputs } from "@trpc/server";
import { protectedProcedure, router } from "./context.trpc";
import { authApi } from "./auth/auth-api";
import { CloudinaryImageController } from "./controllers/cloudinaryImage.controller";
import { profileController } from "./controllers/profile.controller";
import { eventController } from "./controllers/event.controller";
import { jobController } from "./controllers/job.controller";

export const trpcRouter = router({
  auth: authApi,
  currentUser: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.user;
    return user?.user;
  }),
  addImage: CloudinaryImageController.uploadImage,
  profileUpdate: profileController.updateProfile,
  getProfile: profileController.getProfile,
  getAllProfiles: profileController.getAllProfiles,
  createEvent: eventController.createEvent,
  getEventById: eventController.getEventById,
  getAllJobs: jobController.getAllJobs,
});

export type ApiRouter = typeof trpcRouter;
export type RouterOutputs = inferRouterOutputs<ApiRouter>;
