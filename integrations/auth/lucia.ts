import lucia from "lucia-auth";
import { nextjs } from "lucia-auth/middleware";
import prisma from "@lucia-auth/adapter-prisma";
import "lucia-auth/polyfill/node";

import prismaClient from "db";

export const auth = lucia({
	adapter: prisma(prismaClient),
	env: "DEV", // "PROD" if prod
	middleware: nextjs(),
	transformDatabaseUser: (userData) => {
		return {
			userId: userData.id,
			stripeCustomerId: userData.stripeCustomerId
		};
	}
});

export type Auth = typeof auth;