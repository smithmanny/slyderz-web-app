export {};

declare global {
	interface Window {
		rudderanalytics: any;
		posthog: any;
	}
}
