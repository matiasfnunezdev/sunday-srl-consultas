import { NextResponse } from 'next/server';
import { getAll } from '@/_core/firebase/collection-helpers';
import { firebaseAdmin } from '@/_core/firebase/firebase-admin';

export async function GET(
	_request: Request
): Promise<
	NextResponse<
		| {
				openConversations: any[];
		  }
		| any
	>
> {
	try {
		firebaseAdmin();

		const db = firebaseAdmin().firestore;

		const openConversations = await getAll(db, 'conversations');

		return NextResponse.json({ openConversations });
	} catch (error) {
		return NextResponse.json({
			status: 'Unexpected error ocurred',
			error: JSON.stringify(error),
		});
	}
}
