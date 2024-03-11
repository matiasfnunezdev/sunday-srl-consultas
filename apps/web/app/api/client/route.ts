import { NextResponse } from 'next/server';
import { firebaseAdmin } from '@/_core/firebase/firebase-admin';
import { getOne, updateOne } from '@/_core/firebase/collection-helpers';
import { validateFirebaseIdToken } from '@/_core/utils/verify-id-token';
import type { ApiResponse } from '@/_domain/interfaces/user/user';
import type { Client } from '@/_domain/interfaces/client';

export async function GET(req: Request): Promise<NextResponse> {
	const url = new URL(req.url);
	const clientId = url.searchParams.get('id');
	const author = url.searchParams.get('author');
	const fullName = url.searchParams.get('fullName');
	const page = Number(url.searchParams.get('page')) || 1;
	const rowsPerPage = Number(url.searchParams.get('rowsPerPage')) || 10;

	try {
		let response: ApiResponse<any[]>;
		const auth = firebaseAdmin().auth;
		await validateFirebaseIdToken(req, auth);
		const db = firebaseAdmin().firestore;

		if (clientId) {
			const clientsCollection = db.collection('clients');
			const result = await getOne(
				`whatsapp:+${clientId}`,
				'author',
				clientsCollection
			);

			if (result) {
				response = {
					success: true,
					message: 'success',
					data: [result],
				};
			} else {
				response = {
					success: false,
					message: 'failure',
					data: [],
				};
			}
		} else {
			const query = db
				.collection('clients')
				.limit(rowsPerPage)
				.offset((page - 1) * rowsPerPage);

			const clientsSnapshot = await query.get();

			let result = clientsSnapshot.docs.map((doc) => doc.data() as Client);

			console.log('result1', result);

			if (author) {
				// Filter the result in memory by author
				result = result.filter((client) => client.author === author);
			}

			if (fullName) {
				const searchValue = fullName.toLowerCase();

				// Filter the result in memory by fullName
				result = result.filter((client) =>
					client?.fullName?.toLowerCase().includes(searchValue)
				);
			}

			console.log('result2', result);

			response = {
				success: true,
				message: 'success',
				data: result,
			};
		}

		const totalRecords = (await db.collection('clients').get()).size;
		const lastPage = Math.ceil(totalRecords / rowsPerPage);
		const hasMorePages = page < lastPage;

		const pagesData = {
			currentPage: page,
			hasMorePages,
			lastPage,
			totalRecords,
		};

		return NextResponse.json({ ...response, pagesData });
	} catch (error) {
		console.error('get client info error', error);
		return NextResponse.json({
			status: 'Unexpected error occurred',
			error: JSON.stringify(error),
		});
	}
}

export async function PUT(req: Request): Promise<NextResponse> {
	try {
		const auth = firebaseAdmin().auth;
		await validateFirebaseIdToken(req, auth);
		const db = firebaseAdmin().firestore;
		const url = new URL(req.url);
		const clientId = url.searchParams.get('id');
		const updatedClientData = await req.json();

		if (!clientId) {
			return NextResponse.json(
				{ status: 'Client ID is required' },
				{ status: 400 }
			);
		}

		const clientsCollection = db.collection('clients');

		const client = await getOne(
			`whatsapp:+${clientId}`,
			'author',
			clientsCollection
		);

		if (!client) {
			return NextResponse.json({ status: 'Client not found' }, { status: 404 });
		}

		const result = await updateOne(
			`whatsapp:+${clientId}`,
			'author',
			updatedClientData,
			clientsCollection
		);

		const response: ApiResponse<Client> = {
			success: true,
			message: 'success',
			data: result as Client,
		};

		return NextResponse.json(response);
	} catch (error) {
		console.error('Error updating tag:', error);
		if (error?.errorInfo?.code === 'auth/argument-error') {
			return NextResponse.json(
				{ status: 'Unauthorized access' },
				{ status: 401 }
			);
		}
		return NextResponse.json(
			{ status: 'Error updating client' },
			{ status: 500 }
		);
	}
}
