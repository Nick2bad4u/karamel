export interface FetchRequest {
	method: 'GET' | 'POST';
	url: string;
}

export interface FetchResponse {
	error?: string;
	data?: any;
}

const BASE_URL = 'https://www.reddit.com';

chrome.runtime.onMessage.addListener(
	(
		request: FetchRequest,
		_: any,
		sendResponse: (response: FetchResponse) => void,
	) => {
		(async () => {
			try {
				const res = await fetch(BASE_URL + request.url, {
					credentials: 'include',
					method: request.method,
				});
				let response: FetchResponse = {};
				if (res.ok) {
					try {
						const contentType = res.headers.get('Content-Type');
						if (contentType && contentType.includes('application/json')) {
							response = { data: await res.json() };
						} else {
							response = { error: `Invalid content type: ${contentType}` };
						}
					} catch (jsonError) {
						console.error('JSON parse error:', jsonError);
						response = { error: 'Failed to parse JSON response' };
					}
				} else {
					switch (res.status) {
						case 400:
							response = { error: 'Bad Request' };
							break;
						case 401:
							response = { error: 'Unauthorized' };
							break;
						case 403:
							response = { error: 'Forbidden' };
							break;
						case 404:
							response = { error: 'Not Found' };
							break;
						case 500:
							response = { error: 'Internal Server Error' };
							break;
						default:
							response = { error: `Error ${res.status}: ${await res.text()}` };
					}
				}
				sendResponse(response);
			} catch (error) {
				console.error('Fetch error:', error);
				const errorMessage =
					error instanceof Error ? error.message : 'An unknown error occurred';
				sendResponse({ error: errorMessage });
			}
		})();
		return true;
	},
);

// Open the options page when the extension's action button is clicked
chrome.action.onClicked.addListener(() => chrome.runtime.openOptionsPage());
