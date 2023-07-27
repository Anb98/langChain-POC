import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT;
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
export const TEMPLATE = process.env.TEMPLATE;
