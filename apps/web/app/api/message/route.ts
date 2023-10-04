import { createOne } from '../../_core/firebase/collection-helpers';
import { firestore } from '../../_core/firebase/firebase-admin';

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- description
export async function POST(req: Request): Promise<any> {
	const db = firestore();

  	// eslint-disable-next-line no-console -- description
	console.log('request', JSON.stringify(req));

  	// eslint-disable-next-line no-console -- description
	console.log('body', req.body);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment -- description
	const body: any = await req.json();

	await createOne(body, db, 'messages');

	return new Response('Message added', {
		status: 200,
	});
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- description
export function GET(): any {
	return 'hello world';
}
