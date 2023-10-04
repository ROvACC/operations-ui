import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const requestedPath = event.url.pathname;
	console.log({ requestedPath });
	if (requestedPath.startsWith('/login')) {
		return await resolve(event);
	}

	const cookies = event.cookies;
	const authCookie = cookies.get('auth');

	if (!authCookie) {
		throw redirect(301, '/login');
	}

	const response = await resolve(event);

	return response;
};
