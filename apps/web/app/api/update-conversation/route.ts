/* eslint-disable @typescript-eslint/explicit-function-return-type -- description */

import { NextResponse } from 'next/server';
import { editOneByField, getAll } from '@/_core/firebase/collection-helpers';
import { firebaseAdmin } from '@/_core/firebase/firebase-admin';

// Use named export for HTTP POST method
export async function POST(req: Request) {
	try {
		const { conversationSId, payload } = await req.json();
		firebaseAdmin();
		const db = firebaseAdmin().firestore;

		await editOneByField(
			'conversationSId',
			conversationSId,
			payload,
			db,
			'conversations'
		);

		if (payload?.closeCase) {
			const cases = (await getAll(db, 'cases')) ?? [];

			const openCase = cases.find((value) => value?.open);

			console.log('openCase', openCase);

			if (openCase) {
				await editOneByField(
					'messageSIdStart',
					openCase?.messageSIdStart,
					{
						open: false,
						tags: payload?.tags,
					},
					db,
					'cases'
				);
			}
		}

		return NextResponse.json({ status: 'Success' });
	} catch (error) {
		console.log('error', error);
		return NextResponse.json({ status: 'Unexpected error ocurred' });
	}
}
