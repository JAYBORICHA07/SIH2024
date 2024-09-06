import { inferRouterOutputs } from "@trpc/server";
import { protectedProcedure, router } from "./context.trpc";
import { authApi } from "./auth/auth-api";

export const trpcRouter = router({
  auth: authApi,
  currentUser: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.user;
    return user;
  }),
});

export type ApiRouter = typeof trpcRouter;
export type RouterOutputs = inferRouterOutputs<ApiRouter>;
