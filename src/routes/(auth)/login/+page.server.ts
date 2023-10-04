import { v4 as uuidv4 } from 'uuid';
import { env } from '$env/dynamic/private';
import type { PageServerLoad } from './$types';
import { vatsimConnectStore } from '$lib/stores/auth';

export const load: PageServerLoad = () => {
	vatsimConnectStore.set({ state: uuidv4() });
	return { host: env.VATSIM_CONNECT_HOST };
};
