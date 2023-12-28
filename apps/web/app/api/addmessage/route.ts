import { Twilio } from 'twilio';
import { twillioConfig } from '@/_core/config/twillio-config';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- description
export async function POST(req: Request) {
	const { body, from, conversationSid } = await req.json();

	const client = new Twilio(twillioConfig.accountSId, twillioConfig.authToken);

	try {
		await client.conversations.v1
			.conversations(conversationSid)
			.messages.create({ body, author: from });

		return new Response('Message added', {
			status: 200,
		});
	} catch (error) {
		return new Response('Unexpected error ocurred', {
			status: 200,
		});
	}
}
