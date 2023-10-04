import { env } from '$env/dynamic/private';

import type { VatsimConnectUserResponse } from '@rovacc/vatsim-types';

const host = 'https://auth.vatsim.net';
const scope = 'full_name email vatsim_details country';
const redirectUri = 'https://rovacc-operations.rovacc.ro/login/callback';

export const getAccessToken = async (code: string) => {
	const response = await fetch(`${host}/oauth/token`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: new URLSearchParams({
			client_id: env.VATSIM_CONNECT_CLIENT_ID,
			client_secret: env.VATSIM_CONNECT_CLIENT_SECRET,
			redirect_uri: redirectUri,
			code,
			grant_type: 'authorization_code'
		})
	});

	const data = await response.json();

	if (data.access_token) {
		console.log('Access Token:', data.access_token);
	} else {
		console.error('Error obtaining access token:', data);
	}

	return data.access_token;
};

export const getAuthorizationUri = (state: string): string => {
	const queryParams = new URLSearchParams({
		client_id: env.VATSIM_CONNECT_CLIENT_ID,
		redirect_uri: redirectUri,
		response_type: 'code',
		scope: scope,
		state
	});

	return `${host}/oauth/authorize?${queryParams.toString()}`;
};

export const getVatsimUser = async (token: string): Promise<VatsimConnectUserResponse> => {
	const response = await fetch(`${host}/api/user`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${token}`
		}
	});
	const data = (await response.json()) as VatsimConnectUserResponse;
	return data;
};
