/// <reference types="lucia" />
declare namespace Lucia {
  type Auth = import("../integrations/auth/lucia.js").Auth;
  type DatabaseUserAttributes = {
    stripeCustomerId: string;
    email: string;
    emailVerified: boolean;
    name: string;
    role: string;
  };
  type DatabaseSessionAttributes = object;
}
