import { redirect } from '@sveltejs/kit';
import { getAuthorizationUri } from '$lib/server/vatsim-connect';
import type { PageServerLoad } from '../$types';
import { vatsimConnectStore } from '$lib/stores/auth';
import { get } from 'svelte/store';

export const load: PageServerLoad = () => {
	const { state } = get(vatsimConnectStore);
	if (!state) {
		throw redirect(304, '/login');
	}
	const authorizationUri = getAuthorizationUri(state);
	throw redirect(304, authorizationUri);
};
