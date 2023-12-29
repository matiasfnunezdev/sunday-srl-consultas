import { NextResponse } from 'next/server';
import { firebaseAdmin } from '@/_core/firebase/firebase-admin';
import { getAllByField } from '@/_core/firebase/collection-helpers';
import { validateFirebaseIdToken } from '@/_core/utils/verify-id-token';
import type { ApiResponse } from '@/_domain/interfaces/user/user';

export async function GET(req: Request): Promise<NextResponse> {
	const url = new URL(req.url);
	const conversationSid = url.searchParams.get('id');

	try {
		let response: ApiResponse<any[]>;
		const auth = firebaseAdmin().auth;
		await validateFirebaseIdToken(req, auth);
		const db = firebaseAdmin().firestore;

		if (!conversationSid) {
			throw new Error('Missing conversationSid');
		}

		const messagesCollection = db.collection('messages');

		const result = await getAllByField(
			conversationSid,
			'conversationSid',
			messagesCollection
		);

		if (result?.length) {
			response = {
				success: true,
				message: 'success',
				data: result.sort((a, b) => parseInt(a.index) - parseInt(b.index)),
			};
		} else {
			response = {
				success: false,
				message: 'failure',
				data: [],
			};
		}

		return NextResponse.json(response);
	} catch (error) {
		console.error('get conversation messages error', error);
		return NextResponse.json({
			status: 'Unexpected error ocurred',
			error: JSON.stringify(error),
		});
	}
}
