import type { Chef } from "@prisma/client";
/// <reference types="lucia-auth" />
declare namespace Lucia {
  type Auth = import("../integrations/auth/lucia.js").Auth;
  type UserAttributes = {
    stripeCustomerId: string;
    email: string;
    name: string;
  };
}
