/* eslint-disable no-console -- description */
/* eslint-disable @typescript-eslint/explicit-function-return-type -- description */

import { NextResponse } from 'next/server';
import admin from 'firebase-admin';
import type { Message } from 'firebase-admin/lib/messaging/messaging-api';
import { firestore } from '../../_core/firebase/firebase-admin';

// Use named export for HTTP POST method
export async function POST(req: Request) {
	try {
		firestore();
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

			console.log('Raw body:', body);

			// Parse the body as URLSearchParams instead of JSON
			const params = new URLSearchParams(body);
			const event = Object.fromEntries(params);
			console.log('event', event);

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

			return NextResponse.json({ status: 'Success' });
		}
		// Handle the case where req.body is null.
		throw new Error('Request body is null.');
	} catch (error) {
		console.log('error', error);
		return NextResponse.json({ status: 'Unexpected error ocurred' });
	}
}
