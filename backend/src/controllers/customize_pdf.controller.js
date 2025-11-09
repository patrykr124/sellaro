import fs from "fs/promises";

const get_all_pdf = async (request, reply) => {
  try {
    const existingFiles = await fs.readdir("./src/uploads");
    return { existingFiles };
  } catch (error) {
    console.log(error);
    reply.status(500).send({ error: error.message });
  }
};

export const customize_pdf_controller = {
  get_all_pdf,
};
