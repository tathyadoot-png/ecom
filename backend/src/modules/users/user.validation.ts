import { z } from "zod";

import { UserRole } from "../auth/auth.model";

export const updateUserRoleSchema = z.object({
  role: z.nativeEnum(UserRole),
});
