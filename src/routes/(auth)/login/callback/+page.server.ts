import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getAccessToken, getVatsimUser } from '$lib/server/vatsim-connect';
import { get } from 'svelte/store';
import { vatsimConnectStore } from '$lib/stores/auth';
import { createOrUpdateUser } from '$lib/server/users';

export const load: PageServerLoad = async ({ url }) => {
	const { state: localState } = get(vatsimConnectStore);
	if (!localState) {
		throw redirect(304, '/login');
	}

	const code = url.searchParams.get('code');
	const state = url.searchParams.get('state');

	if (!code || state !== localState) {
		throw redirect(304, '/login');
	}
	try {
		const token = await getAccessToken(code);
		const vatsimUser = await getVatsimUser(token);

		const rovaccUser = await createOrUpdateUser(vatsimUser);
	} catch (ex) {
		console.log(ex.message, ex);
		throw redirect(304, '/login');
	}
};
