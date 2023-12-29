/* eslint-disable @typescript-eslint/explicit-function-return-type -- description */

import { NextResponse } from 'next/server';
import { sendMessageToConversation } from '../../_core/utils/twillio-utils';
import { firebaseAdmin } from '@/_core/firebase/firebase-admin';
import { createOne } from '@/_core/firebase/collection-helpers';

// Use named export for HTTP POST method
export async function POST(req: Request) {
	try {
		firebaseAdmin();
		const db = firebaseAdmin().firestore;
		const { conversationSid, message } = await req.json();
		const messageResult: any = await sendMessageToConversation(
			conversationSid,
			message
		);

		if (messageResult) {
			await createOne(
				{
					accountSid: messageResult?.accountSid ?? null,
					conversationSid: messageResult?.conversationSid ?? null,
					messageSid: messageResult?.sid ?? null,
					index: messageResult?.index ? String(messageResult?.index) : null,
					author: messageResult?.author ?? null,
					body: messageResult?.body ?? null,
					media: messageResult?.media ?? null,
					participantSid: messageResult?.participantSid ?? null,
					dateCreated: new Date().toISOString(),
					dateUpdated: new Date().toISOString(),
				},
				db,
				'messages'
			);
		}

		return NextResponse.json({ status: 'Success' });
	} catch (error) {
		return NextResponse.json({
			status: 'Unexpected error ocurred',
			error: JSON.stringify(error),
		});
	}
}
