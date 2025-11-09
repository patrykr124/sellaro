import { message_controller } from "../controllers/message.controller.js";

async function message_routes(fastify, options) {
  fastify.post("/createmessage", message_controller.createMessage);
  // fastify.get("/allmessages", message_controller.getMessage);
  fastify.post("/load_files", message_controller.load_files);
}

export default message_routes;
