/* eslint-disable @typescript-eslint/explicit-function-return-type -- description */
import { NextResponse } from 'next/server';
import twilio from 'twilio';
import axios from 'axios';

// Use named export for HTTP POST method
export async function GET(req: Request) {
	const identity = 'sundaymoneyok';
	try {
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

		const { searchParams } = new URL(req.url);
		const mediaSid = searchParams.get('mediaSid');

		const accountSid = process.env.TWILIO_ACCOUNT_SID;
		const accountSecret = accessToken.toJwt();
		const chatServiceSid = process.env.TWILIO_CHAT_SERVICE_SID;

		const url = `https://mcs.us1.twilio.com/v1/Services/${chatServiceSid}/Media/${mediaSid}`;

		const response = await axios.get(url, {
			auth: {
				username: accountSid,
				password: accountSecret,
			},
		});

		if (response.status === 200) {
			// eslint-disable-next-line no-console -- N/A
			console.log('response.data', response.data);
			return NextResponse.json(response.data);
		}

		return NextResponse.json({ status: 'Missing conversationSid' });
	} catch (error) {
		return NextResponse.json({ status: 'Unexpected error ocurred1' });
	}
}
