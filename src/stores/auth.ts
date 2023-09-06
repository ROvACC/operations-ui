import { writable } from 'svelte/store';
import type { User } from '@rovacc/vatsim-types';

const createAuthStore = () => {
	const { subscribe, set, update } = writable({});

	return {
		subscribe,
		set,
		login: (user: User) => set({ user }),
		logout: () => set({})
	};
};

export const auth = createAuthStore();
