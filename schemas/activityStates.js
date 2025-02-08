import { z } from "zod";

export const activityQuerySchema = z.object({
  state: z.enum(["all", "pending", "progress", "completed"], {
      message: "Estado no válido. Opciones: all, pending, progress, completed",
    })
    .optional(),
});