import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import type { ApiResponse } from '@/_domain/interfaces/user/user';
import { firebaseAdmin } from '@/_core/firebase/firebase-admin';
import { validateFirebaseIdToken } from '@/_core/utils/verify-id-token';
import { getOne, updateOne } from '@/_core/firebase/collection-helpers';
import type { Tag } from '@/_domain/interfaces/tag/tag';

export async function POST(req: Request): Promise<NextResponse> {
	try {
		const auth = firebaseAdmin().auth;
		await validateFirebaseIdToken(req, auth);
		const db = firebaseAdmin().firestore;
		const tag = (await req.json()) as Partial<Tag>;

		const tagsRef = db.collection('tags');
		const querySnapshot = await tagsRef
			.where('description', '==', tag.description)
			.get();

		if (!querySnapshot.empty) {
			return NextResponse.json(
				{ status: 'Tag already exists' },
				{ status: 400 }
			);
		}

		const tagRef = tagsRef.doc();

		const tagId = uuidv4();

		await tagRef.set({ ...tag, tagId });

		const tagsCollection = db.collection('tags');

		const newTag = await getOne(tagId, 'tagId', tagsCollection);

		const response: ApiResponse<Tag> = {
			success: true,
			message: 'success',
			data: newTag as Tag,
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
			{ status: 'Error creating user' },
			{ status: 500 }
		);
	}
}

export async function PUT(req: Request): Promise<NextResponse> {
	try {
		const auth = firebaseAdmin().auth;
		await validateFirebaseIdToken(req, auth);
		const db = firebaseAdmin().firestore;
		const url = new URL(req.url);
		const tagId = url.searchParams.get('id');
		const updatedTagData = await req.json();

		if (!tagId) {
			return NextResponse.json(
				{ status: 'Tag ID is required' },
				{ status: 400 }
			);
		}

		const tagsCollection = db.collection('tags');

		const tag = await getOne(tagId, 'tagId', tagsCollection);

		if (!tag) {
			return NextResponse.json({ status: 'Tag not found' }, { status: 404 });
		}

		const result = await updateOne(
			tagId,
			'tagId',
			updatedTagData,
			tagsCollection
		);

		const response: ApiResponse<Tag> = {
			success: true,
			message: 'success',
			data: result as Tag,
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
		return NextResponse.json({ status: 'Error updating tag' }, { status: 500 });
	}
}

export async function DELETE(req: Request): Promise<NextResponse> {
	try {
		const auth = firebaseAdmin().auth;
		await validateFirebaseIdToken(req, auth);
		const db = firebaseAdmin().firestore;
		const url = new URL(req.url);
		const tagId = url.searchParams.get('id');

		if (!tagId) {
			return NextResponse.json(
				{ status: 'Tag ID is required' },
				{ status: 400 }
			);
		}

		const tagsCollection = db.collection('tags');

		const tag = await getOne(tagId, 'tagId', tagsCollection);

		if (!tag) {
			return NextResponse.json({ status: 'Tag not found' }, { status: 404 });
		}

		const updatedTagData = { ...tag, deleted: true };

		const result = await updateOne(
			tagId,
			'tagId',
			updatedTagData,
			tagsCollection
		);

		const response: ApiResponse<Tag> = {
			success: true,
			message: 'success',
			data: result as Tag,
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
		return NextResponse.json({ status: 'Error updating tag' }, { status: 500 });
	}
}

export async function GET(req: Request): Promise<NextResponse> {
	const url = new URL(req.url);
	const id = url.searchParams.get('id');

	if (id) {
		try {
			const auth = firebaseAdmin().auth;
			await validateFirebaseIdToken(req, auth);
			const db = firebaseAdmin().firestore;
			const tagsCollection = db.collection('tags');
			const tag = await getOne(id, 'tagId', tagsCollection);
			if (!tag) {
				return NextResponse.json({ status: 'Tag not found' }, { status: 400 });
			}

			const response: ApiResponse<Tag> = {
				success: true,
				message: 'success',
				data: tag,
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
				{ status: 'Unexpected error ocurred', error: JSON.stringify(error) },
				{ status: 500 }
			);
		}
	} else {
		try {
			const auth = firebaseAdmin().auth;
			await validateFirebaseIdToken(req, auth);
			const db = firebaseAdmin().firestore;
			const tags = await db.collection('tags').get();

			const result = (tags.docs.map((doc) => doc.data()) as Tag[]).filter(
				(tag) => !tag?.deleted
			);

			const response: ApiResponse<Tag[]> = {
				success: true,
				message: 'success',
				data: result,
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
				{ status: 'Unexpected error ocurred', error: JSON.stringify(error) },
				{ status: 500 }
			);
		}
	}
}
