import { NextResponse } from 'next/server';
import type { ApiResponse, UserData } from '@/_domain/interfaces/user/user';
import { firebaseAdmin } from '@/_core/firebase/firebase-admin';
import { validateFirebaseIdToken } from '@/_core/utils/verify-id-token';
import { getOne } from '@/_core/firebase/collection-helpers';

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
	const userId = url.searchParams.get('uid');

	if (userId) {
		try {
			let response: ApiResponse<UserData | undefined>;

			const auth = firebaseAdmin().auth;
			await validateFirebaseIdToken(req, auth);
			const db = firebaseAdmin().firestore;
			const usersCollection = db.collection('users');
			const user = await getOne(userId, 'uid', usersCollection);
			if (!user) {
				response = {
					success: false,
					message: 'failure',
					data: undefined,
				};
			}

			response = {
				success: true,
				message: 'success',
				data: user,
			};

			return NextResponse.json(response, {
				status: response.success ? 200 : 400,
			});
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

			const response: ApiResponse<UserData[]> = {
				success: true,
				message: 'success',
				data: users.docs.map((doc) => doc.data()) as UserData[],
			};

			return NextResponse.json(response);
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
