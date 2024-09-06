import { FastifyPluginAsync } from "fastify";
import { fastifyPlugin } from "fastify-plugin";
// import { upsertUser } from "../services/user.service";
import { db } from "../db/db.config";
import { env } from "../configs/env.config";

interface LoginFormType {
  email: string;
  userName: string;
  password: string;
  role: string;
}
export const Auth: FastifyPluginAsync = fastifyPlugin(async (fastify) => {
  fastify.post("/auth/login", async function (request, reply) {
    try {
      const { email, userName, password, role } = request.body as LoginFormType;

      const user = await db.user
        .create({
          email: email,
          name: userName,
          password: password,
          role: role,
        })
        .select("id", "name", "email", "role");

      console.info(user);

      const jwtToken = fastify.jwt.sign({ user });
      reply.setCookie("session", jwtToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
        domain: new URL(env.FRONTEND_URL as string).hostname,
      });

      reply.code(200).send({
        success: true,
        redirectUrl: `${env.FRONTEND_URL}/auth/login`,
      });
    } catch (error) {
      reply.send(error);
    }
  });
});
