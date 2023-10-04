import jwt from 'jsonwebtoken';
import { env } from '$env/dynamic/private';
import { DAYS_IN_SECONDS } from '../config';

interface JwtPayload {
	sub: string; // Subject - typically the user ID
	iat: number; // Issued At - timestamp of token issuing
	exp: number; // Expiration Time - timestamp of token expiration
	aud?: string; // Audience - intended recipients
	iss?: string; // Issuer - who issued the token
	nbf?: number; // Not Before - timestamp before which the token must not be accepted
	jti?: string; // JWT ID - unique identifier for the token
	[key: string]: unknown; // Other custom claims
}

const secret = env.JWT_SECRET as string;
const audience = 'https://ops.rovacc.ro';
const issuer = 'https://ops.rovacc.ro';

export const emitNewToken = (user: { id: number }): string => {
	const now = Math.floor(Date.now() / 1000);
	const expiration = now + 7 * DAYS_IN_SECONDS;

	const token = {
		sub: `${user.id}`,
		iat: now,
		exp: expiration,
		aud: audience,
		iss: issuer
	};
	return jwt.sign(token, secret);
};

type Output = {
	isValid: boolean;
	isExpired: boolean;
	userId?: string;
};
export const verifyToken = (token: string): Output => {
	try {
		const decoded = jwt.verify(token, secret, { audience, issuer });

		return {
			isValid: true,
			isExpired: false,
			userId: typeof decoded.sub === 'string' ? decoded.sub : decoded.sub()
		};
	} catch (err) {
		return {
			isValid: false,
			isExpired: false
		};
	}
};
