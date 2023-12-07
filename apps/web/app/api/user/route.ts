import { NextResponse } from 'next/server';
import type { UserData } from '@/_domain/interfaces/user/user';
import { firebaseAdmin } from '@/_core/firebase/firebase-admin';
import { validateFirebaseIdToken } from '@/_core/utils/verify-id-token';

export async function POST(req: Request): Promise<NextResponse> {
	try {
		const auth = firebaseAdmin().auth;
		await validateFirebaseIdToken(req, auth);
		const db = firebaseAdmin().firestore;
		const user = (await req.json()) as Partial<UserData>;

		const usersRef = db.collection('users');
		const querySnapshot = await usersRef.where('uid', '==', user.uid).get();

		if (!querySnapshot.empty) {
			return NextResponse.json(
				{ status: 'User already exists' },
				{ status: 400 }
			);
		}

		const userRef = usersRef.doc();

		await userRef.set(user);
		return NextResponse.json({ status: 'User created successfully' });
	} catch (error) {
		if (error?.errorInfo?.code === 'auth/argument-error') {
			return NextResponse.json(
				{ status: 'Unauthorized access' },
				{ status: 401 }
			);
		}
		return NextResponse.json(
			{ status: 'Error creating user' },
			{ status: 500 }
		);
	}
}

export async function GET(req: Request): Promise<NextResponse> {
	const url = new URL(req.url);
	const userId = url.searchParams.get('id');

	if (userId) {
		try {
			const auth = firebaseAdmin().auth;
			await validateFirebaseIdToken(req, auth);
			const db = firebaseAdmin().firestore;
			const userRef = db.collection('users').doc(userId);
			const doc = await userRef.get();
			if (!doc.exists) {
				return NextResponse.json({ status: 'User not found' }, { status: 400 });
			}
			return NextResponse.json({ ...doc.data(), id: doc.id });
		} catch (error) {
			if (error?.errorInfo?.code === 'auth/argument-error') {
				return NextResponse.json(
					{ status: 'Unauthorized access' },
					{ status: 401 }
				);
			}
			return NextResponse.json(
				{ status: 'Error fetching user' },
				{ status: 500 }
			);
		}
	} else {
		try {
			const auth = firebaseAdmin().auth;
			await validateFirebaseIdToken(req, auth);
			const db = firebaseAdmin().firestore;
			const users = await db.collection('users').get();
			return NextResponse.json(users.docs.map((doc) => doc.data()));
		} catch (error) {
			if (error?.errorInfo?.code === 'auth/argument-error') {
				return NextResponse.json(
					{ status: 'Unauthorized access' },
					{ status: 401 }
				);
			}
			return NextResponse.json(
				{ status: 'Error fetching users' },
				{ status: 500 }
			);
		}
	}
}
