import type { DecodedIdToken } from 'firebase-admin/auth';
import type { Auth } from 'firebase-admin/lib/auth/auth';

export async function validateFirebaseIdToken(
	req: Request,
	auth: Auth
): Promise<DecodedIdToken> {
	const token = req.headers.get('x-access-token');
	if (!token) throw new Error('Auth token not found');

	const decodedToken = await auth.verifyIdToken(token);
	return decodedToken;
}
