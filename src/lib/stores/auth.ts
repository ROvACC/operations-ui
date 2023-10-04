import { persisted } from 'svelte-local-storage-store';

import type { VatsimUser } from '@rovacc/vatsim-types';

const AUTH_STORE = 'auth';
const VATSIM_CONNECT_STORE = 'vatsim_connect';

export const auth = persisted<VatsimUser | null>(AUTH_STORE, null);
export const vatsimConnectStore = persisted(VATSIM_CONNECT_STORE, { state: '' });
