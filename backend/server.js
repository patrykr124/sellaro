import Fastify from "fastify";
import "dotenv/config";
import message_routes from "./src/routes/message.routes.js";
import db from "./src/db/config.js";
import cors from "@fastify/cors";
import fastifyMultipart from "@fastify/multipart";
import customize_pdf from "./src/routes/customize_pdf.routes.js";
import fastifyStatic from "@fastify/static";
import path from "path";

const fastify = Fastify({
  logger: true,
});

await fastify.register(cors, {
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
});

fastify.decorate("db", db);
fastify.register(fastifyMultipart);
fastify.register(message_routes);
fastify.register(customize_pdf);

fastify.register(fastifyStatic, {
  root: path.join(process.cwd(), "src", "products"),
  prefix: "/api/products/",
});

const start = async () => {
  try {
    fastify.listen({ port: 5000, host: "0.0.0.0" }, function (err, address) {
      if (err) {
        fastify.log.error(err);
        process.exit(1);
      }
      fastify.log.info(`server listening on ${address}`);
    });
    console.log("Server run!");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
