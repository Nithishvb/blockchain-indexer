import { z } from "zod";

export const formSchema = z.object({
  host: z
    .string()
    .url({ message: "Please enter a valid URL" })
    .startsWith("https://", { message: "Host must start with https://" }),
  port: z
    .string()
    .refine((val) => !isNaN(Number(val)), { message: "Port must be a number" })
    .refine((val) => Number(val) >= 0 && Number(val) <= 65535, {
      message: "Port must be between 0 and 65535",
    }),
  dbName: z.string().min(1, { message: "Database name is required" }),
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});
