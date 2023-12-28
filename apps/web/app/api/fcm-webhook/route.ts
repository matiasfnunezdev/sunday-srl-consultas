/* eslint-disable @typescript-eslint/explicit-function-return-type -- description */

import { NextResponse } from 'next/server';
import admin from 'firebase-admin';
import type { Message } from 'firebase-admin/lib/messaging/messaging-api';
import { firebaseAdmin } from '@/_core/firebase/firebase-admin';
import {
	createOne,
	getAll,
	getOne,
	updateOne,
} from '@/_core/firebase/collection-helpers';

// Use named export for HTTP POST method
export async function POST(req: Request) {
	try {
		firebaseAdmin();
		if (req.body) {
			let body = '';
			const reader = req.body.getReader();

			// Use a do-while loop to ensure that the loop runs at least once.
			let done, value;
			do {
				// eslint-disable-next-line no-await-in-loop -- N/A
				({ done, value } = await reader.read());
				if (value) {
					body += new TextDecoder().decode(value);
				}
			} while (!done);

			const db = firebaseAdmin().firestore;

			// Parse the body as URLSearchParams instead of JSON
			const params = new URLSearchParams(body);
			const event = Object.fromEntries(params);

			const clientCollection = db.collection('clients');
			const conversationsCollection = db.collection('conversations');

			const author = event?.Author;
			const participantSId = event?.ParticipantSid;

			let client = await getOne(
				participantSId,
				'participantSId',
				clientCollection
			);

			if (!client) {
				client = await createOne(
					{
						author,
						participantSId,
					},
					db,
					'clients'
				);
			}

			const conversationSId = event?.ConversationSid;

			let conversation = await getOne(
				conversationSId,
				'conversationSId',
				conversationsCollection
			);

			if (!conversation) {
				conversation = await createOne(
					{
						conversationSId,
						author,
						openCase: true,
						unreadMessagesCount: 1,
						unread: true,
					},
					db,
					'conversations'
				);
			} else {
				const currentUnreadMessagesCount =
					conversation?.unreadMessagesCount ?? 0;
				conversation = await updateOne(
					conversationSId,
					'conversationSId',
					{
						conversationSId,
						openCase: true,
						unreadMessagesCount: currentUnreadMessagesCount + 1,
						unread: true,
					},
					conversationsCollection
				);
			}

			const cases = (await getAll(db, 'cases')) ?? [];

			const hasAnOpenCase =
				cases?.filter((customerCase) => customerCase?.open).length > 0;

			if (!hasAnOpenCase) {
				await createOne(
					{
						messageSIdStart: event?.MessageSid,
						author,
						conversationSId,
						open: true,
					},
					db,
					'cases'
				);
			}

			const message = {
				notification: {
					title: `test`,
					body: 'test',
				},
				data: {
					timeStamp: new Date().getTime().toString(),
				},
				token:
					'd7k24IsNA7-ZW-JTvmvbA9:APA91bHmM4QkryCM7JFDiV2nWw3IQqZBBtpg3Ro7tKjdDeluLlFkpG4huxs_Bi2wtCTaVj-ucGp1H5EuSSZIiaZWHw13n08QQk5uphfYGxHI0z3ojHoqijaSSqL8KZMPEwQOD6DhmqPu',
			} as Message;

			await admin.messaging().send(message);

			const updatesRef = admin.database().ref('updates');
			const newUpdateRef = updatesRef.push();

			await newUpdateRef.set({
				type: 'inbound-message',
				timestamp: admin.database.ServerValue.TIMESTAMP,
			});

			return NextResponse.json({ status: 'Success' });
		}
		// Handle the case where req.body is null.
		throw new Error('Request body is null.');
	} catch (error) {
		return NextResponse.json({
			status: 'Unexpected error ocurred',
			error: JSON.stringify(error),
		});
	}
}
