import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { env } from '$env/dynamic/private';

const serviceAccount = Buffer.from(env.FIREBASE_SERVICE_ACCOUNT_CERTIFICATE, 'base64').toString();

initializeApp({
	credential: cert(JSON.parse(serviceAccount))
});

const db = getFirestore();

export const getDababase = () => {
	return db;
};
