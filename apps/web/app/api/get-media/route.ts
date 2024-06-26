import { NextResponse } from 'next/server';
import twilio from 'twilio';
import axios from 'axios';
import { twillioConfig } from '@/_core/config/twillio-config';

// Use named export for HTTP POST method
export async function GET(req: Request): Promise<NextResponse> {
	const identity = 'sundaymoneyok';
	try {
		if (
			!twillioConfig.accountSId ||
			!twillioConfig.apiKey ||
			!twillioConfig.apiSecret ||
			!twillioConfig.chatServiceSId
		) {
			return NextResponse.json({ status: 'Missing conversationSid' });
		}

		const accessToken = new twilio.jwt.AccessToken(
			twillioConfig.accountSId,
			twillioConfig.apiKey,
			twillioConfig.apiSecret,
			{
				identity,
			}
		);
		const chatGrant = new twilio.jwt.AccessToken.ChatGrant({
			serviceSid: twillioConfig.chatServiceSId,
		});
		accessToken.addGrant(chatGrant);
		accessToken.identity = identity;

		const { searchParams } = new URL(req.url);
		const mediaSid = searchParams.get('mediaSid');

		// const accountSid = twillioConfig.accountSId;
		// const authToken = twillioConfig.authToken;
		const chatServiceSid = twillioConfig.chatServiceSId;

		const url = `https://mcs.us1.twilio.com/v1/Services/${chatServiceSid}/Media/${mediaSid}`;

		const response = await axios.get(url, {
			auth: {
				username: 'ACa5fad8f58f5dc07982665568517e8245',
				password: 'deca3b742e7d951ebe1ae211eaa61d77',
			},
		});

		if (response.status !== 200) {
			return NextResponse.json({ status: 'Missing conversationSid' });
		}

		return NextResponse.json(response.data);
	} catch (error) {
		console.log('error', error);

		return NextResponse.json(
			{ status: 'Error fetching media' },
			{ status: 500 }
		);
	}
}
