import { customize_pdf_controller } from "../controllers/customize_pdf.controller.js";

async function customize_pdf(fastify, options) {
  fastify.get("/customize_get_pdf", customize_pdf_controller.get_all_pdf);
}

export default customize_pdf;
