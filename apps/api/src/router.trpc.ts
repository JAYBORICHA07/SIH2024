import { inferRouterOutputs } from "@trpc/server";
import { protectedProcedure, router } from "./context.trpc";
import { authApi } from "./auth/auth-api";
import { CloudinaryImageController } from "./controllers/cloudinaryImage.controller";
import { profileController } from "./controllers/profile.controller";
import { jobPostingController } from "./controllers/jobPosting.controller";

export const trpcRouter = router({
  auth: authApi,
  currentUser: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.user;
    return user?.user;
  }),
  addImage: CloudinaryImageController.uploadImage,
  profile: profileController,
  jobPosting: jobPostingController,
});

export type ApiRouter = typeof trpcRouter;
export type RouterOutputs = inferRouterOutputs<ApiRouter>;
