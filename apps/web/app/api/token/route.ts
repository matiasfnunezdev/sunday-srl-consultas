/* eslint-disable @typescript-eslint/explicit-function-return-type -- description */

import { NextResponse } from 'next/server';
import twilio from 'twilio';
import { twillioConfig } from '@/_core/config/twillio-config';

// Use named export for HTTP POST method
export async function POST(req: Request) {
	try {
		const { identity } = await req.json();

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

		return NextResponse.json({
			token: accessToken.toJwt(),
			identity,
		});
	} catch (error) {
		return NextResponse.json({ status: 'Unexpected error ocurred' });
	}
}
