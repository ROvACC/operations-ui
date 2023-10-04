import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getVatsimUser } from '$lib/server/vatsim-connect';
import { createOrUpdateUser } from '$lib/server/users';

export const load: PageServerLoad = async ({ url }) => {
	try {
		const token = url.searchParams.get('token');
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const vatsimUser = await getVatsimUser(token!);

		const rovaccUser = await createOrUpdateUser(vatsimUser);
	} catch (ex) {
		console.log(ex.message, ex);
		throw redirect(304, '/login');
	}
};
