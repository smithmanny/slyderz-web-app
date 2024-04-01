import type { RudderAnalytics } from "@rudderstack/analytics-js";
import { useEffect, useState } from "react";

export const useRudderStackAnalytics = (): RudderAnalytics | undefined => {
	const [analytics, setAnalytics] = useState<RudderAnalytics>();

	useEffect(() => {
		if (!analytics) {
			const initialize = async () => {
				const { RudderAnalytics } = await import("@rudderstack/analytics-js");
				const analyticsInstance = new RudderAnalytics();

				if (
					!process.env.NEXT_PUBLIC_RUDDERSHACK_WEB_WRITE_KEY ||
					!process.env.NEXT_PUBLIC_RUDDERSHACK_DATA_URL
				) {
					throw new Error("Missing keys");
				}

				analyticsInstance.load(
					process.env.NEXT_PUBLIC_RUDDERSHACK_WEB_WRITE_KEY,
					process.env.NEXT_PUBLIC_RUDDERSHACK_DATA_URL,
					{
						integrations: { All: true }, // load call options
					},
				);

				analyticsInstance.ready(() => {
					console.log("We are all set!!!");
				});

				setAnalytics(analyticsInstance);
			};

			initialize().catch((e) => console.log(e));
		}
	}, [analytics]);

	return analytics;
};
