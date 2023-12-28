import { NextResponse } from 'next/server';
import type { ApiResponse } from '@/_domain/interfaces/user/user';
import { firebaseAdmin } from '@/_core/firebase/firebase-admin';
import { validateFirebaseIdToken } from '@/_core/utils/verify-id-token';
import { getAll } from '@/_core/firebase/collection-helpers';

export async function GET(req: Request): Promise<NextResponse> {
	try {
		const auth = firebaseAdmin().auth;
		await validateFirebaseIdToken(req, auth);
		const db = firebaseAdmin().firestore;
		const conversations = await getAll(db, 'conversations');

		const response: ApiResponse<any[]> = {
			success: true,
			message: 'success',
			data: (conversations as any[]) ?? [],
		};

		return NextResponse.json(response);
	} catch (error) {
		console.log('error', error);
		if (error?.errorInfo?.code === 'auth/argument-error') {
			return NextResponse.json(
				{ status: 'Unauthorized access' },
				{ status: 401 }
			);
		}
		return NextResponse.json(
			{ status: 'Error fetching conversations' },
			{ status: 500 }
		);
	}
}
