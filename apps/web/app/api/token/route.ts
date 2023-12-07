/* eslint-disable no-console -- description */
/* eslint-disable @typescript-eslint/explicit-function-return-type -- description */

import { NextResponse } from 'next/server';
import twilio from 'twilio';

// Use named export for HTTP POST method
export async function POST(req: Request) {
	try {
		const { identity } = await req.json();

		if (
			!process.env.TWILIO_ACCOUNT_SID ||
			!process.env.TWILIO_API_KEY ||
			!process.env.TWILIO_API_SECRET ||
			!process.env.TWILIO_CHAT_SERVICE_SID
		) {
			throw new Error('Missing env variables');
		}

		const accessToken = new twilio.jwt.AccessToken(
			process.env.TWILIO_ACCOUNT_SID,
			process.env.TWILIO_API_KEY,
			process.env.TWILIO_API_SECRET,
			{
				identity,
			}
		);
		const chatGrant = new twilio.jwt.AccessToken.ChatGrant({
			serviceSid: process.env.TWILIO_CHAT_SERVICE_SID,
		});
		accessToken.addGrant(chatGrant);
		accessToken.identity = identity;

		return NextResponse.json({
			token: accessToken.toJwt(),
			identity,
		});
	} catch (error) {
		console.log('error', error);
		return NextResponse.json({ status: 'Unexpected error ocurred' });
	}
}
