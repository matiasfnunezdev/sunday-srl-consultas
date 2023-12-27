import { NextResponse } from 'next/server';
import { getAll } from '@/_core/firebase/collection-helpers';
import { firebaseAdmin } from '@/_core/firebase/firebase-admin';

export async function GET(
	_request: Request
): Promise<
	NextResponse<{
		openConversations: any[];
	}>
> {
	firebaseAdmin();

	const db = firebaseAdmin().firestore;

	const openConversations = await getAll(db, 'conversations');

	return NextResponse.json({ openConversations });
}
