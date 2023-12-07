import { NextResponse } from 'next/server';
import type { ConversationInstance } from 'twilio/lib/rest/conversations/v1/conversation';
import { fetchOpenConversations } from '../../_core/utils/twillio-utils';

export async function GET(
	_request: Request
): Promise<
	NextResponse<{
		openConversations: ConversationInstance[];
	}>
> {
	const openConversations = await fetchOpenConversations();

	return NextResponse.json({ openConversations });
}
