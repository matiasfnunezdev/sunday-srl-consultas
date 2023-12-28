/* eslint-disable @typescript-eslint/explicit-function-return-type -- description */
import { NextResponse } from 'next/server';
import { firebaseAdmin } from '@/_core/firebase/firebase-admin';
import { getAllByField } from '@/_core/firebase/collection-helpers';

// Use named export for HTTP POST method
export async function GET(req: Request) {
	try {
		firebaseAdmin();
		const db = firebaseAdmin().firestore;
		const { searchParams } = new URL(req.url);
		const conversationSid = searchParams.get('conversationSid');

		console.info('get conversation messages', conversationSid);

		if (!conversationSid) {
			throw new Error('Missing conversationSid');
		}

		const messagesCollection = db.collection('messages');

		let messages;

		const result = await getAllByField(
			conversationSid,
			'conversationSid',
			messagesCollection
		);

		if (result) {
			messages = result.sort((a, b) => parseInt(a.index) - parseInt(b.index));
		} else {
			messages = [];
		}

		return NextResponse.json({ messages });
	} catch (error) {
		console.error('get conversation messages error', error);
		return NextResponse.json({
			status: 'Unexpected error ocurred',
			error: JSON.stringify(error),
		});
	}
}
