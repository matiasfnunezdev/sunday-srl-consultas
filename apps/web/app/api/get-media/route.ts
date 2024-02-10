/* eslint-disable @typescript-eslint/explicit-function-return-type -- description */
import { NextResponse } from 'next/server';
import twilio from 'twilio';
import axios from 'axios';
import { twillioConfig } from '@/_core/config/twillio-config';

// Use named export for HTTP POST method
export async function GET(req: Request) {
	const identity = 'sundaymoneyok';
	try {
		if (
			!twillioConfig.accountSId ||
			!twillioConfig.apiKey ||
			!twillioConfig.apiSecret ||
			!twillioConfig.chatServiceSId
		) {
			throw new Error('Missing env variables');
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

		const accountSid = twillioConfig.accountSId;
		const chatServiceSid = twillioConfig.chatServiceSId;
		const authToken = twillioConfig.authToken;

		const url = `https://mcs.us1.twilio.com/v1/Services/${chatServiceSid}/Media/${mediaSid}`;

		const response = await axios.get(url, {
			auth: {
				username: accountSid,
				password: authToken,
			},
		});

		if (response.status === 200) {
			return NextResponse.json(response.data);
		}

		return NextResponse.json({ status: 'Missing conversationSid' });
	} catch (error) {
		console.log('error', error);
		return NextResponse.json({ status: 'Unexpected error ocurred1' });
	}
}
