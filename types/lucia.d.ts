
/// <reference types="lucia" />
declare namespace Lucia {
  type Auth = import("../app/lib/auth.js").Auth;
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
