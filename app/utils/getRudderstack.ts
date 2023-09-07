export const RudderStack = (function() {
  let instance;

  async function createInstance() {
    window.rudderanalytics = await import("rudder-sdk-js");

    window.rudderanalytics.load(process.env.NEXT_PUBLIC_POSTHOG_KEY, process.env.NEXT_PUBLIC_POSTHOG_HOST, {
      integrations: { All: true }, // load call options
    });

    window.rudderanalytics.ready(() => {
      console.log("RudderStack loaded...");
    });

    return window.rudderanalytics
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance()
      }

      return instance
    }
  }
})();