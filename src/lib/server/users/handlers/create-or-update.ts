import type { VatsimConnectUserResponse } from '@rovacc/vatsim-types';
import { getDababase } from '$lib/server/firestore';
import { USER_COLLECTION } from '../config';

export const createOrUpdateUser = async (vatsimUser: VatsimConnectUserResponse) => {
	const userCollection = getDababase().collection(USER_COLLECTION);

	const existingUser = await userCollection.where('cid', '==', vatsimUser.data.cid).get();
	if (existingUser.empty) {
		const user = await userCollection.add(vatsimUser.data);
		console.log(user);
		return user;
	}

	return existingUser.docs[0];
};
