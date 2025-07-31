import dotenv from "dotenv";
const envPath = process.env.NODE_ENV === "production" ? ".env.prod" : ".env.dev";

dotenv.config({ path: envPath });
export const NODE_ENV = process.env.NODE_ENV;