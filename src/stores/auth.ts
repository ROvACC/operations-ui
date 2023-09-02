import { writable } from 'svelte/store';

const createAuthStore = () => {
	const { subscribe, set, update } = writable({});

	return {
		subscribe,
		set,
		login: (user) => set({ user }),
		logout: () => set({})
	};
};

export const auth = createAuthStore();
