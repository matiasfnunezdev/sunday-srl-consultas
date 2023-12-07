import { createOne } from '../../_core/firebase/collection-helpers';
import { firebaseAdmin } from '@/_core/firebase/firebase-admin';

export async function POST(req: Request): Promise<any> {
	const db = firebaseAdmin().firestore;

	const formData = await req.formData();
	const body: Record<string, string> = {};
	formData.forEach((value, key) => {
		if (typeof value === 'string') {
			body[key] = value;
		}
	});

	await createOne(body, db, 'messages');

	return new Response('Message added', {
		status: 200,
	});
}

export function GET(): any {
	return 'hello world';
}
