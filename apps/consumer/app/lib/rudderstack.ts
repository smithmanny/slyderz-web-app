export const RudderStack = (() => {
	let instance: any;

	async function createInstance() {
		window.rudderanalytics = await import("rudder-sdk-js");

		window.rudderanalytics.load(
			process.env.NEXT_PUBLIC_POSTHOG_KEY,
			process.env.NEXT_PUBLIC_POSTHOG_HOST,
			{
				integrations: { All: true }, // load call options
			},
		);

		window.rudderanalytics.ready(() => {
			console.log("RudderStack loaded...");
		});

		return window.rudderanalytics;
	}

	return {
		getInstance: () => {
			if (!instance) {
				instance = createInstance();
			}

			return instance;
		},
	};
})();
