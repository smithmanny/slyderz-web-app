
/// <reference types="lucia" />
declare namespace Lucia {
  type Auth = import("../integrations/auth/lucia.js").Auth;
  type DatabaseSessionAttributes = {
		stripeCustomerId: string;
    emailVerified: boolean
    email: string
    name: string
    role: string
	};
  type DatabaseUserAttributes = {
    stripeCustomerId: string;
    email: string;
    emailVerified: boolean;
    name: string;
    role: string;
  };
  type DatabaseSessionAttributes = object;
}
