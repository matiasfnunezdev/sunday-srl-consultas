/* eslint-disable @typescript-eslint/explicit-function-return-type -- description */
import { NextResponse } from 'next/server';
import { getConversationMessages } from '../../_core/utils/twillio-utils';

// Use named export for HTTP POST method
export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url);
		const conversationSid = searchParams.get('conversationSid');

		console.log('get conversation messages', conversationSid);

		if (!conversationSid) {
			throw new Error('Missing conversationSid');
		}

		const result = await getConversationMessages(conversationSid);

		console.log('get conversation messages result', JSON.stringify(result));

		return NextResponse.json({ messages: result });
	} catch (error) {
		return NextResponse.json({
			status: 'Unexpected error ocurred',
			error: JSON.stringify(error),
		});
	}
}
