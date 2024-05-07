import { dev } from '$app/environment';

// we don't want the app breaking if something goes wrong with this
export const trackEvent = (type: any, event: string, data: object) => {
	try {
		if (dev) {
			console.log('trackingEvent ~>', type, event, data);
			return;
		}

		if (typeof gtag !== 'undefined') {
			gtag(type, event, data);
		}
	} catch (err) {
		console.error(err);
	}
};
