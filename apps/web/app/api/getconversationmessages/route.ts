/* eslint-disable @typescript-eslint/explicit-function-return-type -- description */
/* eslint-disable @typescript-eslint/no-unsafe-call -- description */
/* eslint-disable @typescript-eslint/no-unsafe-return -- description */

import { getConversationMessages } from '../../_core/utils/twillio-utils';

// Use named export for HTTP POST method
export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url);
		const conversationSid = searchParams.get('conversationSid');
		if (conversationSid) {
			const result = await getConversationMessages(conversationSid);
			return Response.json({ messages: result });
		}

    return Response.json({ status: 'Missing conversationSid' });
	} catch (error) {
		return Response.json({ status: 'Unexpected error ocurred1' });
	}
}
