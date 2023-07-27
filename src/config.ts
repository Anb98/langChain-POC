import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT;
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
export const TEMPLATE = process.env.TEMPLATE;
export const SENSITIVE_FIELDS = (process.env.SENSITIVE_FIELDS || "").split(",");
