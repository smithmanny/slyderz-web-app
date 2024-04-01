"use server";

import { default as ServerRudderAnalytics } from "@rudderstack/rudder-sdk-node";

export const rudderstackServer = new ServerRudderAnalytics(
	process.env.RUDDERSHACK_SERVER_WRITE_KEY || "",
	{
		dataPlaneUrl: "https://slyderzcotqlbk.dataplane.rudderstack.com",
	},
);
