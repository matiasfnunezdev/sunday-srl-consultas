/* eslint-disable @typescript-eslint/explicit-function-return-type -- description */
import { NextResponse } from 'next/server';
import { getConversationMessages } from '../../_core/utils/twillio-utils';

// Use named export for HTTP POST method
export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url);
		const conversationSid = searchParams.get('conversationSid');
		if (conversationSid) {
			const result = await getConversationMessages(conversationSid);
			return NextResponse.json({ messages: result });
		}

    return NextResponse.json({ status: 'Missing conversationSid' });
	} catch (error) {
		return NextResponse.json({ status: 'Unexpected error ocurred1' });
	}
}